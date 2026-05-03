export type InquiryType =
  | "general"
  | "distributor"
  | "stockist"
  | "product";

export const inquiryTypes: InquiryType[] = [
  "general",
  "distributor",
  "stockist",
  "product",
];

export type InquiryPayload = {
  name: string;
  phone: string;
  email: string;
  type: InquiryType;
  message: string;
  // Honeypot — must be empty to pass.
  website?: string;
};

export type InquiryResult =
  | { ok: true }
  | { ok: false; error: string; field?: keyof InquiryPayload };

export function validateInquiry(input: unknown): InquiryResult & { payload?: InquiryPayload } {
  if (!input || typeof input !== "object") {
    return { ok: false, error: "Invalid request body" };
  }
  const i = input as Record<string, unknown>;

  // Honeypot trip — silently fail looking like success.
  if (typeof i.website === "string" && i.website.length > 0) {
    return { ok: true };
  }

  const name = typeof i.name === "string" ? i.name.trim() : "";
  const phone = typeof i.phone === "string" ? i.phone.trim() : "";
  const email = typeof i.email === "string" ? i.email.trim() : "";
  const type = typeof i.type === "string" ? i.type.trim() : "";
  const message = typeof i.message === "string" ? i.message.trim() : "";

  if (name.length < 2) return { ok: false, error: "Name too short", field: "name" };
  if (name.length > 200) return { ok: false, error: "Name too long", field: "name" };
  if (phone.length < 6) return { ok: false, error: "Phone too short", field: "phone" };
  if (phone.length > 30) return { ok: false, error: "Phone too long", field: "phone" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { ok: false, error: "Email invalid", field: "email" };
  if (!inquiryTypes.includes(type as InquiryType))
    return { ok: false, error: "Inquiry type invalid", field: "type" };
  if (message.length < 5) return { ok: false, error: "Message too short", field: "message" };
  if (message.length > 4000) return { ok: false, error: "Message too long", field: "message" };

  return {
    ok: true,
    payload: { name, phone, email, type: type as InquiryType, message },
  };
}
