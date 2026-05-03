const FALLBACK_NUMBER = "60123456789";

export function whatsappUrl(message: string, number?: string): string {
  const phone = number ?? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? FALLBACK_NUMBER;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const whatsappMessages = {
  generic: "Hi, I'm interested in UEL products.",
  product: (name: string, packSize?: string) =>
    `Hi, I'd like more info about ${name}${packSize ? ` (${packSize})` : ""}.`,
  workshop: "Hi, I'd like to know about UEL stockists near me.",
  stockist: "Hi, I run a workshop and I'd like to stock UEL.",
};
