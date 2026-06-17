/**
 * Purpose:
 * Renders the Forksea NFT Marketplace page route.
 *
 * Responsibilities:
 * - Load interactive states for live auctions and mint simulators.
 * - Integrate BiddingWidget and MintSimulator components.
 * - Render Swiss editorial headers, statistics summary, and route navigation.
 *
 * Notes:
 * Implemented with responsive grid layouts.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Coins, Flame, Award, Grid3X3 } from "lucide-react";
import BiddingWidget from "./components/BiddingWidget";
import MintSimulator from "./components/MintSimulator";
import BetaWaitlist from "@/components/BetaWaitlist";

interface MintedNFT {
  id: string;
  title: string;
  category: string;
  description: string;
  imagePreset: string;
  owner: string;
  txHash: string;
  tokenId: number;
}

export default function ForkseaPage() {
  const [createdNFTs, setCreatedNFTs] = useState<MintedNFT[]>([]);

  const handleMintSuccess = (newNft: MintedNFT) => {
    setCreatedNFTs((prev) => [newNft, ...prev]);
  };

  const marketCollections = [
    { name: "Glitch AI Nexus", volume: "420K USDC", items: "1,200", floor: "0.2 ETH" },
    { name: "Crypto Card Sovereigns", volume: "1.1M USDC", items: "360", floor: "1.5 ETH" },
    { name: "Oracle Loop Pass", volume: "120K USDC", items: "50", floor: "5.0 ETH" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-12 transition-colors duration-300">
      
      {/* Editorial Header */}
      <section className="flex flex-col border-b border-border pb-8 mt-6">
        <div className="flex justify-between items-center text-xs font-mono text-muted-foreground border-b border-border pb-4 mb-6 uppercase tracking-wider">
          <Link href="/" className="hover:text-accent flex items-center gap-1.5 font-bold transition-colors">
            <ArrowLeft size={14} />
            <span>BACK TO DIRECTORY</span>
          </Link>
          <span>ERC-721 PROTOCOL RAIL</span>
          <span>MARKET EST 2026</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3 text-4xl sm:text-5xl font-mono font-bold text-accent">
            P.02
          </div>
          <div className="lg:col-span-9 flex flex-col gap-4">
            <div className="flex flex-wrap gap-3 items-center">
              <h1 className="text-3xl sm:text-6xl font-display font-black uppercase tracking-tight">
                Forksea <span className="text-accent">NFT Market</span>
              </h1>
              <span className="text-[10px] font-mono font-bold px-2 py-1 border border-accent text-accent bg-accent/5 uppercase tracking-wider">
                COMING SOON
              </span>
            </div>
            <p className="text-md sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              High-speed decentralized NFT marketplace. Mint custom generative artwork directly on-chain, place automated bids on active auctions, and track transaction ledgers.
            </p>
          </div>
        </div>
      </section>

      {/* Beta Waitlist Banner */}
      <BetaWaitlist productName="Forksea NFT Marketplace" launchQuarter="Q4 2026" />

      {/* ─── SECTION 1: BIDDING AUCTION CARD ─── */}
      <section className="flex flex-col border-b border-border pb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono border border-border px-2 py-0.5 uppercase">A</span>
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            Simulated Auction & Bidding Sandbox
          </h2>
        </div>
        
        <div className="border border-border p-6 bg-card">
          <BiddingWidget />
        </div>
      </section>

      {/* ─── SECTION 2: MINT CONTRACT ─── */}
      <section className="flex flex-col border-b border-border pb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono border border-border px-2 py-0.5 uppercase">B</span>
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            Generative Art Minting Studio
          </h2>
        </div>
        
        <div className="border border-border p-6 bg-card">
          <MintSimulator onMintSuccess={handleMintSuccess} />
        </div>
      </section>

      {/* ─── SECTION 3: MINTED LIST & COLLECTIONS ─── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8">
        
        {/* Dynamic Minted List (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono border border-border px-2 py-0.5 uppercase">C</span>
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
              Dynamic Minted Assets Queue
            </h2>
          </div>

          <div className="border border-border p-5 bg-card">
            {createdNFTs.length === 0 ? (
              <div className="text-center py-12 text-xs font-mono text-muted-foreground uppercase">
                No items minted in this session yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {createdNFTs.map((nft) => (
                  <div key={nft.id} className="border border-border p-3 bg-background flex flex-col gap-2 font-mono text-[10px]">
                    <div className={`w-full h-24 rounded bg-gradient-to-br ${nft.imagePreset} flex items-center justify-center border border-white/5`} />
                    <div className="flex justify-between items-center font-bold">
                      <span className="truncate max-w-[120px] text-foreground">{nft.title}</span>
                      <span className="text-accent">#{nft.tokenId}</span>
                    </div>
                    <p className="text-[9px] text-muted-foreground line-clamp-1">{nft.description}</p>
                    <div className="flex justify-between items-center text-[8px] text-muted-foreground border-t border-border-muted pt-1 mt-1">
                      <span>OWNER: {nft.owner}</span>
                      <span className="text-green-500 font-bold">SUCCESS</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Collections index stats (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono border border-border px-2 py-0.5 uppercase">D</span>
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
              Trending Collections Floor Index
            </h2>
          </div>

          <div className="border border-border p-5 bg-card overflow-x-auto">
            <table className="w-full text-left font-mono text-[10px] border-collapse">
              <thead>
                <tr className="border-b border-border text-muted-foreground font-bold uppercase">
                  <th className="pb-2">Collection</th>
                  <th className="pb-2">Floor Price</th>
                  <th className="pb-2 text-right">Volume</th>
                </tr>
              </thead>
              <tbody>
                {marketCollections.map((col, idx) => (
                  <tr key={idx} className="border-b border-border-muted last:border-0">
                    <td className="py-2.5 font-bold text-foreground">{col.name}</td>
                    <td className="py-2.5 text-accent">{col.floor}</td>
                    <td className="py-2.5 text-right text-muted-foreground">{col.volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </section>

    </div>
  );
}
