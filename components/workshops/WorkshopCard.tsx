import { whatsappUrl, whatsappMessages } from "@/lib/whatsapp";

export type Workshop = {
  id: string;
  name: string;
  address: string;
  state: string;
  city: string;
  phone: string;
  whatsapp: string;
  services: ("engine-oil" | "industrial-oil" | "gear-oil")[];
  coords: { lat: number; lng: number };
};

const serviceAccent: Record<Workshop["services"][number], string> = {
  "engine-oil": "border-accent-blue text-accent-blue",
  "industrial-oil": "border-accent-red text-accent-red",
  "gear-oil": "border-accent-green text-accent-green",
};

const serviceLabel: Record<Workshop["services"][number], string> = {
  "engine-oil": "Engine",
  "industrial-oil": "Industrial",
  "gear-oil": "Gear",
};

export function WorkshopCard({
  workshop,
  callLabel,
  whatsappLabel,
}: {
  workshop: Workshop;
  callLabel: string;
  whatsappLabel: string;
}) {
  return (
    <article className="border border-border-subtle bg-bg-elevated p-6 md:p-8">
      <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
        {workshop.state} · {workshop.city}
      </p>
      <h3 className="mt-3 font-display text-xl tracking-tight md:text-2xl">
        {workshop.name}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
        {workshop.address}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {workshop.services.map((s) => (
          <li
            key={s}
            className={`border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${serviceAccent[s]}`}
          >
            {serviceLabel[s]}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <a
          href={`tel:${workshop.phone.replace(/\s/g, "")}`}
          className="inline-flex h-11 flex-1 items-center justify-center border border-border-strong px-4 font-mono text-xs uppercase tracking-widest text-text-primary hover:border-accent-gold hover:text-accent-gold transition-colors"
        >
          {callLabel}
        </a>
        <a
          href={whatsappUrl(whatsappMessages.workshop, workshop.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 flex-1 items-center justify-center bg-whatsapp px-4 font-mono text-xs uppercase tracking-widest text-white"
        >
          {whatsappLabel}
        </a>
      </div>
    </article>
  );
}
