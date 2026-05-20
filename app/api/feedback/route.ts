import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const feedbackSchema = z.object({
  fullName: z.string().min(2, "Vui lòng nhập họ tên (ít nhất 2 ký tự)").max(100),
  phone: z.string().regex(/^(0|\+84)[0-9]{8,9}$/, "Số điện thoại không hợp lệ"),
  subject: z.string().min(5, "Vui lòng nhập chủ đề (ít nhất 5 ký tự)").max(200),
  content: z.string().min(20, "Nội dung phản ánh cần ít nhất 20 ký tự").max(5000),
  anonymous: z.boolean().optional(),
});

export async function POST(request: Request) {
  if (!checkRateLimit(getClientIp(request))) {
    return NextResponse.json(
      { error: "Bạn đã gửi quá nhiều lần. Vui lòng thử lại sau ít phút." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  const result = feedbackSchema.safeParse(body);
  if (!result.success) {
    const firstError = result.error.issues[0]?.message ?? "Dữ liệu không hợp lệ";
    return NextResponse.json({ error: firstError }, { status: 422 });
  }

  const { fullName, phone, subject, content, anonymous } = result.data;
  const senderLabel = anonymous ? "Người gửi ẩn danh" : `${escapeHtml(fullName)} (${escapeHtml(phone)})`;

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "Cổng Phản ánh <onboarding@resend.dev>",
    to: process.env.CONTACT_EMAIL!,
    subject: `[Phản ánh] ${subject}`,
    html: `
      <h2>Phản ánh mới từ cổng thông tin Công an phường Bình Dương</h2>
      <hr/>
      <p><strong>Người gửi:</strong> ${senderLabel}</p>
      <p><strong>Chủ đề:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Nội dung:</strong></p>
      <blockquote style="border-left: 4px solid #C8102E; padding-left: 12px; color: #333;">
        ${escapeHtml(content).replace(/\n/g, "<br/>")}
      </blockquote>
      <hr/>
      <p style="font-size: 12px; color: #888;">Gửi lúc: ${new Date().toLocaleString("vi-VN")}</p>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Không thể gửi phản ánh. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
