"use client"

import { useCallback, useSyncExternalStore } from "react"

const STORAGE_KEY = "theme"
const listeners = new Set<() => void>()

function notify() {
  for (const listener of listeners) listener()
}

function subscribe(callback: () => void) {
  listeners.add(callback)
  return () => listeners.delete(callback)
}

/** What the DOM says right now — the single source of truth. */
function getSnapshot(): boolean {
  if (typeof document === "undefined") return false
  return document.documentElement.classList.contains("dark")
}

/** Matches the value the anti-flash script + server both assume before
 *  hydration, so React doesn't warn about a mismatch. useSyncExternalStore
 *  re-renders with the real getSnapshot() value right after mount. */
function getServerSnapshot(): boolean {
  return false
}

/** Sets `.dark` / `.light` on <html>, persists the choice, and notifies
 *  every subscriber (the cord, the 3D scene, anything else listening). */
export function applyTheme(dark: boolean) {
  if (typeof document === "undefined") return
  const root = document.documentElement
  root.classList.toggle("dark", dark)
  root.classList.toggle("light", !dark)
  try {
    window.localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light")
  } catch {
    // storage can be unavailable (private mode, disabled) — theme just won't persist
  }
  notify()
}

/** Live "is dark mode on" flag. Re-renders whenever applyTheme runs. */
export function useIsDark(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function useToggleTheme() {
  return useCallback(() => applyTheme(!getSnapshot()), [])
}
