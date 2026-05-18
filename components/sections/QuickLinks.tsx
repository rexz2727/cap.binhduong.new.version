import Link from "next/link";

const LINKS = [
  {
    icon: "📋",
    title: "Thủ tục hành chính",
    desc: "Cư trú, CCCD, phương tiện",
    href: "/thu-tuc-hanh-chinh",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50 group-hover:bg-blue-100",
  },
  {
    icon: "📄",
    title: "Văn bản pháp luật",
    desc: "Nghị quyết, kế hoạch, quyết định",
    href: "/van-ban-phap-luat",
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-50 group-hover:bg-purple-100",
  },
  {
    icon: "💬",
    title: "Hỏi đáp pháp luật",
    desc: "Câu hỏi thường gặp, giải đáp trực tuyến",
    href: "/hoi-dap",
    color: "from-green-500 to-green-600",
    bg: "bg-green-50 group-hover:bg-green-100",
  },
  {
    icon: "📅",
    title: "Lịch tiếp công dân",
    desc: "Lịch tiếp dân, đăng ký gặp cán bộ",
    href: "/lich-tiep-cong-dan",
    color: "from-orange-500 to-orange-600",
    bg: "bg-orange-50 group-hover:bg-orange-100",
  },
  {
    icon: "📢",
    title: "Phản ánh trực tuyến",
    desc: "Gửi tin báo tội phạm, kiến nghị",
    href: "/phan-anh",
    color: "from-police-red to-police-red-dark",
    bg: "bg-red-50 group-hover:bg-red-100",
  },
  {
    icon: "🏛️",
    title: "Giới thiệu đơn vị",
    desc: "Lãnh đạo, lịch sử, nhiệm vụ",
    href: "/gioi-thieu",
    color: "from-police-navy to-police-navy-dark",
    bg: "bg-blue-50 group-hover:bg-blue-100",
  },
];

export default function QuickLinks() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-police-navy mb-3">Dịch vụ trực tuyến</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Tra cứu thông tin và thực hiện các thủ tục hành chính nhanh chóng, thuận tiện
          </p>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-police-red" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative bg-white rounded-2xl border border-gray-100 p-5 text-center card-hover shadow-sm animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`w-14 h-14 mx-auto rounded-2xl ${link.bg} flex items-center justify-center text-2xl mb-3 transition-colors duration-200`}>
                {link.icon}
              </div>
              <h3 className="font-bold text-gray-900 group-hover:text-police-red mb-1 transition-colors duration-200 text-xs leading-tight">
                {link.title}
              </h3>
              <p className="text-[11px] text-gray-400 leading-snug hidden sm:block">{link.desc}</p>
              <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-100 transition-opacity duration-200`} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
