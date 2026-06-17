/**
 * Purpose:
 * Renders the Forkweb3 DEX bots dashboard.
 *
 * Responsibilities:
 * - Load interactive states for bot launching and active bots tracking.
 * - Integrate BotConfigurator and TradingTerminalLogs components.
 * - Render Swiss editorial page headers, metrics bars, and navigation.
 *
 * Notes:
 * Uses client-side lists to support real-time bot instantiation.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Play, Pause, Trash2, Shield, TrendingUp, Clock } from "lucide-react";
import BotConfigurator from "./components/BotConfigurator";
import TradingTerminalLogs from "./components/TradingTerminalLogs";
import BetaWaitlist from "@/components/BetaWaitlist";

interface BotConfig {
  pair: string;
  strategy: string;
  allocation: number;
  gasSpeed: string;
}

interface ActiveBot extends BotConfig {
  id: string;
  roi: number;
  runtime: string;
  state: "RUNNING" | "PAUSED";
}

export default function Forkweb3Page() {
  const [activeBots, setActiveBots] = useState<ActiveBot[]>([
    {
      id: "bot-1",
      pair: "SOL-USDC",
      strategy: "Arbitrage",
      allocation: 2500,
      gasSpeed: "Flash Loan",
      roi: 3.44,
      runtime: "14h 22m",
      state: "RUNNING"
    },
    {
      id: "bot-2",
      pair: "ETH-USDT",
      strategy: "Grid Trading",
      allocation: 5000,
      gasSpeed: "High Speed",
      roi: 1.12,
      runtime: "02h 05m",
      state: "RUNNING"
    }
  ]);

  const handleBotLaunch = (config: BotConfig) => {
    const newBot: ActiveBot = {
      id: `bot-${Date.now()}`,
      ...config,
      roi: 0.00,
      runtime: "Just now",
      state: "RUNNING"
    };

    setActiveBots((prev) => [newBot, ...prev]);
  };

  const toggleBotState = (id: string) => {
    setActiveBots((prev) =>
      prev.map((bot) =>
        bot.id === id ? { ...bot, state: bot.state === "RUNNING" ? "PAUSED" : "RUNNING" } : bot
      )
    );
  };

  const removeBot = (id: string) => {
    setActiveBots((prev) => prev.filter((bot) => bot.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-12 transition-colors duration-300">
      
      {/* Editorial Header */}
      <section className="flex flex-col border-b border-border pb-8 mt-6">
        <div className="flex justify-between items-center text-xs font-mono text-muted-foreground border-b border-border pb-4 mb-6 uppercase tracking-wider">
          <Link href="/" className="hover:text-accent flex items-center gap-1.5 font-bold transition-colors">
            <ArrowLeft size={14} />
            <span>BACK TO DIRECTORY</span>
          </Link>
          <span>LIQUIDITY ROUTER v2.0</span>
          <span>SYSTEM EST 2026</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3 text-4xl sm:text-5xl font-mono font-bold text-accent">
            P.03
          </div>
          <div className="lg:col-span-9 flex flex-col gap-4">
            <div className="flex flex-wrap gap-3 items-center">
              <h1 className="text-3xl sm:text-6xl font-display font-black uppercase tracking-tight">
                Forkweb3 <span className="text-accent">DEX Bots</span>
              </h1>
              <span className="text-[10px] font-mono font-bold px-2 py-1 border border-accent text-accent bg-accent/5 uppercase tracking-wider">
                COMING SOON
              </span>
            </div>
            <p className="text-md sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              Automated smart-contract trading execution. Spin up arbitrage bots across Raydium and Uniswap liquidity pools, allocate capital assets, and track transaction ledgers via live streams.
            </p>
          </div>
        </div>
      </section>

      {/* Beta Waitlist Banner */}
      <BetaWaitlist productName="Forkweb3 Algorithmic Bots" launchQuarter="Q1 2027" />

      {/* ─── SECTION 1: BOT CONFIGURATOR & LOGS ─── */}
      <section className="flex flex-col border-b border-border pb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono border border-border px-2 py-0.5 uppercase">A</span>
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            DEX Arbitrage Control Terminal
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Config Panel (7 cols) */}
          <div className="lg:col-span-7 border border-border p-6 bg-card">
            <BotConfigurator onBotLaunch={handleBotLaunch} />
          </div>

          {/* Terminal Panel (5 cols) */}
          <div className="lg:col-span-5">
            <TradingTerminalLogs />
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: ACTIVE BOTS GRID ─── */}
      <section className="flex flex-col pb-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono border border-border px-2 py-0.5 uppercase">B</span>
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            Active Algorithmic Runtimes Queue
          </h2>
        </div>
        
        <div className="border border-border p-5 bg-card">
          {activeBots.length === 0 ? (
            <div className="text-center py-12 text-xs font-mono text-muted-foreground uppercase">
              No active algorithmic runtimes deployed.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeBots.map((bot) => (
                <div key={bot.id} className="border border-border p-5 bg-background flex flex-col justify-between gap-4 font-mono text-[10px] relative">
                  {/* Status Indicator */}
                  <span className={`absolute top-4 right-4 text-[8px] font-bold border px-1.5 py-0.5 ${
                    bot.state === "RUNNING" ? "border-green-500 text-green-500 bg-green-500/5 animate-pulse" : "border-yellow-500 text-yellow-500 bg-yellow-500/5"
                  }`}>
                    {bot.state}
                  </span>

                  <div>
                    <span className="text-accent font-bold uppercase tracking-widest block mb-1">
                      {bot.strategy}
                    </span>
                    <h4 className="text-sm font-bold text-foreground uppercase">
                      {bot.pair}
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-2 border-t border-border-muted pt-3">
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-[8px]">ALLOCATION</span>
                      <span className="text-foreground font-bold text-xs">{bot.allocation.toLocaleString()} USDC</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-[8px] flex items-center gap-0.5">
                        <TrendingUp size={8} /> CUMULATIVE ROI
                      </span>
                      <span className="text-green-500 font-bold text-xs">+{bot.roi.toFixed(2)}%</span>
                    </div>
                    <div className="flex flex-col col-span-2 mt-1">
                      <span className="text-muted-foreground text-[8px] flex items-center gap-0.5">
                        <Clock size={8} /> RUNTIME
                      </span>
                      <span className="text-foreground">{bot.runtime}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 border-t border-border-muted pt-3 mt-1 justify-end">
                    <button
                      onClick={() => toggleBotState(bot.id)}
                      className="p-1.5 border border-border-muted hover:border-border text-foreground transition-colors cursor-pointer"
                      title={bot.state === "RUNNING" ? "Pause Runtime" : "Resume Runtime"}
                    >
                      {bot.state === "RUNNING" ? <Pause size={12} /> : <Play size={12} />}
                    </button>
                    <button
                      onClick={() => removeBot(bot.id)}
                      className="p-1.5 border border-border-muted hover:border-red-500 hover:text-red-500 text-foreground transition-colors cursor-pointer"
                      title="Destroy Runtime"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
