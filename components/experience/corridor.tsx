"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useTexture, Line } from "@react-three/drei"
import * as THREE from "three"
import { CAMERA_START_Z, CAMERA_END_Z } from "@/lib/portfolio-data"

const LENGTH = CAMERA_START_Z - CAMERA_END_Z + 30
const CENTER_Z = (CAMERA_START_Z + CAMERA_END_Z) / 2
const HALF_W = 9

/** Repeating paper surface used on floor and walls. */
function PaperSurface({
  size,
  position,
  rotation,
  repeat,
  tint = "#f2ead9",
}: {
  size: [number, number]
  position: [number, number, number]
  rotation?: [number, number, number]
  repeat: [number, number]
  tint?: string
}) {
  const tex = useTexture("/textures/paper.png")
  const mapped = useMemo(() => {
    const t = tex.clone()
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.repeat.set(repeat[0], repeat[1])
    t.needsUpdate = true
    return t
  }, [tex, repeat])

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshBasicMaterial map={mapped} color={tint} />
    </mesh>
  )
}

/** A faint sketched baseboard / ceiling guide line running the corridor. */
function GuideLine({ y, x }: { y: number; x: number }) {
  const pts = useMemo(() => {
    const arr: [number, number, number][] = []
    const steps = 60
    let n = Math.round((x + y) * 100)
    const rand = () => {
      n = (n * 9301 + 49297) % 233280
      return n / 233280 - 0.5
    }
    for (let i = 0; i <= steps; i++) {
      const z = CAMERA_START_Z + 8 - (LENGTH * i) / steps
      arr.push([x + rand() * 0.05, y + rand() * 0.06, z])
    }
    return arr
  }, [x, y])
  return <Line points={pts} color="#c9bda2" lineWidth={0.8} transparent opacity={0.6} />
}

export function Corridor() {
  return (
    <group>
      {/* floor */}
      <PaperSurface
        size={[HALF_W * 2, LENGTH]}
        position={[0, -3.2, CENTER_Z]}
        rotation={[-Math.PI / 2, 0, 0]}
        repeat={[6, 26]}
        tint="#eadfc8"
      />
      {/* back ceiling wash */}
      <PaperSurface
        size={[HALF_W * 2, LENGTH]}
        position={[0, 7.5, CENTER_Z]}
        rotation={[Math.PI / 2, 0, 0]}
        repeat={[6, 26]}
        tint="#f4eddd"
      />
      {/* left wall */}
      <PaperSurface
        size={[LENGTH, 11]}
        position={[-HALF_W, 2, CENTER_Z]}
        rotation={[0, Math.PI / 2, 0]}
        repeat={[26, 4]}
        tint="#f0e7d3"
      />
      {/* right wall */}
      <PaperSurface
        size={[LENGTH, 11]}
        position={[HALF_W, 2, CENTER_Z]}
        rotation={[0, -Math.PI / 2, 0]}
        repeat={[26, 4]}
        tint="#ece2cc"
      />

      <GuideLine y={-3.05} x={-HALF_W + 0.05} />
      <GuideLine y={-3.05} x={HALF_W - 0.05} />
      <GuideLine y={6.4} x={-HALF_W + 0.05} />
      <GuideLine y={6.4} x={HALF_W - 0.05} />
    </group>
  )
}

/** Loosely sketched wireframe objects that drift and react to the cursor. */
export function FloatingProp({
  position,
  geometry,
  scale = 1,
  speed = 0.2,
  pointer,
}: {
  position: [number, number, number]
  geometry: "torus" | "box" | "octa" | "cone" | "dodeca"
  scale?: number
  speed?: number
  pointer: React.RefObject<{ x: number; y: number }>
}) {
  const ref = useRef<THREE.Group>(null)
  const base = useMemo(() => new THREE.Vector3(...position), [position])
  const phase = useMemo(() => Math.random() * Math.PI * 2, [])

  const geo = useMemo(() => {
    switch (geometry) {
      case "torus":
        return new THREE.TorusGeometry(0.7, 0.26, 10, 24)
      case "box":
        return new THREE.BoxGeometry(1, 1, 1)
      case "octa":
        return new THREE.OctahedronGeometry(0.85)
      case "cone":
        return new THREE.ConeGeometry(0.7, 1.3, 14)
      default:
        return new THREE.DodecahedronGeometry(0.8)
    }
  }, [geometry])

  const edges = useMemo(() => new THREE.EdgesGeometry(geo, 20), [geo])

  useFrame((state) => {
    const g = ref.current
    if (!g) return
    const t = state.clock.elapsedTime
    g.rotation.x = t * speed
    g.rotation.y = t * speed * 0.7 + phase
    const p = pointer.current
    g.position.set(
      base.x + Math.sin(t * 0.4 + phase) * 0.25 + (p?.x ?? 0) * 0.5,
      base.y + Math.sin(t * 0.6 + phase) * 0.3 + (p?.y ?? 0) * 0.3,
      base.z,
    )
  })

  return (
    <group ref={ref} position={position} scale={scale}>
      <lineSegments>
        <primitive object={edges} attach="geometry" />
        <lineBasicMaterial color="#3a352d" transparent opacity={0.55} />
      </lineSegments>
    </group>
  )
}
