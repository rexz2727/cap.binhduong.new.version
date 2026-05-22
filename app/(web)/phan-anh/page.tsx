"use client";

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";

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
        title="Phản ánh trực tuyến"
        breadcrumbs={[{ label: "Phản ánh trực tuyến" }]}
        description="Gửi tin báo tội phạm, kiến nghị, phản ánh đến Công an phường Bình Dương. Mọi thông tin được bảo mật theo Luật Tố cáo 2018."
      />

      <section className="block">
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: "32px",
            alignItems: "flex-start",
          }}
        >
          <div>
            <div className="notice">
              <svg className="ic">
                <use href="#i-warn" />
              </svg>
              <div>
                <b>Lưu ý quan trọng:</b> Đây là kênh tiếp nhận thông tin{" "}
                <b>phi khẩn cấp</b>. Trong trường hợp nguy hiểm tính mạng hoặc đang xảy ra
                tội phạm, hãy gọi ngay <b>113</b>.
              </div>
            </div>

            {status === "success" ? (
              <div className="form-card" style={{ textAlign: "center", padding: "40px 24px" }}>
                <svg width="48" height="48" style={{ color: "var(--green, #16a34a)", margin: "0 auto 12px" }}>
                  <use href="#i-check" />
                </svg>
                <h3 style={{ color: "var(--navy)", marginBottom: "8px" }}>Gửi phản ánh thành công!</h3>
                <p style={{ color: "var(--ink-2)", fontSize: "14px" }}>
                  Chúng tôi đã nhận được thông tin và sẽ xem xét trong thời gian sớm nhất.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="btn btn-secondary"
                  style={{ marginTop: "16px" }}
                >
                  Gửi phản ánh khác
                </button>
              </div>
            ) : (
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
                  <div className="notice" style={{ marginTop: "4px" }}>
                    <div>{errorMsg}</div>
                  </div>
                )}

                <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={status === "loading"}
                    style={{ flex: 1, justifyContent: "center" }}
                  >
                    {status === "loading" ? "Đang gửi..." : "Gửi phản ánh"}
                  </button>
                  <button type="reset" className="btn btn-secondary">
                    Làm mới
                  </button>
                </div>
              </form>
            )}
          </div>

          <aside style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              className="form-card"
              style={{
                background: "var(--navy)",
                color: "white",
                border: "none",
                padding: "24px",
              }}
            >
              <div
                style={{
                  fontSize: "11.5px",
                  color: "var(--gold)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "6px",
                }}
              >
                Khẩn cấp
              </div>
              <div
                style={{
                  fontSize: "48px",
                  fontWeight: 800,
                  color: "var(--gold)",
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                113
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.75)",
                  marginTop: "6px",
                }}
              >
                Gọi ngay khi có sự việc đang xảy ra hoặc cần can thiệp trực tiếp.
              </div>
            </div>

            <div className="form-card" style={{ padding: "22px" }}>
              <h3
                style={{
                  margin: "0 0 14px",
                  color: "var(--navy)",
                  fontSize: "15px",
                  fontWeight: 700,
                }}
              >
                Quy trình xử lý phản ánh
              </h3>
              <ol
                style={{
                  margin: 0,
                  paddingLeft: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  fontSize: "13.5px",
                  color: "var(--ink-2)",
                }}
              >
                {[
                  {
                    n: 1,
                    title: "Tiếp nhận",
                    body: "Ngay khi gửi, hệ thống cấp mã hồ sơ. Trong 4 giờ làm việc cán bộ trực sẽ xem xét.",
                  },
                  {
                    n: 2,
                    title: "Phân loại",
                    body: "Hồ sơ được chuyển đến bộ phận nghiệp vụ phù hợp xử lý theo thẩm quyền.",
                  },
                  {
                    n: 3,
                    title: "Phản hồi",
                    body: "Trong 24 giờ làm việc, người phản ánh sẽ nhận tin nhắn/email phản hồi tiến độ.",
                  },
                  {
                    n: 4,
                    title: "Xử lý",
                    body: "Lực lượng chức năng kiểm tra, xác minh và xử lý theo đúng quy định pháp luật.",
                  },
                ].map(({ n, title, body }) => (
                  <li
                    key={n}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "24px 1fr",
                      gap: "10px",
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        background: "var(--navy)",
                        color: "white",
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        fontSize: "11px",
                        fontWeight: 700,
                      }}
                    >
                      {n}
                    </span>
                    <span>
                      <b style={{ color: "var(--navy)" }}>{title}</b> · {body}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="form-card" style={{ padding: "22px" }}>
              <h3
                style={{
                  margin: "0 0 12px",
                  color: "var(--navy)",
                  fontSize: "15px",
                  fontWeight: 700,
                }}
              >
                Tra cứu hồ sơ đã gửi
              </h3>
              <div className="field" style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  placeholder="Nhập mã hồ sơ (VD: PA-2026-00123)"
                />
              </div>
              <button
                type="button"
                className="btn btn-navy"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Tra cứu
              </button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
