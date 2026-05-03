"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function ScrollReveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section";
}) {
  const reduce = useReducedMotion();
  const Component = as === "section" ? motion.section : motion.div;

  return (
    <Component
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </Component>
  );
}
