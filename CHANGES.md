# Dark mode contrast fix — change set

6 files, no new dependencies. Copy them into your project at the same paths
(overwrite existing) — no reinstall needed this time.

## What I actually found

Before changing colors I computed real WCAG contrast ratios (oklch → linear
sRGB → relative luminance, not eyeballed) for the dark-mode values from
last time. The flat UI layer — body text, borders, the accent color — was
already fine, in some cases better than light mode's own ratios (e.g. ink
text-on-paper was 3.3–15:1 in dark vs. 2.5–13:1 in light at the same
opacity steps).

The real problem was the **3D scene**. I'd picked the corridor walls,
floor, ceiling, picture mats and frame lines all within a narrow lightness
band close to black (roughly L 0.13–0.19), and on top of that deliberately
dimmed the actual illustrations by 38% for a "lights off" effect. Two
issues compound there:

1. The human eye resolves far fewer distinct steps at the dark end of the
   lightness range than the light end — colors that look clearly separated
   as light tones (like the original cream wall/floor/ceiling tints)
   collapse into a much less distinguishable cluster once mirrored
   straight into the dark range.
2. The dimming multiplier was cutting into the one thing that actually
   needs to stay legible: the artwork itself.

## What changed

- **`app/globals.css`** — widened the dark `--paper`/`--ink` spread
  (deeper void, brighter ink) instead of a flat mirror of light mode; also
  bumped `--pullcord-ink` specifically for dark mode.
- **`components/experience/scene.tsx`** — canvas clear color / fog deepened
  to match the new `--paper` exactly (computed, not eyeballed, so there's
  no visible seam between the DOM background and the WebGL canvas).
- **`components/experience/corridor.tsx`** — floor/wall/ceiling tints and
  the sketch guide-lines now sit at a properly separated lightness (~L
  0.20–0.26) instead of nearly-black-on-black, verified against contrast
  ratios rather than picked by eye.
- **`components/experience/framed-illustration.tsx`** — the big one:
  dimming reduced from a 38% cut to a gentle 12% cut, and the picture
  mat/frame colors brightened so each framed piece reads clearly against
  the wall again (frame line vs. wall: ~15:1 now vs. barely visible before).
- **`components/overlay/sections.tsx`** — content cards (About, Tech
  Stack, Projects) and the tech badges/chips get a `dark:` variant with a
  more opaque background and a stronger border, so their edges stay
  defined against the WebGL scene behind them instead of blending into it.
  Light mode is untouched.
- **`components/overlay/grain-overlay.tsx`** — the multiply-blend grain
  texture is nearly invisible on a near-black background (multiply can
  only darken, and black stays black), so it switches to an overlay blend
  in dark mode to stay visible. The vignette's darkening is also softened
  in dark mode so it's not stacking more darkness for no benefit.

## Verified

`tsc --noEmit` passes clean, and I additionally compiled the CSS standalone
through the Tailwind CLI to confirm every new `dark:` utility (including
the arbitrary-value gradient classes) generates valid CSS with the correct
`:is(.dark *)` selector — not just that the build didn't error. `next
build` itself still only fails on the same Google Fonts network restriction
as before (my sandbox can't reach fonts.googleapis.com), unrelated to this
change.

I still can't see this rendered in an actual browser, so it's worth a
visual pass — this round was corrected with real math against my previous
guesses, but math isn't the same as eyes on it.
