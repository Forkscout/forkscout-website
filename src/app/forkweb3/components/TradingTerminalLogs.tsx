/**
 * Purpose:
 * Renders a simulated trading log terminal for DEX bots.
 *
 * Responsibilities:
 * - Generate periodic trade logs (Arbitrage, swaps, spread scans).
 * - Keep logs within scrollable terminal view limits.
 * - Toggle log stream pause state.
 * - Accept callbacks from parent to instantly trigger trade logs when a new bot is launched.
 *
 * Notes:
 * Implemented using periodic intervals to mimic real-time MEV transactions.
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, Play, Pause, Trash2 } from "lucide-react";

interface LogLine {
  id: string;
  time: string;
  message: string;
  type: "info" | "success" | "warn" | "error";
}

const MOCK_MESSAGES = [
  { msg: "Scanned Raydium liquidity pool SOL-USDC... Spread 0.04%", type: "info" },
  { msg: "Cross-dex spread detected: Uniswap vs Curve. EURC price delta 0.0012 USDC", type: "info" },
  { msg: "MEV Bundle sent: Buy Raydium, Sell Orca. Capital allocation: 100 USDC", type: "info" },
  { msg: "SWAP SUCCESS: Arbitrage executed on-chain. Profit +1.44 USDC (Net: +1.12 USDC after gas tip)", type: "success" },
  { msg: "MEV Sandwich scan: Target swap transaction detected. Preparing frontrun pool transaction...", type: "warn" },
  { msg: "SWAP SUCCESS: Sandwich frontrun executed. Profit +2.88 USDC. Tx: 0x7fa...9902", type: "success" },
  { msg: "Checking Solana RPC node latency... 12ms. Blocks syncing normal.", type: "info" },
  { msg: "Gas priority update: Gas limit auto-scaled to 15 gwei. Sync state active.", type: "info" },
  { msg: "Grid Trading Bot: SOL price reached $142.12. Executed sell limit order ID #9088", type: "success" }
];

export default function TradingTerminalLogs() {
  const [logs, setLogs] = useState<LogLine[]>([
    { id: "init-1", time: "17:51:50", message: "Forkweb3 DEX bot engine initialized.", type: "success" },
    { id: "init-2", time: "17:51:52", message: "Listening for liquidity curve spreads across Solana and Ethereum...", type: "info" }
  ]);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto Scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  // Periodic log stream generator
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      const timeStr = new Date().toTimeString().split(" ")[0];
      const randomIdx = Math.floor(Math.random() * MOCK_MESSAGES.length);
      const chosen = MOCK_MESSAGES[randomIdx];

      const newLine: LogLine = {
        id: Date.now().toString(),
        time: timeStr,
        message: chosen.msg,
        type: chosen.type as any
      };

      setLogs((prev) => {
        // Cap logs at 50 to maintain performance
        if (prev.length > 50) {
          return [...prev.slice(1), newLine];
        }
        return [...prev, newLine];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [paused]);

  const clearLogs = () => {
    setLogs([{ id: "clear-1", time: new Date().toTimeString().split(" ")[0], message: "Terminal log buffer cleared.", type: "warn" }]);
  };

  return (
    <div className="border border-border bg-black text-xs font-mono text-neutral-400 p-5 flex flex-col gap-4 h-[395px] relative">
      
      {/* Terminal Title / Header */}
      <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2 text-accent">
          <Terminal size={14} />
          <span className="font-bold uppercase tracking-wider text-[10px]">
            DEX Engine Trading Log Stream
          </span>
        </div>

        {/* Buttons Controls */}
        <div className="flex gap-2">
          <button
            onClick={() => setPaused(!paused)}
            className="p-1 border border-neutral-800 hover:border-neutral-700 hover:text-white transition-colors cursor-pointer"
            title={paused ? "Resume Feed" : "Pause Feed"}
          >
            {paused ? <Play size={12} /> : <Pause size={12} />}
          </button>
          <button
            onClick={clearLogs}
            className="p-1 border border-neutral-800 hover:border-neutral-700 hover:text-white transition-colors cursor-pointer"
            title="Clear Terminal"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {/* Terminal Output */}
      <div
        ref={containerRef}
        className="flex-grow overflow-y-auto space-y-2 select-text pr-1"
      >
        {logs.map((log) => {
          const colorClass =
            log.type === "success"
              ? "text-green-400"
              : log.type === "warn"
              ? "text-yellow-400"
              : log.type === "error"
              ? "text-red-400"
              : "text-neutral-300";

          return (
            <div key={log.id} className="leading-relaxed flex gap-1.5 items-start">
              <span className="text-neutral-600 font-bold shrink-0">[{log.time}]</span>
              <span className={colorClass}>{log.message}</span>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}
