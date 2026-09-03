# Pull-cord reposition + lamp fixture — change set

2 files, no new dependencies. Copy them in, overwrite, no reinstall needed.

## What changed and why

- **Position**: moved from top-center to the **left edge**, ~104px below
  your logo. I checked both edges' actual geometry before picking this:
  the right edge only has ~240px of genuinely clear vertical space between
  the "Open to roles" badge and the section-nav dots (tight, and shrinks
  further on short viewports) — the left edge has nothing at all below the
  logo until the bottom progress bar, ~500px+ of clear space on typical
  viewports, and comfortably clear even in worst-case short-viewport math.
  It also gets it off the same vertical axis as your three center-aligned
  panels (Hero, Tech Stack, Contact), which was the actual source of the
  "too centered" feeling.
- **`--pullcord-left-offset`** in `app/globals.css` is the single shared
  anchor for both pieces — the lamp SVG reads it directly, and pullcord's
  own right-only positioning system derives its offset from it via
  `calc(100vw - var(--pullcord-left-offset) - 64px)`, since the package
  only exposes a `right` var, not `left`. It also shifts from `1.5rem` to
  `2.5rem` at the `md` breakpoint, mirroring your logo's own
  `left-6`/`md:left-10` responsive behavior, so they always stay aligned.
- **The lamp fixture** (`components/overlay/theme-cord.tsx`) is a small
  hand-inked pendant lamp SVG the rope now visibly hangs from, instead of
  dangling from empty space. The shade outline is drawn twice with a tiny
  offset (same trick your framed illustrations use for their wobbly double-
  line frames) for a sketched rather than vector-perfect look. It has a
  warm glow that fades in/out with the theme — lit in light mode, dark/
  unlit bulb in dark mode — so the fixture itself communicates the state,
  not just wherever the rope happens to rest.

## Honest caveat

I hand-wrote the lamp's SVG path by eye (bezier curves for a bell-shaped
shade) — I have no way to render or screenshot it in my sandbox, so this is
a first pass on the linework specifically. The positioning math I'm
confident in (verified against real element geometry), but the actual
silhouette/proportions of the lamp are worth a look and possibly a tweak
once you can see it.

## Verified

`tsc --noEmit` and `next build` both pass clean (same pre-existing Google
Fonts network limitation in my sandbox, unrelated to this change).
