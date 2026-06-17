/**
 * Purpose:
 * Renders the interactive AI agent chat console.
 *
 * Responsibilities:
 * - Render selection buttons for AI Agent roles (Auditor, Optimizer, DevOps).
 * - Render scrollable conversation logs between user and AI.
 * - Simulate structured cognitive trace steps (Reasoning, Action, Observation).
 * - Allow user text submissions.
 *
 * Notes:
 * Implemented with reactive states and timed AI step replies.
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Cpu, User, Loader2, RefreshCw } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "agent";
  text: string;
  role?: string;
  steps?: string[]; // Cognitive trace steps
}

const ROLES = [
  { id: "auditor", label: "Contract Auditor", emoji: "🛡️", desc: "Audits smart contracts for security vulnerabilities." },
  { id: "optimizer", label: "Yield Optimizer", emoji: "📈", desc: "Optimizes DeFi positions and gas spending routes." },
  { id: "devops", label: "DevOps Deployer", emoji: "⚙️", desc: "Automates multi-signature wallet deployments." }
];

export default function AgentChat() {
  const [role, setRole] = useState("auditor");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-1",
      sender: "agent",
      role: "auditor",
      text: "System check complete. Cognitive AI layer active. Submit smart contract addresses or transaction parameters for autonomous execution protocols."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto Scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    const newMsg: Message = {
      id: `m-${Date.now()}`,
      sender: "user",
      text: userText
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setLoading(true);

    // Simulate Agent Cognitive trace execution
    setTimeout(() => {
      let responseText = "";
      let steps: string[] = [];

      if (role === "auditor") {
        steps = [
          "THOUGHT: Analyzing transaction parameters for potential vulnerability structures...",
          "ACTION: Scanning bytecode for reentrancy vectors and integer overflow bounds...",
          "OBSERVATION: No direct reentrancy risk detected. Verified safe-math compiler directives.",
          "THOUGHT: Scanning admin access keys and multi-sig setup configurations...",
          "ACTION: Resolving multisig thresholds... Match 3-of-5 signature structure."
        ];
        responseText = `Smart Contract Audit complete. Target codebase verified. \n- Vulnerability Index: LOW. \n- Reentrancy: Safely Guarded. \n- Key Management: Certified Multi-Sig (3-of-5 threshold).`;
      } else if (role === "optimizer") {
        steps = [
          "THOUGHT: Scanning decentralized exchange liquidity curves for yield optimization...",
          "ACTION: Matching gas price offsets against cumulative token yields...",
          "OBSERVATION: Gas fee optimization threshold reached. Recommended liquidity pool: Raydium SOL-USDC."
        ];
        responseText = `Yield Optimizer scan complete. Recommended configuration: \n- Target: SOL-USDC Pool. \n- Simulated APY: 18.24%. \n- Gas Fee Offset: Standard priority (MEV-guarded).`;
      } else {
        steps = [
          "THOUGHT: Initiating multi-sig wallet deploy instructions...",
          "ACTION: Bundling transaction parameters via secure RPC gateways...",
          "OBSERVATION: Signature payload broadcasted to consensus nodes. Status: SUCCESS."
        ];
        responseText = `DevOps multi-signature wallet deployed. \n- Address: 0x8a2f...cb1e. \n- Consensus State: Active. \n- Gas paid: 0.0012 SOL.`;
      }

      const agentMsg: Message = {
        id: `m-${Date.now() + 1}`,
        sender: "agent",
        role,
        text: responseText,
        steps
      };

      setMessages((prev) => [...prev, agentMsg]);
      setLoading(false);
    }, 2800);
  };

  const currentRole = ROLES.find((r) => r.id === role) || ROLES[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Role Selection (4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-4 border-b lg:border-b-0 lg:border-r border-border pb-6 lg:pb-0 lg:pr-6">
        <div className="flex items-center gap-2 border-b border-border-muted pb-3">
          <Cpu size={16} className="text-accent" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
            Cognitive Agent Select
          </h4>
        </div>

        <div className="flex flex-col gap-2">
          {ROLES.map((r) => (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className={`p-3 border text-xs font-mono text-left flex flex-col gap-1 transition-all cursor-pointer ${
                role === r.id ? "border-accent bg-accent/5 font-bold" : "border-border-muted hover:border-border"
              }`}
              disabled={loading}
            >
              <div className="flex items-center gap-1.5 text-foreground">
                <span className="text-sm">{r.emoji}</span>
                <span>{r.label}</span>
              </div>
              <p className="text-[9px] text-muted-foreground leading-normal font-normal">
                {r.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Display & Controls (8 cols) */}
      <div className="lg:col-span-8 flex flex-col gap-4 h-[420px]">
        {/* Chat Feed */}
        <div className="flex-grow border border-border bg-background p-4 overflow-y-auto space-y-4 flex flex-col">
          {messages.map((msg) => {
            const isAgent = msg.sender === "agent";
            return (
              <div
                key={msg.id}
                className={`max-w-[85%] flex flex-col gap-2 font-mono text-[10px] ${
                  isAgent ? "self-start items-start" : "self-end items-end"
                }`}
              >
                {/* Header sender info */}
                <span className="text-[8px] text-muted-foreground uppercase flex items-center gap-1">
                  {isAgent ? (
                    <>
                      <Cpu size={10} className="text-accent" />
                      <span>SYSTEM AGENT ({currentRole.label})</span>
                    </>
                  ) : (
                    <>
                      <User size={10} />
                      <span>OPERATOR</span>
                    </>
                  )}
                </span>

                {/* Cognitive Trace steps (Agent only) */}
                {isAgent && msg.steps && msg.steps.length > 0 && (
                  <div className="w-full bg-muted p-2.5 border border-border-muted space-y-1.5 text-[8px] text-muted-foreground">
                    {msg.steps.map((step, sIdx) => (
                      <div key={sIdx} className="leading-normal">
                        {step}
                      </div>
                    ))}
                  </div>
                )}

                {/* Message bubble */}
                <div
                  className={`p-3 border leading-relaxed whitespace-pre-line ${
                    isAgent
                      ? "border-border-muted bg-card text-foreground"
                      : "border-accent bg-accent/5 text-foreground font-semibold"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}

          {/* AI Loader */}
          {loading && (
            <div className="self-start flex flex-col gap-1 items-start max-w-[85%] font-mono text-[9px] text-muted-foreground">
              <span className="flex items-center gap-1.5 uppercase font-bold text-accent">
                <Loader2 size={12} className="animate-spin" />
                <span>AI Core Reasoning...</span>
              </span>
              <div className="p-3 border border-border-muted bg-card w-48 animate-pulse text-[8px]">
                Scanning execution vectors...
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Chat input form */}
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask the ${currentRole.label} to scan code or run tasks...`}
            className="flex-grow px-3 py-2.5 border border-border bg-card text-foreground font-mono text-xs focus:outline-none focus:border-accent"
            disabled={loading}
            required
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-6 py-2 border border-border bg-accent text-accent-foreground font-mono font-bold text-xs hover:bg-transparent hover:text-foreground transition-all duration-300 flex items-center justify-center cursor-pointer disabled:opacity-50"
          >
            <Send size={12} />
          </button>
        </form>
      </div>
    </div>
  );
}
