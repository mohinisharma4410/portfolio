"use client"

import { useEffect, useState } from "react"
import { PERSON } from "@/lib/portfolio-data"

/**
 * Minimal hand-drawn loading state. We fake a short asset-warm-up so the first
 * frame of the WebGL scene is ready before we fade away.
 */
export function LoadingScreen() {
  const [pct, setPct] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const duration = 1900
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      // ease-out
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setDone(true), 450)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-paper transition-opacity duration-700"
      style={{ opacity: done ? 0 : 1, pointerEvents: done ? "none" : "auto" }}
    >
      <span className="mb-6 font-hand text-3xl text-ink md:text-4xl">
        {PERSON.name}
      </span>

      {/* hand-drawn progress line */}
      <div className="relative h-px w-56 overflow-hidden bg-ink/15">
        <div
          className="absolute left-0 top-0 h-full bg-ink transition-[width] duration-100"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span className="text-[11px] uppercase tracking-[0.28em] text-ink/50">
          drawing the studio
        </span>
        <span className="font-hand text-base tabular-nums text-ink/70">{pct}%</span>
      </div>
    </div>
  )
}
