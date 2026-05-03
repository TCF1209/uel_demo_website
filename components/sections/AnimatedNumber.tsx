"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

/**
 * Counts from 0 → value when scrolled into view.
 * Animation uses requestAnimationFrame with the brief's smooth-out curve.
 * Respects prefers-reduced-motion (renders the final value instantly).
 */
export function AnimatedNumber({
  value,
  duration = 1.6,
  className,
  format,
  suffix,
}: {
  value: number;
  duration?: number;
  className?: string;
  format?: (n: number) => string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = easeOutQuint(t);
      setDisplay(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduce]);

  const rendered = format ? format(display) : display.toLocaleString();

  return (
    <span ref={ref} className={className}>
      {rendered}
      {suffix}
    </span>
  );
}
