"use client"

import { PullCord } from "pullcord"
import "pullcord/pullcord.css"
import { applyTheme, useIsDark } from "@/lib/theme"

/** A small hand-sketched pendant lamp that the pull-cord's rope hangs from.
 *  It's the fixture, not just an anchor point — the shade is drawn with a
 *  doubled, slightly offset outline (same trick as the framed illustrations'
 *  wobbly double-line frames) so it reads as sketched rather than vector-
 *  perfect, and it glows warm when the lights are on (light mode) and goes
 *  unlit when they're off (dark mode), so the fixture itself shows the
 *  state — not just wherever the cord happens to be resting. */
function LampFixture({ dark }: { dark: boolean }) {
  return (
    <svg
      viewBox="0 0 64 46"
      width={64}
      height={46}
      aria-hidden="true"
      className="pointer-events-none fixed"
      style={{
        left: "var(--pullcord-left-offset)",
        top: "calc(var(--pullcord-top) - 42px)",
        zIndex: "var(--pullcord-z, 41)",
        overflow: "visible",
      }}
    >
      <defs>
        <radialGradient id="lamp-glow" cx="50%" cy="38%" r="70%">
          <stop offset="0%" style={{ stopColor: "var(--accent-warm)" }} stopOpacity={dark ? 0 : 0.5} />
          <stop offset="100%" style={{ stopColor: "var(--accent-warm)" }} stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* warm glow — fades out in dark mode instead of snapping off */}
      <ellipse
        cx={32}
        cy={26}
        rx={30}
        ry={22}
        fill="url(#lamp-glow)"
        style={{ transition: "opacity 0.6s ease" }}
      />

      {/* ceiling/wall mount */}
      <path
        d="M 23 2 Q 32 -1.5 41 2"
        style={{ stroke: "var(--ink)" }}
        strokeWidth={1.6}
        strokeLinecap="round"
        fill="none"
        opacity={0.7}
      />

      {/* pendant shade — hand-inked bell, drawn twice with a small offset
          for a sketched (not vector-perfect) line */}
      <path
        d="M 32 3 C 24 3 15.5 15 13.5 27 C 13 30 14.5 31.5 17.5 31.5
           L 46.5 31.5 C 49.5 31.5 51 30 50.5 27 C 48.5 15 40 3 32 3 Z"
        style={{ fill: "var(--paper)", stroke: "var(--ink)" }}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <path
        d="M 32 3.6 C 24.6 3.8 16.3 15.6 14.3 27.3 C 14 29.6 15.2 30.9 17.6 30.9
           L 46.2 31.1 C 48.9 31 50.2 29.7 49.8 27.4 C 48 15.4 39.6 3.7 32 3.6 Z"
        style={{ stroke: "var(--ink)" }}
        strokeWidth={0.8}
        strokeLinejoin="round"
        fill="none"
        opacity={0.45}
      />

      {/* rim highlight */}
      <path d="M 16.5 29.5 L 47.5 29.5" style={{ stroke: "var(--ink)" }} strokeWidth={1} opacity={0.3} />

      {/* bulb peeking out beneath the shade */}
      <circle
        cx={32}
        cy={35}
        r={4.2}
        style={{
          fill: dark ? "var(--paper)" : "var(--accent-warm)",
          stroke: "var(--ink)",
          transition: "fill 0.6s ease",
        }}
        strokeWidth={1.2}
      />
    </svg>
  )
}

/** A real, yankable pull-cord — hanging from a small sketched pendant lamp
 *  on the left edge, below the logo — that crossfades the whole site
 *  between light and dark, like switching off the studio light. */
export function ThemeCord() {
  const dark = useIsDark()

  return (
    <>
      <LampFixture dark={dark} />
      <PullCord
        pulled={dark}
        onPull={() => applyTheme(!dark)}
        ariaLabel={dark ? "Switch to light mode" : "Switch to dark mode"}
      />
    </>
  )
}
