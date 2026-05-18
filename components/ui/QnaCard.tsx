"use client";

import { useState } from "react";
import { PortableText } from "@portabletext/react";
import type { QnaPreview } from "@/types/qna";

const CATEGORY_LABELS: Record<string, string> = {
  "cu-tru": "Cư trú",
  "cccd": "CCCD",
  "vneid": "VNeID",
  "xe-may": "Xe máy",
  "hanh-chinh": "Hành chính",
  "khac": "Khác",
};

interface Props {
  qna: QnaPreview;
}

export default function QnaCard({ qna }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 flex items-start gap-4 hover:bg-gray-50 transition-colors"
      >
        <span className="shrink-0 w-9 h-9 bg-police-red/10 text-police-red rounded-full flex items-center justify-center text-lg font-bold">
          ?
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
              {CATEGORY_LABELS[qna.category] ?? qna.category}
            </span>
            {qna.viewCount !== undefined && qna.viewCount > 0 && (
              <span className="text-xs text-gray-400">{qna.viewCount} lượt xem</span>
            )}
          </div>
          <p className="font-semibold text-gray-900 text-sm leading-snug">{qna.question}</p>
          {qna.askerName && (
            <p className="text-xs text-gray-400 mt-1">Người hỏi: {qna.askerName}</p>
          )}
        </div>
        <span className={`shrink-0 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      {open && qna.answer && (
        <div className="border-t border-gray-100 px-5 py-4 bg-green-50">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              A
            </span>
            <span className="text-xs text-green-700 font-medium">
              {qna.answeredBy ?? "Cán bộ Công an phường"}
              {qna.answeredAt && (
                <span className="text-gray-400 font-normal ml-2">
                  · {new Date(qna.answeredAt).toLocaleDateString("vi-VN")}
                </span>
              )}
            </span>
          </div>
          <div className="prose prose-sm prose-gray max-w-none text-gray-700">
            <PortableText value={qna.answer} />
          </div>
        </div>
      )}
    </div>
  );
}
