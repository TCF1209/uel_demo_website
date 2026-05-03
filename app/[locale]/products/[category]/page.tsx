import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { routing, type Locale } from "@/i18n/routing";
import {
  categories,
  getCategory,
  getProductsByCategory,
  type ProductCategory,
} from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import { AnimatedNumber } from "@/components/sections/AnimatedNumber";

const accentEyebrow: Record<"blue" | "red" | "green", string> = {
  blue: "text-accent-blue",
  red: "text-accent-red",
  green: "text-accent-green",
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    categories.map((cat) => ({ locale, category: cat.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  const cat = getCategory(category as ProductCategory);
  if (!cat) return {};
  const name = cat.name[locale as Locale];
  return {
    title: name,
    description: `${name} — UEL Malaysia full range.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  setRequestLocale(locale);

  const cat = getCategory(category as ProductCategory);
  if (!cat) notFound();

  const tCommon = await getTranslations("Common");
  const tCat = await getTranslations("Categories");
  const productsInCat = getProductsByCategory(cat.id);
  const name = cat.name[locale as Locale];
  const descKey = (
    {
      "engine-oil": "engineOilDesc",
      "industrial-oil": "industrialOilDesc",
      "gear-oil": "gearOilDesc",
    } as const
  )[cat.id];

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      {/* Breadcrumb */}
      <nav className="font-mono text-xs uppercase tracking-widest text-text-muted">
        <Link href="/" className="hover:text-text-primary transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-text-primary transition-colors">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text-secondary">{name}</span>
      </nav>

      {/* Header */}
      <header className="mt-10 max-w-3xl">
        <p
          className={`font-mono text-xs uppercase tracking-[0.25em] ${accentEyebrow[cat.accent]}`}
        >
          Category
        </p>
        <h1 className="mt-4 font-display text-5xl tracking-tight md:text-7xl">
          {name}
        </h1>
        <p className="mt-6 text-base leading-relaxed text-text-secondary md:text-lg">
          {tCat(descKey)}
        </p>
        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-text-muted">
          <AnimatedNumber value={productsInCat.length} />{" "}
          {productsInCat.length === 1 ? "product" : "products"}
        </p>
      </header>

      {/* Grid */}
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {productsInCat.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            locale={locale as Locale}
            viewLabel={tCommon("viewDetails")}
          />
        ))}
      </div>
    </div>
  );
}
