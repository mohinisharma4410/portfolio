"use client"

import { Suspense, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { PROJECTS } from "@/lib/portfolio-data"
import { Corridor, FloatingProp } from "./corridor"
import { FramedIllustration } from "./framed-illustration"
import { CameraRig } from "./rig"

const HALF_W = 9
const WALL_X = HALF_W - 0.18

// Establishing illustrations that aren't in PROJECTS
const INTRO_PIECES = [
  { image: "/illustrations/hero-studio.png", z: 1, side: "right" as const },
  { image: "/illustrations/about-figure.png", z: -14, side: "left" as const },
]

export function Scene() {
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener("pointermove", onMove)
    return () => window.removeEventListener("pointermove", onMove)
  }, [])

  const wallPieces = [
    ...INTRO_PIECES.map((p) => ({ image: p.image, z: p.z, side: p.side })),
    ...PROJECTS.map((p) => ({ image: p.image, z: p.z, side: p.side })),
  ]

  const stations = wallPieces.map((p) => ({
    z: p.z,
    side: p.side === "left" ? -1 : 1,
  }))

  return (
    <div className="fixed inset-0 h-screen w-full">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ fov: 46, near: 0.1, far: 200, position: [0, 0.9, 14] }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor("#f2ead9", 1)
        }}
      >
        <fog attach="fog" args={["#efe6d2", 22, 62]} />

        <Suspense fallback={null}>
          <Corridor />

          {wallPieces.map((p) => (
            <FramedIllustration
              key={p.image}
              image={p.image}
              stationZ={p.z}
              position={[
                p.side === "left" ? -WALL_X : WALL_X,
                1.4,
                p.z,
              ]}
              rotationY={p.side === "left" ? Math.PI / 2 : -Math.PI / 2}
              maxHeight={4.8}
            />
          ))}

          {/* floating sketched props scattered down the corridor */}
          <FloatingProp position={[3.2, 3.4, -4]} geometry="torus" scale={0.9} speed={0.15} pointer={pointer} />
          <FloatingProp position={[-3.6, 4, -20]} geometry="octa" scale={1} speed={0.2} pointer={pointer} />
          <FloatingProp position={[4, 3, -36]} geometry="dodeca" scale={0.9} speed={0.18} pointer={pointer} />
          <FloatingProp position={[-4.2, 4.2, -52]} geometry="box" scale={0.8} speed={0.12} pointer={pointer} />
          <FloatingProp position={[3.4, 3.2, -68]} geometry="cone" scale={0.9} speed={0.16} pointer={pointer} />
          <FloatingProp position={[-2.8, 2.6, -76]} geometry="torus" scale={0.7} speed={0.22} pointer={pointer} />
        </Suspense>

        <CameraRig stations={stations} pointer={pointer} />
      </Canvas>
    </div>
  )
}
