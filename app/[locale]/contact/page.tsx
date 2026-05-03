import type { Metadata } from "next";
import QRCode from "qrcode";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { whatsappUrl, whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to UEL Malaysia — WhatsApp for fastest reply, or send an inquiry through the form for distributor, stockist, and product questions.",
};

async function generateWhatsAppQr(target: string): Promise<string> {
  return QRCode.toString(target, {
    type: "svg",
    margin: 1,
    color: { dark: "#F5F2ED", light: "#13131600" },
    width: 320,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");
  const tCommon = await getTranslations("Common");

  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "60123456789";
  const waLink = whatsappUrl(whatsappMessages.generic, phoneNumber);
  const qrSvg = await generateWhatsAppQr(waLink);

  return (
    <>
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
            {t("lede")}
          </p>
        </div>
      </section>

      {/* WHATSAPP QR BAND */}
      <section className="border-b border-border-subtle bg-bg-elevated">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-gold">
              {t("qrTitle")}
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight md:text-5xl">
              WhatsApp.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-text-secondary md:text-lg">
              {t("qrBody")}
            </p>
            <p className="mt-6 max-w-md font-mono text-xs uppercase tracking-widest text-text-muted">
              {t("qrFallback")}
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-12 items-center justify-center bg-whatsapp px-6 font-mono text-xs uppercase tracking-widest text-white"
            >
              {tCommon("whatsappCta")}
            </a>
          </div>
          <div className="md:col-span-7">
            <div className="relative mx-auto max-w-[320px] border border-border-subtle bg-bg-base p-6 md:max-w-[360px] md:p-8">
              <div
                aria-label="Scan to open WhatsApp chat"
                className="aspect-square w-full text-text-primary [&_svg]:h-full [&_svg]:w-full"
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
              <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted">
                {phoneNumber}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FORM + INFO */}
      <section>
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-12 md:gap-16 md:py-24">
          {/* Form */}
          <div className="md:col-span-7">
            <InquiryForm
              labels={{
                nameLabel: t("formNameLabel"),
                namePlaceholder: t("formNamePlaceholder"),
                phoneLabel: t("formPhoneLabel"),
                phonePlaceholder: t("formPhonePlaceholder"),
                emailLabel: t("formEmailLabel"),
                emailPlaceholder: t("formEmailPlaceholder"),
                typeLabel: t("formTypeLabel"),
                typeGeneral: t("formTypeGeneral"),
                typeDistributor: t("formTypeDistributor"),
                typeStockist: t("formTypeStockist"),
                typeProduct: t("formTypeProduct"),
                messageLabel: t("formMessageLabel"),
                messagePlaceholder: t("formMessagePlaceholder"),
                submit: t("formSubmit"),
                submitting: t("formSubmitting"),
                successTitle: t("formSuccessTitle"),
                successBody: t("formSuccessBody"),
                errorMessage: t("formError"),
              }}
            />
          </div>

          {/* Info */}
          <aside className="md:col-span-5">
            <div className="border border-border-subtle bg-bg-elevated p-6 md:p-8">
              <p className="font-mono text-xs tracking-[0.25em] uppercase text-accent-gold">
                {t("infoEyebrow")}
              </p>
              <dl className="mt-6 space-y-5">
                <Row label={t("infoHQLabel")} value={t("infoHQValue")} />
                <Row label={t("infoPhoneLabel")} value={`+${phoneNumber}`} />
                <Row label={t("infoEmailLabel")} value="hello@ueloil.com" />
                <Row label={t("infoHoursLabel")} value={t("infoHoursValue")} />
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-border-subtle pt-4">
      <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted">
        {label}
      </dt>
      <dd className="mt-1 text-base text-text-primary">{value}</dd>
    </div>
  );
}
