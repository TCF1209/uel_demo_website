import { setRequestLocale, getTranslations } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* TODO(hero): replace with full Hero composition — bottle stack right, gold radial behind, framer entrance stagger (section 5.1) */}
      <section className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-6 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-mono text-xs tracking-widest text-accent-gold uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="mt-6 font-display text-4xl leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
            {t("headline")}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-text-secondary md:text-lg">
            {t("subcopy")}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="/products"
              className="inline-flex h-12 min-w-[44px] items-center justify-center bg-accent-gold px-6 font-mono text-xs uppercase tracking-widest text-bg-base transition-colors hover:bg-accent-gold-hi"
            >
              Explore Products
            </a>
            <a
              href="/where-to-buy"
              className="inline-flex h-12 min-w-[44px] items-center justify-center border border-border-strong px-6 font-mono text-xs uppercase tracking-widest text-text-primary transition-colors hover:border-accent-gold hover:text-accent-gold"
            >
              Find a Workshop
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          {/* TODO(hero): three-bottle composition with radial gold glow + slow rotate signature moment */}
          <div className="aspect-square w-full rounded-sm border border-border-subtle bg-bg-elevated/50 grid place-items-center text-text-muted font-mono text-xs">
            [HERO BOTTLE COMPOSITION — placeholder]
          </div>
        </div>
      </section>
    </main>
  );
}
