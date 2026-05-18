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
          { label: "Hỏi đáp", href: "/hoi-dap" },
          { label: "Gửi câu hỏi" },
        ]}
        description="Đặt câu hỏi về pháp luật, thủ tục hành chính — chúng tôi sẽ trả lời trong 1–3 ngày làm việc"
      />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-police-navy mb-2">Lưu ý khi gửi câu hỏi</h2>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Câu hỏi sẽ được xem xét và trả lời bởi cán bộ có thẩm quyền</li>
              <li>Câu hỏi và trả lời sẽ được đăng công khai (ẩn thông tin cá nhân nếu cần)</li>
              <li>Không sử dụng để báo cáo khẩn cấp — hãy gọi <strong>113</strong></li>
            </ul>
          </div>
          <QnaForm />
        </div>
      </div>
    </>
  );
}
