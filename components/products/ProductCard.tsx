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
      className={`group relative flex flex-col bg-bg-elevated border border-border-subtle ${accentBorder[accent]} transition-colors`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-bg-base">
        <Image
          src={product.imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-contain p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 border-t border-border-subtle p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-accent-gold">
          {product.viscosity}
        </p>
        <h3 className="font-display text-lg leading-tight tracking-tight md:text-xl">
          {name}
        </h3>
        <p className="text-sm leading-relaxed text-text-secondary line-clamp-2">
          {short}
        </p>
        <span className="mt-auto pt-2 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-secondary group-hover:text-accent-gold transition-colors">
          {viewLabel} →
        </span>
      </div>
    </Link>
  );
}
