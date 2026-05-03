"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
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

const bottleVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  shown: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease } },
};

const reducedItemVariants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.4 } },
};

const bottles = [
  // back-left, smaller
  {
    src: "/products/engine-oil/ultra-5w30-fully-synthetic.jpeg",
    alt: "ULTRA 5W-30 Fully Synthetic",
    className: "left-[6%] top-[14%] w-[42%] z-10 rotate-[-7deg]",
    delay: 0.12,
  },
  // back-right, smaller
  {
    src: "/products/engine-oil/ultra-10w30.jpeg",
    alt: "ULTRA 10W-30",
    className: "right-[6%] top-[18%] w-[40%] z-10 rotate-[7deg]",
    delay: 0.18,
  },
  // center, largest, frontmost
  {
    src: "/products/engine-oil/ultra-hd40.jpeg",
    alt: "ULTRA Engine Oil HD40",
    className: "left-1/2 top-[6%] w-[55%] -translate-x-1/2 z-20",
    delay: 0.05,
  },
] as const;

export function Hero() {
  const t = useTranslations("Home");
  const tCommon = useTranslations("Common");
  const reduce = useReducedMotion();
  const item = reduce ? reducedItemVariants : itemVariants;
  const bottle = reduce ? reducedItemVariants : bottleVariants;

  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      {/* Ambient gradient — flow effect via animated background-position (CSS) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hero-flow"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="shown"
        className="mx-auto grid min-h-[88vh] max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-12"
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

        {/* Bottle composition + signature droplet */}
        <div className="lg:col-span-7">
          <div className="relative mx-auto aspect-[5/6] w-full max-w-xl">
            <SignatureDroplet className="absolute inset-0 z-0 h-full w-full scale-[1.1]" />

            {bottles.map((b) => (
              <motion.div
                key={b.src}
                variants={bottle}
                className={`absolute aspect-[3/4] ${b.className}`}
                style={{ transformOrigin: "center bottom" }}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={b.src}
                    alt={b.alt}
                    fill
                    sizes="(max-width: 1024px) 60vw, 35vw"
                    priority={b.src.includes("hd40")}
                    className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)]"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
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
