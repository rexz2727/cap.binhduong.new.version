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
        <div className="container grid grid-cols-[1.4fr_1fr] gap-8 items-start">
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

          <aside className="flex flex-col gap-4">
            <div className="form-card bg-[var(--navy)] text-white border-none p-6">
              <div className="text-[11.5px] text-[var(--gold)] font-semibold uppercase tracking-[0.06em] mb-[6px]">
                Khẩn cấp
              </div>
              <div className="text-[48px] font-extrabold text-[var(--gold)] leading-none tabular-nums">
                113
              </div>
              <div className="text-[13px] text-white/75 mt-[6px]">
                {emergencyDesc}
              </div>
            </div>

            <div className="form-card p-[22px]">
              <h3 className="mx-0 mt-0 mb-[14px] text-[var(--navy)] text-[15px] font-bold">
                Quy trình xử lý phản ánh
              </h3>
              <ol className="m-0 pl-0 list-none flex flex-col gap-[14px] text-[13.5px] text-[var(--ink-2)]">
                {processSteps.map((step, i) => (
                  <li
                    key={step._key}
                    className="grid grid-cols-[24px_1fr] gap-[10px] items-start"
                  >
                    <span className="bg-[var(--navy)] text-white w-[22px] h-[22px] rounded-full grid place-items-center text-[11px] font-bold">
                      {i + 1}
                    </span>
                    <span>
                      <b className="text-[var(--navy)]">{step.title}</b> · {step.body}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="form-card p-[22px]">
              <h3 className="mx-0 mt-0 mb-3 text-[var(--navy)] text-[15px] font-bold">
                Tra cứu hồ sơ đã gửi
              </h3>
              <div className="field mb-[10px]">
                <input
                  type="text"
                  placeholder="Nhập mã hồ sơ (VD: PA-2026-00123)"
                />
              </div>
              <button
                type="button"
                className="btn btn-navy w-full justify-center"
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
