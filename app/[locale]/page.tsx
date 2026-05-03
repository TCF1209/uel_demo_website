import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getFeaturedProduct } from "@/lib/products";
import type { Locale } from "@/i18n/routing";

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

  const hero = getFeaturedProduct();
  const heroName = hero?.name[locale as Locale] ?? "";

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[88vh] overflow-hidden">
        {/* TODO(hero-signature): SVG oil-droplet signature moment with slow rotate (brief §3) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1100px 700px at 78% 40%, rgba(201, 160, 82, 0.18), transparent 60%), radial-gradient(900px 500px at 30% 90%, rgba(43, 111, 184, 0.08), transparent 60%)",
          }}
        />

        <div className="mx-auto grid min-h-[88vh] max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs tracking-[0.25em] text-accent-gold uppercase">
              {t("eyebrow")}
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[0.92] tracking-tight md:text-6xl lg:text-7xl">
              {t("headline")}
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-text-secondary md:text-lg">
              {t("subcopy")}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
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
            </div>
          </div>

          <div className="lg:col-span-7">
            {hero ? (
              <div className="relative mx-auto aspect-square w-full max-w-xl">
                <Image
                  src={hero.imageUrl}
                  alt={heroName}
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 50vw"
                  className="object-contain drop-shadow-[0_30px_60px_rgba(201,160,82,0.15)]"
                />
              </div>
            ) : (
              <div className="aspect-square w-full rounded-sm border border-border-subtle bg-bg-elevated/50 grid place-items-center text-text-muted font-mono text-xs">
                [HERO BOTTLE]
              </div>
            )}
          </div>
        </div>
      </section>

      {/* THREE SERIES STRIP */}
      <section className="border-t border-border-subtle py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-mono text-xs tracking-[0.25em] text-accent-gold uppercase">
            Series
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight md:text-5xl">
            Three categories. One standard.
          </h2>

          <div className="mt-14 grid gap-px overflow-hidden border border-border-subtle md:grid-cols-3">
            <CategoryCard
              href="/products/engine-oil"
              accentClass="before:bg-accent-blue"
              title={tCat("engineOil")}
              desc={tCat("engineOilDesc")}
              meta="9 products"
            />
            <CategoryCard
              href="/products/industrial-oil"
              accentClass="before:bg-accent-red"
              title={tCat("industrialOil")}
              desc={tCat("industrialOilDesc")}
              meta="3 products"
            />
            <CategoryCard
              href="/products/gear-oil"
              accentClass="before:bg-accent-green"
              title={tCat("gearOil")}
              desc={tCat("gearOilDesc")}
              meta="1 product"
            />
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="border-y border-border-subtle bg-bg-elevated">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-16 md:flex-row md:items-center md:py-20">
          <p className="font-display text-2xl tracking-tight md:text-4xl">
            {t("stockistCta")}
          </p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "60123456789"}?text=${encodeURIComponent("Hi, I run a workshop and I'd like to stock UEL.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center bg-whatsapp px-6 font-mono text-xs uppercase tracking-widest text-white"
          >
            {tCommon("whatsappCta")}
          </a>
        </div>
      </section>
    </>
  );
}

function CategoryCard({
  href,
  accentClass,
  title,
  desc,
  meta,
}: {
  href: string;
  accentClass: string;
  title: string;
  desc: string;
  meta: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative bg-bg-base p-8 transition-colors hover:bg-bg-overlay md:p-10 before:absolute before:inset-x-0 before:top-0 before:h-px ${accentClass}`}
    >
      <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
        {meta}
      </p>
      <h3 className="mt-4 font-display text-2xl tracking-tight md:text-3xl">
        {title}
      </h3>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-secondary">
        {desc}
      </p>
      <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-secondary group-hover:text-accent-gold transition-colors">
        View Range →
      </span>
    </Link>
  );
}
