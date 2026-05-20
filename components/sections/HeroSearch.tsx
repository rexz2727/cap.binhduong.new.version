"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm thủ tục hoặc nội dung an ninh..."
          className="flex-1 min-w-0 bg-white/90 text-police-navy placeholder-police-navy/50 rounded-xl px-5 py-3.5 text-sm font-medium outline-none focus:bg-white focus:ring-2 focus:ring-police-gold shadow-md transition-all"
          aria-label="Tìm kiếm"
        />
        <button
          type="submit"
          className="bg-police-gold hover:bg-yellow-400 text-police-navy font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all hover:-translate-y-0.5 whitespace-nowrap"
        >
          🔍 Tìm kiếm
        </button>
      </form>
    </div>
  );
}
