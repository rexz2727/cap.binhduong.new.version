"use client";

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import { SITE } from "@/constants/site";

type Status = "idle" | "loading" | "success" | "error";

export default function FeedbackPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      content: (form.elements.namedItem("content") as HTMLTextAreaElement).value,
      anonymous: (form.elements.namedItem("anonymous") as HTMLInputElement).checked,
    };

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error ?? "Có lỗi xảy ra");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setErrorMsg("Không thể kết nối máy chủ. Vui lòng thử lại.");
      setStatus("error");
    }
  }

  return (
    <>
      <PageHeader
        title="Phản ánh Trực tuyến"
        breadcrumbs={[{ label: "Phản ánh trực tuyến" }]}
        description="Gửi tin báo tội phạm hoặc kiến nghị đến Công an phường"
      />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-6 text-sm text-yellow-800">
          <strong>Lưu ý:</strong> Đây là kênh tiếp nhận thông tin phi khẩn cấp. Trong
          trường hợp nguy hiểm tính mạng, hãy gọi ngay <strong>{SITE.hotline}</strong>.
        </div>

        {status === "success" ? (
          <div className="bg-green-50 border border-green-300 rounded-lg p-6 text-center">
            <p className="text-2xl mb-2">✅</p>
            <h3 className="font-bold text-green-800 text-lg">Gửi phản ánh thành công!</h3>
            <p className="text-green-700 text-sm mt-1">
              Chúng tôi đã nhận được thông tin và sẽ xem xét trong thời gian sớm nhất.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-4 text-sm text-police-red underline"
            >
              Gửi phản ánh khác
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-police-red"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="0912345678"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-police-red"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Chủ đề phản ánh <span className="text-red-500">*</span>
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                placeholder="Ví dụ: Tụ điểm nghi buôn bán ma túy tại..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-police-red"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Nội dung chi tiết <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                rows={6}
                required
                placeholder="Mô tả chi tiết sự việc, địa điểm, thời gian, đối tượng liên quan (nếu biết)..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-police-red resize-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="anonymous"
                name="anonymous"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-police-red focus:ring-police-red"
              />
              <label htmlFor="anonymous" className="text-sm text-gray-600">
                Gửi ẩn danh (không hiển thị tên và số điện thoại)
              </label>
            </div>

            {status === "error" && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">
                {errorMsg}
              </p>
            )}

            <Button type="submit" disabled={status === "loading"} className="w-full">
              {status === "loading" ? "Đang gửi..." : "Gửi phản ánh"}
            </Button>
          </form>
        )}
      </div>
    </>
  );
}
