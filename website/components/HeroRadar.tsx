"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Point {
  angle: number;
  radius: number;
  score: number;
  size: number;
}

function generatePoints(count: number): Point[] {
  return Array.from({ length: count }, (_, i) => ({
    angle: (i / count) * Math.PI * 2 + (Math.random() * 0.4 - 0.2),
    radius: 0.25 + Math.random() * 0.7,
    score: Math.random(),
    size: 1 + Math.random() * 3,
  }));
}

export function HeroRadar() {
  const [points, setPoints] = useState<Point[]>([]);
  const [sweep, setSweep] = useState(0);

  useEffect(() => {
    setPoints(generatePoints(80));
  }, []);

  useEffect(() => {
    let frame: number;
    const tick = () => {
      setSweep((s) => (s + 0.3) % 360);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const size = 540;
  const center = size / 2;
  const maxR = size / 2 - 20;

  return (
    <div className="relative aspect-square w-full max-w-[540px]">
      {/* Glow */}
      <div className="absolute inset-8 rounded-full bg-signal-400/[0.08] blur-3xl" />

      <svg viewBox={`0 0 ${size} ${size}`} className="relative w-full h-full">
        <defs>
          <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(62,212,240,0.15)" />
            <stop offset="60%" stopColor="rgba(62,212,240,0.02)" />
            <stop offset="100%" stopColor="rgba(62,212,240,0)" />
          </radialGradient>
          <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(62,212,240,0)" />
            <stop offset="100%" stopColor="rgba(62,212,240,0.7)" />
          </linearGradient>
        </defs>

        {/* Background fill */}
        <circle cx={center} cy={center} r={maxR} fill="url(#radarGrad)" />

        {/* Concentric rings */}
        {[0.25, 0.5, 0.75, 1].map((r, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={maxR * r}
            fill="none"
            stroke="rgba(62,212,240,0.12)"
            strokeWidth="1"
            strokeDasharray={i === 3 ? undefined : "2 4"}
          />
        ))}

        {/* Cross hairs */}
        <line x1={center} y1={center - maxR} x2={center} y2={center + maxR}
              stroke="rgba(62,212,240,0.1)" strokeWidth="1" strokeDasharray="3 5" />
        <line x1={center - maxR} y1={center} x2={center + maxR} y2={center}
              stroke="rgba(62,212,240,0.1)" strokeWidth="1" strokeDasharray="3 5" />

        {/* Diagonal grid lines */}
        {[45, 135].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={center - Math.cos(rad) * maxR}
              y1={center - Math.sin(rad) * maxR}
              x2={center + Math.cos(rad) * maxR}
              y2={center + Math.sin(rad) * maxR}
              stroke="rgba(62,212,240,0.06)"
              strokeWidth="1"
            />
          );
        })}

        {/* Sweep arm */}
        <g style={{ transform: `rotate(${sweep}deg)`, transformOrigin: `${center}px ${center}px` }}>
          <path
            d={`M ${center} ${center} L ${center + maxR} ${center} A ${maxR} ${maxR} 0 0 0 ${
              center + Math.cos(-Math.PI / 6) * maxR
            } ${center + Math.sin(-Math.PI / 6) * maxR} Z`}
            fill="url(#sweepGrad)"
            opacity="0.55"
          />
          <line
            x1={center}
            y1={center}
            x2={center + maxR}
            y2={center}
            stroke="rgba(62,212,240,0.85)"
            strokeWidth="1.5"
          />
        </g>

        {/* Data points */}
        {points.map((p, i) => {
          const x = center + Math.cos(p.angle) * p.radius * maxR;
          const y = center + Math.sin(p.angle) * p.radius * maxR;
          const isHigh = p.score > 0.7;
          const isMed = p.score > 0.4 && p.score <= 0.7;
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={p.size}
              fill={isHigh ? "#3ed4f0" : isMed ? "#e8b04b" : "#3d4a68"}
              opacity={isHigh ? 1 : isMed ? 0.7 : 0.4}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: isHigh ? 1 : isMed ? 0.7 : 0.4 }}
              transition={{ duration: 1.2, delay: 0.4 + i * 0.012, ease: [0.22, 1, 0.36, 1] }}
            />
          );
        })}

        {/* Center node */}
        <circle cx={center} cy={center} r={4} fill="#3ed4f0" />
        <circle cx={center} cy={center} r={8} fill="none" stroke="rgba(62,212,240,0.4)" strokeWidth="1">
          <animate attributeName="r" from="4" to="40" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.6" to="0" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Probability labels around the edge */}
        {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
          <text
            key={i}
            x={center}
            y={center - maxR * p + 4}
            textAnchor="middle"
            fontSize="9"
            fontFamily="var(--font-mono, monospace)"
            fill="rgba(62,212,240,0.5)"
            letterSpacing="1"
          >
            p={p.toFixed(2)}
          </text>
        ))}
      </svg>

      {/* Status corner readouts */}
      <div className="absolute top-0 left-0 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-signal-300/70">
        <div>SCAN · ACTIVE</div>
        <div className="text-[var(--text-muted)] mt-1">N = 12,847</div>
      </div>
      <div className="absolute top-0 right-0 text-right font-mono text-[0.62rem] uppercase tracking-[0.18em] text-signal-300/70">
        <div>P(EXIT) · LIGHT-GBM</div>
        <div className="text-[var(--text-muted)] mt-1">RECALL 0.76</div>
      </div>
      <div className="absolute bottom-0 left-0 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
        TRIAGE · NOT DECISION
      </div>
      <div className="absolute bottom-0 right-0 text-right font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
        PRE-SERIES A
      </div>
    </div>
  );
}
