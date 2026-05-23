"use client";

import { useState } from "react";
import { QNA_CATEGORY_OPTIONS } from "@/constants/qna";

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
      <div className="form-card" style={{ textAlign: "center", padding: "40px 24px" }}>
        <h3 style={{ color: "var(--navy)", marginBottom: "8px" }}>Câu hỏi đã được gửi!</h3>
        <p style={{ color: "var(--ink-2)", fontSize: "14px" }}>
          Chúng tôi sẽ trả lời trong thời gian sớm nhất. Câu hỏi sẽ được đăng công khai sau khi
          có câu trả lời.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn btn-secondary"
          style={{ marginTop: "16px" }}
        >
          Gửi câu hỏi khác
        </button>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="field">
        <label>
          Câu hỏi của bạn <span className="req">*</span>
        </label>
        <textarea
          name="question"
          value={form.question}
          onChange={handleChange}
          rows={4}
          required
          maxLength={1000}
          placeholder="Nhập câu hỏi của bạn..."
        />
        <span className="help" style={{ textAlign: "right", display: "block" }}>
          {form.question.length}/1000 ký tự
        </span>
      </div>

      <div className="form-row">
        <div className="field">
          <label>Họ tên</label>
          <input
            type="text"
            name="askerName"
            value={form.askerName}
            onChange={handleChange}
            maxLength={100}
            placeholder="Họ tên (tùy chọn)"
          />
        </div>
        <div className="field">
          <label>Số điện thoại</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            maxLength={15}
            placeholder="SĐT (tùy chọn)"
          />
        </div>
      </div>

      <div className="field">
        <label>Lĩnh vực</label>
        <select name="category" value={form.category} onChange={handleChange}>
          {QNA_CATEGORY_OPTIONS.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {status === "error" && (
        <div className="notice">
          <div>Có lỗi xảy ra, vui lòng thử lại.</div>
        </div>
      )}

      <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === "loading" || !form.question.trim()}
          style={{ flex: 1, justifyContent: "center" }}
        >
          {status === "loading" ? "Đang gửi..." : "Gửi câu hỏi"}
        </button>
      </div>
    </form>
  );
}
