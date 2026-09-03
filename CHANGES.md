# Tech Stack section — change set

Copy these 3 files into your project at the same paths (overwrite the
existing ones), then reinstall so `react-icons` gets pulled in:

```bash
pnpm install   # or npm install / yarn
```

## What changed

- `package.json` — added `react-icons` (for the tech logos — see below).
- `lib/portfolio-data.ts` — added a new `TECH_STACK` export with the full
  Languages + Frameworks & Tools list straight from your resume. Nothing
  existing was touched (`SKILLS`, `PROJECTS`, etc. are unchanged) — the
  original `SKILLS` object was a trimmed preview used elsewhere, so I
  added a separate, complete list rather than editing it.
- `components/overlay/sections.tsx` — added a new "Tech Stack" panel
  between About and your first project (scroll anchor `0.3`), plus a
  `TechBadge` helper and a small `maxWidth` option on the existing `Panel`
  component (backward-compatible — every other panel is untouched and
  still defaults to the same width as before).

## How it fits the scroll

This site's content panels are just scroll-triggered fades — they're not
tied 1:1 to the 3D wall illustrations, so I didn't touch the WebGL corridor,
the camera path, or the scroll runway height at all. I placed the new panel
at the same kind of crossfade spacing already used between your existing
sections, so it appears, holds, and clears on its own before the first
project panel arrives — same pacing rhythm as the rest of the site.

## The badges

Not every tool has a real brand mark (Detectron2, Power BI, Azure) — those
render as plain text badges, same shape as the rest, so the grid still lines
up. Where a mark exists, it's a monochrome icon (from `react-icons`, MIT
licensed) tinted with your `--ink` color and rotated a couple degrees per
item, colorizing to your accent on hover — kept deliberately flat/mono
rather than full-color brand logos, since multicolor logos would clash with
the hand-drawn ink-on-paper look everywhere else on the site.

I didn't add a Nav shortcut for it (left `nav.tsx` untouched per "don't
change other content") — it's reachable by scrolling, same as everything
else. Say the word if you'd like a "Tech" entry added to the top nav too.

## Verified

`tsc --noEmit` and `next build` both pass cleanly with these changes (same
as last time, the only build error I saw was Google Fonts being unreachable
from my sandbox — unrelated, won't happen in your normal dev environment).
I haven't seen it rendered in a real browser, so it's worth a quick visual
pass, especially the badge grid wrapping on mobile widths.
