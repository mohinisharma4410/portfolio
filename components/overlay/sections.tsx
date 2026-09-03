"use client"

import type { ComponentType, ReactNode } from "react"
import { useScrollProgress, clamp01, smoothstep } from "@/lib/scroll"
import {
  PERSON,
  HIGHLIGHTS,
  EXPERIENCE,
  PROJECTS,
  SKILLS,
  ACHIEVEMENTS,
  TECH_STACK,
} from "@/lib/portfolio-data"
import {
  SiPython,
  SiCplusplus,
  SiDart,
  SiJavascript,
  SiPytorch,
  SiYolo,
  SiLangchain,
  SiLanggraph,
  SiOpencv,
  SiFlask,
  SiFastapi,
  SiReact,
  SiFlutter,
  SiStreamlit,
  SiMlflow,
  SiDocker,
  SiFirebase,
} from "react-icons/si"
import { DiAws } from "react-icons/di"

/** Not every tool in the resume has a recognizable brand mark (Detectron2,
 *  Power BI, Azure) — those just render as a text badge, same as the rest. */
const TECH_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  Python: SiPython,
  "C++": SiCplusplus,
  Dart: SiDart,
  JavaScript: SiJavascript,
  PyTorch: SiPytorch,
  YOLOv8: SiYolo,
  LangChain: SiLangchain,
  LangGraph: SiLanggraph,
  OpenCV: SiOpencv,
  Flask: SiFlask,
  FastAPI: SiFastapi,
  React: SiReact,
  Flutter: SiFlutter,
  Streamlit: SiStreamlit,
  MLflow: SiMlflow,
  Docker: SiDocker,
  "AWS SageMaker": DiAws,
  Firebase: SiFirebase,
}

type Align = "center" | "left" | "right"

function useReveal(anchor: number, opts?: { edgeIn?: number; edgeOut?: number }) {
  const progress = useScrollProgress()
  const edgeIn = opts?.edgeIn ?? 0.1
  const edgeOut = opts?.edgeOut ?? 0.1
  const fadeIn = smoothstep(anchor - edgeIn, anchor - edgeIn * 0.25, progress)
  const fadeOut = 1 - smoothstep(anchor + edgeOut * 0.25, anchor + edgeOut, progress)
  const opacity = clamp01(Math.min(fadeIn, fadeOut))
  const dy = (progress - anchor) * 140
  return { opacity, dy, active: opacity > 0.5 }
}

