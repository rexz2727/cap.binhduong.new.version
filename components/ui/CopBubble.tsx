"use client";
import { useState, useEffect, useRef, startTransition } from "react";
import Link from "next/link";
import { SITE } from "@/constants/site";

export default function CopBubble() {
  const [closed, setClosed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("cop-bubble-closed") === "1") {
      startTransition(() => setClosed(true));
    }
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function handleOutsideClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [menuOpen]);

  if (closed) return null;

  const tel = `tel:${SITE.phone.replace(/\s/g, "")}`;

  return (
    <div ref={ref} data-print="hide" className="fixed bottom-7 right-6 z-50 animate-fade-up">
      {/* Dropdown menu */}
      {menuOpen && (
        <div role="menu" className="absolute bottom-full right-0 mb-3 bg-white border border-blue-100 rounded-2xl shadow-2xl p-2 flex flex-col gap-1 min-w-[260px] animate-fade-up">
          {/* caret */}
          <span className="absolute bottom-[-8px] right-7 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white" />

          <a role="menuitem" href={tel} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700">
            <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700">
              <svg width="16" height="16" aria-hidden="true"><use href="#i-phone" /></svg>
            </span>
            Gọi điện thoại cơ quan
          </a>
          <a role="menuitem" href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700">
            <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-black text-blue-600">Z</span>
            Gửi phản ánh qua Zalo
          </a>
          <a role="menuitem" href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700">
            <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-sm font-black text-blue-700">f</span>
            Phản ánh qua Facebook
          </a>
          <Link role="menuitem" href="/phan-anh" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors text-sm font-semibold text-police-red">
            <span className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-police-red">
              <svg width="16" height="16" aria-hidden="true"><use href="#i-mail" /></svg>
            </span>
            Phản ánh trực tuyến
          </Link>
        </div>
      )}

      {/* Close × */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setClosed(true);
          sessionStorage.setItem("cop-bubble-closed", "1");
        }}
        className="absolute -top-2 -right-2 z-10 w-5 h-5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-[10px] flex items-center justify-center shadow-md transition-colors"
        aria-label="Đóng"
      >
        ✕
      </button>

      {/* Trigger button */}
      <button
        onClick={() => setMenuOpen((o) => !o)}
        className="flex items-center group"
        aria-label="Mở menu liên hệ"
        aria-expanded={menuOpen}
      >
        <span className="bg-white text-police-navy text-xs font-bold px-4 py-2.5 rounded-l-full border-2 border-blue-200 border-r-0 shadow-sm group-hover:bg-blue-50 transition-colors whitespace-nowrap select-none">
          PHẢN ÁNH
        </span>
        <span className="w-16 h-16 rounded-full border-2 border-police-navy bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-lg overflow-hidden group-hover:scale-105 transition-transform">
          <svg viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg" width="50" height="50" aria-hidden="true">
            <rect x="12" y="18" width="36" height="5" rx="2.5" fill="#0d3580"/>
            <rect x="18" y="8" width="24" height="13" rx="5" fill="#1657d7"/>
            <polygon points="30,10 31.5,14 35,14 32.5,16.5 33.5,20 30,18 26.5,20 27.5,16.5 25,14 28.5,14" fill="#ffd700"/>
            <circle cx="30" cy="32" r="11" fill="#f5c07a"/>
            <rect x="26" y="42" width="8" height="6" fill="#f5c07a"/>
            <path d="M14 70 Q14 50 24 48 L30 52 L36 48 Q46 50 46 70Z" fill="#1657d7"/>
            <polygon points="30,48 27,52 30,55 33,52" fill="#cc0000"/>
            <rect x="21" y="54" width="8" height="6" rx="1" fill="#ffd700"/>
            <text x="25" y="59" fontSize="4" fill="#0d3580" textAnchor="middle" fontFamily="sans-serif">CA</text>
          </svg>
        </span>
      </button>
    </div>
  );
}
