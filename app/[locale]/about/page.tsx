import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { whatsappUrl, whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "About",
  description:
    "UEL Malaysia — Unique Excellent Lubricant. The official Malaysian distributor of UEL engine, industrial and gear oils. Engineering, not marketing.",
};

const rows: { id: 1 | 2 | 3 | 4; image: string; alt: string }[] = [
  { id: 1, image: "/products/engine-oil/ultra-5w30-fully-synthetic.jpeg", alt: "ULTRA 5W-30 Fully Synthetic engine oil bottle" },
  { id: 2, image: "/products/industrial-oil/ultra-aws32.jpeg", alt: "ULTRA AWS 32 hydraulic fluid jerrycan" },
  { id: 3, image: "/products/engine-oil/ultra-hd40.jpeg", alt: "ULTRA HD40 engine oil bottle" },
  { id: 4, image: "/products/gear-oil/ultra-atf-dexron-iii.jpeg", alt: "ULTRA Advanced ATF Dexron III bottle" },
];

const standards = ["API", "ILSAC", "ACEA", "JASO", "ISO VG", "OEM Service Fill"];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");
  const tCommon = await getTranslations("Common");

  return (
    <>
      {/* HERO */}
      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="font-mono text-xs tracking-[0.25em] text-accent-gold uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
            {t("headline")}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            {t("lede")}
          </p>
        </div>
      </section>

      {/* ORIGIN STORY */}
      <section className="border-b border-border-subtle">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="font-mono text-xs tracking-[0.25em] text-accent-gold uppercase">
              {t("storyEyebrow")}
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight tracking-tight md:text-5xl">
              {t("storyHeading")}
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-text-secondary md:text-lg lg:col-span-7 lg:col-start-6">
            <p>{t("storyP1")}</p>
            <p>{t("storyP2")}</p>
            <p>{t("storyP3")}</p>
          </div>
        </div>
      </section>

      {/* MANUFACTURING INTRO */}
      <section>
        <div className="mx-auto max-w-7xl px-6 pt-20 md:pt-28">
          <p className="font-mono text-xs tracking-[0.25em] text-accent-gold uppercase">
            {t("manufacturingEyebrow")}
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl tracking-tight md:text-5xl">
            {t("manufacturingHeading")}
          </h2>
        </div>

        {/* ALTERNATING IMAGE+TEXT ROWS */}
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <ul className="divide-y divide-border-subtle">
            {rows.map((row) => {
              const eyebrow = t(`row${row.id}Eyebrow`);
              const heading = t(`row${row.id}Heading`);
              const body = t(`row${row.id}Body`);
              const reverse = row.id % 2 === 0;
              return (
                <li
                  key={row.id}
                  className={`grid gap-8 py-12 md:py-16 lg:grid-cols-12 lg:items-center lg:gap-16`}
                >
                  <div
                    className={`relative aspect-[4/5] mx-auto w-full max-w-sm lg:col-span-5 ${reverse ? "lg:col-start-8" : ""}`}
                  >
                    <Image
                      src={row.image}
                      alt={row.alt}
                      fill
                      sizes="(max-width: 1024px) 80vw, 35vw"
                      className="object-contain"
                    />
                  </div>
                  <div
                    className={`lg:col-span-6 ${reverse ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-7"}`}
                  >
                    <p className="font-mono text-xs tracking-[0.25em] uppercase text-text-muted">
                      {eyebrow}
                    </p>
                    <h3 className="mt-4 font-display text-2xl leading-tight tracking-tight md:text-4xl">
                      {heading}
                    </h3>
                    <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
                      {body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* STANDARDS / CERTIFICATIONS STRIP */}
      <section className="border-y border-border-subtle bg-bg-elevated">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="font-mono text-xs tracking-[0.25em] uppercase text-accent-gold">
                {t("certEyebrow")}
              </p>
              <h2 className="mt-4 font-display text-3xl tracking-tight md:text-5xl">
                {t("certHeading")}
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-text-secondary md:text-lg">
                {t("certBody")}
              </p>
              <p className="mt-6 max-w-md font-mono text-xs uppercase tracking-widest text-text-muted">
                {t("certHint")}
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-px self-start border border-border-subtle lg:col-span-7 sm:grid-cols-3">
              {standards.map((s) => (
                <li
                  key={s}
                  className="bg-bg-base px-6 py-10 text-center font-mono text-xs uppercase tracking-[0.25em] text-text-secondary"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="border-b border-border-subtle">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-16 md:flex-row md:items-center md:py-20">
          <p className="font-display text-2xl tracking-tight md:text-4xl">
            See the range, find a workshop.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center bg-accent-gold px-6 font-mono text-xs uppercase tracking-widest text-bg-base hover:bg-accent-gold-hi transition-colors"
            >
              {tCommon("explore")}
            </Link>
            <a
              href={whatsappUrl(whatsappMessages.stockist)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center border border-border-strong px-6 font-mono text-xs uppercase tracking-widest text-text-primary hover:border-accent-gold hover:text-accent-gold transition-colors"
            >
              {tCommon("whatsappCta")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
