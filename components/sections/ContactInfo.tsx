import { SITE } from "@/constants/site";

const STATS = [
  { value: "2024", label: "Năm thành lập", suffix: "" },
  { value: "4", label: "Phường sáp nhập", suffix: "" },
  { value: "24", label: "Giờ trực chiến", suffix: "/7" },
  { value: "113", label: "Đường dây nóng", suffix: "" },
];

const CONTACT_ITEMS = [
  {
    icon: "📍",
    label: "Địa chỉ",
    value: SITE.address,
  },
  {
    icon: "📞",
    label: "Điện thoại",
    value: SITE.phone,
  },
  {
    icon: "✉️",
    label: "Email",
    value: SITE.email,
  },
  {
    icon: "🕐",
    label: "Giờ làm việc",
    value: SITE.workingHours,
  },
];

export default function ContactInfo() {
  return (
    <>
      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-police-red to-police-red-dark text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                  {stat.value}
                  <span className="text-police-gold">{stat.suffix}</span>
                </div>
                <p className="text-red-100 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-police-navy-dark text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold text-police-gold mb-8">Thông tin liên hệ</h2>
              <div className="space-y-5">
                {CONTACT_ITEMS.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-blue-300 font-medium uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="text-white text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency call */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
              <p className="text-blue-200 text-sm mb-4">Đường dây khẩn cấp 24/7</p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { number: "113", label: "Công an", color: "text-police-gold" },
                  { number: "114", label: "PCCC", color: "text-orange-400" },
                  { number: "115", label: "Cấp cứu", color: "text-green-400" },
                ].map((line) => (
                  <a key={line.number} href={`tel:${line.number}`} className="bg-white/10 hover:bg-white/20 rounded-2xl py-3 transition-colors">
                    <p className={`text-3xl font-extrabold ${line.color} tracking-tight`}>{line.number}</p>
                    <p className="text-xs text-blue-300 mt-1">{line.label}</p>
                  </a>
                ))}
              </div>
              <p className="text-blue-200 text-sm">
                Gọi ngay khi có sự cố an ninh trật tự, tội phạm hoặc tai nạn cần can thiệp khẩn cấp
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
