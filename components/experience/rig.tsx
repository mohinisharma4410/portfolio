"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { scroll } from "@/lib/scroll"
import { CAMERA_START_Z, CAMERA_END_Z } from "@/lib/portfolio-data"
import { usePrefersReducedMotion } from "@/lib/motion"

type Station = { z: number; side: number }

export function CameraRig({
  stations,
  pointer,
}: {
  stations: Station[]
  pointer: React.RefObject<{ x: number; y: number }>
}) {
  const { camera } = useThree()
  const lookTarget = useRef(new THREE.Vector3(0, 0.5, 0))
  const smoothZ = useRef(CAMERA_START_Z)
  const reduceMotion = usePrefersReducedMotion()

  useFrame((_, delta) => {
    const p = scroll.progress
    const targetZ = THREE.MathUtils.lerp(CAMERA_START_Z, CAMERA_END_Z, p)

    if (reduceMotion) {
      // Camera tracks scroll directly: no spring-smoothing lag, no
      // auto-pan toward whichever wall is nearest, no pointer parallax.
      // It only moves because you scrolled, exactly as much as you did.
      smoothZ.current = targetZ
      const camZ = smoothZ.current
      camera.position.set(0, 0.9, camZ)
      lookTarget.current.set(0, 0.6, camZ - 9)
      camera.lookAt(lookTarget.current)
      return
    }

    // extra smoothing on top of Lenis for buttery camera travel
    const k = 1 - Math.pow(0.001, delta)
    smoothZ.current = THREE.MathUtils.lerp(smoothZ.current, targetZ, k)
    const camZ = smoothZ.current

    // turn gently toward whichever wall illustration is closest
    let lookX = 0
    for (const s of stations) {
      const d = camZ - s.z
      const w = Math.exp(-(d * d) / 60)
      lookX += s.side * w
    }
    lookX = THREE.MathUtils.clamp(lookX, -1, 1)

    const px = pointer.current?.x ?? 0
    const py = pointer.current?.y ?? 0

    camera.position.set(px * 0.6 + lookX * 0.8, 0.9 + py * 0.4, camZ)

    lookTarget.current.set(lookX * 6 + px * 1.2, 0.6 + py * 0.8, camZ - 9)
    camera.lookAt(lookTarget.current)
  })

  return null
}
