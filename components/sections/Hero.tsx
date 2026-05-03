"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { SignatureDroplet } from "./SignatureDroplet";

const ease = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: {},
  shown: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const reducedItemVariants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.4 } },
};

// Three slot positions, fixed in space — bottles cycle through them.
const slots = [
  {
    name: "center",
    // largest, frontmost, no rotation
    className: "left-1/2 top-[6%] w-[55%] -translate-x-1/2 z-20",
    delay: 0,
  },
  {
    name: "left",
    // back-left, smaller, tilted
    className: "left-[6%] top-[14%] w-[42%] z-10 rotate-[-7deg]",
    delay: 0.15,
  },
  {
    name: "right",
    // back-right, smaller, tilted
    className: "right-[6%] top-[18%] w-[40%] z-10 rotate-[7deg]",
    delay: 0.3,
  },
] as const;

type SlotName = typeof slots[number]["name"];
type Scene = Record<SlotName, { src: string; alt: string }>;

// Scenes the composition cycles through. Each scene picks visually
// distinctive bottles so the change is noticeable but the depth layout
// stays the same.
const scenes: Scene[] = [
  {
    center: { src: "/products/engine-oil/ultra-hd40.jpeg", alt: "ULTRA Engine Oil HD40" },
    left: { src: "/products/engine-oil/ultra-5w30-fully-synthetic.jpeg", alt: "ULTRA 5W-30 Fully Synthetic" },
    right: { src: "/products/engine-oil/ultra-10w30.jpeg", alt: "ULTRA Engine Oil 10W-30" },
  },
  {
    center: { src: "/products/engine-oil/ultra-5w30-fully-synthetic.jpeg", alt: "ULTRA 5W-30 Fully Synthetic" },
    left: { src: "/products/engine-oil/ultra-15w40-mineral.jpeg", alt: "ULTRA Engine Oil 15W-40 Premium Mineral" },
    right: { src: "/products/engine-oil/ultra-20w50.jpeg", alt: "ULTRA Engine Oil 20W-50" },
  },
  {
    center: { src: "/products/engine-oil/ultra-10w40-semi-synthetic.jpeg", alt: "ULTRA 10W-40 Semi Synthetic" },
    left: { src: "/products/engine-oil/ultra-5w30-semi-synthetic.jpeg", alt: "ULTRA 5W-30 Semi Synthetic" },
    right: { src: "/products/engine-oil/ultra-15w40-semi-synthetic.jpeg", alt: "ULTRA 15W-40 Semi Synthetic" },
  },
  {
    center: { src: "/products/engine-oil/ultra-20w50.jpeg", alt: "ULTRA Engine Oil 20W-50" },
    left: { src: "/products/engine-oil/ultra-hd40.jpeg", alt: "ULTRA Engine Oil HD40" },
    right: { src: "/products/gear-oil/ultra-atf-dexron-iii.jpeg", alt: "ULTRA Advanced ATF Dexron III" },
  },
];

const SCENE_INTERVAL_MS = 5000;

export function Hero() {
  const t = useTranslations("Home");
  const tCommon = useTranslations("Common");
  const reduce = useReducedMotion();
  const item = reduce ? reducedItemVariants : itemVariants;

  const [sceneIdx, setSceneIdx] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setSceneIdx((i) => (i + 1) % scenes.length);
    }, SCENE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  const currentScene = scenes[sceneIdx];

  return (
    <section className="relative overflow-hidden">
      {/* Ambient gradient — flow effect via animated background-position (CSS) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hero-flow"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="shown"
        className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-6 pt-6 pb-20 md:gap-12 md:pt-10 md:pb-28 lg:grid-cols-12"
      >
        <div className="lg:col-span-5">
          <motion.p
            variants={item}
            className="font-mono text-xs tracking-[0.25em] text-accent-gold uppercase"
          >
            {t("eyebrow")}
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-6 font-display text-5xl leading-[0.92] tracking-tight md:text-6xl lg:text-7xl"
          >
            {t("headline")}
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 max-w-md text-base leading-relaxed text-text-secondary md:text-lg"
          >
            {t("subcopy")}
          </motion.p>
          <motion.div
            variants={item}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/products"
              className="inline-flex h-12 min-w-[44px] items-center justify-center bg-accent-gold px-6 font-mono text-xs uppercase tracking-widest text-bg-base transition-colors hover:bg-accent-gold-hi"
            >
              {tCommon("explore")}
            </Link>
            <Link
              href="/where-to-buy"
              className="inline-flex h-12 min-w-[44px] items-center justify-center border border-border-strong px-6 font-mono text-xs uppercase tracking-widest text-text-primary transition-colors hover:border-accent-gold hover:text-accent-gold"
            >
              {tCommon("findWorkshop")}
            </Link>
          </motion.div>
        </div>

        {/* Bottle composition + signature droplet — slots fixed, contents cycle */}
        <motion.div variants={item} className="lg:col-span-7">
          <div className="relative mx-auto aspect-[5/6] w-full max-w-xl">
            <SignatureDroplet className="absolute inset-0 z-0 h-full w-full scale-[1.1]" />

            {slots.map((slot) => {
              const bottle = currentScene[slot.name];
              return (
                <div
                  key={slot.name}
                  className={`absolute aspect-[3/4] ${slot.className}`}
                  style={{ transformOrigin: "center bottom" }}
                >
                  <AnimatePresence mode="sync">
                    <motion.div
                      key={bottle.src}
                      className="absolute inset-0"
                      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                      animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
                      transition={{
                        duration: 0.9,
                        ease,
                        delay: slot.delay,
                      }}
                    >
                      <Image
                        src={bottle.src}
                        alt={bottle.alt}
                        fill
                        sizes="(max-width: 1024px) 60vw, 35vw"
                        priority={slot.name === "center" && sceneIdx === 0}
                        className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)]"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        .hero-flow {
          background:
            radial-gradient(900px 600px at 78% 38%, rgba(201,160,82,0.18), transparent 60%),
            radial-gradient(700px 500px at 28% 88%, rgba(43,111,184,0.07), transparent 65%);
          background-size: 140% 140%;
          background-position: 0% 0%;
          animation: hero-flow 24s ease-in-out infinite alternate;
        }
        @keyframes hero-flow {
          0%   { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-flow { animation: none; }
        }
      `}</style>
    </section>
  );
}
