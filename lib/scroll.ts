"use client"

import { useSyncExternalStore } from "react"

/**
 * Central experience state. `progress` (0 → 1) is the single driver for
 * camera, illustrations, props and UI. The live value is read directly inside
 * R3F's useFrame via `scroll.progress` (no React re-render), while the DOM
 * overlay subscribes through useScrollProgress.
 */
type ScrollState = {
  progress: number
  velocity: number
}

export const scroll: ScrollState = {
  progress: 0,
  velocity: 0,
}

const listeners = new Set<() => void>()

// Quantized snapshot so the DOM overlay re-renders at a sane rate instead of
// on every sub-pixel scroll tick.
let snapshot = 0

export function setScroll(progress: number, velocity: number) {
  scroll.progress = progress
  scroll.velocity = velocity
  const q = Math.round(progress * 400) / 400
  if (q !== snapshot) {
    snapshot = q
    for (const l of listeners) l()
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

function getSnapshot() {
  return snapshot
}

function getServerSnapshot() {
  return 0
}

/** Subscribe the DOM overlay to the (quantized) scroll progress. */
export function useScrollProgress() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/** Smoothstep helper used everywhere for reversible reveals. */
export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

export function clamp01(x: number) {
  return Math.min(1, Math.max(0, x))
}
