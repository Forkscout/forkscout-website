/**
 * Purpose:
 * Provides the main navigation header with theme switching and links to all product platforms.
 *
 * Responsibilities:
 * - Render branding logo and current network/system label.
 * - Provide smooth navigation links to all main sub-routes.
 * - Integrated ThemeToggle button using the custom useTheme context.
 * - Mobile hamburger toggle to display links on smaller screens.
 *
 * Notes:
 * Uses Lucide icons and matches the codegotech layout design.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/theme-context";
import { Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";

export default function Nav() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { name: "P.01 Forkpay", path: "/forkpay" },
    { name: "P.02 Forksea", path: "/forksea" },
    { name: "P.03 Forkweb3", path: "/forkweb3" },
    { name: "P.04 Forkagent", path: "/forkagent" }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="font-display font-extrabold text-2xl tracking-tighter flex items-center gap-2 select-none">
            <img src="/logo.png" alt="Forkscout Logo" className="w-6 h-6 object-contain dark:invert" />
            <span>FORKSCOUT</span>
            <span className="text-xs font-mono font-medium px-1.5 py-0.5 border border-border text-accent bg-muted uppercase tracking-widest">
              org
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`transition-colors duration-200 py-1 hover:text-accent font-mono tracking-tight ${
                  isActive ? "text-accent border-b border-accent" : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right side buttons */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 border border-border rounded-none hover:bg-muted transition-colors flex items-center justify-center cursor-pointer"
          >
            {theme === "dark" ? <Sun size={18} className="text-accent" /> : <Moon size={18} className="text-accent" />}
          </button>



          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            className="md:hidden p-2 border border-border rounded-none hover:bg-muted transition-colors flex items-center justify-center cursor-pointer"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-b border-border bg-background transition-colors duration-300">
          <div className="px-4 pt-2 pb-6 space-y-3 flex flex-col">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileOpen(false)}
                className={`text-base font-mono font-medium py-2 px-3 border border-transparent hover:border-border transition-colors hover:text-accent ${
                  pathname === link.path ? "text-accent bg-muted border-border" : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}

          </div>
        </div>
      )}
    </header>
  );
}