function Panel({
  anchor,
  align,
  children,
  edgeIn,
  edgeOut,
  maxWidth = "max-w-xl",
}: {
  anchor: number
  align: Align
  children: ReactNode
  edgeIn?: number
  edgeOut?: number
  /** Tailwind max-width class for the inner wrapper — wider panels (like a
   *  badge grid) need more room than the narrow text blurbs. */
  maxWidth?: string
}) {
  const { opacity, dy, active } = useReveal(anchor, { edgeIn, edgeOut })
  if (opacity <= 0.001) return null

  const justify =
    align === "center"
      ? "justify-center"
      : align === "left"
        ? "md:justify-start justify-center"
        : "md:justify-end justify-center"

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-20 flex items-center px-6 md:px-20 ${justify}`}
      style={{ opacity }}
      aria-hidden={!active}
    >
      <div
        className={`${active ? "pointer-events-auto" : ""} w-full ${maxWidth}`}
        style={{ transform: `translateY(${dy * 0.12}px)` }}
      >
        {children}
      </div>
    </div>
  )
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
      <span className="h-px w-6 bg-accent" />
      {children}
    </span>
  )
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-ink/25 px-3 py-1 text-xs font-medium text-ink/70">
      {children}
    </span>
  )
}

/** A single tech badge — icon (when we have one) + label, with a faint
 *  hand-placed tilt so the grid doesn't look machine-stamped. Colorizes to
 *  the accent on hover, like ink catching warm light. */
function TechBadge({ name, seed }: { name: string; seed: number }) {
  const Icon = TECH_ICONS[name]
  // deterministic tiny rotation per item, not random-per-render
  const tilt = ((seed * 37) % 7) - 3

  return (
    <span
      className="group inline-flex items-center gap-2 rounded-2xl border border-ink/15 bg-paper/60 px-3 py-2 text-xs font-medium text-ink/75 transition-colors duration-200 hover:border-accent/50 hover:text-accent"
      style={{ transform: `rotate(${tilt * 0.4}deg)` }}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0 text-ink/60 transition-colors duration-200 group-hover:text-accent" />}
      {name}
    </span>
  )
}

export function Sections() {
  return (
    <>
      {/* HERO */}
      <Panel anchor={0} align="center" edgeIn={0.04} edgeOut={0.07}>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>
            <span className="mx-auto">{PERSON.role}</span>
          </Eyebrow>
          <h1 className="text-balance font-hand text-5xl leading-[0.95] text-ink md:text-7xl">
            I build things that see, read &amp; reason.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-pretty text-sm leading-relaxed text-ink/65 md:text-base">
            {PERSON.tagline} — based in {PERSON.location}. Step through the studio to
            see what I&apos;ve been drawing up.
          </p>
        </div>
      </Panel>

      {/* ABOUT */}
      <Panel anchor={0.2} align="right">
        <div className="rounded-3xl border border-ink/10 bg-paper/70 p-6 backdrop-blur-sm md:p-8">
          <Eyebrow>About</Eyebrow>
          <h2 className="font-hand text-4xl text-ink md:text-5xl">A quick sketch of me</h2>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-ink/70">
            {PERSON.summary}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {HIGHLIGHTS.map((h) => (
              <div key={h.label}>
                <div className="font-hand text-3xl text-accent">{h.value}</div>
                <div className="text-[11px] leading-snug text-ink/55">{h.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            {EXPERIENCE.map((e) => (
              <div key={e.company} className="border-l-2 border-accent/50 pl-3">
                <div className="text-sm font-semibold text-ink">{e.role}</div>
                <div className="text-xs text-ink/55">
                  {e.company} · {e.period}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {SKILLS["AI Domains"].slice(0, 6).map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </div>
      </Panel>

      {/* TECH STACK */}
      <Panel anchor={0.3} align="center" maxWidth="max-w-3xl">
        <div className="rounded-3xl border border-ink/10 bg-paper/70 p-6 backdrop-blur-sm md:p-8">
          <Eyebrow>
            <span className="mx-auto">Tech Stack</span>
          </Eyebrow>
          <h2 className="text-center font-hand text-4xl text-ink md:text-5xl">
            What&apos;s on the workbench
          </h2>

          <div className="mt-6">
            <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-ink/45">
              Languages
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-2.5">
              {TECH_STACK.Languages.map((t, i) => (
                <TechBadge key={t} name={t} seed={i} />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-ink/45">
              Frameworks &amp; Tools
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-2.5">
              {TECH_STACK["Frameworks & Tools"].map((t, i) => (
                <TechBadge key={t} name={t} seed={i} />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-ink/45">
              AI Domains
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {SKILLS["AI Domains"].map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </div>
        </div>
      </Panel>

      {/* PROJECTS */}
      {PROJECTS.map((p, i) => {
        const anchor = [0.42, 0.6, 0.78][i]
        // place text opposite the illustration's wall side
        const align: Align = p.side === "left" ? "right" : "left"
        return (
          <Panel key={p.id} anchor={anchor} align={align}>
            <div className="rounded-3xl border border-ink/10 bg-paper/70 p-6 backdrop-blur-sm md:p-8">
              <Eyebrow>{p.kind}</Eyebrow>
              <h2 className="font-hand text-4xl text-ink md:text-5xl">{p.title}</h2>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-ink/70">
                {p.blurb}
              </p>
              <ul className="mt-4 space-y-2">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-xs leading-relaxed text-ink/65">
                    <span className="mt-1 text-accent">→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 font-hand text-lg text-ink underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
                >
                  {p.hrefLabel} <span aria-hidden>↗</span>
                </a>
              )}
            </div>
          </Panel>
        )
      })}

      {/* CONTACT */}
      <Panel anchor={0.985} align="center" edgeIn={0.12} edgeOut={0.2}>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>
            <span className="mx-auto">Contact</span>
          </Eyebrow>
          <h2 className="text-balance font-hand text-5xl leading-[0.95] text-ink md:text-6xl">
            Let&apos;s build something worth drawing.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ink/65">
            I&apos;m {PERSON.name}, an {PERSON.role.toLowerCase()} in {PERSON.location}.
            Reach out and let&apos;s talk computer vision, LLMs or agentic systems.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${PERSON.email}`}
              className="rounded-full bg-ink px-6 py-3 font-hand text-lg text-paper transition-transform hover:-translate-y-0.5"
            >
              {PERSON.email}
            </a>
            <a
              href={PERSON.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-ink/30 px-6 py-3 font-hand text-lg text-ink transition-colors hover:border-accent hover:text-accent"
            >
              LinkedIn
            </a>
            <a
              href={PERSON.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-ink/30 px-6 py-3 font-hand text-lg text-ink transition-colors hover:border-accent hover:text-accent"
            >
              GitHub
            </a>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-ink/50">
            {ACHIEVEMENTS.map((a) => (
              <span key={a} className="max-w-[220px]">
                {a}
              </span>
            ))}
          </div>
        </div>
      </Panel>
    </>
  )
}
