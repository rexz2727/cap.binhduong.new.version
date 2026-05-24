"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function FeedbackForm() {
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

  if (status === "success") {
    return (
      <div className="form-card text-center px-6 py-10">
        <svg width="48" height="48" className="text-[var(--green,#16a34a)] mx-auto mb-3">
          <use href="#i-check" />
        </svg>
        <h3 className="text-[var(--navy)] mb-2">Gửi phản ánh thành công!</h3>
        <p className="text-[var(--ink-2)] text-sm">
          Chúng tôi đã nhận được thông tin và sẽ xem xét trong thời gian sớm nhất.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn btn-secondary mt-4"
        >
          Gửi phản ánh khác
        </button>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="field">
          <label>
            Họ và tên <span className="req">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Nguyễn Văn A"
            required
          />
        </div>
        <div className="field">
          <label>
            Số điện thoại <span className="req">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="0912 345 678"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label>Email (tùy chọn)</label>
          <input type="email" name="email" placeholder="email@example.com" />
        </div>
        <div className="field">
          <label>
            Loại phản ánh <span className="req">*</span>
          </label>
          <select name="type" required>
            <option value="">-- Chọn loại phản ánh --</option>
            <option value="toi-pham">Tin báo tội phạm</option>
            <option value="te-nan">Tệ nạn xã hội</option>
            <option value="giao-thong">An toàn giao thông</option>
            <option value="thai-do">Phản ánh thái độ phục vụ</option>
            <option value="kien-nghi">Kiến nghị khác</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label>
          Chủ đề phản ánh <span className="req">*</span>
        </label>
        <input
          type="text"
          name="subject"
          placeholder="Ví dụ: Tụ điểm nghi buôn bán ma túy tại khu phố Hòa Phú 3"
          required
        />
      </div>

      <div className="field">
        <label>Địa điểm cụ thể</label>
        <input
          type="text"
          name="location"
          placeholder="Số nhà, đường, khu phố…"
        />
        <span className="help">
          Cung cấp địa chỉ chi tiết giúp lực lượng chức năng xử lý nhanh chóng.
        </span>
      </div>

      <div className="field">
        <label>
          Nội dung chi tiết <span className="req">*</span>
        </label>
        <textarea
          name="content"
          placeholder="Mô tả chi tiết sự việc: thời gian xảy ra, đối tượng liên quan, hành vi vi phạm…"
          required
        />
        <span className="help">
          Hạn chế: tối đa 2000 ký tự. Cung cấp càng nhiều thông tin càng tốt.
        </span>
      </div>

      <div className="checkbox-row">
        <input type="checkbox" id="anonymous" name="anonymous" />
        <label htmlFor="anonymous">
          Gửi ẩn danh (không hiển thị tên và số điện thoại trong hồ sơ công khai)
        </label>
      </div>

      <div className="checkbox-row">
        <input type="checkbox" id="agree" name="agree" required />
        <label htmlFor="agree">
          Tôi cam đoan thông tin cung cấp là đúng sự thật và chịu trách nhiệm trước
          pháp luật về tố cáo sai sự thật.
        </label>
      </div>

      {status === "error" && (
        <div className="notice mt-1">
          <div>{errorMsg}</div>
        </div>
      )}

      <div className="flex gap-[10px] mt-2">
        <button
          type="submit"
          className="btn btn-primary flex-1 justify-center"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Đang gửi..." : "Gửi phản ánh"}
        </button>
        <button type="reset" className="btn btn-secondary">
          Làm mới
        </button>
      </div>
    </form>
  );
}
