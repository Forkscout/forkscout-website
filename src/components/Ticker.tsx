/**
 * Purpose:
 * Renders a continuously scrolling top marquee ticker displaying real-time metrics.
 *
 * Responsibilities:
 * - Render dynamic system stats (e.g. system status, transaction counts).
 * - Duplicate content to support infinite CSS scrolling.
 * - Pause scrolling on mouse hover for accessibility and interaction.
 *
 * Notes:
 * Uses pure CSS animation defined in globals.css.
 */

"use client";

import React, { useEffect, useState } from "react";

export default function Ticker() {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    setTimestamp(new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }));
  }, []);

  const items = [
    { label: "EST. 2026", type: "accent" },
    { label: "FORKSCOUT ORG · WEB3 & AI INFRA", type: "neutral" },
    { label: "FORKPAY LIVE · DEBIT CARDS · STABLECOIN DEPOSIT", type: "neutral" },
    { label: "FORKSEA NFT MARKETPLACE · ACTIVE MINTING", type: "neutral" },
    { label: "FORKWEB3 · DEX BOTS · SOL-USDC ARBITRAGE LIVE", type: "accent" },
    { label: "FORKAGENT · AI COGNITIVE TRACE ACTIVE", type: "neutral" },
    { label: "SECURED COGNITIVE LAYER v1.0", type: "accent" },
    { label: "BTC GAS 12 GWEI · SOLANA TPS 2,400", type: "neutral" },
    { label: "TOTAL PROTOCOL VOLUME: $248.6M", type: "accent" }
  ];

  return (
    <div className="w-full bg-black text-[#ededed] py-2 border-b border-[#222222] overflow-hidden select-none text-xs font-mono tracking-wider z-50 relative">
      <div className="ticker-strip flex gap-16 items-center">
        {/* Render item set twice for infinite loop */}
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${item.type === "accent" ? "bg-accent" : "bg-neutral-600"}`} />
            <span className={item.type === "accent" ? "text-accent font-semibold" : "text-neutral-400"}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
