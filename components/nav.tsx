"use client";

import * as React from "react";
import Link from "next/link";
import { Command as CommandIcon, Menu, X } from "lucide-react";

import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { AGLogo } from "@/components/ag-logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCommandPalette } from "@/components/command-palette";

export function Nav() {
  const { open } = useCommandPalette();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6"
      >
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md text-foreground"
          aria-label={`${site.name}, home`}
        >
          <AGLogo className="size-7" />
          <span className="hidden text-sm font-semibold tracking-tight sm:inline">
            {site.name}
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={open}
            aria-label="Open command palette"
            className="ml-1 inline-flex items-center gap-2 rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <CommandIcon className="size-3.5" aria-hidden="true" />
            <kbd className="text-metric text-[11px]">K</kbd>
          </button>
          <ThemeToggle />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-1 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="size-11"
            aria-label="Open command palette"
            onClick={open}
          >
            <CommandIcon className="size-5" aria-hidden="true" />
          </Button>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="size-11"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile menu sheet */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-t border-border md:hidden",
          menuOpen ? "block" : "hidden",
        )}
      >
        <ul className="mx-auto max-w-5xl px-4 py-2 sm:px-6">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-11 items-center rounded-md px-2 text-base text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
