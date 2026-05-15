"use client";

import { motion } from "framer-motion";

interface ProbabilityDialProps {
  score: number;
  confidence: number;
}

export function ProbabilityDial({ score, confidence }: ProbabilityDialProps) {
  const tier = score >= 0.7 ? "high" : score >= 0.4 ? "medium" : "low";
  const color = tier === "high" ? "#3ed4f0" : tier === "medium" ? "#e8b04b" : "#5d6b85";
  const label = tier === "high" ? "FORWARD" : tier === "medium" ? "REVIEW" : "FILTER";

  // Arc from -135° to +135° = 270° sweep
  const size = 240;
  const r = 96;
  const cx = size / 2;
  const cy = size / 2;
  const startAngle = (-225 * Math.PI) / 180;
  const endAngle = (45 * Math.PI) / 180;
  const totalSweep = 270;
  const valueSweep = score * totalSweep;
  const valueEndAngle = startAngle + (valueSweep * Math.PI) / 180;

  const arc = (start: number, end: number) => {
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const largeArc = end - start > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  // Tick marks every 0.1
  const ticks = Array.from({ length: 11 }, (_, i) => {
    const t = i / 10;
    const angle = startAngle + (t * totalSweep * Math.PI) / 180;
    const r1 = r + 4;
    const r2 = r + (i % 5 === 0 ? 14 : 9);
    return {
      x1: cx + r1 * Math.cos(angle),
      y1: cy + r1 * Math.sin(angle),
      x2: cx + r2 * Math.cos(angle),
      y2: cy + r2 * Math.sin(angle),
      label: i % 5 === 0 ? t.toFixed(1) : null,
      labelX: cx + (r + 26) * Math.cos(angle),
      labelY: cy + (r + 26) * Math.sin(angle),
    };
  });

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size + 60} height={size + 30} viewBox={`-30 0 ${size + 60} ${size + 30}`}>
        <defs>
          <linearGradient id="dialGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="1" />
          </linearGradient>
          <filter id="dialGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background arc */}
        <path d={arc(startAngle, endAngle)} stroke="rgba(62,212,240,0.08)" strokeWidth="10" fill="none" strokeLinecap="round" />

        {/* Value arc */}
        <motion.path
          d={arc(startAngle, valueEndAngle)}
          stroke="url(#dialGrad)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          filter="url(#dialGlow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Ticks */}
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="rgba(62,212,240,0.25)" strokeWidth="1" />
            {t.label && (
              <text
                x={t.labelX}
                y={t.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                fontFamily="var(--font-mono, monospace)"
                fill="rgba(155,168,194,0.7)"
              >
                {t.label}
              </text>
            )}
          </g>
        ))}

        {/* Center readout */}
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize="11" fontFamily="var(--font-mono, monospace)" fill="rgba(155,168,194,0.6)" letterSpacing="2">
          P(EXIT)
        </text>
        <motion.text
          x={cx}
          y={cy + 36}
          textAnchor="middle"
          fontSize="56"
          fontFamily="Fraunces, serif"
          fontWeight="300"
          fill="#f7f5ef"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {score.toFixed(2)}
        </motion.text>

        {/* Bottom badge */}
        <rect
          x={cx - 50}
          y={cy + 56}
          width={100}
          height={22}
          rx={11}
          fill={color}
          fillOpacity="0.12"
          stroke={color}
          strokeOpacity="0.4"
        />
        <text
          x={cx}
          y={cy + 71}
          textAnchor="middle"
          fontSize="10"
          fontFamily="var(--font-mono, monospace)"
          fill={color}
          letterSpacing="2"
        >
          {label}
        </text>
      </svg>
    </div>
  );
}
