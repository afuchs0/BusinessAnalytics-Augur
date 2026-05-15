"use client";

interface ScoreGaugeProps {
  score: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export function ScoreGauge({ score, showLabel = true, size = "md" }: ScoreGaugeProps) {
  const tier = score >= 0.7 ? "high" : score >= 0.4 ? "medium" : "low";
  const color =
    tier === "high" ? "var(--signal)" : tier === "medium" ? "#e8b04b" : "#5d6b85";
  const pct = score * 100;

  const dims = {
    sm: { w: 80, h: 6, fs: "text-[0.7rem]" },
    md: { w: 120, h: 8, fs: "text-xs" },
    lg: { w: 200, h: 10, fs: "text-sm" },
  };
  const d = dims[size];

  return (
    <div className="flex items-center gap-3">
      <div
        className="relative rounded-full bg-ink-800 overflow-hidden"
        style={{ width: d.w, height: d.h }}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all"
          style={{ width: `${pct}%`, background: color, boxShadow: `0 0 8px ${color}` }}
        />
      </div>
      {showLabel && (
        <span className={`font-mono tabular-nums ${d.fs}`} style={{ color }}>
          {score.toFixed(2)}
        </span>
      )}
    </div>
  );
}
