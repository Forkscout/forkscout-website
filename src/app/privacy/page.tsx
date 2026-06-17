/**
 * Purpose:
 * Renders the official Privacy Policy page for the Forkscout organization.
 *
 * Responsibilities:
 * - Inform users about data collection practices (AI logs, waitlist signups).
 * - Match the premium Swiss magazine design layout with HSL theme support.
 *
 * Notes:
 * Uses JetBrains Mono for policy section headings and Inter for body text.
 */

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Forkscout",
  description: "Learn how Forkscout handles AI trace logs, waitlist registration data, and decentralized finance privacy standard compliance."
};

export default function PrivacyPolicy() {
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
          COMPLIANCE / DOCUMENT 001-A
        </span>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tighter text-foreground mb-4">
          PRIVACY POLICY
        </h1>
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs font-mono text-muted-foreground uppercase mt-6 pt-4 border-t border-border-muted">
          <span>EFFECTIVE DATE: JUNE 17, 2026</span>
          <span>REVISION: V1.0</span>
          <span>ISSUED BY: FORKSCOUT</span>
        </div>
      </header>

      {/* Policy Sections */}
      <div className="space-y-12 text-sm leading-relaxed text-foreground/90">
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-8 border-b border-border-muted">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-accent md:col-span-1">
            01. OVERVIEW
          </h2>
          <div className="md:col-span-3 space-y-4">
            <p>
              Forkscout ("we", "our") is dedicated to developing transparent, non-custodial decentralized applications and cognitive AI agent workspaces. This Privacy Policy details how we handle information across our products: **Forkpay, Forksea, Forkweb3, and Forkagent**.
            </p>
            <p>
              As a decentralized project, we prioritize user privacy. We do not track personal identifying information, IP addresses, or wallet balances unless explicitly provided by you for customer support or beta access registration.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-8 border-b border-border-muted">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-accent md:col-span-1">
            02. DATA WE PROCESS
          </h2>
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-display font-bold text-base text-foreground">
              A. Private Beta Signups & Communication
            </h3>
            <p>
              When you submit your email via our waitlist forms, we store your email address solely to verify your subscription and notify you regarding access. We use secure database encryption protocols and never sell or lease your email to third-party marketing entities.
            </p>
            <h3 className="font-display font-bold text-base text-foreground mt-4">
              B. AI Trace & System Execution Logs
            </h3>
            <p>
              For our **Forkagent** product, execution logs and user prompts are processed directly in the client session or via secure non-custodial API endpoints. Prompt history is stored locally in your browser storage (IndexedDB/Local Storage) and does not persist on our central servers.
            </p>
            <h3 className="font-display font-bold text-base text-foreground mt-4">
              C. Decentralized Web3 Records
            </h3>
            <p>
              Forksea (NFTs) and Forkweb3 (DEX Bots) interact directly with public blockchain networks (Ethereum, Solana, Arbitrum). Transaction hash histories, smart contract state modifications, and wallet address details are public record and are not controlled or stored by Forkscout.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-8 border-b border-border-muted">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-accent md:col-span-1">
            03. DATA RETENTION
          </h2>
          <div className="md:col-span-3 space-y-4">
            <p>
              Waitlist emails are retained until you request their removal. You can opt-out of notifications at any time by clicking the unsubscribe link in the footer of our emails or by contacting us at **info@forkscout.com**.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-8">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-accent md:col-span-1">
            04. SECURITY STANDARDS
          </h2>
          <div className="md:col-span-3 space-y-4">
            <p>
              Forkscout enforces strict PCI DSS and PSD2 compliant transmission rails when communicating with external partners for Forkpay integrations. All active client sessions use end-to-end HTTPS encryption, secure API tokens, and client-side credential sandboxing.
            </p>
          </div>
        </section>
      </div>

      {/* Footer Meta */}
      <footer className="mt-16 pt-8 border-t border-border text-xs font-mono text-muted-foreground flex justify-between">
        <span>DOCUMENT ID: FS-PP-2026</span>
        <span>STATUS: APPROVED</span>
      </footer>
    </main>
  );
}
