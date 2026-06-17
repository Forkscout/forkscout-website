/**
 * Purpose:
 * Renders the Forkagent AI agent portal.
 *
 * Responsibilities:
 * - Load interactive states for prompt design and agent role configurations.
 * - Integrate AgentChat and SystemExecutionLogs components.
 * - Render Swiss editorial page headers, specs details, and route navigation.
 *
 * Notes:
 * Implemented with high-contrast responsive layouts.
 */

"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Cpu, Shield, HelpCircle, HardDrive } from "lucide-react";
import AgentChat from "./components/AgentChat";
import SystemExecutionLogs from "./components/SystemExecutionLogs";
import BetaWaitlist from "@/components/BetaWaitlist";

export default function ForkagentPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-12 transition-colors duration-300">
      
      {/* Editorial Header */}
      <section className="flex flex-col border-b border-border pb-8 mt-6">
        <div className="flex justify-between items-center text-xs font-mono text-muted-foreground border-b border-border pb-4 mb-6 uppercase tracking-wider">
          <Link href="/" className="hover:text-accent flex items-center gap-1.5 font-bold transition-colors">
            <ArrowLeft size={14} />
            <span>BACK TO DIRECTORY</span>
          </Link>
          <span>COGNITIVE CORE v1.0</span>
          <span>AGENT EST 2026</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3 text-4xl sm:text-5xl font-mono font-bold text-accent">
            P.04
          </div>
          <div className="lg:col-span-9 flex flex-col gap-4">
            <div className="flex flex-wrap gap-3 items-center">
              <h1 className="text-3xl sm:text-6xl font-display font-black uppercase tracking-tight">
                Forkagent <span className="text-accent">AI Workspace</span>
              </h1>
              <span className="text-[10px] font-mono font-bold px-2 py-1 border border-accent text-accent bg-accent/5 uppercase tracking-wider">
                COMING SOON
              </span>
            </div>
            <p className="text-md sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              Autonomous cognitive agents executing operations. Customize agent parameters, design system prompts, trigger contract code audits, and monitor background trace logs in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Beta Waitlist Banner */}
      <BetaWaitlist productName="Forkagent Cognitive Layer" launchQuarter="Q2 2027" />

      {/* ─── SECTION 1: INTERACTIVE AGENT CHAT ─── */}
      <section className="flex flex-col border-b border-border pb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono border border-border px-2 py-0.5 uppercase">A</span>
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            Cognitive Agent Prompt Workspace
          </h2>
        </div>
        
        <div className="border border-border p-6 bg-card">
          <AgentChat />
        </div>
      </section>

      {/* ─── SECTION 2: SYSTEM LOGS ─── */}
      <section className="flex flex-col border-b border-border pb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono border border-border px-2 py-0.5 uppercase">B</span>
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            Background Trace Logging Terminal
          </h2>
        </div>
        
        <div className="border border-border p-6 bg-card">
          <SystemExecutionLogs />
        </div>
      </section>

      {/* ─── SECTION 3: SPECIFICATIONS ─── */}
      <section className="flex flex-col pb-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono border border-border px-2 py-0.5 uppercase">C</span>
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            AI Core Platform Specifications
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="border border-border p-5 bg-card">
            <h4 className="font-bold border-b border-border-muted pb-2 uppercase text-accent mb-3 flex items-center gap-1.5">
              <Cpu size={14} /> <span>Reasoning Models</span>
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex justify-between"><span>Core LLM Layer</span> <span className="text-foreground font-bold">DeepMind AGY-1</span></li>
              <li className="flex justify-between"><span>Code Auditor Node</span> <span className="text-foreground font-bold">Llama-3-Code</span></li>
              <li className="flex justify-between"><span>Cognitive Framework</span> <span className="text-foreground font-bold">AG SDK v1.5</span></li>
            </ul>
          </div>

          <div className="border border-border p-5 bg-card">
            <h4 className="font-bold border-b border-border-muted pb-2 uppercase text-accent mb-3 flex items-center gap-1.5">
              <HardDrive size={14} /> <span>Memory & Context</span>
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex justify-between"><span>Short-Term Window</span> <span className="text-foreground font-bold">128K Tokens</span></li>
              <li className="flex justify-between"><span>Long-Term Memory</span> <span className="text-foreground font-bold">Pinecone Vector</span></li>
              <li className="flex justify-between"><span>Loop State Save</span> <span className="text-foreground font-bold">Automatic Redis</span></li>
            </ul>
          </div>

          <div className="border border-border p-5 bg-card">
            <h4 className="font-bold border-b border-border-muted pb-2 uppercase text-accent mb-3 flex items-center gap-1.5">
              <Shield size={14} /> <span>Sandbox Security</span>
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex justify-between"><span>Execution Mode</span> <span className="text-foreground font-bold">gVisor Sandbox</span></li>
              <li className="flex justify-between"><span>Network Access</span> <span className="text-foreground font-bold">RPC Gateways Only</span></li>
              <li className="flex justify-between"><span>Rate Limiting</span> <span className="text-foreground font-bold">200 Requests/Min</span></li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
