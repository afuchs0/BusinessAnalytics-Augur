"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.6,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (latest) =>
    `${prefix}${latest.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`
  );

  useEffect(() => {
    if (inView) {
      const controls = animate(motionVal, value, {
        duration,
        ease: [0.22, 1, 0.36, 1],
      });
      return controls.stop;
    }
  }, [inView, motionVal, value, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}
