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

const reducedItemVariants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.4 } },
};

// Bottles cycled in the film-strip — pulled from the engine-oil range so
// the strip reads as a coherent product band, not random SKUs.
const stripBottles = [
  { src: "/products/engine-oil/ultra-hd40.jpeg", alt: "ULTRA Engine Oil HD40" },
  { src: "/products/engine-oil/ultra-5w30-fully-synthetic.jpeg", alt: "ULTRA 5W-30 Fully Synthetic" },
  { src: "/products/engine-oil/ultra-10w30.jpeg", alt: "ULTRA Engine Oil 10W-30" },
  { src: "/products/engine-oil/ultra-20w50.jpeg", alt: "ULTRA Engine Oil 20W-50" },
  { src: "/products/engine-oil/ultra-5w30-semi-synthetic.jpeg", alt: "ULTRA 5W-30 Semi Synthetic" },
  { src: "/products/engine-oil/ultra-10w40-semi-synthetic.jpeg", alt: "ULTRA 10W-40 Semi Synthetic" },
];

export function Hero() {
  const t = useTranslations("Home");
  const tCommon = useTranslations("Common");
  const reduce = useReducedMotion();
  const item = reduce ? reducedItemVariants : itemVariants;

  // Duplicate for seamless loop. Animate -50% so the second half lands
  // exactly where the first half started.
  const stripDoubled = [...stripBottles, ...stripBottles];

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

        {/* Bottle film-strip + signature droplet */}
        <motion.div variants={item} className="lg:col-span-7">
          <div className="relative mx-auto aspect-[5/6] w-full max-w-xl overflow-hidden">
            <SignatureDroplet className="absolute inset-0 z-0 h-full w-full scale-[1.1]" />

            {/* Edge fades — soft cinematic vignette so bottles enter and exit gracefully */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-30 w-16 bg-gradient-to-r from-bg-base to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 z-30 w-16 bg-gradient-to-l from-bg-base to-transparent"
            />

            <motion.div
              className="absolute inset-y-[8%] left-0 z-10 flex items-center gap-6"
              animate={reduce ? undefined : { x: ["0%", "-50%"] }}
              transition={
                reduce
                  ? undefined
                  : { duration: 50, ease: "linear", repeat: Infinity }
              }
            >
              {stripDoubled.map((b, i) => (
                <div
                  key={`${b.src}-${i}`}
                  className="relative aspect-[3/4] h-full w-auto flex-shrink-0"
                  style={{
                    height: "100%",
                  }}
                >
                  <div className="relative h-full" style={{ aspectRatio: "3 / 4" }}>
                    <Image
                      src={b.src}
                      alt={b.alt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 30vw"
                      priority={i === 0}
                      className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)]"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
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
