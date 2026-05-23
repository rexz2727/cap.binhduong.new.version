import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import FeedbackForm from "@/components/forms/FeedbackForm";
import { getFeedbackProcess } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Phản ánh trực tuyến | Công an phường Bình Dương",
};

const DEFAULT_PROCESS_STEPS = [
  {
    _key: "1",
    title: "Tiếp nhận",
    body: "Ngay khi gửi, hệ thống cấp mã hồ sơ. Trong 4 giờ làm việc cán bộ trực sẽ xem xét.",
  },
  {
    _key: "2",
    title: "Phân loại",
    body: "Hồ sơ được chuyển đến bộ phận nghiệp vụ phù hợp xử lý theo thẩm quyền.",
  },
  {
    _key: "3",
    title: "Phản hồi",
    body: "Trong 24 giờ làm việc, người phản ánh sẽ nhận tin nhắn/email phản hồi tiến độ.",
  },
  {
    _key: "4",
    title: "Xử lý",
    body: "Lực lượng chức năng kiểm tra, xác minh và xử lý theo đúng quy định pháp luật.",
  },
];

export default async function FeedbackPage() {
  const feedbackProcess = await getFeedbackProcess();

  const pageDescription =
    feedbackProcess?.pageDescription ??
    "Gửi tin báo tội phạm, kiến nghị, phản ánh đến Công an phường Bình Dương. Mọi thông tin được bảo mật theo Luật Tố cáo 2018.";
  const warningNotice =
    feedbackProcess?.warningNotice ??
    "Đây là kênh tiếp nhận thông tin phi khẩn cấp. Trong trường hợp nguy hiểm tính mạng hoặc đang xảy ra tội phạm, hãy gọi ngay 113.";
  const emergencyDesc =
    feedbackProcess?.emergencyDesc ??
    "Gọi ngay khi có sự việc đang xảy ra hoặc cần can thiệp trực tiếp.";
  const processSteps =
    feedbackProcess?.processSteps && feedbackProcess.processSteps.length > 0
      ? feedbackProcess.processSteps
      : DEFAULT_PROCESS_STEPS;

  return (
    <>
      <PageHeader
        title="Phản ánh trực tuyến"
        breadcrumbs={[{ label: "Phản ánh trực tuyến" }]}
        description={pageDescription}
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
                <b>Lưu ý quan trọng:</b> {warningNotice}
              </div>
            </div>

            <FeedbackForm />
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
                {emergencyDesc}
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
                {processSteps.map((step, i) => (
                  <li
                    key={step._key}
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
                      {i + 1}
                    </span>
                    <span>
                      <b style={{ color: "var(--navy)" }}>{step.title}</b> · {step.body}
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
