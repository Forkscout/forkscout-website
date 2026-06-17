/**
 * Purpose:
 * Renders the official Cookie Settings page for the Forkscout organization.
 *
 * Responsibilities:
 * - Inform users about browser storage, cookie preferences, and local caching.
 * - Match the premium Swiss magazine design layout with HSL theme support.
 *
 * Notes:
 * Uses JetBrains Mono for policy section headings and Inter for body text.
 */

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Cookie Settings | Forkscout",
  description: "Manage your cookie preferences and learn how Forkscout uses local browser storage for AI workspaces and stablecoin templates."
};

export default function CookieSettings() {
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
          COMPLIANCE / DOCUMENT 001-C
        </span>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tighter text-foreground mb-4">
          COOKIE POLICY & SETTINGS
        </h1>
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs font-mono text-muted-foreground uppercase mt-6 pt-4 border-t border-border-muted">
          <span>LAST UPDATED: JUNE 17, 2026</span>
          <span>REVISION: V1.0</span>
          <span>ISSUED BY: FORKSCOUT GROUP LTD.</span>
        </div>
      </header>

      {/* Cookie Sections */}
      <div className="space-y-12 text-sm leading-relaxed text-foreground/90">
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-8 border-b border-border-muted">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-accent md:col-span-1">
            01. ABOUT COOKIES
          </h2>
          <div className="md:col-span-3 space-y-4">
            <p>
              Cookies and local browser storage (like LocalStorage and SessionStorage) are small files placed on your device to enable core website functionalities. Forkscout does not use tracking or advertising cookies.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-8 border-b border-border-muted">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-accent md:col-span-1">
            02. HOW WE USE STORAGE
          </h2>
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-display font-bold text-base text-foreground">
              A. Essential Session & State Cookies
            </h3>
            <p>
              We use local storage variables to remember your interface selections, specifically:
              <br />
              • **Theme State**: Storing your preference for Light Mode or Dark Mode.
              <br />
              • **Simulation Parameters**: Preserving card design settings and bot trading logs within the active browser session.
            </p>
            <h3 className="font-display font-bold text-base text-foreground mt-4">
              B. AI Workspace Cache (Forkagent)
            </h3>
            <p>
              Prompt inputs, system execution traces, and history values are cached locally on your device to allow smooth performance and continuity without network latency.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-8">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-accent md:col-span-1">
            03. PREFERENCES
          </h2>
          <div className="md:col-span-3 space-y-4">
            <p>
              Since we only use strictly necessary data storage to support functional layouts (such as keeping you logged in or keeping your theme preference), these storage states cannot be opted-out of while using the website. You can, however, clear all cache and storage at any time using your browser's security settings.
            </p>
          </div>
        </section>
      </div>

      {/* Footer Meta */}
      <footer className="mt-16 pt-8 border-t border-border text-xs font-mono text-muted-foreground flex justify-between">
        <span>DOCUMENT ID: FS-CP-2026</span>
        <span>STATUS: APPROVED</span>
      </footer>
    </main>
  );
}
