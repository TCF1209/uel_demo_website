"use client";

import { Link, usePathname, routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

const labels: Record<Locale, string> = {
  en: "EN",
  zh: "中",
  ms: "BM",
};

export function LocaleSwitcher({ activeLocale }: { activeLocale: Locale }) {
  // next-intl's usePathname returns the locale-stripped pathname,
  // so passing it to Link with a `locale` prop produces the correct
  // localized URL AND sets the NEXT_LOCALE cookie so middleware
  // doesn't override the choice via Accept-Language detection.
  const pathname = usePathname();

  return (
    <nav aria-label="Language" className="flex items-center gap-1 font-mono text-xs">
      {routing.locales.map((locale, i) => {
        const isActive = locale === activeLocale;
        return (
          <span key={locale} className="flex items-center">
            <Link
              href={pathname}
              locale={locale}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "inline-flex h-11 min-w-[44px] items-center justify-center px-2 transition-colors",
                isActive
                  ? "text-accent-gold"
                  : "text-text-secondary hover:text-text-primary"
              )}
            >
              {labels[locale]}
            </Link>
            {i < routing.locales.length - 1 && (
              <span aria-hidden className="text-border-strong">/</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
