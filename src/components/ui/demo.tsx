/**
 * Purpose:
 * Renders a dark dot matrix background layout demo.
 *
 * Responsibilities:
 * - Render a pixelated dark dot matrix background pattern.
 * - Provide a demo structure for ambient dark panels.
 *
 * Notes:
 * Reusable layout demo supporting custom container injection.
 */

"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const DemoComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen w-full relative">
      {/* Dark Dot Matrix */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundColor: '#0a0a0a',
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #222222 0.5px, transparent 1px),
            radial-gradient(circle at 75% 75%, #111111 0.5px, transparent 1px)
          `,
          backgroundSize: '10px 10px',
          imageRendering: 'pixelated',
        }}
      />
      {/* Content wrapper */}
      <div className="relative z-10 p-8">
        <h2 className="text-white text-xl font-mono">Dot Matrix Panel Demo</h2>
        <button 
          onClick={() => setCount(prev => prev + 1)}
          className="mt-4 px-4 py-2 bg-zinc-800 text-white rounded hover:bg-zinc-700 font-mono text-sm"
        >
          Count: {count}
        </button>
      </div>
    </div>
  );
};

export default DemoComponent;
