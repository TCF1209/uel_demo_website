import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { routing, type Locale } from "@/i18n/routing";
import {
  getCategory,
  getProduct,
  getRelatedProducts,
  products,
  type ProductCategory,
} from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import { SpecTable } from "@/components/products/SpecTable";
import { whatsappUrl, whatsappMessages } from "@/lib/whatsapp";

const accentEyebrow: Record<"blue" | "red" | "green", string> = {
  blue: "text-accent-blue",
  red: "text-accent-red",
  green: "text-accent-green",
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    products.map((p) => ({ locale, category: p.category, slug: p.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const name = product.name[locale as Locale];
  const cat = getCategory(product.category)?.name[locale as Locale] ?? "";
  return {
    title: `${name} — ${product.viscosity} ${cat}`,
    description: product.shortDescription[locale as Locale],
    openGraph: {
      title: `${name} — ${product.viscosity} ${cat} | UEL Malaysia`,
      description: product.shortDescription[locale as Locale],
      images: [{ url: product.imageUrl }],
    },
  };
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}) {
  const { locale, category, slug } = await params;
  setRequestLocale(locale);

  const product = getProduct(slug);
  if (!product || product.category !== category) notFound();

  const cat = getCategory(product.category);
  if (!cat) notFound();

  const tCommon = await getTranslations("Common");
  const tProducts = await getTranslations("Products");

  const name = product.name[locale as Locale];
  const description = product.description[locale as Locale];
  const catName = cat.name[locale as Locale];
  const related = getRelatedProducts(product.id);

  const specRows = [
    { label: tProducts("specViscosity"), value: product.viscosity },
    ...(product.apiRating ? [{ label: tProducts("specApi"), value: product.apiRating }] : []),
    ...(product.aceaRating ? [{ label: tProducts("specAcea"), value: product.aceaRating }] : []),
    ...(product.jasoRating ? [{ label: tProducts("specJaso"), value: product.jasoRating }] : []),
    ...(product.oemApprovals && product.oemApprovals.length > 0
      ? [{ label: tProducts("specOem"), value: product.oemApprovals.join(", ") }]
      : []),
    { label: tProducts("specSeries"), value: product.series },
    { label: tProducts("specPack"), value: product.packSizes.join(" · ") },
  ];

  // Structured data: Product JSON-LD (brief §10)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    brand: { "@type": "Brand", name: "UEL" },
    image: product.imageUrl,
    category: catName,
    sku: product.id,
    additionalProperty: [
      { "@type": "PropertyValue", name: "Viscosity", value: product.viscosity },
      ...(product.apiRating
        ? [{ "@type": "PropertyValue", name: "API Rating", value: product.apiRating }]
        : []),
    ],
  };

  return (
    <article className="bg-product-warm">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        {/* Breadcrumb */}
        <nav className="font-mono text-xs uppercase tracking-widest text-text-muted">
          <Link href="/" className="hover:text-text-primary transition-colors">
            {tCommon("breadcrumbHome")}
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/products"
            className="hover:text-text-primary transition-colors"
          >
            {tCommon("breadcrumbProducts")}
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/products/${product.category}`}
            className="hover:text-text-primary transition-colors"
          >
            {catName}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text-secondary">{name}</span>
        </nav>

        {/* Hero split */}
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-6">
            <div className="relative aspect-square w-full max-w-2xl mx-auto">
              <Image
                src={product.imageUrl}
                alt={name}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 50vw"
                className="object-contain drop-shadow-[0_30px_60px_rgba(201,160,82,0.18)]"
              />
            </div>
          </div>

          <div className="lg:col-span-6">
            <p
              className={`font-mono text-xs uppercase tracking-[0.25em] ${accentEyebrow[cat.accent]}`}
            >
              {catName} // {product.series}
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[0.95] tracking-tight md:text-6xl">
              {name}
            </h1>

            <p className="mt-8 font-mono text-5xl text-accent-gold md:text-6xl">
              {product.viscosity}
            </p>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
              {description}
            </p>

            {/* Suitable-for pills */}
            {product.suitableFor.length > 0 && (
              <div className="mt-8">
                <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
                  {tProducts("suitableFor")}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {product.suitableFor.map((item, i) => (
                    <li
                      key={i}
                      className="border border-border-strong px-3 py-1 font-mono text-xs uppercase tracking-widest text-text-secondary"
                    >
                      {item[locale as Locale]}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTAs */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl(
                  whatsappMessages.product(name, product.packSizes[0]),
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center bg-whatsapp px-6 font-mono text-xs uppercase tracking-widest text-white"
              >
                {tCommon("whatsappCta")}
              </a>
              <Link
                href="/where-to-buy"
                className="inline-flex h-12 items-center justify-center border border-border-strong px-6 font-mono text-xs uppercase tracking-widest text-text-primary hover:border-accent-gold hover:text-accent-gold transition-colors"
              >
                {tCommon("findWorkshop")}
              </Link>
            </div>
          </div>
        </div>

        {/* Specs + benefits */}
        <div className="mt-20 grid gap-12 md:grid-cols-2 md:gap-16">
          <section>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-gold">
              {tProducts("technical")}
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">
              {tProducts("specifications")}
            </h2>
            <div className="mt-6">
              <SpecTable rows={specRows} />
            </div>
          </section>

          {product.benefits.length > 0 && (
            <section>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-gold">
                {tProducts("performance")}
              </p>
              <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">
                {tProducts("benefits")}
              </h2>
              <ul className="mt-6 space-y-4">
                {product.benefits.map((b, i) => (
                  <li
                    key={i}
                    className="flex gap-4 border-t border-border-subtle pt-4"
                  >
                    <span className="font-mono text-xs text-accent-gold mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-text-primary">
                      {b[locale as Locale]}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Pack sizes */}
        <section className="mt-20">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-gold">
            {tProducts("available")}
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">
            {tProducts("packSizes")}
          </h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {product.packSizes.map((size) => (
              <li
                key={size}
                className="border border-border-strong px-5 py-3 font-mono text-sm tracking-widest text-text-primary"
              >
                {size}
              </li>
            ))}
          </ul>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-24 border-t border-border-subtle pt-16">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-gold">
              {tProducts("related")}
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">
              {tProducts("relatedHeading")}
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ProductCard
                  key={r.id}
                  product={r}
                  locale={locale as Locale}
                  viewLabel={tCommon("viewDetails")}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
