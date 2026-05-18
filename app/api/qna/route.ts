import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const CATEGORY_LABELS: Record<string, string> = {
  "cu-tru": "Cư trú",
  "cccd": "CCCD",
  "vneid": "VNeID",
  "xe-may": "Xe máy",
  "hanh-chinh": "Hành chính",
  "khac": "Khác",
};

const qnaSchema = z.object({
  question: z.string().min(10, "Câu hỏi cần ít nhất 10 ký tự").max(1000),
  askerName: z.string().max(100).optional(),
  phone: z
    .string()
    .regex(/^(0|\+84)[0-9]{8,9}$/, "Số điện thoại không hợp lệ")
    .optional()
    .or(z.literal("")),
  category: z.enum(["cu-tru", "cccd", "vneid", "xe-may", "hanh-chinh", "khac"]).optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  const result = qnaSchema.safeParse(body);
  if (!result.success) {
    const firstError = result.error.issues[0]?.message ?? "Dữ liệu không hợp lệ";
    return NextResponse.json({ error: firstError }, { status: 422 });
  }

  const { question, askerName, phone, category } = result.data;
  const categoryLabel = category ? (CATEGORY_LABELS[category] ?? category) : "Chưa phân loại";
  const senderInfo = askerName
    ? `${escapeHtml(askerName)}${phone ? ` — ${escapeHtml(phone)}` : ""}`
    : "Ẩn danh";

  const resendKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (resendKey && contactEmail) {
    const resend = new Resend(resendKey);
    await resend.emails.send({
      from: "Hỏi đáp pháp luật <onboarding@resend.dev>",
      to: contactEmail,
      subject: `[Câu hỏi] ${categoryLabel} — ${new Date().toLocaleDateString("vi-VN")}`,
      html: `
        <h2>Câu hỏi mới từ cổng thông tin Công an phường Bình Dương</h2>
        <hr/>
        <p><strong>Người hỏi:</strong> ${senderInfo}</p>
        <p><strong>Danh mục:</strong> ${escapeHtml(categoryLabel)}</p>
        <p><strong>Nội dung câu hỏi:</strong></p>
        <blockquote style="border-left: 4px solid #C8102E; padding-left: 12px; color: #333;">
          ${escapeHtml(question).replace(/\n/g, "<br/>")}
        </blockquote>
        <hr/>
        <p style="font-size: 12px; color: #888;">Gửi lúc: ${new Date().toLocaleString("vi-VN")}</p>
        <p style="font-size: 12px; color: #888;">Đăng nhập Sanity Studio để trả lời và đăng công khai.</p>
      `,
    });
  }

  return NextResponse.json({ success: true });
}
