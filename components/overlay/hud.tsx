"use client"

import { useScrollProgress, clamp01, smoothstep } from "@/lib/scroll"
import { PERSON } from "@/lib/portfolio-data"

export function Hud() {
  const progress = useScrollProgress()
  const hintOpacity = 1 - smoothstep(0.005, 0.05, progress)

  return (
    <>
      {/* availability — top right */}
      <div className="pointer-events-none fixed right-6 top-7 z-30 hidden items-center gap-2 md:flex md:right-10">
        <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
        <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-ink/55">
          Open to roles
        </span>
      </div>

      {/* scroll hint — bottom center */}
      <div
        className="pointer-events-none fixed bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2"
        style={{ opacity: hintOpacity }}
      >
        <span className="font-hand text-lg text-ink/70">scroll to explore</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-ink/35 p-1">
          <span className="h-2 w-1 animate-bounce rounded-full bg-ink/55" />
        </span>
      </div>

      {/* progress indicator — bottom left */}
      <div className="pointer-events-none fixed bottom-8 left-6 z-30 flex items-center gap-3 md:left-10">
        <div className="h-px w-24 overflow-hidden bg-ink/20 md:w-40">
          <div
            className="h-full bg-accent"
            style={{ width: `${clamp01(progress) * 100}%` }}
          />
        </div>
        <span className="font-hand text-base tabular-nums text-ink/60">
          {String(Math.round(clamp01(progress) * 100)).padStart(2, "0")}
        </span>
      </div>

      {/* footer contact — bottom right */}
      <a
        href={`mailto:${PERSON.email}`}
        className="pointer-events-auto fixed bottom-8 right-6 z-30 hidden font-hand text-base text-ink/55 transition-colors hover:text-accent md:block md:right-10"
      >
        {PERSON.email}
      </a>
    </>
  )
}
