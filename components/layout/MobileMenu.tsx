"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { whatsappUrl, whatsappMessages } from "@/lib/whatsapp";
import { LocaleSwitcher } from "./LocaleSwitcher";
import type { Locale } from "@/i18n/routing";

const navItems: { href: string; key: keyof NavLabels }[] = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/products", key: "products" },
  { href: "/why-uel", key: "whyUel" },
  { href: "/where-to-buy", key: "whereToBuy" },
  { href: "/contact", key: "contact" },
];

type NavLabels = {
  home: string;
  about: string;
  products: string;
  whyUel: string;
  whereToBuy: string;
  contact: string;
};

export function MobileMenu({
  labels,
  whatsappLabel,
  locale,
}: {
  labels: NavLabels;
  whatsappLabel: string;
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="grid size-11 place-items-center text-text-primary md:hidden"
      >
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="square" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            aria-modal="true"
            role="dialog"
          >
            <div
              className="absolute inset-0 bg-black/70"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-bg-elevated border-l border-border-subtle"
              initial={reduce ? { opacity: 0 } : { x: "100%" }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between border-b border-border-subtle p-6">
                <span className="font-mono text-xs uppercase tracking-widest text-text-muted">Menu</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid size-11 place-items-center text-text-primary"
                >
                  <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M5 5l14 14M19 5L5 19" strokeLinecap="square" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-1 px-6 py-8">
                {navItems.map(({ href, key }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl uppercase tracking-tight py-3 text-text-primary hover:text-accent-gold transition-colors"
                  >
                    {labels[key]}
                  </Link>
                ))}
              </nav>

              <div className="border-t border-border-subtle p-6 space-y-4">
                <LocaleSwitcher activeLocale={locale} />
                <a
                  href={whatsappUrl(whatsappMessages.generic)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-full items-center justify-center gap-2 bg-whatsapp font-mono text-xs uppercase tracking-widest text-white"
                >
                  <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487 1.18.51 2.106.815 2.825 1.044.71.226 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                  </svg>
                  {whatsappLabel}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
