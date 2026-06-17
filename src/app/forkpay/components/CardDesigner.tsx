/**
 * Purpose:
 * Renders an interactive debit card customizer mockup.
 *
 * Responsibilities:
 * - Render an animated 3D credit card display with hover-based tilt effects.
 * - Accept user input for Cardholder Name.
 * - Accept design presets (Glassmorphic, Gold, Matte Black, Neon Cyberpunk).
 * - Render network logos (Visa, Mastercard) and card tiers (Standard, Sovereign, Platinum).
 *
 * Notes:
 * Uses pure Tailwind styling and CSS transform states for 3D depth.
 */

"use client";

import React, { useState } from "react";
import { CreditCard, Shield, Sliders, Check } from "lucide-react";

interface CardDesignerProps {
  cardName: string;
  setCardName: (name: string) => void;
  cardStyle: string;
  setCardStyle: (style: string) => void;
  network: string;
  setNetwork: (net: string) => void;
  tier: string;
  setTier: (tier: string) => void;
}

export default function CardDesigner({
  cardName,
  setCardName,
  cardStyle,
  setCardStyle,
  network,
  setNetwork,
  tier,
  setTier
}: CardDesignerProps) {
  
  const styles = [
    { id: "matte", label: "Matte Charcoal", classes: "bg-gradient-to-br from-neutral-800 to-neutral-950 border border-neutral-700 text-white shadow-2xl" },
    { id: "gold", label: "Gold Sovereign", classes: "bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 border border-amber-300 text-amber-950 shadow-2xl shadow-amber-500/10" },
    { id: "glass", label: "Ice Translucent", classes: "glass border border-white/20 text-foreground shadow-2xl backdrop-blur-md" },
    { id: "cyber", label: "Neon Holographic", classes: "bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 border border-cyan-300 text-black shadow-2xl shadow-cyan-500/15 font-bold" }
  ];

  const currentStyle = styles.find((s) => s.id === cardStyle) || styles[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* 3D Card Preview (7 cols) */}
      <div className="lg:col-span-7 flex flex-col items-center justify-center p-4">
        {/* Card Tilt Container */}
        <div className="relative w-full max-w-[380px] h-[240px] perspective-1000 group">
          {/* Card Body */}
          <div
            className={`w-full h-full rounded-2xl p-6 flex flex-col justify-between transition-all duration-500 transform-style-3d group-hover:rotate-y-12 group-hover:rotate-x-6 select-none ${currentStyle.classes}`}
          >
            {/* Top row: Chip and Tier */}
            <div className="flex justify-between items-start">
              {/* Card Chip */}
              <div className="w-12 h-9 rounded-md bg-gradient-to-r from-yellow-300 to-yellow-500 border border-yellow-200 overflow-hidden relative shadow-inner">
                <div className="absolute inset-0 grid grid-cols-3 gap-0.5 opacity-30 p-1">
                  <div className="border border-black/40"></div>
                  <div className="border border-black/40"></div>
                  <div className="border border-black/40"></div>
                </div>
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase opacity-75">
                {tier}
              </span>
            </div>

            {/* Middle row: Card Number simulation */}
            <div className="my-4">
              <span className="text-lg sm:text-xl font-mono tracking-widest block font-medium">
                4802 8812 9012 3662
              </span>
            </div>

            {/* Bottom row: User Name & Network */}
            <div className="flex justify-between items-end border-t border-white/10 pt-4">
              <div className="flex flex-col">
                <span className="text-[8px] font-mono uppercase tracking-widest opacity-60">
                  Cardholder Name
                </span>
                <span className="text-sm font-mono tracking-wide uppercase truncate max-w-[180px]">
                  {cardName || "YOUR NAME HERE"}
                </span>
              </div>
              
              {/* Visa/Mastercard Logo */}
              <div className="flex flex-col items-end">
                {network === "visa" ? (
                  <span className="font-display italic font-extrabold text-lg tracking-tighter text-blue-500 dark:text-cyan-400">
                    VISA
                  </span>
                ) : (
                  <div className="flex items-center">
                    <span className="w-6 h-6 rounded-full bg-red-500 z-10 -mr-2 opacity-90" />
                    <span className="w-6 h-6 rounded-full bg-amber-500 opacity-90" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <p className="text-[10px] font-mono text-muted-foreground mt-4 uppercase tracking-wider">
          * Drag cursor / hover card to view perspective depth.
        </p>
      </div>

      {/* Editor Controls (5 cols) */}
      <div className="lg:col-span-5 flex flex-col gap-6 border-t lg:border-t-0 lg:border-l border-border pt-6 lg:pt-0 lg:pl-6">
        <div className="flex items-center gap-2 mb-2">
          <Sliders size={16} className="text-accent" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
            Card Customization Controls
          </h4>
        </div>

        {/* Input Cardholder Name */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono font-bold uppercase text-muted-foreground">
            Cardholder Name
          </label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value.slice(0, 24))}
            placeholder="Jane Doe"
            className="w-full px-4 py-2 border border-border bg-card text-foreground font-mono text-xs focus:outline-none focus:border-accent"
          />
        </div>

        {/* Select Card Style */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono font-bold uppercase text-muted-foreground">
            Card Finish Style
          </label>
          <div className="grid grid-cols-2 gap-2">
            {styles.map((style) => (
              <button
                key={style.id}
                onClick={() => setCardStyle(style.id)}
                className={`px-3 py-2 border text-xs font-mono text-left flex items-center justify-between transition-all cursor-pointer ${
                  cardStyle === style.id ? "border-accent bg-accent/5 font-bold" : "border-border-muted hover:border-border"
                }`}
              >
                <span>{style.label}</span>
                {cardStyle === style.id && <Check size={12} className="text-accent" />}
              </button>
            ))}
          </div>
        </div>

        {/* Select Network */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono font-bold uppercase text-muted-foreground">
            Card Network Rail
          </label>
          <div className="grid grid-cols-2 gap-2">
            {["visa", "mastercard"].map((net) => (
              <button
                key={net}
                onClick={() => setNetwork(net)}
                className={`px-3 py-2 border text-xs font-mono uppercase flex items-center justify-between transition-all cursor-pointer ${
                  network === net ? "border-accent bg-accent/5 font-bold" : "border-border-muted hover:border-border"
                }`}
              >
                <span>{net}</span>
                {network === net && <Check size={12} className="text-accent" />}
              </button>
            ))}
          </div>
        </div>

        {/* Select Card Tier */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono font-bold uppercase text-muted-foreground">
            Card Tier
          </label>
          <div className="grid grid-cols-3 gap-2">
            {["STANDARD", "PLATINUM", "SOVEREIGN"].map((tr) => (
              <button
                key={tr}
                onClick={() => setTier(tr)}
                className={`px-2 py-1.5 border text-[10px] font-mono flex items-center justify-center transition-all cursor-pointer ${
                  tier === tr ? "border-accent bg-accent/5 font-bold" : "border-border-muted hover:border-border"
                }`}
              >
                <span>{tr}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
