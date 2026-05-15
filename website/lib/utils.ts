import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export function formatChf(value: number): string {
  if (value >= 1_000_000) return `CHF ${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
  if (value >= 1_000) return `CHF ${(value / 1_000).toFixed(0)}K`;
  return `CHF ${value.toFixed(0)}`;
}

export function formatPct(value: number, digits = 1): string {
  return `${(value * 100).toFixed(digits)}%`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function tierColor(tier: "low" | "medium" | "high"): string {
  if (tier === "high") return "text-signal-300";
  if (tier === "medium") return "text-warn";
  return "text-text-muted";
}

export function predictionBadge(pred: "success" | "failure"): {
  bg: string;
  ring: string;
  text: string;
  label: string;
} {
  if (pred === "success") {
    return {
      bg: "bg-signal-500/10",
      ring: "ring-1 ring-signal-400/30",
      text: "text-signal-200",
      label: "FORWARDED",
    };
  }
  return {
    bg: "bg-ink-700/40",
    ring: "ring-1 ring-ink-600/50",
    text: "text-text-muted",
    label: "FILTERED",
  };
}
