"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n";

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { t } = useI18n();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="hero-search">
      <svg
        width="18"
        height="18"
        className="ml-[14px] text-[var(--subtle)]"
      >
        <use href="#i-search" />
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("hero.search.placeholder", "Tìm thủ tục, văn bản, tin tức…")}
        data-i18n-placeholder="hero.search.placeholder"
      />
      <button type="submit" className="btn btn-primary" data-i18n="hero.search.btn">
        {t("hero.search.btn", "Tra cứu")}
      </button>
    </form>
  );
}
