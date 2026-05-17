"use client";
import { useState } from "react";

type Tab = "functions" | "structure" | "schedule";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "functions", label: "Chức năng nhiệm vụ", icon: "📋" },
  { id: "structure", label: "Sơ đồ tổ chức", icon: "🏛️" },
  { id: "schedule", label: "Lịch tiếp công dân", icon: "📅" },
];

const FUNCTIONS = [
  { title: "Nắm tình hình an ninh, trật tự", body: "Thu thập thông tin, phân tích, đánh giá tình hình; tham mưu cho cấp ủy, chính quyền phường và Công an TP. Hồ Chí Minh các biện pháp bảo đảm an ninh." },
  { title: "Phòng ngừa, đấu tranh chống tội phạm", body: "Tiếp nhận, phân loại, xác minh tin báo tội phạm; phối hợp xử lý vi phạm pháp luật, bắt người phạm tội quả tang tại địa bàn cơ sở." },
  { title: "Giải quyết thủ tục hành chính", body: "Tiếp nhận và giải quyết phân cấp thủ tục: cư trú (thường trú, tạm trú, lưu trú), cấp đổi Căn cước, hộ chiếu và đăng ký phương tiện giao thông." },
  { title: "Điều tra, tư pháp cơ sở", body: "Bố trí Điều tra viên trực tiếp tại Công an phường để giải quyết án hình sự; quản lý người chấp hành án tại cộng đồng (án treo, cải tạo không giam giữ)." },
  { title: "Trật tự công cộng", body: "Tuần tra, kiểm soát, bảo đảm trật tự công cộng; phát hiện và xử lý vi phạm trật tự xã hội và an toàn giao thông trên địa bàn." },
  { title: "Phòng cháy, chữa cháy, cứu nạn", body: "Tuyên truyền, kiểm tra công tác PCCC; tổ chức chữa cháy, cứu nạn ban đầu khi xảy ra sự cố tại phường." },
  { title: "Xử phạt vi phạm hành chính", body: "Xử phạt vi phạm hành chính trong lĩnh vực an ninh, trật tự theo thẩm quyền; lập hồ sơ đề nghị áp dụng biện pháp xử lý hành chính." },
  { title: "Tiếp nhận phản ánh", body: "Tiếp nhận góp ý, phản ánh, kiến nghị của nhân dân về tình hình an ninh, trật tự; bảo vệ quyền và lợi ích hợp pháp của công dân." },
  { title: "Xây dựng phong trào toàn dân", body: "Làm nòng cốt xây dựng nền an ninh nhân dân; hướng dẫn hoạt động lực lượng bảo vệ an ninh cơ sở, bảo vệ dân phố, dân phòng." },
  { title: "Quản lý ngành nghề có điều kiện", body: "Quản lý an ninh, trật tự đối với ngành nghề đầu tư kinh doanh có điều kiện; quản lý vũ khí, vật liệu nổ theo phân cấp." },
];

const ORG_BRANCHES = [
  { desc: "Tổng hợp", unit: "Tổ Tổng hợp" },
  { desc: "CS khu vực", unit: "Tổ CSKV" },
  { desc: "CS trật tự", unit: "Tổ CSTT" },
  { desc: "PC tội phạm", unit: "Tổ PCTP" },
  { desc: "An ninh", unit: "Tổ An ninh" },
];

const SCHEDULE = [
  { day: "Thứ 2", morning: "07:30 – 11:30", afternoon: "13:30 – 17:00", content: "Tiếp nhận hồ sơ cư trú, CCCD" },
  { day: "Thứ 3", morning: "07:30 – 11:30", afternoon: "13:30 – 17:00", content: "Tiếp nhận phản ánh, tố giác tội phạm" },
  { day: "Thứ 4", morning: "07:30 – 11:30", afternoon: "13:30 – 17:00", content: "Tiếp nhận hồ sơ cư trú, CCCD" },
  { day: "Thứ 5", morning: "07:30 – 11:30", afternoon: "13:30 – 17:00", content: "Tiếp nhận phản ánh, giải quyết thủ tục" },
  { day: "Thứ 6", morning: "07:30 – 11:30", afternoon: "13:30 – 17:00", content: "Tiếp dân, xử lý hồ sơ tồn đọng" },
  { day: "Thứ 7", morning: "07:30 – 11:30", afternoon: "Nghỉ", content: "Trả kết quả, hồ sơ hành chính", offAfternoon: true },
  { day: "Chủ nhật", morning: "Nghỉ", afternoon: "Nghỉ", content: "—", allOff: true },
];

