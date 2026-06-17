/**
 * Purpose:
 * Renders the official Terms of Service page for the Forkscout organization.
 *
 * Responsibilities:
 * - Inform users about terms of use for non-custodial decentralized applications and beta access.
 * - Match the premium Swiss magazine design layout with HSL theme support.
 *
 * Notes:
 * Uses JetBrains Mono for policy section headings and Inter for body text.
 */

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Forkscout",
  description: "Read the Terms of Service for Forkscout, including guidelines on non-custodial tools, stablecoin simulated payments, and AI agent workspaces."
};

export default function TermsOfService() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans">
      {/* Back to Home Navigation */}
      <div className="mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-accent transition-colors border border-border-muted px-3 py-1.5 hover:border-accent"
        >
          <ArrowLeft size={12} />
          <span>RETURN TO BOARD INDEX</span>
        </Link>
      </div>

      {/* Page Title & Meta */}
      <header className="border-b-2 border-border pb-8 mb-12">
        <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-2">
          COMPLIANCE / DOCUMENT 001-B
        </span>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tighter text-foreground mb-4">
          TERMS OF SERVICE
        </h1>
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs font-mono text-muted-foreground uppercase mt-6 pt-4 border-t border-border-muted">
          <span>LAST UPDATED: JUNE 17, 2026</span>
          <span>REVISION: V1.0</span>
          <span>ISSUED BY: FORKSCOUT GROUP LTD.</span>
        </div>
      </header>

      {/* Terms Sections */}
      <div className="space-y-12 text-sm leading-relaxed text-foreground/90">
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-8 border-b border-border-muted">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-accent md:col-span-1">
            01. AGREEMENT
          </h2>
          <div className="md:col-span-3 space-y-4">
            <p>
              By accessing the Forkscout portal (`forkscout.com`), registering for our private beta waitlists, or using our services (Forkpay, Forksea, Forkweb3, Forkagent), you agree to comply with and be bound by these Terms of Service. If you do not agree, please cease use of the portal immediately.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-8 border-b border-border-muted">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-accent md:col-span-1">
            02. PRODUCT USE LIMITS
          </h2>
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-display font-bold text-base text-foreground">
              A. Private Beta & Coming Soon Phase
            </h3>
            <p>
              Forkscout products are currently in "Coming Soon" status. Waitlist registration grants potential priority access to future private beta builds. We do not guarantee access, timelines, or features for any future versions of Forkpay, Forksea, Forkweb3, or Forkagent.
            </p>
            <h3 className="font-display font-bold text-base text-foreground mt-4">
              B. Non-Custodial Stablecoin Payments
            </h3>
            <p>
              Forkpay operates as an interface provider. Forkscout does not hold, manage, or store user deposits or stablecoins. All payment configurations are processed via public smart contracts and BIN-sponsored EMI partners. Users assume all transaction and smart contract security risks.
            </p>
            <h3 className="font-display font-bold text-base text-foreground mt-4">
              C. Algorithmic DEX Bots (Forkweb3)
            </h3>
            <p>
              Forkweb3 tools are provided purely for developer testing and educational purposes. Forkscout does not operate as a financial advisor or asset manager. Users are solely responsible for transaction gas fees, automated trading execution parameters, and market volatilities.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-8 border-b border-border-muted">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-accent md:col-span-1">
            03. NO WARRANTIES
          </h2>
          <div className="md:col-span-3 space-y-4">
            <p>
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. FORKSCOUT DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT COGNITIVE AI TRACES OR TRANSACTION SIMULATORS ARE FREE OF ERROR OR SERVICE DOWNTIMES.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-8">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-accent md:col-span-1">
            04. GOVERNING LAW
          </h2>
          <div className="md:col-span-3 space-y-4">
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction of incorporation of Forkscout Group Ltd., without giving effect to conflicts of law principles.
            </p>
          </div>
        </section>
      </div>

      {/* Footer Meta */}
      <footer className="mt-16 pt-8 border-t border-border text-xs font-mono text-muted-foreground flex justify-between">
        <span>DOCUMENT ID: FS-TS-2026</span>
        <span>STATUS: APPROVED</span>
      </footer>
    </main>
  );
}
