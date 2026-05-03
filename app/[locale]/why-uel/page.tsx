import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { whatsappUrl, whatsappMessages } from "@/lib/whatsapp";
import {
  categories,
  getProductsByCategory,
  products,
} from "@/lib/products";
import workshopsData from "@/data/workshops.json";

export const metadata: Metadata = {
  title: "Why UEL",
  description:
    "Five technical arguments for UEL — climate, engineering, network, range, transparency. The case for UEL is on the spec sheet, not the packaging.",
};

const sections: { id: 1 | 2 | 3 | 4 | 5; image: string; alt: string }[] = [
  {
    id: 1,
    image: "/products/engine-oil/ultra-hd40.jpeg",
    alt: "ULTRA HD40 engine oil bottle",
  },
  {
    id: 2,
    image: "/products/engine-oil/ultra-5w30-fully-synthetic.jpeg",
    alt: "ULTRA 5W-30 Fully Synthetic engine oil bottle",
  },
  {
    id: 3,
    image: "/products/engine-oil/ultra-15w40-adventure.jpeg",
    alt: "ULTRA 4x4 Adventure 15W-40 7.5L bucket",
  },
  {
    id: 4,
    image: "/products/industrial-oil/ultra-aws68.jpeg",
    alt: "ULTRA Hydraulic Fluid AWS 68 industrial bucket",
  },
  {
    id: 5,
    image: "/products/gear-oil/ultra-atf-dexron-iii.jpeg",
    alt: "ULTRA Advanced ATF Dexron III bottle",
  },
];

export default async function WhyUelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("WhyUel");
  const tCommon = await getTranslations("Common");

  const stats = [
    { value: products.length, label: t("statProductsLabel") },
    { value: categories.length, label: t("statCategoriesLabel") },
    { value: workshopsData.length, label: t("statWorkshopsLabel") },
    { value: 3, label: t("statLocalesLabel") },
  ];

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

      {/* 5 ALTERNATING SECTIONS */}
      <ul className="divide-y divide-border-subtle">
        {sections.map((section) => {
          const reverse = section.id % 2 === 0;
          const eyebrow = t(`s${section.id}Eyebrow`);
          const heading = t(`s${section.id}Heading`);
          const body = t(`s${section.id}Body`);
          return (
            <li key={section.id}>
              <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-12 lg:items-center lg:gap-16 md:py-28">
                <div
                  className={`relative aspect-[4/5] mx-auto w-full max-w-md lg:col-span-5 ${reverse ? "lg:col-start-8" : ""}`}
                >
                  <Image
                    src={section.image}
                    alt={section.alt}
                    fill
                    sizes="(max-width: 1024px) 80vw, 35vw"
                    className="object-contain"
                  />
                </div>
                <div
                  className={`lg:col-span-6 ${reverse ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-7"}`}
                >
                  <p className="font-mono text-xs tracking-[0.25em] uppercase text-accent-gold">
                    {eyebrow}
                  </p>
                  <h2 className="mt-4 font-display text-3xl leading-tight tracking-tight md:text-5xl">
                    {heading}
                  </h2>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
                    {body}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* STATS BAND */}
      <section className="border-y border-border-subtle bg-bg-elevated">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-accent-gold">
            {t("statsHeading")}
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-px border border-border-subtle md:grid-cols-4">
            {stats.map((s) => (
              <li
                key={s.label}
                className="bg-bg-base px-6 py-10 md:py-14"
              >
                <p className="font-display text-5xl tracking-tight text-accent-gold md:text-6xl">
                  {s.value}
                </p>
                <p className="mt-3 font-mono text-xs uppercase tracking-widest text-text-muted">
                  {s.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2 className="max-w-2xl font-display text-3xl tracking-tight md:text-5xl">
                {t("ctaHeading")}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
                {t("ctaBody")}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
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
                className="inline-flex h-12 items-center justify-center bg-whatsapp px-6 font-mono text-xs uppercase tracking-widest text-white"
              >
                {tCommon("whatsappCta")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
