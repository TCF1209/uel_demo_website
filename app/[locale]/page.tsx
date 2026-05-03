import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import {
  categories,
  getProductsByCategory,
} from "@/lib/products";
import type { Locale } from "@/i18n/routing";
import { Hero } from "@/components/sections/Hero";
import { ScrollReveal } from "@/components/sections/ScrollReveal";
import { AnimatedNumber } from "@/components/sections/AnimatedNumber";
import { whatsappUrl, whatsappMessages } from "@/lib/whatsapp";

const accentTop: Record<"blue" | "red" | "green", string> = {
  blue: "before:bg-accent-blue",
  red: "before:bg-accent-red",
  green: "before:bg-accent-green",
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const tCommon = await getTranslations("Common");
  const tCat = await getTranslations("Categories");

  return (
    <>
      <Hero />

      {/* THREE SERIES STRIP */}
      <ScrollReveal as="section" className="border-t border-border-subtle py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-mono text-xs tracking-[0.25em] text-accent-gold uppercase">
            Series
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight md:text-5xl">
            Three categories. One standard.
          </h2>

          <div className="mt-14 grid gap-px overflow-hidden border border-border-subtle md:grid-cols-3">
            {categories.map((cat) => {
              const count = getProductsByCategory(cat.id).length;
              const name = cat.name[locale as Locale];
              const descKey = (
                {
                  "engine-oil": "engineOilDesc",
                  "industrial-oil": "industrialOilDesc",
                  "gear-oil": "gearOilDesc",
                } as const
              )[cat.id];
              return (
                <Link
                  key={cat.id}
                  href={`/products/${cat.id}`}
                  className={`group relative bg-bg-base p-8 transition-colors hover:bg-bg-overlay md:p-10 before:absolute before:inset-x-0 before:top-0 before:h-px ${accentTop[cat.accent]}`}
                >
                  <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
                    <AnimatedNumber value={count} /> {count === 1 ? "product" : "products"}
                  </p>
                  <h3 className="mt-4 font-display text-2xl tracking-tight md:text-3xl">
                    {name}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-secondary">
                    {tCat(descKey)}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-secondary group-hover:text-accent-gold transition-colors">
                    {tCommon("viewRange")} →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* CTA BAND */}
      <ScrollReveal as="section" className="border-y border-border-subtle bg-bg-elevated">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-16 md:flex-row md:items-center md:py-20">
          <p className="font-display text-2xl tracking-tight md:text-4xl">
            {t("stockistCta")}
          </p>
          <a
            href={whatsappUrl(whatsappMessages.stockist)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center bg-whatsapp px-6 font-mono text-xs uppercase tracking-widest text-white"
          >
            {tCommon("whatsappCta")}
          </a>
        </div>
      </ScrollReveal>
    </>
  );
}
