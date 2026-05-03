"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { whatsappUrl, whatsappMessages } from "@/lib/whatsapp";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/cn";

type NavLabels = {
  home: string;
  about: string;
  products: string;
  whyUel: string;
  whereToBuy: string;
  contact: string;
};

const navItems: { href: string; key: keyof NavLabels }[] = [
  { href: "/about", key: "about" },
  { href: "/products", key: "products" },
  { href: "/why-uel", key: "whyUel" },
  { href: "/where-to-buy", key: "whereToBuy" },
  { href: "/contact", key: "contact" },
];

export function Header({
  labels,
  whatsappLabel,
  locale,
}: {
  labels: NavLabels;
  whatsappLabel: string;
  locale: Locale;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled
          ? "bg-bg-base/80 backdrop-blur-md border-b border-border-subtle"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6 md:h-20">
        <Link href="/" aria-label="UEL home" className="flex items-center gap-3">
          <Image
            src="/brand/logo.jpeg"
            alt="UEL — Unique Excellent Lubricant"
            width={64}
            height={32}
            priority
            className="h-8 w-auto md:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              className="font-mono text-xs uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors px-3 py-2"
            >
              {labels[key]}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <LocaleSwitcher activeLocale={locale} />
          <a
            href={whatsappUrl(whatsappMessages.generic)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 bg-accent-gold px-4 font-mono text-xs uppercase tracking-widest text-bg-base hover:bg-accent-gold-hi transition-colors"
          >
            {whatsappLabel}
          </a>
        </div>

        <MobileMenu labels={labels} whatsappLabel={whatsappLabel} locale={locale} />
      </div>
    </header>
  );
}
