"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { setScroll } from "@/lib/scroll"
import { prefersReducedMotion } from "@/lib/motion"

let lenisRef: Lenis | null = null
let usingNativeScroll = false

/** Smoothly interpolate the page scroll to a normalized progress target.
 *  Falls back to an instant/native jump when reduced motion is preferred
 *  (there's no Lenis instance to ease through in that case). */
export function scrollToProgress(target: number) {
  const max = document.documentElement.scrollHeight - window.innerHeight
  if (lenisRef) {
    lenisRef.scrollTo(max * target, { duration: 1.6 })
    return
  }
  window.scrollTo({ top: max * target, behavior: usingNativeScroll ? "auto" : "smooth" })
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) {
      // Skip Lenis's eased "smoothing" entirely — it's exactly the kind of
      // motion-that-doesn't-match-your-input that reduced-motion asks us
      // to drop. Track native scroll instead so progress-driven camera/UI
      // still work, but the page only moves when and as much as you
      // actually scrolled it.
      usingNativeScroll = true
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight || 1
        const progress = Math.min(1, Math.max(0, window.scrollY / max))
        setScroll(progress, 0)
      }
      onScroll()
      window.addEventListener("scroll", onScroll, { passive: true })
      return () => window.removeEventListener("scroll", onScroll)
    }

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
