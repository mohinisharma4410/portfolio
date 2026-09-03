"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { setScroll } from "@/lib/scroll"

let lenisRef: Lenis | null = null

/** Smoothly interpolate the page scroll to a normalized progress target. */
export function scrollToProgress(target: number) {
  if (!lenisRef) return
  const max = document.documentElement.scrollHeight - window.innerHeight
  lenisRef.scrollTo(max * target, { duration: 1.6 })
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      smoothWheel: true,
    })
    lenisRef = lenis

    lenis.on("scroll", (e: { scroll: number; limit: number; velocity: number }) => {
      const limit = e.limit || 1
      const progress = Math.min(1, Math.max(0, e.scroll / limit))
      setScroll(progress, e.velocity)
    })

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef = null
    }
  }, [])

  return <>{children}</>
}
