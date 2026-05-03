import type { Metadata } from "next";
import { Archivo_Black, Manrope, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import "../globals.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  variable: "--font-archivo-black",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "UEL Malaysia — Unique Excellent Lubricant",
    template: "%s | UEL Malaysia",
  },
  description:
    "Premium engine, industrial, and gear oils. Engineered and tested for Malaysian roads. Find UEL at workshops nationwide.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  const tNav = await getTranslations("Nav");
  const tCommon = await getTranslations("Common");
  const tFooter = await getTranslations("Footer");

  const navLabels = {
    home: tNav("home"),
    about: tNav("about"),
    products: tNav("products"),
    whyUel: tNav("whyUel"),
    whereToBuy: tNav("whereToBuy"),
    contact: tNav("contact"),
  };

  const footerLabels = {
    nav: navLabels,
    tagline: tFooter("tagline"),
    rights: tFooter("rights", { year: new Date().getFullYear() }),
    ssm: tFooter("ssm"),
  };

  return (
    <html
      lang={locale}
      className={`${archivoBlack.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-bg-base text-text-primary font-sans antialiased">
        <NextIntlClientProvider>
          <Header
            labels={navLabels}
            whatsappLabel={tCommon("whatsappCta")}
            locale={locale as Locale}
          />
          <main className="pt-16 md:pt-20">{children}</main>
          <Footer labels={footerLabels} locale={locale as Locale} />
          <FloatingWhatsApp />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
