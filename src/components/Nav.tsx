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
 * Uses Lucide icons and adaptively supports both light and dark modes.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/theme-context";
import { Sun, Moon, Menu, X } from "lucide-react";
import ForkscoutLogo from "@/components/Logo";

export default function Nav() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { name: "Forkpay", path: "/forkpay" },
    { name: "Forksea", path: "/forksea" },
    { name: "Forkweb3", path: "/forkweb3" },
    { name: "Forkagent", path: "/forkagent" }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="font-display font-extrabold text-xl tracking-tight flex items-center gap-2.5 select-none">
            <ForkscoutLogo size={24} className="text-foreground" />
            <span className="tracking-widest text-sm font-black text-foreground">FORKSCOUT</span>
            <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 border border-border text-accent bg-accent/5 rounded uppercase tracking-wider">
              platform
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold">
          {links.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`transition-all duration-200 py-1 hover:text-accent font-mono uppercase tracking-widest ${
                  isActive ? "text-accent font-bold" : "text-muted-foreground"
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
            className="p-2 border border-border rounded-lg hover:bg-muted transition-colors flex items-center justify-center cursor-pointer"
          >
            {theme === "dark" ? <Sun size={16} className="text-accent" /> : <Moon size={16} className="text-accent" />}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            className="md:hidden p-2 border border-border rounded-lg hover:bg-muted transition-colors flex items-center justify-center cursor-pointer"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-b border-border bg-background/95 backdrop-blur-lg transition-colors duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-mono font-semibold py-2.5 px-4 rounded-lg border border-transparent hover:border-border transition-all hover:text-accent ${
                  pathname === link.path ? "text-accent bg-muted border-border" : "text-muted-foreground"
                }`}
              >
                {link.name.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
