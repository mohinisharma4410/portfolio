"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useTexture, Line } from "@react-three/drei"
import * as THREE from "three"

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform sampler2D uTex;
  uniform float uProgress;
  uniform float uTime;
  uniform float uVertical;
  varying vec2 vUv;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  float noise(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p){
    float v = 0.0;
    float amp = 0.5;
    for(int i = 0; i < 4; i++){
      v += amp * noise(p);
      p *= 2.0;
      amp *= 0.5;
    }
    return v;
  }

  void main(){
    // subtle ink displacement so lines feel hand-inked
    vec2 disp = vec2(noise(vUv * 90.0 + uTime * 0.05), noise(vUv * 90.0 - uTime * 0.05)) - 0.5;
    vec2 uv = vUv + disp * 0.0035;

    vec4 tex = texture2D(uTex, uv);

    // irregular, hand-painted reveal front (diagonal + fbm distortion)
    float base = (vUv.x * 0.45 + (1.0 - vUv.y) * 0.55);
    base += (fbm(vUv * 3.5) - 0.5) * 0.55;
    float edge = 0.16;
    float mask = 1.0 - smoothstep(uProgress - edge, uProgress + edge, base);

    // paper grain
    float grain = 0.95 + 0.09 * noise(vUv * 420.0);
    vec3 color = tex.rgb * grain;

    // faint wet-ink darkening right at the drawing front
    float front = smoothstep(uProgress - 0.02, uProgress, base) * (1.0 - smoothstep(uProgress, uProgress + 0.06, base));
    color = mix(color, color * 0.82, front * 0.6);

    float alpha = tex.a * clamp(mask, 0.0, 1.0);
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(color, alpha);
  }
`

function wobblyRect(w: number, h: number, jitter: number, seed: number) {
  const pts: [number, number, number][] = []
  const perSide = 14
  const corners = [
    [-w, -h],
    [w, -h],
    [w, h],
    [-w, h],
  ]
  let n = seed
  const rand = () => {
    n = (n * 9301 + 49297) % 233280
    return n / 233280 - 0.5
  }
  for (let c = 0; c < 4; c++) {
    const [ax, ay] = corners[c]
    const [bx, by] = corners[(c + 1) % 4]
    for (let i = 0; i < perSide; i++) {
      const t = i / perSide
      const x = ax + (bx - ax) * t + rand() * jitter
      const y = ay + (by - ay) * t + rand() * jitter
      pts.push([x, y, 0])
    }
  }
  pts.push([...pts[0]] as [number, number, number])
  return pts
}

export function FramedIllustration({
  image,
  position,
  rotationY = 0,
  maxHeight = 5.2,
  stationZ,
}: {
  image: string
  position: [number, number, number]
  rotationY?: number
  maxHeight?: number
  stationZ: number
}) {
  const texture = useTexture(image)
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const { width, height } = useMemo(() => {
    const img = texture.image as HTMLImageElement
    const aspect = img && img.width ? img.width / img.height : 1
    return { width: maxHeight * aspect, height: maxHeight }
  }, [texture, maxHeight])

  const uniforms = useMemo(
    () => ({
      uTex: { value: texture },
      uProgress: { value: 0 },
      uTime: { value: 0 },
    }),
    [texture],
  )

  const frameOuter = useMemo(
    () => wobblyRect(width / 2 + 0.28, height / 2 + 0.28, 0.06, 7),
    [width, height],
  )
  const frameInner = useMemo(
    () => wobblyRect(width / 2 + 0.16, height / 2 + 0.16, 0.05, 23),
    [width, height],
  )

  useFrame((state) => {
    const camZ = state.camera.position.z
    const distance = camZ - stationZ
    const reveal = 1 - THREE.MathUtils.smoothstep(distance, 5.5, 17)
    if (matRef.current) {
      matRef.current.uniforms.uProgress.value = THREE.MathUtils.clamp(reveal, 0, 1)
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* paper mat behind the illustration */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[width + 0.7, height + 0.7]} />
        <meshBasicMaterial color="#efe7d4" />
      </mesh>
      <mesh>
        <planeGeometry args={[width, height]} />
        <shaderMaterial
          ref={matRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
        />
      </mesh>
      <Line points={frameOuter} color="#2a2622" lineWidth={1.4} />
      <Line points={frameInner} color="#2a2622" lineWidth={0.8} transparent opacity={0.55} />
    </group>
  )
}
