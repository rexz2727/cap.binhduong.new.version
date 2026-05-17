import Link from "next/link";
import { SITE } from "@/constants/site";
import HeroSearch from "./HeroSearch";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-police-navy via-police-navy to-police-navy-dark text-white overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Decorative circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-police-red/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-police-gold/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
        {/* Badge */}
        <div className="animate-fade-up flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 text-sm font-medium">
            <span className="w-2 h-2 bg-police-gold rounded-full animate-pulse-gold" />
            Cổng thông tin chính thống
          </span>
        </div>

        {/* Title */}
        <h1 className="animate-fade-up delay-100 text-center text-4xl md:text-6xl font-extrabold mb-5 text-shadow leading-tight">
          {SITE.name}
        </h1>

        {/* Description */}
        <p className="animate-fade-up delay-200 text-center text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
          {SITE.description}
        </p>

        {/* Search */}
        <div className="animate-fade-up delay-300 mb-10">
          <HeroSearch />
        </div>

        {/* CTA Buttons */}
        <div className="animate-fade-up delay-400 flex flex-wrap justify-center gap-4 mb-16">
          <Link
            href="/phan-anh"
            className="group bg-police-red hover:bg-police-red-dark text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-police-red/30 hover:shadow-police-red/50 hover:-translate-y-0.5"
          >
            Gửi phản ánh trực tuyến
            <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
          </Link>
          <Link
            href="/thu-tuc-hanh-chinh"
            className="border-2 border-white/40 hover:border-white/70 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5"
          >
            Thủ tục hành chính
          </Link>
        </div>

        {/* Stats */}
        <div className="animate-fade-up delay-500 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { label: "Tin tức cập nhật", value: "Hàng tuần", icon: "📰" },
            { label: "Văn bản pháp luật", value: "Đầy đủ", icon: "📄" },
            { label: "Thủ tục hành chính", value: "Minh bạch", icon: "✅" },
            { label: "Đường dây nóng", value: "113", icon: "📞" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-center hover:bg-white/15 transition-colors"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-2xl font-extrabold text-police-gold">{stat.value}</p>
              <p className="text-xs text-blue-200 mt-1 leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
