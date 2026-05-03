"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

const labels: Record<Locale, string> = {
  en: "EN",
  zh: "中",
  ms: "BM",
};

export function LocaleSwitcher({ activeLocale }: { activeLocale: Locale }) {
  const pathname = usePathname();

  function pathFor(target: Locale) {
    const segments = pathname.split("/").filter(Boolean);
    const isPrefixed = (routing.locales as readonly string[]).includes(segments[0] ?? "");
    const rest = isPrefixed ? segments.slice(1) : segments;
    const restPath = rest.length ? `/${rest.join("/")}` : "";
    if (target === routing.defaultLocale) return restPath || "/";
    return `/${target}${restPath}`;
  }

  return (
    <nav aria-label="Language" className="flex items-center gap-1 font-mono text-xs">
      {routing.locales.map((locale, i) => {
        const isActive = locale === activeLocale;
        return (
          <span key={locale} className="flex items-center">
            <Link
              href={pathFor(locale)}
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
