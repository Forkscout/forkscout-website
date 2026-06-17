/**
 * Purpose:
 * Renders the interface for configuring and launching trading bots.
 *
 * Responsibilities:
 * - Render strategy selection cards (Arbitrage, Grid, MEV Sandwich).
 * - Render selector inputs for token pairs and gas execution speeds.
 * - Accept simulated capital allocation.
 * - Fire callback with bot configs to initialize logs stream.
 *
 * Notes:
 * Uses Lucide icons and clean input fields with styling.
 */

"use client";

import React, { useState } from "react";
import { Bot, Zap, Play, Loader2, Info } from "lucide-react";

interface BotConfig {
  pair: string;
  strategy: string;
  allocation: number;
  gasSpeed: string;
}

export default function BotConfigurator({ onBotLaunch }: { onBotLaunch: (config: BotConfig) => void }) {
  const [pair, setPair] = useState("SOL-USDC");
  const [strategy, setStrategy] = useState("Arbitrage");
  const [allocation, setAllocation] = useState("100");
  const [gasSpeed, setGasSpeed] = useState("Flash Loan");
  const [loading, setLoading] = useState(false);

  const handleLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAlloc = parseFloat(allocation);
    if (isNaN(parsedAlloc) || parsedAlloc <= 0) return;

    setLoading(true);

    // Simulate block check & bot injection
    setTimeout(() => {
      onBotLaunch({
        pair,
        strategy,
        allocation: parsedAlloc,
        gasSpeed
      });
      setAllocation("100");
      setLoading(false);
    }, 1200);
  };

  return (
    <form onSubmit={handleLaunch} className="flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-border-muted pb-3">
        <Bot size={16} className="text-accent" />
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
          Algorithmic Bot Deployer
        </h4>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Trading pair */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono font-bold uppercase text-muted-foreground">
            Target Token Pair
          </label>
          <select
            value={pair}
            onChange={(e) => setPair(e.target.value)}
            className="w-full px-3 py-2 border border-border bg-background text-foreground font-mono text-xs focus:outline-none focus:border-accent"
            disabled={loading}
          >
            <option value="SOL-USDC">SOL-USDC (Raydium)</option>
            <option value="ETH-USDT">ETH-USDT (Uniswap)</option>
            <option value="BTC-USDC">BTC-USDC (Orca)</option>
            <option value="EURC-USDC">EURC-USDC (Curve)</option>
          </select>
        </div>

        {/* Gas Speed */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono font-bold uppercase text-muted-foreground">
            Gas Priority Protocol
          </label>
          <select
            value={gasSpeed}
            onChange={(e) => setGasSpeed(e.target.value)}
            className="w-full px-3 py-2 border border-border bg-background text-foreground font-mono text-xs focus:outline-none focus:border-accent"
            disabled={loading}
          >
            <option value="Standard">Standard (1x gas)</option>
            <option value="High Speed">Fast (1.5x gas)</option>
            <option value="Flash Loan">MEV Flash Bundle (0.01 SOL tip)</option>
          </select>
        </div>
      </div>

      {/* Select Strategy */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-mono font-bold uppercase text-muted-foreground">
          Execution Strategy
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "Arbitrage", label: "DEX Arbitrage", desc: "Squeeze cross-dex price spreads" },
            { id: "Grid Trading", label: "Market Maker", desc: "Grid liquidity buy/sell ranges" },
            { id: "MEV Sandwich", label: "MEV Frontrun", desc: "Frontruns target liquidity pool swaps" }
          ].map((strat) => (
            <button
              key={strat.id}
              type="button"
              onClick={() => setStrategy(strat.id)}
              className={`px-3 py-2 border text-[10px] font-mono text-left flex flex-col justify-between transition-all h-20 cursor-pointer ${
                strategy === strat.id ? "border-accent bg-accent/5 font-bold" : "border-border-muted hover:border-border"
              }`}
              disabled={loading}
            >
              <span className="font-bold">{strat.label}</span>
              <span className="text-[8px] text-muted-foreground leading-tight">{strat.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Allocation Capital */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-mono font-bold uppercase text-muted-foreground">
          Simulated Capital Allocation (USDC)
        </label>
        <div className="relative">
          <input
            type="number"
            min="10"
            max="1000000"
            value={allocation}
            onChange={(e) => setAllocation(e.target.value)}
            placeholder="100"
            className="w-full px-4 py-2 border border-border bg-background text-foreground font-mono text-xs focus:outline-none focus:border-accent"
            disabled={loading}
            required
          />
          <span className="absolute right-3 top-2 text-xs font-mono text-muted-foreground">
            USDC
          </span>
        </div>
        <p className="text-[9px] font-mono text-muted-foreground leading-normal flex items-start gap-1">
          <Info size={12} className="shrink-0 mt-0.5" />
          <span>Capital allocated here is simulated. Bots will execute mocks on on-chain liquidity curves.</span>
        </p>
      </div>

      {/* Launch Action */}
      <button
        type="submit"
        disabled={loading || !allocation}
        className="w-full py-3 border border-border bg-accent text-accent-foreground font-mono font-bold text-xs hover:bg-transparent hover:text-foreground transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 size={14} className="animate-spin" />
            <span>CHECKING ON-CHAIN LIQUIDITY POOL...</span>
          </>
        ) : (
          <>
            <Play size={14} />
            <span>DEPLOY ALGORITHMIC BOT ROUTE</span>
          </>
        )}
      </button>
    </form>
  );
}
