/**
 * Purpose:
 * Renders a stablecoin neo-banking simulator dashboard.
 *
 * Responsibilities:
 * - Render virtual IBAN account balances for USDC, USDT, and EURC.
 * - Allow users to simulate card deposits and token transfers.
 * - Trigger fake smart contract transaction execution with simulated load state.
 * - Append successful payments to a ledger history feed.
 *
 * Notes:
 * Implemented with reactive states and micro-interactions.
 */

"use client";

import React, { useState } from "react";
import { ArrowRightLeft, Landmark, Send, Loader2, Coins } from "lucide-react";

interface Transaction {
  id: string;
  type: string;
  amount: string;
  token: string;
  date: string;
  txHash: string;
  status: "SUCCESS" | "PENDING";
}

export default function StablecoinPaymentSimulator() {
  const [balances, setBalances] = useState({
    USDC: 24500.0,
    USDT: 12100.5,
    EURC: 8400.0
  });

  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState<"USDC" | "USDT" | "EURC">("USDC");
  const [destination, setDestination] = useState("Debit Card Balance");
  const [loading, setLoading] = useState(false);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "tx-1",
      type: "Card Funding",
      amount: "500.00",
      token: "USDC",
      date: "2026-06-17 14:20",
      txHash: "0x8fa...c2d",
      status: "SUCCESS"
    },
    {
      id: "tx-2",
      type: "External Send",
      amount: "1,200.00",
      token: "USDT",
      date: "2026-06-17 11:05",
      txHash: "0x3e1...b6a",
      status: "SUCCESS"
    },
    {
      id: "tx-3",
      type: "Gas Payment",
      amount: "2.40",
      token: "USDC",
      date: "2026-06-16 18:44",
      txHash: "0x12a...7fe",
      status: "SUCCESS"
    }
  ]);

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;
    if (balances[selectedToken] < parsedAmount) {
      alert("Insufficient stablecoin balance!");
      return;
    }

    setLoading(true);

    // Simulate smart contract payment processing delay
    setTimeout(() => {
      setBalances((prev) => ({
        ...prev,
        [selectedToken]: parseFloat((prev[selectedToken] - parsedAmount).toFixed(2))
      }));

      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        type: destination === "Debit Card Balance" ? "Card Deposit" : "External Send",
        amount: parsedAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        token: selectedToken,
        date: new Date().toISOString().replace("T", " ").slice(0, 16),
        txHash: `0x${Math.random().toString(16).slice(2, 8)}...${Math.random().toString(16).slice(2, 5)}`,
        status: "SUCCESS"
      };

      setTransactions((prev) => [newTx, ...prev]);
      setAmount("");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Balances & Form (7 cols) */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        {/* IBAN Header & Balances */}
        <div className="border border-border p-6 bg-card flex flex-col gap-4">
          <div className="flex justify-between items-start border-b border-border-muted pb-3">
            <div>
              <span className="text-[10px] font-mono text-muted-foreground uppercase block">
                Simulated Neo-Bank Account
              </span>
              <span className="text-sm font-mono font-bold text-foreground">
                FR76 3000 4000 0012 3456 7890 123
              </span>
            </div>
            <Landmark size={20} className="text-accent" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {Object.entries(balances).map(([tok, val]) => (
              <div key={tok} className="flex flex-col border border-border-muted p-3 bg-background">
                <span className="text-[10px] font-mono text-muted-foreground font-bold">{tok}</span>
                <span className="text-sm sm:text-lg font-mono font-bold text-foreground">
                  {val.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
                <span className="text-[8px] font-mono text-muted-foreground uppercase">
                  On-chain stable
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Transfer Form */}
        <form onSubmit={handleTransfer} className="border border-border p-6 bg-card flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-border-muted pb-3">
            <Coins size={16} className="text-accent" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
              Transfer Stablecoin
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Select Stablecoin */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono font-bold uppercase text-muted-foreground">
                Select Asset
              </label>
              <select
                value={selectedToken}
                onChange={(e) => setSelectedToken(e.target.value as any)}
                className="w-full px-3 py-2 border border-border bg-background text-foreground font-mono text-xs focus:outline-none focus:border-accent"
              >
                <option value="USDC">USDC</option>
                <option value="USDT">USDT</option>
                <option value="EURC">EURC</option>
              </select>
            </div>

            {/* Select Destination */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono font-bold uppercase text-muted-foreground">
                Destination
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-3 py-2 border border-border bg-background text-foreground font-mono text-xs focus:outline-none focus:border-accent"
              >
                <option value="Debit Card Balance">Debit Card (Simulated)</option>
                <option value="External Wallet">External Web3 Address</option>
              </select>
            </div>
          </div>

          {/* Amount input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono font-bold uppercase text-muted-foreground">
              Transfer Amount
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-2 border border-border bg-background text-foreground font-mono text-xs focus:outline-none focus:border-accent"
                disabled={loading}
              />
              <span className="absolute right-3 top-2 text-xs font-mono text-muted-foreground">
                {selectedToken}
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !amount}
            className="w-full py-3 border border-border bg-accent text-accent-foreground font-mono font-bold text-xs hover:bg-transparent hover:text-foreground transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>PROCESSING SMART CONTRACT CONTRACT...</span>
              </>
            ) : (
              <>
                <Send size={14} />
                <span>INITIATE STABLECOIN DEPOSIT</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Ledger History (5 cols) */}
      <div className="lg:col-span-5 border border-border p-6 bg-card flex flex-col gap-4 h-[395px]">
        <div className="flex items-center gap-2 border-b border-border pb-3 justify-between">
          <div className="flex items-center gap-2">
            <ArrowRightLeft size={16} className="text-accent" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
              On-Chain Activity Logs
            </h4>
          </div>
          <span className="text-[9px] font-mono bg-muted text-accent font-semibold px-2 py-0.5 border border-border-muted">
            SANDBOX LOGS
          </span>
        </div>

        <div className="flex-grow overflow-y-auto space-y-3 pr-1">
          {transactions.map((tx) => (
            <div key={tx.id} className="border border-border-muted p-3 text-[10px] font-mono bg-background flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-foreground">{tx.type}</span>
                <span className="text-accent font-bold">
                  -{tx.amount} {tx.token}
                </span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground mt-1 text-[9px]">
                <span>HASH: {tx.txHash}</span>
                <span>{tx.date}</span>
              </div>
              <div className="flex justify-between items-center mt-1 text-[8px] text-green-500 font-bold border-t border-border-muted pt-1">
                <span>CONTRACT EXECUTION STATE</span>
                <span>{tx.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
