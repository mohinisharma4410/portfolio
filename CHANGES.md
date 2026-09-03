# Resume download + motion/accessibility fixes — change set

9 files (including the resume PDF itself), no new dependencies. Copy them
into your project at the same paths, overwrite the existing ones. No
reinstall needed.

## Resume download

- **`public/resume.pdf`** — the resume you uploaded earlier, copied in
  as-is. Rename this file (and the two references below) if you'd rather
  it not be called exactly that.
- **`components/overlay/sections.tsx`** — added a "Download Resume" button
  next to LinkedIn/GitHub in the Contact panel. Uses `download="Mohini-
  Sharma-Resume.pdf"` so it saves with a proper name regardless of the
  URL — recruiters downloading a file called `resume.pdf` from a stranger's
  domain is a small but real annoyance, this avoids it.

## Accessibility / motion fixes

- **`app/layout.tsx`** — `userScalable` flipped from `false` to `true`.
  Pinch-to-zoom was disabled sitewide before; now it isn't.
- **`app/page.tsx`** — the scroll runway is now `h-[720dvh]` instead of
  `h-[720vh]`. Plain `vh` is fixed to the browser chrome's *expanded*
  height, so on mobile Safari it visibly jitters as the address bar
  shows/hides mid-scroll; `dvh` tracks the actual visible viewport.
- **`lib/motion.ts`** (new) — a `usePrefersReducedMotion()` hook (React,
  live-updating) and a `prefersReducedMotion()` plain function (for
  one-time reads outside components), same `useSyncExternalStore` pattern
  your existing `lib/theme.ts` already uses.
- **`components/smooth-scroll.tsx`** — under reduced motion, skips
  initializing Lenis entirely (the eased eased/lagged scroll-smoothing
  library) and tracks native scroll instead. The camera/UI still respond
  to scroll position exactly as before, but nothing is smoothed or
  delayed beyond what you actually did.
- **`components/experience/rig.tsx`** — under reduced motion, the camera
  tracks scroll progress directly: no spring-smoothing lag, no automatic
  panning toward whichever wall illustration is nearest, no mouse-position
  parallax. It only moves because you scrolled, exactly as much as you did
  — this was probably the single biggest offender, since the auto-pan and
  parallax add continuous motion that isn't a direct result of anything
  you did.
- **`components/experience/corridor.tsx`** — the floating wireframe props
  (torus/box/cone etc.) stop their continuous rotation/drift under reduced
  motion and just hold still at their base position — still visible, not
  moving. Pure ambient motion with no user action behind it is exactly
  what reduced-motion is asking sites to drop.
- **`components/overlay/cursor.tsx`** — the trailing ring around your
  cursor snaps directly to the pointer under reduced motion instead of
  easing/lagging behind it (a small elastic-follow effect, but still a
  real motion pattern some people find uncomfortable).

Not touched: the pull-cord's own physics already respect
`prefers-reduced-motion` internally (it's built into the `pullcord`
package — the entrance-drop animation and drag-physics gesture both
already check for it), so nothing needed changing there.

## Verified

`tsc --noEmit` and `next build` both pass clean (same pre-existing Google
Fonts network restriction in my sandbox, unrelated to this change). As
always, I can't render this in an actual browser, so worth testing with
your OS's "reduce motion" setting turned on to confirm it feels right —
particularly whether the corridor still reads as navigable with the
auto-pan removed.
