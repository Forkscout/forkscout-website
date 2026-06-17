/**
 * Purpose:
 * Renders the Forkscout main landing page / organization hub.
 *
 * Responsibilities:
 * - Render a premium theme-responsive layout.
 * - Display key metrics (A, B, C, D) in modern glassmorphic stats cards.
 * - Render an interactive Bento Grid product index with links.
 * - Build a comparative feature matrix ("Legacy Fintech" vs "Forkscout").
 * - Provide a futuristic, node-based roadmap timeline.
 * - Support responsive layouts and interactive FAQ accordions.
 *
 * Notes:
 * Implemented with TypeScript and Tailwind CSS v4 styling, fully supporting both light and dark modes.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Check, X, Shield, Cpu, Code, Layers, Sparkles, CreditCard, Landmark, Coins } from "lucide-react";

export default function HomePage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const stats = [
    { label: "INTEGRATED NETWORKS", value: "4+", desc: "Base, Arbitrum, Solana, BNB" },
    { label: "SETTLEMENT ASSETS", value: "USDC / USDT", desc: "Native multi-chain USD stablecoins" },
    { label: "SANDBOX SIMULATORS", value: "1,240+", desc: "Active sandbox test runs" },
    { label: "AI COGNITIVE TRACE", value: "3.4M+", desc: "Simulated neural agent tokens" }
  ];

  const products = [
    {
      num: "01",
      name: "Forkpay Neo-Bank",
      desc: "Custom stablecoin debit cards with instant settlement rails. Features real-time visual customizers and merchant simulators.",
      href: "/forkpay",
      tag: "Q3 2026",
      size: "col-span-12 md:col-span-7",
      accent: "from-cyan-500/5 to-indigo-500/5",
      icon: <CreditCard className="w-8 h-8 text-cyan-500" />
    },
    {
      num: "02",
      name: "Forksea NFT Market",
      desc: "High-throughput NFT trading with EIP-712 off-chain listing feeds, live bidding modules, and on-chain collection creators.",
      href: "/forksea",
      tag: "Q4 2026",
      size: "col-span-12 md:col-span-5",
      accent: "from-purple-500/5 to-pink-500/5",
      icon: <Coins className="w-8 h-8 text-purple-500" />
    },
    {
      num: "03",
      name: "Forkweb3 DEX Bots",
      desc: "Automated arbitrage and liquidity grid trading engine. Features real-time on-chain trade trackers and live simulator feeds.",
      href: "/forkweb3",
      tag: "Q1 2027",
      size: "col-span-12 md:col-span-5",
      accent: "from-orange-500/5 to-red-500/5",
      icon: <Cpu className="w-8 h-8 text-orange-500" />
    },
    {
      num: "04",
      name: "Forkagent AI Workspaces",
      desc: "Multi-agent cognitive loops with active debugger traces, custom agent roles, and background logs for autonomous auditing.",
      href: "/forkagent",
      tag: "Q2 2027",
      size: "col-span-12 md:col-span-7",
      accent: "from-emerald-500/5 to-teal-500/5",
      icon: <Sparkles className="w-8 h-8 text-emerald-500" />
    }
  ];

  const comparisons = [
    {
      metric: "Settlement Time",
      legacy: "T+2 to T+5 days (delayed clearing)",
      forkscout: "Sub-second block confirmation & instant cards",
      icon: <Landmark className="w-5 h-5" />
    },
    {
      metric: "Compliance Audit",
      legacy: "Months of manual KYC & AML setup",
      forkscout: "Automated sandbox pre-screens & pre-audit logs",
      icon: <Shield className="w-5 h-5" />
    },
    {
      metric: "API Complexity",
      legacy: "Fragmented legacy XML / ISO formats",
      forkscout: "Unified JSON RPC and Bun WebSocket feeds",
      icon: <Code className="w-5 h-5" />
    },
    {
      metric: "System Autonomy",
      legacy: "Manual human oversight required",
      forkscout: "Autonomous cognitive AI loops (Observe-Decide-Act)",
      icon: <Layers className="w-5 h-5" />
    }
  ];

  const faqs = [
    {
      q: "What is the Forkscout Organization?",
      a: "Forkscout is a developer suite building modular Web3 & AI infrastructure. We compile complex blockchain, debit card, and autonomous agent modules into clean APIs, enabling fintechs and crypto protocols to integrate advanced services."
    },
    {
      q: "How does Forkpay support stablecoin card payments?",
      a: "Forkpay provides components to issue debit cards. It translates stablecoins (like USDC or USDT) into merchant-accepted currencies at the point of sale, leveraging non-custodial smart contracts and BIN-sponsored EMI partners."
    },
    {
      q: "How do DEX trading bots operate in Forkweb3?",
      a: "Forkweb3 executes automated grid and arbitrage strategies across pools. It runs in a secure sandbox, providing real-time logging feeds and analytics for trade simulation."
    },
    {
      q: "What are autonomous cognitive loops in Forkagent?",
      a: "Cognitive loops represent structured agent cycles (Observe -> Orient -> Decide -> Act). Forkagent runs these loops to execute autonomous tasks, such as auditing smart contracts or analyzing market sentiment, in a browser-based developer console."
    }
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      
      {/* ─── Ambient Glow Mesh Background (Only visible/prominent in dark mode) ─── */}
      <div className="glow-blob glow-cyan top-[-10%] left-[-10%] w-[500px] h-[500px]" />
      <div className="glow-blob glow-orange bottom-[20%] right-[-10%] w-[600px] h-[600px]" />
      <div className="glow-blob glow-cyan top-[40%] left-[30%] w-[400px] h-[400px]" />

      {/* ─── Hero Grid Background with Bottom Fading ─── */}
      <div 
        className="absolute top-0 inset-x-0 h-[800px] pointer-events-none z-0 opacity-40 dark:opacity-20 [mask-image:linear-gradient(to_bottom,white_40%,transparent_100%)]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(128,128,128,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(128,128,128,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-20">
        
        {/* ─── HERO SECTION ─── */}
        <section className="relative pt-12 flex flex-col gap-8 md:gap-12">
          {/* Tagline Badge */}
          <div className="flex items-center gap-2 self-start px-3 py-1 bg-muted border border-border rounded-full text-xs font-mono text-accent">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>FORKSCOUT PROTOCOL • ACTIVE DEVELOPMENT RUN</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 flex flex-col gap-6">
              <h1 className="text-4xl sm:text-7xl font-display font-black tracking-tight leading-none text-gradient uppercase">
                THE WEB3 & AI <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-500">
                  INFRASTRUCTURE
                </span> <br />
                SUITE.
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl font-mono">
                Launch stablecoin card programs, decentralized NFT markets, algorithmic trading bots, and autonomous AI agents. Forkscout compiles complex blockchain and artificial intelligence modules into clean, high-performance developer components.
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                <Link
                  href="/forkpay"
                  className="px-6 py-3.5 bg-accent text-accent-foreground font-semibold rounded-xl text-sm hover:opacity-90 hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Enter Platform</span>
                  <ArrowUpRight size={16} />
                </Link>
                <a
                  href="#products-grid"
                  className="px-6 py-3.5 bg-muted border border-border text-foreground font-semibold rounded-xl text-sm hover:bg-muted/80 transition-all cursor-pointer"
                >
                  Explore Modules
                </a>
              </div>
            </div>

            {/* Graphic Badge */}
            <div className="lg:col-span-4 hidden lg:flex justify-center">
              <div className="w-[320px] aspect-square rounded-3xl border border-border bg-muted/40 backdrop-blur-md p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl" />
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-muted border border-border rounded-xl">
                    <Cpu className="w-6 h-6 text-accent" />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">BUILD ID: v92.0</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="h-1 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-[78%] rounded-full" />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                    <span>Consensus Engine</span>
                    <span>Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="glass-card p-6 flex flex-col gap-2">
                <span className="text-[10px] font-mono text-muted-foreground tracking-wider font-bold">
                  {stat.label}
                </span>
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-foreground">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  {stat.desc}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── PRODUCTS BENTO GRID SECTION ─── */}
        <section id="products-grid" className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono text-accent tracking-widest uppercase font-bold">
              01 • PLATFORM MODULES
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-foreground uppercase">
              Bento Infrastructure Index
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl font-mono">
              Four specialized sub-systems pre-configured for instant sandbox deployment. Click any card to preview.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {products.map((prod, idx) => (
              <Link
                key={idx}
                href={prod.href}
                className={`group glass-card glass-card-hover-accent p-8 flex flex-col justify-between min-h-[300px] bg-gradient-to-b ${prod.accent} ${prod.size} cursor-pointer`}
              >
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-muted border border-border rounded-2xl group-hover:border-accent/40 transition-colors">
                    {prod.icon}
                  </div>
                  <span className="px-3 py-1 bg-muted border border-border rounded-full text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                    {prod.tag}
                  </span>
                </div>

                <div className="flex flex-col gap-3 mt-12">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-accent font-bold">{prod.num}</span>
                    <h3 className="text-xl font-display font-bold text-foreground group-hover:text-accent transition-colors">
                      {prod.name}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-xs font-mono leading-relaxed">
                    {prod.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── ROADMAP TIMELINE SECTION ─── */}
        <section className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono text-accent tracking-widest uppercase font-bold">
              02 • TIMELINE
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-foreground uppercase">
              Core Integration Pipeline
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl font-mono">
              Visual roadmap mapping developer releases, sandbox testing, and platform mainnet milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {products.map((prod, idx) => (
              <div key={idx} className="glass-card p-6 flex flex-col justify-between min-h-[200px]">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-muted-foreground">PHASE 0{idx + 1}</span>
                  <span className="px-2 py-0.5 border border-accent/25 bg-accent/5 text-[9px] font-mono text-accent rounded-full">
                    {prod.tag}
                  </span>
                </div>
                <div className="flex flex-col gap-2 mt-8">
                  <h4 className="text-sm font-mono font-bold text-foreground uppercase">{prod.name}</h4>
                  <p className="text-[11px] text-muted-foreground font-mono">
                    Sandbox environment deployment, wallet setups, and mock API endpoints.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── COMPARISON SECTION ─── */}
        <section className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono text-accent tracking-widest uppercase font-bold">
              03 • PERFORMANCE COMPARISON
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-foreground uppercase">
              Fintech Legacy vs Forkscout
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl font-mono">
              Comparing standard banking and blockchain integration stacks against the Forkscout modular suite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comparisons.map((comp, idx) => (
              <div key={idx} className="glass-card p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted border border-border rounded-lg text-accent">
                    {comp.icon}
                  </div>
                  <h3 className="text-sm font-mono font-bold text-foreground uppercase">{comp.metric}</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-border pt-4">
                  <div className="flex flex-col gap-1 border-r border-border pr-2">
                    <span className="text-[10px] text-muted-foreground font-bold uppercase">Legacy System</span>
                    <span className="text-muted-foreground">{comp.legacy}</span>
                  </div>
                  <div className="flex flex-col gap-1 pl-2">
                    <span className="text-[10px] text-accent font-bold uppercase">Forkscout Suite</span>
                    <span className="text-foreground font-bold">{comp.forkscout}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FAQ SECTION ─── */}
        <section className="flex flex-col gap-8 max-w-4xl mx-auto w-full">
          <div className="flex flex-col gap-3 text-center items-center">
            <span className="text-[10px] font-mono text-accent tracking-widest uppercase font-bold">
              04 • KNOWLEDGE BASE
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-foreground uppercase">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            {faqs.map((faq, idx) => {
              const isOpen = faqOpen === idx;
              return (
                <div
                  key={idx}
                  className="glass-card hover:border-border transition-all"
                >
                  <button
                    onClick={() => setFaqOpen(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-mono font-bold text-xs uppercase text-foreground cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={16}
                      className={`text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180 text-accent" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-xs font-mono text-muted-foreground border-t border-border pt-4 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
