"use client"

import { SmoothScroll } from "@/components/smooth-scroll"
import { Scene } from "@/components/experience/scene"
import { Nav } from "@/components/overlay/nav"
import { Hud } from "@/components/overlay/hud"
import { Sections } from "@/components/overlay/sections"
import { GrainOverlay } from "@/components/overlay/grain-overlay"
import { Cursor } from "@/components/overlay/cursor"
import { LoadingScreen } from "@/components/overlay/loading-screen"
import { ThemeCord } from "@/components/overlay/theme-cord"

export default function Page() {
  return (
    <SmoothScroll>
      <LoadingScreen />

      {/* WebGL world (fixed, full-screen) */}
      <Scene />

      {/* HTML UI layer */}
      <Nav />
      <Sections />
      <Hud />
      <ThemeCord />
      <GrainOverlay />
      <Cursor />

      {/* scroll runway — drives the normalized progress that moves the camera */}
      <div className="h-[720vh] w-full" aria-hidden />

      {/* accessible, non-visual outline of the content for SEO / screen readers */}
      <div className="sr-only">
        <h1>Mohini Sharma — ML / AI Engineer</h1>
        <p>
          Computer vision, LLMs and agentic AI. Projects include Anuvaad, an AI
          multilingual media translation app, DiagramStudio, an AI technical
          documentation platform, and Dark Pattern Buster, an ML Chrome extension.
        </p>
      </div>
    </SmoothScroll>
  )
}
