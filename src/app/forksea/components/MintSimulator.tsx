/**
 * Purpose:
 * Renders an interactive NFT minting simulator.
 *
 * Responsibilities:
 * - Allow users to write NFT titles and metadata.
 * - Provide pre-styled, high-contrast generative art presets for preview.
 * - Simulate contract execution during mint (transaction hashing, IPFS upload).
 * - Display freshly minted NFTs with contract address.
 *
 * Notes:
 * Uses state management to accumulate user-minted NFTs dynamically.
 */

"use client";

import React, { useState } from "react";
import { Plus, Image as ImageIcon, Loader2, Sparkles, CheckCircle2 } from "lucide-react";

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

const ART_PRESETS = [
  { id: "preset-1", name: "Glitch AI Nexus", colors: "from-purple-900 via-indigo-950 to-pink-900", icon: "🤖" },
  { id: "preset-2", name: "DEX Gas Burner", colors: "from-cyan-900 via-zinc-950 to-emerald-900", icon: "⛽" },
  { id: "preset-3", name: "Quantum Oracle", colors: "from-amber-900 via-orange-950 to-rose-900", icon: "🔮" }
];

export default function MintSimulator({ onMintSuccess }: { onMintSuccess: (nft: MintedNFT) => void }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Art");
  const [selectedArt, setSelectedArt] = useState(ART_PRESETS[0].id);
  const [loading, setLoading] = useState(false);
  const [minted, setMinted] = useState<MintedNFT | null>(null);

  const handleMint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    setLoading(true);
    setMinted(null);

    // Simulate smart contract compilation and gas payment
    setTimeout(() => {
      const art = ART_PRESETS.find((p) => p.id === selectedArt) || ART_PRESETS[0];
      const newNft: MintedNFT = {
        id: `nft-${Date.now()}`,
        title,
        category,
        description: desc || "A premium digital asset minted on Forksea infrastructure.",
        imagePreset: art.colors,
        owner: "0xFork...99ab",
        txHash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
        tokenId: Math.floor(Math.random() * 8999) + 1000
      };

      setMinted(newNft);
      onMintSuccess(newNft);
      setTitle("");
      setDesc("");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Editor & Form (7 cols) */}
      <form onSubmit={handleMint} className="lg:col-span-7 flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-border-muted pb-3">
          <Plus size={16} className="text-accent" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
            Smart Contract Minting Panel
          </h4>
        </div>

        {/* NFT Title */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono font-bold uppercase text-muted-foreground">
            Asset Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, 32))}
            placeholder="Glitch Cyberpunk Artifact"
            className="w-full px-4 py-2 border border-border bg-background text-foreground font-mono text-xs focus:outline-none focus:border-accent"
            disabled={loading}
            required
          />
        </div>

        {/* NFT Category */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono font-bold uppercase text-muted-foreground">
            Category Tag
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-border bg-background text-foreground font-mono text-xs focus:outline-none focus:border-accent"
            disabled={loading}
          >
            <option value="Art">Visual Art</option>
            <option value="AI Prompts">Cognitive Prompts</option>
            <option value="DeFi Passes">DeFi Artifact</option>
            <option value="Avatars">Avatars</option>
          </select>
        </div>

        {/* NFT Description */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono font-bold uppercase text-muted-foreground">
            Description
          </label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value.slice(0, 120))}
            placeholder="Describe the metadata variables..."
            rows={3}
            className="w-full px-4 py-2 border border-border bg-background text-foreground font-mono text-xs focus:outline-none focus:border-accent resize-none"
            disabled={loading}
          />
        </div>

        {/* Artwork Generative Preset */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono font-bold uppercase text-muted-foreground">
            Generative Art Finish
          </label>
          <div className="grid grid-cols-3 gap-2">
            {ART_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setSelectedArt(preset.id)}
                className={`px-3 py-2 border text-[10px] font-mono flex flex-col gap-1 items-center justify-center transition-all cursor-pointer ${
                  selectedArt === preset.id ? "border-accent bg-accent/5 font-bold" : "border-border-muted hover:border-border"
                }`}
                disabled={loading}
              >
                <span className="text-lg">{preset.icon}</span>
                <span className="truncate max-w-[80px]">{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mint Button */}
        <button
          type="submit"
          disabled={loading || !title}
          className="w-full py-3 border border-border bg-accent text-accent-foreground font-mono font-bold text-xs hover:bg-transparent hover:text-foreground transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              <span>CONTRACT EXECUTION PROTOCOL IN RUNNING STATE...</span>
            </>
          ) : (
            <>
              <Sparkles size={14} />
              <span>EXECUTE MINT CONTRACT</span>
            </>
          )}
        </button>
      </form>

      {/* Mint Preview Display (5 cols) */}
      <div className="lg:col-span-5 border border-border p-6 bg-card flex flex-col items-center justify-center min-h-[300px]">
        {minted ? (
          <div className="w-full flex flex-col gap-4">
            <div className="flex items-center gap-1.5 text-green-500 text-[10px] font-mono font-bold border-b border-border-muted pb-2 uppercase tracking-wide">
              <CheckCircle2 size={14} />
              <span>Smart Contract Executed Successfully</span>
            </div>

            {/* Generated Card NFT Image */}
            <div className={`w-full h-40 rounded-lg bg-gradient-to-br ${minted.imagePreset} flex items-center justify-center border border-white/10 shadow-lg relative overflow-hidden group`}>
              <div className="text-3xl filter drop-shadow-md select-none">
                {ART_PRESETS.find((p) => p.colors === minted.imagePreset)?.icon || "🎨"}
              </div>
              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[8px] font-mono text-white/75 bg-black/45 px-2 py-1 border border-white/10 rounded">
                <span>TOKEN #{minted.tokenId}</span>
                <span>FORKSEA ERC721</span>
              </div>
            </div>

            {/* Mint Info Block */}
            <div className="flex flex-col gap-1 font-mono text-[9px] text-muted-foreground bg-background p-3 border border-border-muted">
              <div className="flex justify-between"><span className="font-bold">Title</span><span className="text-foreground">{minted.title}</span></div>
              <div className="flex justify-between"><span>Category</span><span className="text-foreground">{minted.category}</span></div>
              <div className="flex justify-between"><span>Contract Hash</span><span className="text-accent truncate max-w-[120px]">{minted.txHash}</span></div>
              <div className="flex justify-between"><span>Owner Wallet</span><span className="text-foreground truncate max-w-[120px]">{minted.owner}</span></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground font-mono text-xs text-center p-6">
            <ImageIcon size={32} className="stroke-1 text-border" />
            <p className="uppercase text-[10px] tracking-widest mt-2">
              Waiting for mint execution
            </p>
            <p className="text-[9px] max-w-[200px]">
              Fill out the parameters on the left to deploy your NFT asset on-chain.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
