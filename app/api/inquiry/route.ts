import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateInquiry, type InquiryType } from "@/lib/inquiry";

export const runtime = "nodejs";

const typeLabel: Record<InquiryType, string> = {
  general: "General inquiry",
  distributor: "Become a distributor",
  stockist: "Workshop stockist",
  product: "Product question",
};

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = validateInquiry(body);
  if (!result.ok) {
    return NextResponse.json(
      { error: result.error, field: result.field },
      { status: 400 },
    );
  }
  if (!result.payload) {
    // Honeypot tripped — pretend success.
    return NextResponse.json({ ok: true });
  }

  const { name, phone, email, type, message } = result.payload;
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.INQUIRY_RECIPIENT_EMAIL;
  const fromAddress = process.env.INQUIRY_FROM_EMAIL ?? "noreply@resend.dev";

  if (!apiKey || !recipient) {
    // Dev fallback — log instead of failing so the form is testable
    // without a Resend key. Production must set both env vars.
    console.warn("[inquiry] RESEND_API_KEY or INQUIRY_RECIPIENT_EMAIL missing — logging payload only");
    console.info("[inquiry] payload", { name, phone, email, type, message });
    return NextResponse.json({ ok: true, transport: "log" });
  }

  const resend = new Resend(apiKey);
  const subject = `[UEL site] ${typeLabel[type]} — ${name}`;
  const text = [
    `Inquiry type: ${typeLabel[type]}`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: recipient,
      replyTo: email,
      subject,
      text,
    });
    if (error) {
      console.error("[inquiry] resend error", error);
      return NextResponse.json({ error: "Send failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[inquiry] threw", err);
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
