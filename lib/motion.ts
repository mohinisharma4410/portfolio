"use client"

import { useSyncExternalStore } from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

function getSnapshot(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia(QUERY).matches
}

function getServerSnapshot(): boolean {
  return false
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {}
  const mql = window.matchMedia(QUERY)
  mql.addEventListener("change", callback)
  return () => mql.removeEventListener("change", callback)
}

/** True when the OS/browser has "reduce motion" turned on. Used to drop
 *  animation that isn't a direct result of something the user just did —
 *  camera auto-pan toward walls, pointer-parallax, ambient drifting props,
 *  eased/lagged scroll, cursor trail lag — while keeping the site fully
 *  usable: scroll still moves the camera, exactly as much as scrolled,
 *  with nothing extra layered on top. */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/** Non-hook read, for the one-time setup effect in smooth-scroll.tsx (which
 *  isn't re-rendering per frame, so a live subscription isn't needed there). */
export function prefersReducedMotion(): boolean {
  return getSnapshot()
}
