/**
 * Purpose:
 * Renders an interactive, highly animated, and modern Consensus Engine Console.
 *
 * Responsibilities:
 * - Simulate live blockchain block validation cycles (progress bar, block heights).
 * - Render fluctuating network metrics (Transactions Per Second, Consensus Latency).
 * - Provide a live scrolling log terminal simulating node actions.
 * - Support interactive "Stress Test" mode to showcase high-performance loops.
 *
 * Notes:
 * Uses pure React hooks and CSS transitions/animations for smooth performance.
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Cpu, Terminal, Zap, ShieldCheck, Activity } from "lucide-react";

export default function ConsensusConsole() {
  const [blockHeight, setBlockHeight] = useState(849201);
  const [tps, setTps] = useState(1420);
  const [latency, setLatency] = useState(295);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([
    "Node initialized on mainnet-01",
    "Synching state trie with peers...",
    "Consensus engine ready."
  ]);
  const [isStressTest, setIsStressTest] = useState(false);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal log to bottom without scrolling window
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Handle progress bar loop and block confirmation
  useEffect(() => {
    const intervalTime = isStressTest ? 30 : 60; // Faster ticks during stress test
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Block confirmed! Increment height and log event
          setBlockHeight((h) => h + 1);
          
          const newTxCount = isStressTest
            ? Math.floor(Math.random() * 400) + 1200
            : Math.floor(Math.random() * 120) + 30;
            
          const newLatency = isStressTest
            ? Math.floor(Math.random() * 40) + 90
            : Math.floor(Math.random() * 60) + 260;

          setLatency(newLatency);

          const randomLogMsgs = isStressTest
            ? [
                `Block #${blockHeight + 1} confirmed: ${newTxCount} txs (Stress Mode)`,
                `Committed in ${newLatency}ms • Gas optimized`,
                `Tx pool purged • Validator consensus 99.4%`
              ]
            : [
                `Proposing block #${blockHeight + 1}...`,
                `Block #${blockHeight + 1} sealed • committed (${newLatency}ms)`,
                `Validator threshold reached (${newTxCount} txs)`
              ];

          const selectedLog = randomLogMsgs[Math.floor(Math.random() * randomLogMsgs.length)];
          setLogs((l) => [...l.slice(-15), selectedLog]); // keep last 15 logs
          return 0;
        }
        return prev + (isStressTest ? 8 : 2); // Tick increment size
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [blockHeight, isStressTest]);

  // Fluctuating TPS and general metrics
  useEffect(() => {
    const timer = setInterval(() => {
      if (isStressTest) {
        setTps(Math.floor(Math.random() * 800) + 4200);
      } else {
        setTps(Math.floor(Math.random() * 200) + 1350);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isStressTest]);

  const toggleStressTest = () => {
    setIsStressTest(!isStressTest);
    const modeName = !isStressTest ? "STRESS TEST" : "NORMAL";
    setLogs((l) => [
      ...l,
      `>> Switching to ${modeName} execution mode...`,
      !isStressTest ? ">> Caution: Simulating high-frequency TX pipeline..." : ">> Resuming default mainnet speed."
    ]);
  };

  return (
    <div className="w-full max-w-[340px] aspect-square rounded-3xl border border-border bg-card/60 backdrop-blur-md p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
      {/* Background ambient glow matching stress/normal mode */}
      <div 
        className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl transition-colors duration-500 pointer-events-none ${
          isStressTest ? "bg-red-500/10" : "bg-accent/15"
        }`} 
      />

      {/* Header Panel */}
      <div className="flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          {/* Pulsing indicator */}
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isStressTest ? "bg-red-400" : "bg-emerald-400"
            }`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              isStressTest ? "bg-red-500" : "bg-emerald-500"
            }`} />
          </span>
          <span className="text-[10px] font-mono font-bold tracking-wider text-muted-foreground uppercase">
            {isStressTest ? "mode: stress-test" : "node: fs-mainnet-01"}
          </span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">BUILD: v92.0</span>
      </div>

      {/* Simulated Live Grid Stats */}
      <div className="grid grid-cols-3 gap-2 py-3 border-y border-border/60 z-10">
        <div className="flex flex-col">
          <span className="text-[9px] font-mono text-muted-foreground">BLOCK</span>
          <span className="text-sm font-mono font-bold text-foreground tracking-tight transition-all">
            {blockHeight.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-mono text-muted-foreground font-bold">TPS</span>
          <span className={`text-sm font-mono font-bold tracking-tight transition-all duration-300 ${
            isStressTest ? "text-red-500" : "text-accent"
          }`}>
            {tps.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-mono text-muted-foreground">LATENCY</span>
          <span className="text-sm font-mono font-bold text-foreground tracking-tight">
            {latency}ms
          </span>
        </div>
      </div>

      {/* Mini Terminal / Live Log Screen */}
      <div className="flex-1 my-3 bg-black/60 rounded-xl p-3 border border-border/40 font-mono text-[9px] text-emerald-400/90 overflow-hidden flex flex-col justify-end z-10 relative">
        {/* Terminal Header */}
        <div className="absolute top-1.5 left-2 flex items-center gap-1.5 text-muted-foreground/50">
          <Terminal size={10} />
          <span>live-console-feed</span>
        </div>
        <div 
          ref={logContainerRef} 
          className="overflow-y-auto max-h-[70px] space-y-1 pr-1 scrollbar-none pt-4"
        >
          {logs.map((log, index) => {
            let textColor = "text-emerald-400/90";
            if (log.startsWith(">>")) textColor = "text-amber-400 font-bold";
            else if (log.includes("Stress")) textColor = "text-red-400";
            else if (log.includes("sealed") || log.includes("confirmed")) textColor = "text-cyan-400";

            return (
              <div key={index} className={`leading-normal ${textColor}`}>
                {log.startsWith(">>") ? "" : "$ "}
                {log}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress & Control Panel */}
      <div className="flex flex-col gap-3 z-10">
        {/* Progress Bar */}
        <div className="flex flex-col gap-1">
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-75 ${
                isStressTest ? "bg-red-500" : "bg-accent"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[8px] font-mono text-muted-foreground uppercase font-bold">
            <span>{isStressTest ? "consensus loop (high-tps)" : "Consensus Engine"}</span>
            <span>{progress === 0 ? "SEALED" : `${progress}%`}</span>
          </div>
        </div>

        {/* Stress Test Controller */}
        <button
          onClick={toggleStressTest}
          className={`w-full py-1.5 rounded-lg border font-mono text-[9px] uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            isStressTest 
              ? "bg-red-500/10 border-red-500/40 text-red-400 hover:bg-red-500/20" 
              : "bg-muted border-border text-foreground hover:bg-muted-foreground/10"
          }`}
        >
          {isStressTest ? <Zap size={10} className="animate-bounce" /> : <Activity size={10} />}
          <span>{isStressTest ? "Deactivate Stress Test" : "Run Speed Stress Test"}</span>
        </button>
      </div>
    </div>
  );
}
