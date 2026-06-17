/**
 * Purpose:
 * Renders the background system execution logs for AI agents.
 *
 * Responsibilities:
 * - Render AI performance metrics (active nodes, cognitive load, sync speeds).
 * - Generate periodic background thread trace logs (Observe, Orient, Decide, Act).
 * - Allow pausing and clearing trace feeds.
 *
 * Notes:
 * Implemented using periodic intervals to mimic real-time background cognitive loops.
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, Activity, Cpu, Play, Pause, Trash2 } from "lucide-react";

interface LogLine {
  id: string;
  time: string;
  thread: string;
  step: string;
  status: string;
}

const MOCK_STEPS = [
  { thread: "THREAD-1", step: "Observation: Scanned ERC20 swap variables. Gas margin 0.12 USDC", status: "OK" },
  { thread: "THREAD-2", step: "Orientation: Formulated yield allocation matrix. Settle weight 1.25", status: "SYNC" },
  { thread: "THREAD-1", step: "Decision: Recommended Raydium solver route. Latency: 12ms", status: "OK" },
  { thread: "THREAD-3", step: "Action: Instantiated multisig signer handshake. Threshold met.", status: "SUCCESS" },
  { thread: "THREAD-2", step: "Observation: Detected target pool liquidity drop. Recalculating margins...", status: "WARN" },
  { thread: "THREAD-3", step: "Observation: Verified contract security bytecode (No integer overflow)", status: "OK" }
];

export default function SystemExecutionLogs() {
  const [logs, setLogs] = useState<LogLine[]>([
    { id: "s-1", time: "17:51:50", thread: "CORE", step: "Initializing cognitive thread manager...", status: "OK" },
    { id: "s-2", time: "17:51:52", thread: "CORE", step: "Listening for developer instruction prompts...", status: "OK" }
  ]);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto Scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  // Periodic log updates
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      const timeStr = new Date().toTimeString().split(" ")[0];
      const randomIdx = Math.floor(Math.random() * MOCK_STEPS.length);
      const chosen = MOCK_STEPS[randomIdx];

      const newLine: LogLine = {
        id: `sys-${Date.now()}`,
        time: timeStr,
        thread: chosen.thread,
        step: chosen.step,
        status: chosen.status
      };

      setLogs((prev) => {
        if (prev.length > 50) {
          return [...prev.slice(1), newLine];
        }
        return [...prev, newLine];
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [paused]);

  const clearLogs = () => {
    setLogs([{ id: "sys-clear", time: new Date().toTimeString().split(" ")[0], thread: "CORE", step: "Trace buffer reset.", status: "OK" }]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Trace Log Feed (8 cols) */}
      <div className="lg:col-span-8 border border-border bg-black text-[10px] font-mono text-neutral-400 p-5 flex flex-col gap-4 h-[350px]">
        <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2 text-accent">
            <Terminal size={14} />
            <span className="font-bold uppercase tracking-wider text-[9px]">
              Cognitive Loop Trace Logs
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setPaused(!paused)}
              className="p-1 border border-neutral-800 hover:border-neutral-700 hover:text-white transition-colors cursor-pointer"
            >
              {paused ? <Play size={10} /> : <Pause size={10} />}
            </button>
            <button
              onClick={clearLogs}
              className="p-1 border border-neutral-800 hover:border-neutral-700 hover:text-white transition-colors cursor-pointer"
            >
              <Trash2 size={10} />
            </button>
          </div>
        </div>

        <div ref={containerRef} className="flex-grow overflow-y-auto space-y-2 select-text pr-1">
          {logs.map((log) => (
            <div key={log.id} className="leading-relaxed flex gap-2 items-start">
              <span className="text-neutral-600">[{log.time}]</span>
              <span className="text-accent font-bold">[{log.thread}]</span>
              <span className="text-neutral-300 flex-grow">{log.step}</span>
              <span className={`font-bold uppercase text-[9px] ${
                log.status === "SUCCESS" || log.status === "OK" ? "text-green-500" : "text-yellow-500"
              }`}>
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics Board (4 cols) */}
      <div className="lg:col-span-4 border border-border p-5 bg-card flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-border-muted pb-3">
          <Activity size={16} className="text-accent" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
            System Cognitive Metrics
          </h4>
        </div>

        <div className="flex flex-col gap-3 font-mono text-[10px]">
          <div className="border border-border-muted p-3 bg-background flex flex-col gap-1">
            <span className="text-muted-foreground uppercase text-[8px]">Cognitive Velocity</span>
            <span className="text-foreground font-bold text-sm">3.4 loops/sec</span>
          </div>

          <div className="border border-border-muted p-3 bg-background flex flex-col gap-1">
            <span className="text-muted-foreground uppercase text-[8px]">Token Tokenizer Buffer</span>
            <span className="text-foreground font-bold text-sm">4,800 tokens/min</span>
          </div>

          <div className="border border-border-muted p-3 bg-background flex flex-col gap-1">
            <span className="text-muted-foreground uppercase text-[8px]">Active Threads</span>
            <span className="text-foreground font-bold text-sm">3 Parallel Nodes</span>
          </div>
        </div>
      </div>

    </div>
  );
}
