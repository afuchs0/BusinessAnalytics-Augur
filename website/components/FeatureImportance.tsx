"use client";

import { motion } from "framer-motion";

// Exactly the top-10 features from the LightGBM gain analysis (Figure 3a)
const FEATURES = [
  { key: "category_code", label: "Industry sector", pct: 36.2, kind: "categorical" },
  { key: "pre_series_a_team_size", label: "Pre-Series A team size", pct: 23.1, kind: "numeric" },
  { key: "people_linked_total", label: "Network depth", pct: 5.4, kind: "numeric" },
  { key: "avg_team_edu_score", label: "Avg. team education score", pct: 5.0, kind: "numeric" },
  { key: "pre_series_a_employees", label: "Pre-Series A employees", pct: 3.1, kind: "numeric" },
  { key: "people_with_degree_data", label: "Documented education", pct: 2.8, kind: "numeric" },
  { key: "pre_series_a_clevel", label: "C-level coverage", pct: 2.8, kind: "numeric" },
  { key: "round_1", label: "Round 1 amount", pct: 2.6, kind: "numeric" },
  { key: "share_stem_degree", label: "STEM concentration", pct: 2.5, kind: "numeric" },
  { key: "duration_1", label: "Time to first round", pct: 2.3, kind: "numeric" },
];

const MAX = 40;

export function FeatureImportance() {
  return (
    <div className="space-y-3">
      {FEATURES.map((f, i) => (
        <motion.div
          key={f.key}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="group"
        >
          <div className="flex items-baseline justify-between mb-1.5">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={
                  f.kind === "categorical"
                    ? "h-1.5 w-1.5 rounded-full bg-signal-300"
                    : "h-1.5 w-1.5 rounded-full bg-bone-300/60"
                }
              />
              <span className="text-sm text-bone-50 truncate">{f.label}</span>
              <code className="hidden sm:inline font-mono text-[0.65rem] text-[var(--text-muted)] truncate">
                {f.key}
              </code>
            </div>
            <span className="font-mono text-xs text-signal-200 tabular-nums shrink-0 ml-3">
              {f.pct.toFixed(1)}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-ink-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(f.pct / MAX) * 100}%` }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.4, delay: 0.2 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={
                f.kind === "categorical"
                  ? "h-full bg-gradient-to-r from-signal-500/80 via-signal-400 to-signal-300"
                  : "h-full bg-gradient-to-r from-ink-500 to-bone-300/80"
              }
            />
          </div>
        </motion.div>
      ))}

      <div className="pt-4 mt-4 border-t border-signal-400/[0.07] flex items-center justify-between text-xs">
        <span className="font-mono uppercase tracking-[0.15em] text-[var(--text-muted)]">
          8 features → 80% of total gain
        </span>
        <span className="font-mono text-[var(--text-muted)]">LightGBM · gain attribution</span>
      </div>
    </div>
  );
}