export default function GioiThieuTabs() {
  const [active, setActive] = useState<Tab>("functions");

  return (
    <section>
      {/* Tab header */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-4">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              active === tab.id
                ? "bg-police-navy text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Chức năng nhiệm vụ */}
      {active === "functions" && (
        <div className="space-y-3 animate-fade-up">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 mb-2">
            <strong>Cơ sở pháp lý:</strong> Luật Công an nhân dân, Nghị định số 02/2025/NĐ-CP ngày 18/02/2025; mô hình Công an 2 cấp áp dụng từ 01/03/2025.
          </div>
          {FUNCTIONS.map((fn, i) => (
            <div key={fn.title} className="flex gap-4 bg-white border border-gray-100 rounded-xl p-4 hover:border-police-navy/20 transition-colors">
              <span className="text-police-navy font-bold text-sm min-w-[22px]">{i + 1}.</span>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{fn.title}</p>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">{fn.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sơ đồ tổ chức */}
      {active === "structure" && (
        <div className="animate-fade-up space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
            Cơ cấu theo mô hình Công an chính quy 2 cấp, trực thuộc <strong>Công an TP. Hồ Chí Minh</strong>. Từ 01/07/2025, đơn vị được tăng cường biên chế và bố trí Điều tra viên tại cơ sở.
          </div>

          <div className="flex justify-center">
            <div className="bg-police-red text-white rounded-2xl px-8 py-4 text-center shadow-md max-w-sm w-full">
              <p className="font-bold text-sm">🏢 Công an TP. Hồ Chí Minh</p>
              <p className="text-red-200 text-xs mt-1">Cơ quan quản lý, chỉ đạo trực tiếp toàn diện</p>
            </div>
          </div>
          <div className="flex justify-center"><div className="w-0.5 h-8 bg-police-navy" /></div>
          <div className="flex justify-center">
            <div className="bg-police-navy text-white rounded-2xl px-8 py-4 text-center shadow-md max-w-sm w-full">
              <p className="font-bold text-sm">⭐ Trưởng Công an phường</p>
              <p className="text-blue-300 text-xs mt-1">Phụ trách chung, báo cáo Giám đốc CATP</p>
            </div>
          </div>
          <div className="flex justify-center"><div className="w-0.5 h-8 bg-police-navy" /></div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {ORG_BRANCHES.map((branch) => (
              <div key={branch.desc} className="flex flex-col items-center gap-2">
                <div className="bg-white border-2 border-police-navy rounded-xl p-3 text-center w-full">
                  <p className="font-semibold text-gray-900 text-xs">Phó Trưởng Công an</p>
                  <p className="text-police-red text-xs mt-1">{branch.desc}</p>
                </div>
                <div className="w-0.5 h-4 bg-gray-300" />
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center w-full">
                  <p className="text-gray-700 text-xs font-medium">{branch.unit}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center"><div className="w-0.5 h-8 bg-police-navy" /></div>
          <div className="flex justify-center">
            <div className="border-2 border-dashed border-police-navy/40 rounded-2xl px-8 py-4 text-center max-w-lg w-full">
              <p className="font-semibold text-gray-700 text-sm">Lực lượng tham gia bảo vệ ANTT ở cơ sở</p>
              <p className="text-gray-500 text-xs mt-1">Dân phố · Dân phòng · Tổ an ninh khu phố</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
            <strong>Ghi chú:</strong> Lần đầu tiên bố trí <strong>Điều tra viên</strong> trực tiếp tại Công an phường. Thông tin nhân sự sẽ cập nhật khi có quyết định bổ nhiệm chính thức.
          </div>
        </div>
      )}

      {/* Lịch tiếp công dân */}
      {active === "schedule" && (
        <div className="animate-fade-up space-y-4">
          <p className="text-gray-600 text-sm">Công an phường tiếp công dân theo lịch cố định hàng tuần. Nhân dân có thể đến trực tiếp trụ sở hoặc liên hệ trước qua điện thoại.</p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-police-navy text-white">
                  <th className="text-left px-4 py-3 font-semibold">Thứ</th>
                  <th className="text-left px-4 py-3 font-semibold">Buổi sáng</th>
                  <th className="text-left px-4 py-3 font-semibold">Buổi chiều</th>
                  <th className="text-left px-4 py-3 font-semibold">Nội dung</th>
                </tr>
              </thead>
              <tbody>
                {SCHEDULE.map((row) => (
                  <tr key={row.day} className={`border-t border-gray-100 ${row.allOff ? "bg-gray-50" : "hover:bg-blue-50/50"} transition-colors`}>
                    <td className="px-4 py-3 font-semibold text-gray-900">{row.day}</td>
                    <td className={`px-4 py-3 ${row.allOff ? "text-red-500 font-medium" : "text-gray-700"}`}>{row.morning}</td>
                    <td className={`px-4 py-3 ${row.offAfternoon || row.allOff ? "text-red-500 font-medium" : "text-gray-700"}`}>{row.afternoon}</td>
                    <td className="px-4 py-3 text-gray-600">{row.content}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 space-y-1">
            <p className="font-semibold mb-1">📝 Lưu ý:</p>
            <p>• Trường hợp khẩn cấp tiếp nhận <strong>24/7</strong> qua số <a href="tel:113" className="font-bold underline">113</a>.</p>
            <p>• Lịch có thể thay đổi vào các ngày lễ, tết theo thông báo của UBND phường.</p>
            <p>• Công dân nên mang theo CCCD/CMND khi đến làm việc.</p>
          </div>
        </div>
      )}
    </section>
  );
}
