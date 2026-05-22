import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import QnaForm from "@/components/forms/QnaForm";

export const metadata: Metadata = {
  title: "Gửi câu hỏi | Hỏi đáp pháp luật",
  description: "Gửi câu hỏi pháp luật cho Công an phường Bình Dương.",
};

export default function GuiCauHoiPage() {
  return (
    <>
      <PageHeader
        title="Gửi câu hỏi"
        breadcrumbs={[
          { label: "Hỏi đáp pháp luật", href: "/hoi-dap" },
          { label: "Gửi câu hỏi" },
        ]}
        description="Đặt câu hỏi về pháp luật, thủ tục hành chính — chúng tôi sẽ trả lời trong 1–3 ngày làm việc."
      />

      <section className="block">
        <div className="container" style={{ maxWidth: "640px" }}>
          <div className="notice" style={{ marginBottom: "24px" }}>
            <svg className="ic">
              <use href="#i-info" />
            </svg>
            <div>
              <b>Lưu ý khi gửi câu hỏi:</b> Câu hỏi sẽ được xem xét và trả lời bởi cán bộ có thẩm
              quyền. Câu hỏi và trả lời có thể được đăng công khai (ẩn thông tin cá nhân nếu cần).
              Không sử dụng để báo cáo khẩn cấp — hãy gọi <b>113</b>.
            </div>
          </div>

          <QnaForm />
        </div>
      </section>
    </>
  );
}
