"use client"

/** Paper grain + soft vignette layered over the whole experience.
 *  `mix-blend-multiply` only darkens, so on the dark theme's near-black
 *  background it has almost no visible effect — swapped to `overlay` in
 *  dark mode so the grain texture stays visible instead of just vanishing.
 *  The vignette's warm-brown darkening is also softened in dark mode so it
 *  doesn't stack more darkness on an already-dark scene for no benefit. */
export function GrainOverlay() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.06] mix-blend-multiply dark:opacity-[0.05] dark:mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-40 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_55%,rgba(60,52,40,0.18)_100%)] dark:bg-[radial-gradient(120%_90%_at_50%_40%,transparent_60%,rgba(0,0,0,0.28)_100%)]"
      />
    </>
  )
}
