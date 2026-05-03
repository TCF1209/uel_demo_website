import { Link } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { LocaleSwitcher } from "./LocaleSwitcher";

type FooterLabels = {
  nav: { about: string; products: string; whyUel: string; whereToBuy: string; contact: string };
  tagline: string;
  rights: string;
  ssm: string;
};

export function Footer({ labels, locale }: { labels: FooterLabels; locale: Locale }) {
  return (
    <footer className="border-t border-border-subtle bg-bg-elevated">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-display text-2xl tracking-tight">UEL</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-text-muted">
              {labels.tagline}
            </p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-text-secondary">
              {/* TODO: client-confirm short brand statement */}
              Premium engine, industrial, and gear oils. Engineered and tested for Malaysian roads.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-xs uppercase tracking-widest text-text-muted">Site</p>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-text-secondary hover:text-accent-gold transition-colors">{labels.nav.about}</Link></li>
              <li><Link href="/products" className="text-text-secondary hover:text-accent-gold transition-colors">{labels.nav.products}</Link></li>
              <li><Link href="/why-uel" className="text-text-secondary hover:text-accent-gold transition-colors">{labels.nav.whyUel}</Link></li>
              <li><Link href="/where-to-buy" className="text-text-secondary hover:text-accent-gold transition-colors">{labels.nav.whereToBuy}</Link></li>
              <li><Link href="/contact" className="text-text-secondary hover:text-accent-gold transition-colors">{labels.nav.contact}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-xs uppercase tracking-widest text-text-muted">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              {/* TODO: client-confirm HQ address, phone, email */}
              <li>Kuala Lumpur, Malaysia</li>
              <li>+60 12-345 6789</li>
              <li>hello@ueloil.com</li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono text-xs uppercase tracking-widest text-text-muted">Language</p>
            <div className="mt-2">
              <LocaleSwitcher activeLocale={locale} />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-border-subtle pt-8 font-mono text-xs uppercase tracking-widest text-text-muted md:flex-row md:items-center md:justify-between">
          <span>{labels.rights}</span>
          <span>{labels.ssm}</span>
        </div>
      </div>
    </footer>
  );
}
