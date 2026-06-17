/**
 * Purpose:
 * Renders an interactive, live-connected Consensus Console displaying real blockchain data.
 *
 * Responsibilities:
 * - Fetch live blocks and transaction counts directly from the BASE Mainnet RPC node.
 * - Calculate real-time transaction throughput (TPS) and connection latency.
 * - Simulates consensus progress logs based on live Web3 blockchain consensus.
 * - Fall back to an autonomous local simulation loop if RPC is offline or during "Stress Test".
 *
 * Notes:
 * Implements standard eth_getBlockByNumber JSON-RPC polling to be 100% real.
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Cpu, Terminal, Zap, Activity } from "lucide-react";

export default function ConsensusConsole() {
  const [blockHeight, setBlockHeight] = useState(47459500);
  const [tps, setTps] = useState(15);
  const [latency, setLatency] = useState(120);
  const [progress, setProgress] = useState(0);
  const [isLive, setIsLive] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "Node initialized on mainnet-01",
    "Connecting to BASE Mainnet RPC...",
    "Consensus engine ready."
  ]);
  const [isStressTest, setIsStressTest] = useState(false);
  const [mounted, setMounted] = useState(false);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll terminal log to bottom without scrolling window
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // 1. Web3 Live Data Fetching Effect (BASE Mainnet RPC)
  useEffect(() => {
    let active = true;
    if (isStressTest) return;

    const fetchLatestBlock = async () => {
      const startTime = Date.now();
      try {
        const response = await fetch("https://mainnet.base.org", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "eth_getBlockByNumber",
            params: ["latest", false],
            id: 1,
          }),
        });

        if (!active) return;

        const data = await response.json();
        if (data && data.result) {
          const blockNum = parseInt(data.result.number, 16);
          const txsCount = data.result.transactions ? data.result.transactions.length : 0;
          const fetchLatency = Date.now() - startTime;

          setIsLive(true);
          setLatency(fetchLatency);
          
          // Base block time is roughly 2s, so TPS = txs in block / 2
          const calculatedTps = Math.round(txsCount / 2) || 1;
          setTps(calculatedTps);

          setBlockHeight((prev) => {
            if (prev !== blockNum) {
              // Flash progress to 100% and then reset
              setProgress(100);
              setTimeout(() => {
                if (active) setProgress(0);
              }, 150);

              setLogs((l) => [
                ...l.slice(-12),
                `Block #${blockNum} confirmed on BASE Mainnet`,
                `Sealed ${txsCount} txs • latency: ${fetchLatency}ms`
              ]);
            }
            return blockNum;
          });
        }
      } catch (err) {
        if (!active) return;
        setIsLive(false);
        // Offline / CORS issue -> fallback simulated update in log
        setLogs((l) => [
          ...l.slice(-12),
          `RPC connection issue. Resuming simulated local validator...`
        ]);
      }
    };

    fetchLatestBlock();
    const interval = setInterval(fetchLatestBlock, 2000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [isStressTest]);

  // 2. Local fallback loop & Stress Test simulator
  useEffect(() => {
    if (!isStressTest && isLive) {
      // Linear progress bar tick for live mode
      const progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) return 95; // Wait for RPC block confirmation to snap to 100
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(progressTimer);
    }

    // Stress test / Fallback simulator ticks
    const intervalTime = isStressTest ? 30 : 60;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setBlockHeight((h) => h + 1);
          
          const newTxCount = isStressTest
            ? Math.floor(Math.random() * 400) + 1200
            : Math.floor(Math.random() * 20) + 5;
            
          const newLatency = isStressTest
            ? Math.floor(Math.random() * 40) + 10
            : Math.floor(Math.random() * 80) + 150;

          setLatency(newLatency);
          if (isStressTest) {
            setTps(Math.floor(Math.random() * 800) + 4200);
          } else {
            setTps(Math.round(newTxCount / 2));
          }

          const randomLogMsgs = isStressTest
            ? [
                `Block #${blockHeight + 1} confirmed: ${newTxCount} txs (Stress Mode)`,
                `Committed in ${newLatency}ms • Gas optimized`,
                `Tx pool purged • consensus threshold 99.4%`
              ]
            : [
                `Simulated block #${blockHeight + 1} sealed (${newLatency}ms)`,
                `Consensus reached with local validators (${newTxCount} txs)`
              ];

          const selectedLog = randomLogMsgs[Math.floor(Math.random() * randomLogMsgs.length)];
          setLogs((l) => [...l.slice(-12), selectedLog]);
          return 0;
        }
        return prev + (isStressTest ? 8 : 2);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [blockHeight, isStressTest, isLive]);

  const toggleStressTest = () => {
    setIsStressTest(!isStressTest);
    const modeName = !isStressTest ? "HIGH-FREQUENCY SIMULATION" : "REAL-TIME BASE RPC";
    setLogs((l) => [
      ...l,
      `>> Mode change: ${modeName}...`,
      !isStressTest ? ">> Simulating heavy load pipeline..." : ">> Resubscribing to Base Mainnet RPC."
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
          {/* Pulsing status indicator */}
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isStressTest ? "bg-red-400" : isLive ? "bg-emerald-400" : "bg-amber-400"
            }`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              isStressTest ? "bg-red-500" : isLive ? "bg-emerald-500" : "bg-amber-500"
            }`} />
          </span>
          <span className="text-[10px] font-mono font-bold tracking-wider text-muted-foreground uppercase">
            {isStressTest ? "mode: stress-test" : isLive ? "network: base-mainnet" : "mode: fallback-sim"}
          </span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground uppercase">
          {isLive && !isStressTest ? "Live Web3" : "Simulated"}
        </span>
      </div>

      {/* Live Grid Stats */}
      <div className="grid grid-cols-3 gap-2 py-3 border-y border-border/60 z-10">
        <div className="flex flex-col">
          <span className="text-[9px] font-mono text-muted-foreground">BLOCK</span>
          <span className="text-sm font-mono font-bold text-foreground tracking-tight transition-all">
            {mounted ? blockHeight.toLocaleString("en-US") : "47,459,500"}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-mono text-muted-foreground font-bold">TPS</span>
          <span className={`text-sm font-mono font-bold tracking-tight transition-all duration-300 ${
            isStressTest ? "text-red-500" : "text-accent"
          }`}>
            {mounted ? tps.toLocaleString("en-US") : "15"}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-mono text-muted-foreground">LATENCY</span>
          <span className="text-sm font-mono font-bold text-foreground tracking-tight">
            {mounted ? `${latency}ms` : "120ms"}
          </span>
        </div>
      </div>

      {/* Mini Terminal / Live Log Screen */}
      <div className="flex-1 my-3 bg-black/60 rounded-xl p-3 border border-border/40 font-mono text-[9px] text-emerald-400/90 overflow-hidden flex flex-col justify-end z-10 relative">
        {/* Terminal Header */}
        <div className="absolute top-1.5 left-2 flex items-center gap-1.5 text-muted-foreground/50">
          <Terminal size={10} />
          <span>live-node-feed</span>
        </div>
        <div 
          ref={logContainerRef} 
          className="overflow-y-auto max-h-[70px] space-y-1 pr-1 scrollbar-none pt-4"
        >
          {logs.map((log, index) => {
            let textColor = "text-emerald-400/90";
            if (log.startsWith(">>")) textColor = "text-amber-400 font-bold";
            else if (log.includes("Stress")) textColor = "text-red-400";
            else if (log.includes("BASE Mainnet") || log.includes("confirmed")) textColor = "text-cyan-400";

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
              className={`h-full rounded-full transition-all duration-100 ${
                isStressTest ? "bg-red-500" : "bg-accent"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[8px] font-mono text-muted-foreground uppercase font-bold">
            <span>{isStressTest ? "stress loop (sim)" : isLive ? "rpc consensus sync" : "Consensus Engine"}</span>
            <span>{progress === 0 ? "SEALED" : `${Math.round(progress)}%`}</span>
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
