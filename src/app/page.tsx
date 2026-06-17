/**
 * Purpose:
 * Renders the Forkscout main landing page / organization hub.
 *
 * Responsibilities:
 * - Render Swiss editorial layout matching codegotech aesthetics.
 * - Display key metrics (A, B, C, D) in a high-contrast stats bar.
 * - Render an interactive product index linked to individual pages.
 * - Build comparison table of standard Web3/AI setup versus Forkscout modules.
 * - Provide a visual timeline/roadmap chart.
 *
 * Notes:
 * Implemented with TypeScript and Tailwind CSS v4 styling.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Check, X, Shield, Cpu, Code, CpuIcon, Layers } from "lucide-react";

export default function HomePage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const stats = [
    { label: "(A) Stablecoin Card Volume", value: "$42.8M", desc: "Settled on-chain" },
    { label: "(B) NFT Marketplace Items", value: "112,000+", desc: "Minted via Forksea" },
    { label: "(C) Active Arbitrage Bots", value: "1,240", desc: "Simulated DEX run logs" },
    { label: "(D) AI Cognitive Loops", value: "3.4M", desc: "Agent tasks executed" }
  ];

  const products = [
    {
      num: "P.01",
      name: "Forkpay Neo-Bank",
      desc: "Supports customized debit cards with instant stablecoin settlements (USDC/USDT). Features full card customization and payment simulations. Coming Q3 2026.",
      href: "/forkpay",
      tag: "COMING SOON"
    },
    {
      num: "P.02",
      name: "Forksea NFT Market",
      desc: "High-throughput NFT trading with simulated live bidding systems and on-chain minting simulators for creators. Coming Q4 2026.",
      href: "/forksea",
      tag: "COMING SOON"
    },
    {
      num: "P.03",
      name: "Forkweb3 DEX Bots",
      desc: "Automated arbitrage and liquidity grid trading bots. Live performance trackers and simulated trade console logs. Coming Q1 2027.",
      href: "/forkweb3",
      tag: "COMING SOON"
    },
    {
      num: "P.04",
      name: "Forkagent AI Work",
      desc: "Cognitive autonomous AI agent interface. Real-time prompt designer, visual agent workspace, and background tracing logs. Coming Q2 2027.",
      href: "/forkagent",
      tag: "COMING SOON"
    }
  ];

  const compareList = [
    { metric: "Launch Timeframe", build: "12—18 months", buy: "Live instantly (simulated)" },
    { metric: "API Integration Complexity", build: "Multi-vendor complexity", buy: "Unified JSON structure" },
    { metric: "Debit Card Provisioning", build: "EMI partner negotiations", buy: "Ready out-of-the-box (Forkpay)" },
    { metric: "Bot Arbitrage Settle Speed", build: "Custom Node RPC build", buy: "Integrated DEX router (Forkweb3)" },
    { metric: "AI Agent Security Auditing", build: "Manual contract code audit", buy: "Autonomous pre-audit loop (Forkagent)" },
    { metric: "Regulatory Compliance", build: "KYC/AML vendor contracts", buy: "Pre-screened API compliance" }
  ];

  const faqs = [
    {
      q: "What is the Forkscout Organization?",
      a: "Forkscout is an open-source development organization building modular Web3 & AI infrastructure. We enable fintech and crypto protocols to integrate debit cards, NFT tools, trading bots, and agentic workflows through a single developer portal."
    },
    {
      q: "How does Forkpay support stablecoin card payments?",
      a: "Forkpay provides white-label card issuing components. It translates stablecoins (like USDC or USDT) into merchant-accepted fiat currencies at the point of sale, using simulated BIN sponsorship rails."
    },
    {
      q: "How do DEX bots operate in the Forkweb3 module?",
      a: "Forkweb3 features automated trading interfaces that monitor on-chain events. It runs arbitrage, sandwich, and grid strategies across simulated liquidity pools with live execution log overlays."
    },
    {
      q: "What are AI cognitive loops in Forkagent?",
      a: "Cognitive loops represent structured agent cycles (Observe -> Orient -> Decide -> Act). Forkagent runs these loops to execute complex tasks, such as auditing smart contracts or analyzing market sentiment, in an autonomous workspace."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-16 transition-colors duration-300">
      
      {/* ─── HERO SECTION ─── */}
      <section className="flex flex-col border-b border-border pb-12 mt-6">
        <div className="flex flex-col sm:flex-row justify-between text-xs font-mono text-muted-foreground border-b border-border pb-4 mb-8 gap-2 uppercase tracking-wider">
          <span>Forkscout Portal · Tech Stack est. 2026</span>
          <span>Vol. I · Release 06/2026</span>
          <span className="text-accent font-bold">● Network Active</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3 text-4xl sm:text-6xl font-mono font-bold tracking-tighter text-accent border-b lg:border-b-0 lg:border-r border-border pb-4 lg:pb-0 lg:pr-8">
            01
          </div>
          <div className="lg:col-span-9 flex flex-col gap-6">
            <h1 className="text-4xl sm:text-7xl font-display font-black tracking-tight leading-none uppercase">
              Web3 & AI <br />
              <span className="text-accent">Infrastructure.</span> <br />
              Modular and Unified.
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Launch stablecoin card programs, decentralized NFT markets, algorithmic trading bots, and autonomous AI agents. Forkscout compiles complex blockchain and artificial intelligence modules into clean, high-performance interfaces designed for modern organizations.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link href="/forkpay" className="px-6 py-3 border border-border bg-accent text-accent-foreground font-mono font-bold text-sm hover:bg-transparent hover:text-foreground transition-all duration-300 flex items-center gap-1.5 cursor-pointer">
                <span>ENTER PLATFORM</span>
                <ArrowUpRight size={16} />
              </Link>
              <a href="#products-index" className="px-6 py-3 border border-border text-foreground font-mono font-bold text-sm hover:bg-muted transition-all duration-300 cursor-pointer">
                READ PRODUCT INDEX
              </a>
            </div>
          </div>
        </div>

        {/* Stats Grid Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-border mt-12 pt-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-1 border-r border-border last:border-0 pr-2">
              <span className="text-[10px] font-mono text-muted-foreground uppercase">{stat.label}</span>
              <span className="text-2xl sm:text-4xl font-mono font-bold tracking-tight text-foreground">
                {stat.value}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">{stat.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ROADMAP GANTT SECTION ─── */}
      <section className="flex flex-col border-b border-border pb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono border border-border px-2 py-0.5 uppercase">02</span>
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            Development Timeline & Roadmap
          </h2>
        </div>
        <h3 className="text-2xl sm:text-4xl font-display font-black uppercase mb-8 leading-tight">
          Current phase: Core Beta integrations <br />
          launching across <span className="text-accent">four modules.</span>
        </h3>
        
        <div className="border border-border p-4 sm:p-6 font-mono text-xs overflow-x-auto">
          {/* Gantt Header */}
          <div className="grid grid-cols-12 gap-2 border-b border-border pb-3 text-muted-foreground mb-4 min-w-[600px] uppercase font-bold">
            <span className="col-span-2">Module</span>
            <span className="col-span-4">Milestone Target</span>
            <span className="col-span-4">Q2 - Q4 Progress Bar</span>
            <span className="col-span-2 text-right">Completion</span>
          </div>
          
          {/* Gantt Rows */}
          <div className="space-y-4 min-w-[600px]">
            <div className="grid grid-cols-12 gap-2 items-center">
              <span className="col-span-2 font-bold">P.01 Forkpay</span>
              <span className="col-span-4 text-muted-foreground">Card personalization & wallets</span>
              <div className="col-span-4 bg-muted h-3 relative border border-border-muted">
                <span className="absolute left-0 top-0 bottom-0 bg-accent w-[85%]" />
              </div>
              <span className="col-span-2 text-right font-bold text-accent">85%</span>
            </div>
            
            <div className="grid grid-cols-12 gap-2 items-center">
              <span className="col-span-2 font-bold">P.02 Forksea</span>
              <span className="col-span-4 text-muted-foreground">NFT Minting & live bidding simulation</span>
              <div className="col-span-4 bg-muted h-3 relative border border-border-muted">
                <span className="absolute left-0 top-0 bottom-0 bg-accent w-[70%]" />
              </div>
              <span className="col-span-2 text-right font-bold text-accent">70%</span>
            </div>

            <div className="grid grid-cols-12 gap-2 items-center">
              <span className="col-span-2 font-bold">P.03 Forkweb3</span>
              <span className="col-span-4 text-muted-foreground">DEX Router logs & bot launching</span>
              <div className="col-span-4 bg-muted h-3 relative border border-border-muted">
                <span className="absolute left-0 top-0 bottom-0 bg-accent w-[90%]" />
              </div>
              <span className="col-span-2 text-right font-bold text-accent">90%</span>
            </div>

            <div className="grid grid-cols-12 gap-2 items-center">
              <span className="col-span-2 font-bold">P.04 Forkagent</span>
              <span className="col-span-4 text-muted-foreground">Cognitive loops & agent workspaces</span>
              <div className="col-span-4 bg-muted h-3 relative border border-border-muted">
                <span className="absolute left-0 top-0 bottom-0 bg-accent w-[60%]" />
              </div>
              <span className="col-span-2 text-right font-bold text-accent">60%</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRODUCT DIRECTORY INDEX ─── */}
      <section id="products-index" className="flex flex-col border-b border-border pb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono border border-border px-2 py-0.5 uppercase">03</span>
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            Product Directory Index
          </h2>
        </div>
        <h3 className="text-2xl sm:text-4xl font-display font-black uppercase mb-8">
          Modular platforms. Integrated by <span className="text-accent">Forkscout.</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <Link
              key={product.num}
              href={product.href}
              className="group border border-border p-6 hover:border-accent transition-all duration-300 flex flex-col justify-between h-64 bg-card relative cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono text-accent font-bold uppercase tracking-widest block mb-1">
                    {product.num} · {product.tag}
                  </span>
                  <h4 className="text-xl font-display font-bold uppercase group-hover:text-accent transition-colors">
                    {product.name}
                  </h4>
                </div>
                <span className="w-8 h-8 rounded-none border border-border-muted group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 flex items-center justify-center font-mono text-sm">
                  →
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed font-mono">
                {product.desc}
              </p>
              <div className="border-t border-border-muted pt-3 flex justify-between items-center text-[10px] font-mono text-muted-foreground">
                <span>DEVELOPMENT STATE</span>
                <span className="text-accent font-bold flex items-center gap-1">
                  COMING SOON
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── COMPARISON TABLE SECTION ─── */}
      <section className="flex flex-col border-b border-border pb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono border border-border px-2 py-0.5 uppercase">04</span>
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            Economics & setup Analysis
          </h2>
        </div>
        <h3 className="text-2xl sm:text-4xl font-display font-black uppercase mb-8">
          Forkscout integration <span className="text-accent">versus building.</span>
        </h3>
        
        <div className="border border-border overflow-hidden">
          <table className="w-full border-collapse text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-border bg-muted uppercase text-muted-foreground font-bold">
                <th className="p-4 sm:p-5 border-r border-border">Core Dimension</th>
                <th className="p-4 sm:p-5 border-r border-border">Build from Scratch</th>
                <th className="p-4 sm:p-5 text-accent font-extrabold">Forkscout Platform</th>
              </tr>
            </thead>
            <tbody>
              {compareList.map((item, idx) => (
                <tr key={idx} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="p-4 sm:p-5 font-bold border-r border-border">{item.metric}</td>
                  <td className="p-4 sm:p-5 text-red-500 border-r border-border flex items-center gap-1.5">
                    <X size={14} /> <span>{item.build}</span>
                  </td>
                  <td className="p-4 sm:p-5 text-accent font-semibold bg-accent/5">
                    <div className="flex items-center gap-1.5">
                      <Check size={14} /> <span>{item.buy}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── FAQ ACCORDIONS ─── */}
      <section className="flex flex-col max-w-3xl mx-auto w-full pb-8">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-xs font-mono border border-border px-2 py-0.5 uppercase">05</span>
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            FAQ Section
          </h2>
        </div>
        <h3 className="text-2xl sm:text-3xl font-display font-black uppercase mb-8 text-center">
          Frequently Asked <span className="text-accent">Questions</span>
        </h3>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = faqOpen === idx;
            return (
              <div key={idx} className="border border-border bg-card transition-colors">
                <button
                  onClick={() => setFaqOpen(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 flex justify-between items-center text-left font-mono font-bold text-xs sm:text-sm hover:text-accent transition-colors"
                >
                  <span>Q.{idx + 1} {faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-accent" : "text-muted-foreground"}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-muted-foreground border-t border-border-muted leading-relaxed font-mono">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
      
    </div>
  );
}
