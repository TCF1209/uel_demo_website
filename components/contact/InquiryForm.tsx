"use client";

import { useState } from "react";
import type { InquiryType } from "@/lib/inquiry";

type Labels = {
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  typeLabel: string;
  typeGeneral: string;
  typeDistributor: string;
  typeStockist: string;
  typeProduct: string;
  messageLabel: string;
  messagePlaceholder: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  errorMessage: string;
};

export function InquiryForm({ labels }: { labels: Labels }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      phone: data.get("phone"),
      email: data.get("email"),
      type: data.get("type") as InquiryType,
      message: data.get("message"),
      website: data.get("website"), // honeypot
    };

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        setErrorMsg(json?.error ?? labels.errorMessage);
        setStatus("error");
        return;
      }
      setStatus("ok");
      form.reset();
    } catch {
      setErrorMsg(labels.errorMessage);
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="border border-accent-gold bg-bg-elevated p-8 md:p-10">
        <p className="font-mono text-xs uppercase tracking-widest text-accent-gold">✓ OK</p>
        <h3 className="mt-3 font-display text-2xl tracking-tight md:text-3xl">
          {labels.successTitle}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-text-secondary">
          {labels.successBody}
        </p>
      </div>
    );
  }

  const types: { value: InquiryType; label: string }[] = [
    { value: "general", label: labels.typeGeneral },
    { value: "distributor", label: labels.typeDistributor },
    { value: "stockist", label: labels.typeStockist },
    { value: "product", label: labels.typeProduct },
  ];

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Honeypot — visually hidden from real users */}
      <div aria-hidden className="hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field name="name" label={labels.nameLabel} placeholder={labels.namePlaceholder} required minLength={2} />
        <Field name="phone" label={labels.phoneLabel} placeholder={labels.phonePlaceholder} required type="tel" minLength={6} />
      </div>

      <Field name="email" label={labels.emailLabel} placeholder={labels.emailPlaceholder} required type="email" />

      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
          {labels.typeLabel}
        </span>
        <select
          name="type"
          required
          defaultValue="general"
          className="mt-2 h-12 w-full border border-border-strong bg-bg-base px-3 font-mono text-sm text-text-primary focus:border-accent-gold focus:outline-none"
        >
          {types.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
          {labels.messageLabel}
        </span>
        <textarea
          name="message"
          required
          minLength={5}
          maxLength={4000}
          rows={6}
          placeholder={labels.messagePlaceholder}
          className="mt-2 w-full border border-border-strong bg-bg-base p-3 text-base text-text-primary placeholder:text-text-muted focus:border-accent-gold focus:outline-none resize-y md:text-sm"
        />
      </label>

      {status === "error" && errorMsg && (
        <p className="border border-accent-red bg-accent-red/10 p-4 font-mono text-xs uppercase tracking-widest text-accent-red">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-12 items-center justify-center bg-accent-gold px-6 font-mono text-xs uppercase tracking-widest text-bg-base hover:bg-accent-gold-hi transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? labels.submitting : labels.submit}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  placeholder,
  required,
  type = "text",
  minLength,
}: {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  type?: string;
  minLength?: number;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        minLength={minLength}
        placeholder={placeholder}
        className="mt-2 h-12 w-full border border-border-strong bg-bg-base px-3 text-base text-text-primary placeholder:text-text-muted focus:border-accent-gold focus:outline-none md:text-sm"
      />
    </label>
  );
}
