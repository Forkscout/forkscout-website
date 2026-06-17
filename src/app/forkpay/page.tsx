/**
 * Purpose:
 * Renders the Forkpay Neo-Bank page route.
 *
 * Responsibilities:
 * - Load interactive state for Debit Card customizer.
 * - Integrate CardDesigner and StablecoinPaymentSimulator components.
 * - Render Swiss editorial page headers, specs lists, and navigation.
 *
 * Notes:
 * Uses client-side hooks to link Customizer choices directly to visual components.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, CreditCard, Layers, Landmark } from "lucide-react";
import CardDesigner from "./components/CardDesigner";
import StablecoinPaymentSimulator from "./components/StablecoinPaymentSimulator";
import BetaWaitlist from "@/components/BetaWaitlist";

export default function ForkpayPage() {
  const [cardName, setCardName] = useState("");
  const [cardStyle, setCardStyle] = useState("matte");
  const [network, setNetwork] = useState("visa");
  const [tier, setTier] = useState("STANDARD");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-12 transition-colors duration-300">
      
      {/* Editorial Header */}
      <section className="flex flex-col border-b border-border pb-8 mt-6">
        <div className="flex justify-between items-center text-xs font-mono text-muted-foreground border-b border-border pb-4 mb-6 uppercase tracking-wider">
          <Link href="/" className="hover:text-accent flex items-center gap-1.5 font-bold transition-colors">
            <ArrowLeft size={14} />
            <span>BACK TO DIRECTORY</span>
          </Link>
          <span>FINTECH RAIL v1.0</span>
          <span>PROGRAMME EST 2026</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3 text-4xl sm:text-5xl font-mono font-bold text-accent">
            P.01
          </div>
          <div className="lg:col-span-9 flex flex-col gap-4">
            <div className="flex flex-wrap gap-3 items-center">
              <h1 className="text-3xl sm:text-6xl font-display font-black uppercase tracking-tight">
                Forkpay <span className="text-accent">Neo-Bank</span>
              </h1>
              <span className="text-[10px] font-mono font-bold px-2 py-1 border border-accent text-accent bg-accent/5 uppercase tracking-wider">
                COMING SOON
              </span>
            </div>
            <p className="text-md sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              Modern white-label card issuing. Customize card profiles, select credit networks, fund debit accounts with stablecoins (USDC/USDT), and settle merchant transactions in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Beta Waitlist Banner */}
      <BetaWaitlist productName="Forkpay Stablecoin Cards" launchQuarter="Q3 2026" />

      {/* ─── SECTION 1: DEBIT CARD DESIGNER ─── */}
      <section className="flex flex-col border-b border-border pb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono border border-border px-2 py-0.5 uppercase">A</span>
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            Debit Card Customizer Mockup
          </h2>
        </div>
        
        <div className="border border-border p-6 bg-card">
          <CardDesigner
            cardName={cardName}
            setCardName={setCardName}
            cardStyle={cardStyle}
            setCardStyle={setCardStyle}
            network={network}
            setNetwork={setNetwork}
            tier={tier}
            setTier={setTier}
          />
        </div>
      </section>

      {/* ─── SECTION 2: STABLECOIN SIMULATOR ─── */}
      <section className="flex flex-col border-b border-border pb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono border border-border px-2 py-0.5 uppercase">B</span>
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            Stablecoin Settlement Dashboard
          </h2>
        </div>
        
        <div className="border border-border p-6 bg-card">
          <StablecoinPaymentSimulator />
        </div>
      </section>

      {/* ─── SECTION 3: TECHNICAL DETAILS ─── */}
      <section className="flex flex-col pb-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono border border-border px-2 py-0.5 uppercase">C</span>
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            Technical Specification Matrix
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="border border-border p-5 bg-card">
            <h4 className="font-bold border-b border-border-muted pb-2 uppercase text-accent mb-3 flex items-center gap-1.5">
              <CreditCard size={14} /> <span>Card Issuance SLA</span>
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex justify-between"><span>Virtual Provisioning</span> <span className="text-foreground font-bold">24 Hours</span></li>
              <li className="flex justify-between"><span>Physical Shipping</span> <span className="text-foreground font-bold">5-7 Days</span></li>
              <li className="flex justify-between"><span>Custody Layer</span> <span className="text-foreground font-bold">Non-Custodial</span></li>
            </ul>
          </div>

          <div className="border border-border p-5 bg-card">
            <h4 className="font-bold border-b border-border-muted pb-2 uppercase text-accent mb-3 flex items-center gap-1.5">
              <Landmark size={14} /> <span>vIBAN Rails</span>
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex justify-between"><span>SEPA Instant</span> <span className="text-foreground font-bold">Supported</span></li>
              <li className="flex justify-between"><span>SWIFT Clearing</span> <span className="text-foreground font-bold">21 Currencies</span></li>
              <li className="flex justify-between"><span>BIN Sponsorship</span> <span className="text-foreground font-bold">Visa/Mastercard</span></li>
            </ul>
          </div>

          <div className="border border-border p-5 bg-card">
            <h4 className="font-bold border-b border-border-muted pb-2 uppercase text-accent mb-3 flex items-center gap-1.5">
              <Layers size={14} /> <span>Compliance Standards</span>
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex justify-between"><span>PCI DSS v4.0</span> <span className="text-foreground font-bold">Certified</span></li>
              <li className="flex justify-between"><span>KYC/AML Liveness</span> <span className="text-foreground font-bold">Integrated</span></li>
              <li className="flex justify-between"><span>PSD2 Biometrics</span> <span className="text-foreground font-bold">SCA Native</span></li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
