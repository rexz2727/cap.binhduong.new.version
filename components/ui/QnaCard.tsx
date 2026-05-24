"use client";

import { useState } from "react";
import { PortableText } from "@portabletext/react";
import type { QnaPreview } from "@/types/qna";
import { QNA_CATEGORY_LABELS } from "@/constants/qna";

interface Props {
  qna: QnaPreview;
}

export default function QnaCard({ qna }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="qna-card">
      <button
        onClick={() => setOpen(!open)}
        className="bg-transparent border-none p-0 w-full text-left cursor-pointer"
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
        <span className="tag">{QNA_CATEGORY_LABELS[qna.category] ?? qna.category}</span>
        {qna.answeredAt && (
          <span>Đã trả lời · {new Date(qna.answeredAt).toLocaleDateString("vi-VN")}</span>
        )}
        {qna.viewCount !== undefined && qna.viewCount > 0 && (
          <>
            <span>·</span>
            <span>{qna.viewCount.toLocaleString("vi-VN")} lượt xem</span>
          </>
        )}
      </div>
    </div>
  );
}
