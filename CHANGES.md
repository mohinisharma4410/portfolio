# pullcord + dark mode — change set

This is a **partial drop-in**, not the full project. Copy these files into your
project at the same paths (overwrite the existing ones), then run your
install command again so `pullcord` gets pulled in:

```bash
pnpm install   # or npm install / yarn
```

## Files

- `package.json` — added the `pullcord` dependency.
- `lib/theme.ts` — **new.** Tiny shared theme store: toggles `.dark`/`.light`
  on `<html>`, persists the choice to `localStorage`, and exposes
  `useIsDark()` so any component (the cord, the 3D scene) can react to it.
- `components/overlay/theme-cord.tsx` — **new.** Wraps `pullcord`'s
  `<PullCord>` and wires `onPull` to the theme store.
- `app/page.tsx` — mounts `<ThemeCord />` alongside the other overlay
  components.
- `app/layout.tsx` — adds a tiny inline script that sets the theme class
  *before* first paint (so there's no flash of the wrong theme on load), and
  makes the mobile browser bar color follow the theme.
- `app/globals.css` — your `.dark` class already existed but wasn't doing
  much: 34+ places in the UI use the custom `--ink` / `--paper` /
  `--accent-warm` tokens directly, and those were never defined for dark
  mode. Added dark variants for all three (and for the
  `prefers-color-scheme` fallback, so it's consistent even before any JS
  runs). Also added a smooth color transition on `<body>`, and positioned
  the cord (see below).
- `components/experience/scene.tsx`, `corridor.tsx`,
  `framed-illustration.tsx` — the WebGL corridor's background, fog, walls,
  floor, and picture-frame colors were all hardcoded hex values, so pulling
  the cord wouldn't have changed anything in the 3D scene at all. These now
  take a `dark` flag and crossfade the canvas clear color / fog / wall
  tints when you pull. The illustrations themselves keep their original
  colors (like a painting under a dimmer light) — only slightly darkened,
  not recolored.

## Where the cord hangs

By default it's centered at the very top of the viewport (`--pullcord-right:
calc(50% - 32px)`), clear of both the logo (top-left) and the "Open to
roles" badge (top-right). If you want to move it, these live in
`app/globals.css`:

```css
--pullcord-top: 0px;
--pullcord-right: calc(50% - 32px);
--pullcord-z: 41;
--pullcord-ink: color-mix(in oklab, var(--ink) 55%, transparent);
```

## Verified

`pnpm install` + `tsc --noEmit` + `next build` all pass cleanly with these
changes (the only build error I saw was Google Fonts being unreachable from
my sandbox — unrelated to this change, and won't happen in your normal dev
environment).

I haven't been able to see it rendered in a real browser, so it's worth a
quick visual check — especially the WebGL corridor colors and the cord's
position against your "Open to roles" badge on different viewport widths.
