/**
 * Purpose:
 * Renders the organization site footer with quick links, social media, and regulatory details.
 *
 * Responsibilities:
 * - Render branding details.
 * - Display navigation links categorized by product lines.
 * - Render compliance statement (relevant for web3 and stablecoin cards).
 *
 * Notes:
 * Uses a clean grid layout that collapses nicely on mobile screens.
 */

"use client";

import React from "react";
import Link from "next/link";
import { Mail, ExternalLink } from "lucide-react";
import ForkscoutLogo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border mt-16 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Brand Col */}
        <div className="flex flex-col gap-3">
          <Link href="/" className="font-display font-black text-2xl tracking-tighter flex items-center gap-2 select-none">
            <ForkscoutLogo size={28} className="text-foreground" />
            <span>FORKSCOUT</span>
          </Link>
          <p className="text-xs text-muted-foreground font-mono leading-relaxed">
            Autonomous agentic workflows and decentralized finance interfaces. Integrating cognitive AI layers with Web3 protocols.
          </p>
          <div className="flex gap-3 mt-2">
            <a
              href="https://github.com/Forkscout"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-border-muted hover:bg-muted text-muted-foreground hover:text-accent transition-colors flex items-center justify-center"
              aria-label="Github"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a
              href="https://x.com/fork_scout"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-border-muted hover:bg-muted text-muted-foreground hover:text-accent transition-colors flex items-center justify-center"
              aria-label="Twitter"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a
              href="mailto:info@forkscout.com"
              className="p-2 border border-border-muted hover:bg-muted text-muted-foreground hover:text-accent transition-colors flex items-center justify-center"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        {/* Links Col 1: Products */}
        <div>
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider mb-4 border-b border-border pb-1">
            Products Index
          </h4>
          <ul className="space-y-2 text-xs font-mono">
            <li>
              <Link href="/forkpay" className="text-muted-foreground hover:text-accent transition-colors">
                P.01 Forkpay (Neo-Bank)
              </Link>
            </li>
            <li>
              <Link href="/forksea" className="text-muted-foreground hover:text-accent transition-colors">
                P.02 Forksea (NFT Market)
              </Link>
            </li>
            <li>
              <Link href="/forkweb3" className="text-muted-foreground hover:text-accent transition-colors">
                P.03 Forkweb3 (DEX Bots)
              </Link>
            </li>
            <li>
              <Link href="/forkagent" className="text-muted-foreground hover:text-accent transition-colors">
                P.04 Forkagent (AI Agent)
              </Link>
            </li>
          </ul>
        </div>

        {/* Links Col 2: Info */}
        <div>
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider mb-4 border-b border-border pb-1">
            Company & Tech
          </h4>
          <ul className="space-y-2 text-xs font-mono">
            <li>
              <Link href="/" className="text-muted-foreground hover:text-accent transition-colors">
                Whitepaper (Draft)
              </Link>
            </li>
            <li>
              <Link href="/" className="text-muted-foreground hover:text-accent transition-colors">
                System Documentation
              </Link>
            </li>
            <li>
              <Link href="/" className="text-muted-foreground hover:text-accent transition-colors">
                Developer API
              </Link>
            </li>
          </ul>
        </div>

        {/* Left Compliance/Newsletter Col */}
        <div>
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider mb-4 border-b border-border pb-1">
            Regulatory Details
          </h4>
          <p className="text-xs text-muted-foreground font-mono leading-relaxed">
            Forkscout operates as a decentralized autonomous developer organization. Forkpay stablecoin solutions leverage non-custodial smart contracts and BIN-sponsored EMI partners (PSD2 & PCI DSS compliant rails).
          </p>
          <div className="mt-4 text-[10px] font-mono text-muted-foreground uppercase border-t border-border-muted pt-2 flex justify-between">
            <span>VOL. I · EST 2026</span>
            <span className="text-accent font-bold">● ACTIVE</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-border-muted flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-muted-foreground gap-4">
        <span>© 2026 FORKSCOUT. ALL RIGHTS RESERVED.</span>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-accent transition-colors">PRIVACY POLICY</Link>
          <span>·</span>
          <Link href="/terms" className="hover:text-accent transition-colors">TERMS OF SERVICE</Link>
          <span>·</span>
          <Link href="/cookies" className="hover:text-accent transition-colors">COOKIE SETTINGS</Link>
        </div>
      </div>
    </footer>
  );
}
