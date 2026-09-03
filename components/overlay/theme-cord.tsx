"use client"

import { PullCord } from "pullcord"
import "pullcord/pullcord.css"
import { applyTheme, useIsDark } from "@/lib/theme"

/** A real, yankable pull-cord (top center) that crossfades the whole site
 *  between light and dark — like switching off the studio light. */
export function ThemeCord() {
  const dark = useIsDark()

  return (
    <PullCord
      pulled={dark}
      onPull={() => applyTheme(!dark)}
      ariaLabel={dark ? "Switch to light mode" : "Switch to dark mode"}
    />
  )
}
