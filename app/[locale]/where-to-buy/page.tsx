import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import workshopsData from "@/data/workshops.json";
import { WorkshopCard, type Workshop } from "@/components/workshops/WorkshopCard";
import { WorkshopFilter } from "@/components/workshops/WorkshopFilter";
import { whatsappUrl, whatsappMessages } from "@/lib/whatsapp";

const workshops = workshopsData as Workshop[];

export const metadata: Metadata = {
  title: "Where to Buy",
  description:
    "Find UEL at partner workshops across Malaysia. Filter by state and service to locate the closest stockist for the grade you need.",
};

export default async function WhereToBuyPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ state?: string; services?: string; q?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations("WhereToBuy");
  const tCat = await getTranslations("Categories");

  const stateFilter = sp.state ?? "";
  const servicesFilter = (sp.services ?? "").split(",").filter(Boolean);
  const query = (sp.q ?? "").trim().toLowerCase();

  const filtered = workshops.filter((w) => {
    if (stateFilter && w.state !== stateFilter) return false;
    if (servicesFilter.length > 0) {
      const hasAll = servicesFilter.every((s) => w.services.includes(s as Workshop["services"][number]));
      if (!hasAll) return false;
    }
    if (query) {
      const haystack = `${w.name} ${w.city} ${w.address}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });

  const allStates = Array.from(new Set(workshops.map((w) => w.state))).sort();

  // LocalBusiness JSON-LD per workshop (brief §10)
  const jsonLd = filtered.map((w) => ({
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    name: w.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: w.address,
      addressLocality: w.city,
      addressRegion: w.state,
      addressCountry: "MY",
    },
    telephone: w.phone,
    geo: {
      "@type": "GeoCoordinates",
      latitude: w.coords.lat,
      longitude: w.coords.lng,
    },
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-accent-gold">
            {t("eyebrow")}
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[0.95] tracking-tight md:text-6xl">
            {t("headline")}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            {t("lede", { count: workshops.length })}
          </p>
        </div>
      </section>

      {/* FILTER (sticky) */}
      <WorkshopFilter
        states={allStates}
        serviceLabels={{
          engineOil: tCat("engineOil"),
          industrialOil: tCat("industrialOil"),
          gearOil: tCat("gearOil"),
        }}
        labels={{
          state: t("filterStateLabel"),
          services: t("filterServicesLabel"),
          search: t("filterSearchLabel"),
          searchPlaceholder: t("filterSearchPlaceholder"),
          allStates: t("filterAllStates"),
          clear: t("clearFilters"),
        }}
      />

      {/* RESULTS + MAP */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
          <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
            {t("resultsCount", { count: filtered.length })}
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
            {/* List */}
            <div className="lg:col-span-7">
              {filtered.length === 0 ? (
                <p className="border border-border-subtle bg-bg-elevated p-8 text-base text-text-secondary md:p-10">
                  {t("noResults")}
                </p>
              ) : (
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {filtered.map((w) => (
                    <li key={w.id}>
                      <WorkshopCard
                        workshop={w}
                        callLabel={t("callCta")}
                        whatsappLabel={t("whatsappCta")}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Map placeholder */}
            <aside className="lg:col-span-5">
              <div className="sticky top-44 border border-border-subtle bg-bg-elevated">
                <div className="aspect-[4/5] grid place-items-center p-8 text-center">
                  <div className="max-w-xs">
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      className="mx-auto size-10 text-text-muted"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    >
                      <path d="M12 22s7-7.58 7-13a7 7 0 1 0-14 0c0 5.42 7 13 7 13Z" strokeLinejoin="round" />
                      <circle cx="12" cy="9" r="2.4" />
                    </svg>
                    <p className="mt-6 font-mono text-xs uppercase tracking-widest text-accent-gold">
                      {t("mapPlaceholderTitle")}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      {t("mapPlaceholderBody")}
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* STOCKIST CTA */}
      <section className="border-t border-border-subtle bg-bg-elevated">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:grid-cols-12 md:items-center md:py-20">
          <div className="md:col-span-7">
            <p className="font-mono text-xs uppercase tracking-widest text-accent-gold">
              {t("stockistEyebrow")}
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">
              {t("stockistHeading")}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
              {t("stockistBody")}
            </p>
          </div>
          <div className="md:col-span-5 md:justify-self-end">
            <a
              href={whatsappUrl(whatsappMessages.stockist)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center bg-whatsapp px-6 font-mono text-xs uppercase tracking-widest text-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
