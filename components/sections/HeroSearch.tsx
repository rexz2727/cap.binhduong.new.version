"use client";
import { useState, useRef } from "react";

type CatalogItem = { title: string; description: string; href: string };

const CATALOG: CatalogItem[] = [
  { title: "Đăng ký thường trú", description: "Thủ tục đăng ký thường trú, hộ khẩu tại phường Bình Dương.", href: "/thu-tuc-hanh-chinh" },
  { title: "Tạm trú / Tạm vắng", description: "Khai báo lưu trú, tạm trú và tạm vắng theo quy định.", href: "/thu-tuc-hanh-chinh" },
  { title: "Căn cước công dân (CCCD)", description: "Cấp mới, đổi, cấp lại thẻ Căn cước công dân.", href: "/thu-tuc-hanh-chinh" },
  { title: "VNeID", description: "Định danh điện tử VNeID — kích hoạt và sử dụng trong giao dịch.", href: "/thu-tuc-hanh-chinh" },
  { title: "Đăng ký xe máy / ô tô", description: "Thủ tục đăng ký phương tiện giao thông cơ giới.", href: "/thu-tuc-hanh-chinh" },
  { title: "Phòng cháy chữa cháy", description: "Hướng dẫn kỹ năng phòng cháy, thoát hiểm an toàn.", href: "/van-ban-phap-luat" },
  { title: "Lừa đảo công nghệ", description: "Cảnh báo và cách phòng tránh lừa đảo qua mạng, điện thoại.", href: "/van-ban-phap-luat" },
  { title: "Báo mất giấy tờ", description: "Biểu mẫu trình báo mất giấy tờ cá nhân, CCCD, hộ chiếu.", href: "/thu-tuc-hanh-chinh" },
];

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CatalogItem[]>([]);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function doSearch(q: string) {
    const term = q.trim().toLowerCase();
    if (!term) { inputRef.current?.focus(); return; }
    const found = CATALOG.filter(
      (item) => item.title.toLowerCase().includes(term) || item.description.toLowerCase().includes(term)
    );
    setResults(found);
    setSearched(true);
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); if (searched) setSearched(false); }}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); doSearch(query); } }}
          placeholder="Tìm thủ tục hoặc nội dung an ninh..."
          className="flex-1 min-w-0 bg-white/90 text-police-navy placeholder-police-navy/50 rounded-xl px-5 py-3.5 text-sm font-medium outline-none focus:bg-white focus:ring-2 focus:ring-police-gold shadow-md transition-all"
          aria-label="Tìm kiếm"
        />
        <button
          onClick={() => doSearch(query)}
          className="bg-police-gold hover:bg-yellow-400 text-police-navy font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all hover:-translate-y-0.5 whitespace-nowrap"
        >
          🔍 Tìm kiếm
        </button>
      </div>

      {searched && (
        <div className="mt-3 flex flex-col gap-2 animate-fade-up">
          {results.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-4 text-blue-100 text-sm">
              Không tìm thấy kết quả cho <strong className="text-white">&ldquo;{query}&rdquo;</strong>. Vui lòng thử từ khóa khác.
            </div>
          ) : (
            results.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3.5 hover:bg-white/20 transition-colors"
              >
                <p className="font-semibold text-white text-sm">{item.title}</p>
                <p className="text-blue-200 text-xs mt-0.5">{item.description}</p>
              </a>
            ))
          )}
        </div>
      )}
    </div>
  );
}
