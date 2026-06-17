/**
 * Purpose:
 * Renders an active NFT auction bidding card with simulated logs.
 *
 * Responsibilities:
 * - Render an active bidding card with live countdown timer.
 * - Accept user bids and validate that they exceed the current highest bid.
 * - Simulate rival bidder activity placing auto-bids over time.
 * - Display a transaction log of bids placed.
 *
 * Notes:
 * Implemented with countdown timers and rival mock updates.
 */

"use client";

import React, { useState, useEffect } from "react";
import { Gavel, Clock, ArrowUpRight, History } from "lucide-react";

interface Bid {
  id: string;
  bidder: string;
  amount: number;
  time: string;
}

export default function BiddingWidget() {
  const [currentBid, setCurrentBid] = useState(1450);
  const [userBid, setUserBid] = useState("");
  const [timeLeft, setTimeLeft] = useState({ h: 3, m: 45, s: 22 });
  const [bids, setBids] = useState<Bid[]>([
    { id: "1", bidder: "0x9812...3a4f", amount: 1450, time: "2 min ago" },
    { id: "2", bidder: "0xec12...77bb", amount: 1400, time: "12 min ago" },
    { id: "3", bidder: "0x78ab...90ff", amount: 1350, time: "1 hour ago" }
  ]);

  // Countdown timer tick simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        clearInterval(timer);
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Place user bid
  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault();
    const bidAmount = parseInt(userBid);
    if (isNaN(bidAmount) || bidAmount <= currentBid) {
      alert(`Bid must be greater than current bid: $${currentBid}`);
      return;
    }

    setCurrentBid(bidAmount);
    const newBid: Bid = {
      id: Date.now().toString(),
      bidder: "0xFork...99ab (You)",
      amount: bidAmount,
      time: "Just now"
    };

    setBids((prev) => [newBid, ...prev]);
    setUserBid("");

    // Simulate another user counter-bidding after 4 seconds
    setTimeout(() => {
      const counterBidAmount = bidAmount + 50;
      setCurrentBid(counterBidAmount);
      const counterBid: Bid = {
        id: (Date.now() + 1).toString(),
        bidder: `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`,
        amount: counterBidAmount,
        time: "Just now"
      };
      setBids((prev) => [counterBid, ...prev]);
    }, 4000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Bid Card Display (7 cols) */}
      <div className="lg:col-span-7 flex flex-col border border-border p-5 bg-background gap-4">
        {/* Preview Header */}
        <div className="flex justify-between items-center border-b border-border-muted pb-3">
          <div>
            <span className="text-[10px] font-mono text-accent font-bold uppercase tracking-widest block">
              AUCTION ID #129
            </span>
            <h4 className="text-md font-display font-bold uppercase">
              Forkscout Sovereign Nexus
            </h4>
          </div>
          <Gavel size={18} className="text-accent" />
        </div>

        {/* Large Image Frame */}
        <div className="w-full h-48 rounded bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 flex flex-col justify-between p-4 border border-border-muted relative overflow-hidden group">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />
          
          <span className="self-end px-2 py-0.5 border border-white/20 bg-black/40 text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-wider rounded">
            ERC-721 Sandbox Auction
          </span>

          <div className="z-10 flex items-center justify-center text-4xl mb-4 select-none group-hover:scale-105 transition-transform duration-300">
            ⚡👑🛡️
          </div>

          <div className="z-10 flex justify-between items-center text-[10px] font-mono text-white/85">
            <span>METADATA: CRYPTO-CARD</span>
            <span>EDITION 1 OF 1</span>
          </div>
        </div>

        {/* Countdown & Status Block */}
        <div className="grid grid-cols-2 gap-4 border-t border-border-muted pt-4">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-mono text-muted-foreground uppercase flex items-center gap-1">
              <Clock size={10} /> Time Remaining
            </span>
            <span className="text-lg font-mono font-bold text-foreground">
              {String(timeLeft.h).padStart(2, "0")}h : {String(timeLeft.m).padStart(2, "0")}m : {String(timeLeft.s).padStart(2, "0")}s
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-mono text-muted-foreground uppercase">
              Current Highest Bid
            </span>
            <span className="text-lg font-mono font-bold text-accent">
              {currentBid.toLocaleString("en-US")} USDC
            </span>
          </div>
        </div>

        {/* Bid Form */}
        <form onSubmit={handlePlaceBid} className="flex gap-2 border-t border-border-muted pt-4">
          <input
            type="number"
            min={currentBid + 10}
            value={userBid}
            onChange={(e) => setUserBid(e.target.value)}
            placeholder={`Min bid ${currentBid + 50}`}
            className="flex-grow px-3 py-2 border border-border bg-card text-foreground font-mono text-xs focus:outline-none focus:border-accent"
          />
          <button
            type="submit"
            className="px-6 py-2 border border-border bg-accent text-accent-foreground font-mono font-bold text-xs hover:bg-transparent hover:text-foreground transition-all duration-300 flex items-center gap-1 cursor-pointer"
          >
            <span>SUBMIT BID</span>
            <ArrowUpRight size={12} />
          </button>
        </form>
      </div>

      {/* Auction Ledger Logs (5 cols) */}
      <div className="lg:col-span-5 border border-border p-6 bg-card flex flex-col gap-4 h-[395px]">
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <History size={16} className="text-accent" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
            Bidding Activity Ledger
          </h4>
        </div>

        <div className="flex-grow overflow-y-auto space-y-3 pr-1 text-[10px] font-mono">
          {bids.map((bid) => (
            <div key={bid.id} className="border border-border-muted p-2 bg-background flex justify-between items-center">
              <div className="flex flex-col">
                <span className="font-bold text-foreground">{bid.bidder}</span>
                <span className="text-muted-foreground text-[8px]">{bid.time}</span>
              </div>
              <span className="font-bold text-accent">
                {bid.amount.toLocaleString()} USDC
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
