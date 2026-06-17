/**
 * Purpose:
 * Core layout of the Forkscout organization web portal.
 *
 * Responsibilities:
 * - Define SEO metadata (title, description, keywords).
 * - Inject global CSS styling styles.
 * - Wrap page components in ThemeProvider to support light/dark toggling.
 * - Layout structural order: Ticker -> Nav -> Page Content -> Footer.
 *
 * Notes:
 * Configured with standard fonts imported in globals.css.
 */

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-context";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Forkscout | AI & Web3 Decentralized Infrastructure",
  description: "Next-generation Swiss-style editorial portal for Forkscout products, bridging cognitive AI agents with decentralized finance solutions.",
  keywords: [
    "Forkscout",
    "Forkpay",
    "Forksea",
    "Forkweb3",
    "Forkagent",
    "Web3 AI",
    "Stablecoin Debit Card",
    "DEX Trading Bots",
    "AI Agent Portal"
  ],
  authors: [{ name: "Forkscout Dev Team" }]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full select-text antialiased", "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col transition-colors duration-300">
        <ThemeProvider>
          {/* Main header navbar */}
          <Nav />
          
          {/* Main page content wrapper */}
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          
          {/* System Footer */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
