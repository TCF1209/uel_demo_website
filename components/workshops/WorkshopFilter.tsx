"use client";

import { useTransition } from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

const SERVICES = [
  { id: "engine-oil", labelKey: "engineOil" as const },
  { id: "industrial-oil", labelKey: "industrialOil" as const },
  { id: "gear-oil", labelKey: "gearOil" as const },
];

export function WorkshopFilter({
  states,
  serviceLabels,
  labels,
}: {
  states: string[];
  serviceLabels: { engineOil: string; industrialOil: string; gearOil: string };
  labels: {
    state: string;
    services: string;
    search: string;
    searchPlaceholder: string;
    allStates: string;
    clear: string;
  };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentState = searchParams.get("state") ?? "";
  const currentServices = (searchParams.get("services") ?? "")
    .split(",")
    .filter(Boolean);
  const currentQuery = searchParams.get("q") ?? "";

  function pushParams(updates: Record<string, string | string[] | null>) {
    const next = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(updates)) {
      if (value == null || value === "" || (Array.isArray(value) && value.length === 0)) {
        next.delete(key);
      } else if (Array.isArray(value)) {
        next.set(key, value.join(","));
      } else {
        next.set(key, value);
      }
    }
    const qs = next.toString();
    startTransition(() => {
      router.push(`${pathname}${qs ? `?${qs}` : ""}`);
    });
  }

  function toggleService(id: string) {
    const set = new Set(currentServices);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    pushParams({ services: Array.from(set) });
  }

  const hasFilters =
    currentState !== "" || currentServices.length > 0 || currentQuery !== "";

  return (
    <div
      className={`sticky top-16 z-30 border-y border-border-subtle bg-bg-base/90 backdrop-blur-md md:top-20 ${isPending ? "opacity-80" : ""}`}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 md:flex-row md:items-end md:gap-6 md:py-6">
        {/* State */}
        <label className="flex flex-1 flex-col gap-2 md:max-w-[220px]">
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
            {labels.state}
          </span>
          <select
            value={currentState}
            onChange={(e) => pushParams({ state: e.target.value || null })}
            className="h-11 border border-border-strong bg-bg-base px-3 font-mono text-sm text-text-primary focus:border-accent-gold focus:outline-none"
          >
            <option value="">{labels.allStates}</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        {/* Services */}
        <fieldset className="flex flex-col gap-2">
          <legend className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
            {labels.services}
          </legend>
          <div className="flex flex-wrap gap-2">
            {SERVICES.map((s) => {
              const checked = currentServices.includes(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={checked}
                  onClick={() => toggleService(s.id)}
                  className={`h-11 min-w-[44px] border px-3 font-mono text-xs uppercase tracking-widest transition-colors ${
                    checked
                      ? "border-accent-gold bg-accent-gold text-bg-base"
                      : "border-border-strong text-text-secondary hover:border-accent-gold hover:text-accent-gold"
                  }`}
                >
                  {serviceLabels[s.labelKey]}
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Search */}
        <label className="flex flex-1 flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
            {labels.search}
          </span>
          <input
            type="search"
            inputMode="search"
            value={currentQuery}
            placeholder={labels.searchPlaceholder}
            onChange={(e) => pushParams({ q: e.target.value || null })}
            className="h-11 border border-border-strong bg-bg-base px-3 text-base text-text-primary placeholder:text-text-muted focus:border-accent-gold focus:outline-none md:text-sm"
          />
        </label>

        {hasFilters && (
          <button
            type="button"
            onClick={() => pushParams({ state: null, services: null, q: null })}
            className="h-11 self-end border border-border-strong px-4 font-mono text-xs uppercase tracking-widest text-text-secondary hover:border-accent-gold hover:text-accent-gold transition-colors"
          >
            {labels.clear}
          </button>
        )}
      </div>
    </div>
  );
}
