import * as React from "react";

interface LogoProps {
  size?: number;
  className?: string;
  showWordmark?: boolean;
  showTagline?: boolean;
}

export function AugurLogo({ size = 40, className = "", showWordmark = false, showTagline = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Augur"
      >
        {/* Outer circle — partial arc, signal cyan */}
        <path
          d="M 32 6 A 26 26 0 1 1 14 14"
          stroke="currentColor"
          className="text-signal-300"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* The "A" mark — clean geometric */}
        <path
          d="M 20 50 L 32 18 L 44 50 M 24.5 40 L 39.5 40"
          stroke="currentColor"
          className="text-bone-50"
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />
        {/* Signal dot — the "augury" point of light */}
        <circle cx="46" cy="14" r="2.6" className="fill-signal-300" />
        {/* Subtle baseline dot */}
        <circle cx="32" cy="56" r="1.5" className="fill-signal-300/70" />
      </svg>
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-bone-50 tracking-[0.22em] text-[1.1rem] font-medium uppercase">
            Augur
          </span>
          {showTagline && (
            <span className="font-mono text-[0.6rem] text-signal-300/70 mt-1 tracking-[0.15em] uppercase">
              Read the signal · Back the founder
            </span>
          )}
        </div>
      )}
    </div>
  );
}
