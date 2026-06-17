/**
 * Purpose:
 * Renders the Forkscout brand logo as a dynamic, theme-responsive SVG.
 *
 * Responsibilities:
 * - Render the 3D isometric cube (block) using the theme foreground color.
 * - Render the outer hexagonal frame using the theme accent color.
 * - Ensure clean negative-space cuts that align perfectly at 90°, 210°, and 330° angles.
 * - Support custom sizing and classes.
 *
 * Notes:
 * This component replaces the static PNG logo, allowing seamless color transitions
 * when toggling between light and dark modes.
 */

import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export default function ForkscoutLogo({ className = "", size = 24 }: LogoProps) {
  // Dimension definitions
  // Inner cube radius
  const r = 25;
  
  // Outer hexagon center-line radius
  const hR = 40;
  
  // Cut dimensions
  const cutStrokeWidth = 4;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-all duration-300`}
    >
      {/* Outer Hexagon Ring (styled with the theme's accent color) */}
      <polygon
        points="50,10 84.64,30 84.64,70 50,90 15.36,70 15.36,30"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="10"
        strokeLinejoin="miter"
      />

      {/* Inner Cube - Top Face (styled with foreground) */}
      <polygon
        points="50,50 28.35,37.5 50,25 71.65,37.5"
        fill="currentColor"
      />

      {/* Inner Cube - Left Face (styled with foreground) */}
      <polygon
        points="50,50 28.35,37.5 28.35,62.5 50,75"
        fill="currentColor"
      />

      {/* Inner Cube - Right Face (styled with foreground) */}
      <polygon
        points="50,50 50,75 71.65,62.5 71.65,37.5"
        fill="currentColor"
      />

      {/* Negative Space Cuts (masking lines matching the background) */}
      {/* Down Cut (90°) */}
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="98"
        stroke="var(--background)"
        strokeWidth={cutStrokeWidth}
        strokeLinecap="square"
      />

      {/* Up-Left Cut (210°) */}
      <line
        x1="50"
        y1="50"
        x2="8.4"
        y2="26"
        stroke="var(--background)"
        strokeWidth={cutStrokeWidth}
        strokeLinecap="square"
      />

      {/* Up-Right Cut (330°) */}
      <line
        x1="50"
        y1="50"
        x2="91.6"
        y2="26"
        stroke="var(--background)"
        strokeWidth={cutStrokeWidth}
        strokeLinecap="square"
      />
    </svg>
  );
}
