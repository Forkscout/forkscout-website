/**
 * Purpose:
 * Renders a standardized, premium waitlist / beta signup teaser banner.
 *
 * Responsibilities:
 * - Accept parameters for product name and launch milestone.
 * - Manage user email input and mock sending operation via timeout.
 * - Render high-contrast Swiss-style borders and layout.
 * - Display a success feedback message once registered.
 *
 * Notes:
 * Shared across all four sub-product pages (P.01 to P.04).
 */

"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, Loader2, Calendar } from "lucide-react";

interface BetaWaitlistProps {
  productName: string;
  launchQuarter: string;
}

export default function BetaWaitlist({ productName, launchQuarter }: BetaWaitlistProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || loading) return;

    setLoading(true);

    // Simulate database write
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="border border-border p-6 bg-card text-foreground flex flex-col md:flex-row gap-6 justify-between items-center transition-colors">
      
      {/* Teaser text */}
      <div className="flex flex-col gap-1.5 max-w-xl text-center md:text-left">
        <span className="text-[10px] font-mono text-accent font-bold uppercase tracking-widest flex items-center gap-1.5 justify-center md:justify-start">
          <Calendar size={12} />
          <span>ESTIMATED LAUNCH: {launchQuarter}</span>
        </span>
        <h3 className="text-xl sm:text-2xl font-display font-black uppercase tracking-tight">
          {productName} is in private beta
        </h3>
        <p className="text-xs text-muted-foreground font-mono leading-relaxed">
          The core protocol components are in active development. Register your email to join the developer whitelist, receive protocol parameters, and obtain private SDK access tokens.
        </p>
      </div>

      {/* Form or Success message */}
      <div className="w-full md:w-auto min-w-[280px]">
        {submitted ? (
          <div className="w-full py-4 px-5 border border-green-500 bg-green-500/5 text-green-500 flex items-center gap-3 font-mono text-xs">
            <CheckCircle2 size={18} className="shrink-0" />
            <div className="flex flex-col">
              <span className="font-bold uppercase">WHITELIST CONFIGURED</span>
              <span className="text-[9px] text-green-600 dark:text-green-400">Verification token sent.</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
            <div className="relative flex-grow">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@organization.org"
                className="w-full pl-9 pr-4 py-2.5 border border-border bg-background text-foreground font-mono text-xs focus:outline-none focus:border-accent"
                disabled={loading}
              />
              <Mail size={12} className="absolute left-3 top-3.5 text-muted-foreground" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 border border-border bg-accent text-accent-foreground font-mono font-bold text-xs hover:bg-transparent hover:text-foreground transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <span>JOIN WAITLIST</span>
              )}
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
