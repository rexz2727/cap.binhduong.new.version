"use client";

import { useState } from "react";

const CATEGORIES = [
  { value: "cu-tru", label: "Cư trú" },
  { value: "cccd", label: "CCCD" },
  { value: "vneid", label: "VNeID" },
  { value: "xe-may", label: "Xe máy" },
  { value: "hanh-chinh", label: "Hành chính" },
  { value: "khac", label: "Khác" },
];

export default function QnaForm() {
  const [form, setForm] = useState({
    question: "",
    askerName: "",
    phone: "",
    category: "hanh-chinh",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.question.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/qna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ question: "", askerName: "", phone: "", category: "hanh-chinh" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-lg font-bold text-green-800 mb-2">Câu hỏi đã được gửi!</h3>
        <p className="text-green-700 text-sm">
          Chúng tôi sẽ trả lời trong thời gian sớm nhất. Câu hỏi sẽ được đăng công khai sau khi có câu trả lời.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-green-700 underline hover:text-green-900"
        >
          Gửi câu hỏi khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Câu hỏi của bạn <span className="text-police-red">*</span>
        </label>
        <textarea
          name="question"
          value={form.question}
          onChange={handleChange}
          rows={4}
          required
          maxLength={1000}
          placeholder="Nhập câu hỏi của bạn..."
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-police-red/30 focus:border-police-red resize-none"
        />
        <p className="text-xs text-gray-400 mt-1 text-right">{form.question.length}/1000</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Họ tên</label>
          <input
            type="text"
            name="askerName"
            value={form.askerName}
            onChange={handleChange}
            maxLength={100}
            placeholder="Họ tên (tùy chọn)"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-police-red/30 focus:border-police-red"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Số điện thoại</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            maxLength={15}
            placeholder="SĐT (tùy chọn)"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-police-red/30 focus:border-police-red"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Lĩnh vực</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-police-red/30 focus:border-police-red bg-white"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">
          Có lỗi xảy ra, vui lòng thử lại.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading" || !form.question.trim()}
        className="w-full bg-police-red hover:bg-police-red-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors duration-150"
      >
        {status === "loading" ? "Đang gửi..." : "Gửi câu hỏi"}
      </button>
    </form>
  );
}
