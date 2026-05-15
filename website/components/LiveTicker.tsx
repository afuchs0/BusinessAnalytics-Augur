"use client";

import { motion } from "framer-motion";
import { getStartups } from "@/lib/data";
import { formatPct } from "@/lib/utils";

export function LiveTicker() {
  const startups = getStartups();
  const items = [...startups, ...startups]; // doubled for seamless loop

  return (
    <div className="relative overflow-hidden border-y border-signal-400/[0.07] bg-ink-950/40 py-3">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-ink-950 to-transparent" />

      <div className="flex animate-ticker gap-12 whitespace-nowrap font-mono text-[0.72rem] uppercase tracking-[0.16em]">
        {items.map((s, idx) => {
          const isHigh = s.scoreTier === "high";
          const isMed = s.scoreTier === "medium";
          return (
            <div key={`${s.id}-${idx}`} className="flex items-center gap-3">
              <span
                className={
                  isHigh
                    ? "h-1.5 w-1.5 rounded-full bg-signal-300"
                    : isMed
                    ? "h-1.5 w-1.5 rounded-full bg-warn"
                    : "h-1.5 w-1.5 rounded-full bg-ink-500"
                }
              />
              <span className="text-[var(--text-secondary)]">{s.name}</span>
              <span className="text-[var(--text-muted)]">·</span>
              <span className="text-[var(--text-muted)]">{s.sector}</span>
              <span className="text-[var(--text-muted)]">·</span>
              <span className={isHigh ? "text-signal-300" : isMed ? "text-warn" : "text-[var(--text-muted)]"}>
                p = {formatPct(s.score, 0)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
