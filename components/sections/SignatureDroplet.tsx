"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The homepage signature moment (brief §3): a large 3D-feeling oil droplet
 * built from layered radial gradients with a slow continuous rotation.
 * Sits behind the hero bottle composition as the "soft radial gold glow."
 */
export function SignatureDroplet({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.svg
      viewBox="-100 -100 200 200"
      className={`pointer-events-none ${className}`}
      aria-hidden
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
      animate={reduce ? { opacity: 0.85 } : { opacity: 0.85, scale: 1 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <defs>
        <radialGradient id="droplet-core" cx="35%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#E5C07B" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#C9A052" stopOpacity="0.55" />
          <stop offset="80%" stopColor="#0A0A0B" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="droplet-rim" cx="50%" cy="50%" r="50%">
          <stop offset="78%" stopColor="#C9A052" stopOpacity="0" />
          <stop offset="92%" stopColor="#C9A052" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#C9A052" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="droplet-deep" cx="65%" cy="78%" r="65%">
          <stop offset="0%" stopColor="#15110D" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#0A0A0B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Slow rotating layer (skipped under reduced motion) */}
      <motion.g
        animate={reduce ? undefined : { rotate: 360 }}
        transition={
          reduce ? undefined : { duration: 60, ease: "linear", repeat: Infinity }
        }
        style={{ transformOrigin: "0 0" }}
      >
        <circle cx="0" cy="0" r="92" fill="url(#droplet-core)" />
        <circle cx="0" cy="0" r="92" fill="url(#droplet-rim)" />
        <circle cx="0" cy="0" r="92" fill="url(#droplet-deep)" />
      </motion.g>

      {/* Counter-rotating soft highlight to add subtle motion contrast */}
      <motion.ellipse
        cx="-22"
        cy="-30"
        rx="32"
        ry="14"
        fill="#E5C07B"
        opacity="0.18"
        animate={reduce ? undefined : { rotate: -360 }}
        transition={
          reduce ? undefined : { duration: 80, ease: "linear", repeat: Infinity }
        }
        style={{ transformOrigin: "0 0" }}
      />
    </motion.svg>
  );
}
