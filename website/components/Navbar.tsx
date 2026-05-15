"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AugurLogo } from "./AugurLogo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Overview" },
  { href: "/explorer", label: "Pipeline" },
  { href: "/about", label: "Research" },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-signal-400/[0.07] bg-ink-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <AugurLogo size={32} showWordmark />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative px-4 py-2 text-sm tracking-wide transition-colors",
                  active
                    ? "text-bone-50"
                    : "text-[var(--text-secondary)] hover:text-bone-50"
                )}
              >
                {l.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-[1px] h-px bg-gradient-to-r from-transparent via-signal-300 to-transparent" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-signal-400/[0.08] border border-signal-400/20">
            <span className="h-1.5 w-1.5 rounded-full bg-signal-300 live-dot" />
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.15em] text-signal-200">
              Model · v2.7.1 · Live
            </span>
          </div>
          <Link
            href="/explorer"
            className="hidden lg:inline-flex items-center gap-2 rounded-full border border-bone-50/20 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-bone-50 hover:bg-bone-50/[0.06] transition-colors"
          >
            Explore Pipeline →
          </Link>
        </div>
      </div>
    </header>
  );
}
