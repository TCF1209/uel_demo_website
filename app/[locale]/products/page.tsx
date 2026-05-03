import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { categories, getProductsByCategory } from "@/lib/products";
import type { Locale } from "@/i18n/routing";
import { AnimatedNumber } from "@/components/sections/AnimatedNumber";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Engine oils, industrial oils, and gear oils — UEL Malaysia full product range.",
};

export default async function ProductsHub({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tCat = await getTranslations("Categories");
  const tCommon = await getTranslations("Common");

  const accentTop: Record<"blue" | "red" | "green", string> = {
    blue: "before:bg-accent-blue",
    red: "before:bg-accent-red",
    green: "before:bg-accent-green",
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <p className="font-mono text-xs tracking-[0.25em] text-accent-gold uppercase">
        Series 01 // Range
      </p>
      <h1 className="mt-4 font-display text-5xl tracking-tight md:text-7xl">
        Engineered range. <br className="hidden md:block" />
        Built for Malaysia.
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
        Three categories, one engineering standard. Browse the full UEL ULTRA
        lineup or jump straight to what your engine needs.
      </p>

      <div className="mt-16 grid gap-px overflow-hidden border border-border-subtle md:grid-cols-3">
        {categories.map((cat) => {
          const count = getProductsByCategory(cat.id).length;
          const name = cat.name[locale as Locale];
          const descKey = (
            { "engine-oil": "engineOilDesc", "industrial-oil": "industrialOilDesc", "gear-oil": "gearOilDesc" } as const
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
              <h2 className="mt-4 font-display text-3xl tracking-tight md:text-4xl">
                {name}
              </h2>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-secondary">
                {tCat(descKey)}
              </p>
              <span className="mt-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-secondary group-hover:text-accent-gold transition-colors">
                {tCommon("viewRange")} →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
