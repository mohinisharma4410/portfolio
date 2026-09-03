"use client"

import { useScrollProgress } from "@/lib/scroll"
import { scrollToProgress } from "@/components/smooth-scroll"
import { PERSON } from "@/lib/portfolio-data"

const NAV = [
  { index: "01", label: "About", target: 0.2 },
  { index: "02", label: "Work", target: 0.42 },
  { index: "03", label: "Contact", target: 0.985 },
]

export function Nav() {
  const progress = useScrollProgress()

  const activeIndex = (() => {
    if (progress < 0.14) return -1
    if (progress < 0.33) return 0
    if (progress < 0.9) return 1
    return 2
  })()

  return (
    <>
      {/* logo / name — top left */}
      <button
        onClick={() => scrollToProgress(0)}
        className="pointer-events-auto fixed left-6 top-6 z-30 text-left md:left-10 md:top-8"
      >
        <span className="block font-hand text-2xl leading-none text-ink md:text-3xl">
          {PERSON.name}
        </span>
        <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.28em] text-ink/55">
          {PERSON.role}
        </span>
      </button>

      {/* section nav — right center (desktop) */}
      <nav className="pointer-events-auto fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-4 md:flex md:right-10">
        {NAV.map((item, i) => (
          <button
            key={item.label}
            onClick={() => scrollToProgress(item.target)}
            className="group flex items-center gap-3"
          >
            <span
              className={`text-[10px] font-medium tabular-nums tracking-widest transition-colors ${
                activeIndex === i ? "text-accent" : "text-ink/40"
              }`}
            >
              {item.index}
            </span>
            <span
              className={`font-hand text-lg transition-all duration-300 ${
                activeIndex === i
                  ? "text-ink"
                  : "text-ink/45 group-hover:text-ink/70"
              }`}
            >
              {item.label}
            </span>
            <span
              className={`h-px bg-accent transition-all duration-300 ${
                activeIndex === i ? "w-8" : "w-3 bg-ink/25 group-hover:w-5"
              }`}
            />
          </button>
        ))}
      </nav>
    </>
  )
}
