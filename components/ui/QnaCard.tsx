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
    <div className="qna-card">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left"
        style={{ background: "none", border: "none", padding: 0 }}
      >
        <div className="q">{qna.question}</div>
      </button>

      {open && qna.answer && (
        <div className="a">
          <div className="a-body">
            <PortableText value={qna.answer} />
          </div>
        </div>
      )}

      <div className="meta">
        <span className="tag">{CATEGORY_LABELS[qna.category] ?? qna.category}</span>
        {qna.answeredBy && <span>{qna.answeredBy}</span>}
        {qna.answeredAt && (
          <span>· {new Date(qna.answeredAt).toLocaleDateString("vi-VN")}</span>
        )}
        {qna.viewCount !== undefined && qna.viewCount > 0 && (
          <span>· {qna.viewCount} lượt xem</span>
        )}
      </div>
    </div>
  );
}
