"use client"

import { useEffect, useRef, useState } from "react"
import { prefersReducedMotion } from "@/lib/motion"

/** A small hand-drawn ink cursor with a trailing ring. Desktop / fine-pointer only. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return
    setEnabled(true)

    const reduceMotion = prefersReducedMotion()
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...pos }
    let hovering = false

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      const el = e.target as HTMLElement
      hovering = !!el.closest("a, button")
    }
    window.addEventListener("pointermove", onMove)

    let raf = 0
    const loop = () => {
      // Snap directly to the pointer under reduced motion instead of
      // easing/lagging behind it — a trailing "elastic" follow is its own
      // small but real motion pattern some people find uncomfortable.
      if (reduceMotion) {
        ringPos.x = pos.x
        ringPos.y = pos.y
      } else {
        ringPos.x += (pos.x - ringPos.x) * 0.18
        ringPos.y += (pos.y - ringPos.y) * 0.18
      }
      if (dot.current) {
        dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`
      }
      if (ring.current) {
        ring.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) scale(${hovering ? 1.8 : 1})`
        ring.current.style.opacity = hovering ? "1" : "0.5"
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-50 -ml-1 -mt-1 h-2 w-2 rounded-full bg-accent"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-50 -ml-4 -mt-4 h-8 w-8 rounded-full border border-ink/40 transition-[opacity,transform] duration-150"
      />
    </>
  )
}
