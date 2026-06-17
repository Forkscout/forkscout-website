/**
 * Purpose:
 * Provides a dynamic, theme-responsive grid and ambient orb background.
 *
 * Responsibilities:
 * - Render a grid overlay using linear-gradient.
 * - Render a fading radial gradient (orb) that blends with the current theme.
 * - Fade out at the bottom using a mask or gradient overlay to ensure readability.
 *
 * Notes:
 * Integrates directly with light/dark mode and supports child content layout.
 */

"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GridBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function GridBackground({ children, className, ...props }: GridBackgroundProps) {
  return (
    <div className={cn("relative w-full overflow-hidden bg-background", className)} {...props}>
      {/* Grid Overlay with bottom fade mask */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-40 dark:opacity-30 [mask-image:linear-gradient(to_bottom,white_30%,transparent_90%)]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(128,128,128,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(128,128,128,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Ambient Radial Glowing Orbs for extra depth */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Light mode magenta/purple orb, Dark mode cyan glow */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] aspect-square rounded-full blur-[120px] opacity-[0.15] dark:opacity-[0.1] pointer-events-none"
          style={{
            background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)"
          }}
        />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}

export default GridBackground;
