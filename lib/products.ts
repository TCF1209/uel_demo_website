import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";

export type Locale = "en" | "zh" | "ms";

export type LocalizedString = Record<Locale, string>;

export type ProductCategory = "engine-oil" | "industrial-oil" | "gear-oil";

export type Product = {
  id: string;
  category: ProductCategory;
  subCategory?: string;
  series: string;
  name: LocalizedString;
  shortDescription: LocalizedString;
  description: LocalizedString;
  viscosity: string;
  apiRating?: string;
  aceaRating?: string;
  jasoRating?: string;
  oemApprovals?: string[];
  packSizes: ("1L" | "4L" | "5L" | "18L" | "208L")[];
  suitableFor: LocalizedString[];
  benefits: LocalizedString[];
  imageUrl: string;
  featured?: boolean;
};

export type Category = {
  id: ProductCategory;
  name: LocalizedString;
  accent: "blue" | "red" | "green";
};

export const products = productsData as Product[];
export const categories = categoriesData as Category[];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProduct(): Product | undefined {
  return products.find((p) => p.featured);
}
