import Image from "next/image";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import type { Product } from "@/lib/products";
import { getCategory } from "@/lib/products";

const accentBorder: Record<"blue" | "red" | "green", string> = {
  blue: "group-hover:border-accent-blue",
  red: "group-hover:border-accent-red",
  green: "group-hover:border-accent-green",
};

export function ProductCard({
  product,
  locale,
  viewLabel,
}: {
  product: Product;
  locale: Locale;
  viewLabel: string;
}) {
  const cat = getCategory(product.category);
  const accent = cat?.accent ?? "blue";
  const name = product.name[locale];
  const short = product.shortDescription[locale];

  return (
    <Link
      href={`/products/${product.category}/${product.id}`}
      className={`group relative flex flex-col bg-bg-elevated border border-border-subtle ${accentBorder[accent]} transition-colors [perspective:1000px]`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-bg-base">
        <Image
          src={product.imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-contain p-6 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(4deg)_scale(1.05)]"
        />
        {/* viscosity reveal — slides up from bottom on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-bg-base/95 via-bg-base/70 to-transparent px-6 pb-4 pt-10 font-mono text-[10px] uppercase tracking-[0.25em] text-accent-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
        >
          {product.viscosity} · {product.packSizes.join(" · ")}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 border-t border-border-subtle p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-accent-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5">
          {product.viscosity}
        </p>
        <h3 className="font-display text-lg leading-tight tracking-tight md:text-xl">
          {name}
        </h3>
        <p className="text-sm leading-relaxed text-text-secondary line-clamp-2">
          {short}
        </p>
        <span className="mt-auto pt-2 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-secondary group-hover:text-accent-gold transition-colors">
          {viewLabel}{" "}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
