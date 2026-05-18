"use client";

import Link from "next/link";
import type { Announcement } from "@/types/announcement";

interface Props {
  items: Announcement[];
}

export default function NewsTicker({ items }: Props) {
  if (!items.length) return null;

  const doubled = [...items, ...items];

  return (
    <div className="bg-police-navy/90 border-b border-white/10 py-1.5 px-4 flex items-center gap-3 overflow-hidden">
      <span className="shrink-0 bg-police-gold text-police-red text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-widest">
        Tin nóng
      </span>
      <div className="overflow-hidden flex-1">
        <div
          className="flex gap-8 whitespace-nowrap animate-ticker"
          style={{ width: "max-content" }}
        >
          {doubled.map((item, i) => (
            <span key={`${item._id}-${i}`} className="text-xs text-blue-200">
              {item.url ? (
                <Link href={item.url} className="hover:text-white transition-colors">
                  {item.text}
                </Link>
              ) : (
                item.text
              )}
              <span className="mx-4 text-police-gold/40">◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
