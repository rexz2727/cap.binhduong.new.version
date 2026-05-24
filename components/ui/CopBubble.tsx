"use client";
import { useState, useEffect, useRef, startTransition } from "react";
import Link from "next/link";

export default function CopBubble() {
  const [open, setOpen] = useState(false);
  const [closed, setClosed] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("cop-bubble-closed") === "1") {
      startTransition(() => setClosed(true));
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleOutsideClick(e: MouseEvent) {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        bubbleRef.current && !bubbleRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  function handleSend() {
    const input = document.getElementById("supportInput") as HTMLInputElement | null;
    if (!input || !input.value.trim()) return;
    input.value = "";
  }

  if (closed) return null;

  return (
    <>
      <button
        ref={bubbleRef}
        className={`cop-bubble${open ? " open" : ""}`}
        id="copBubble"
        aria-label="Mở trợ lý ảo"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="pulse-ring"></span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </button>

      <div
        ref={panelRef}
        className={`support-panel${open ? " open" : ""}`}
        id="supportPanel"
        role="dialog"
        aria-labelledby="supportTitle"
      >
        <div className="support-head">
          <div className="support-avatar">CA</div>
          <div className="support-head-text">
            <div className="title" id="supportTitle">Trợ lý ảo Công an phường</div>
            <div className="sub">Đang trực tuyến · Phản hồi ngay</div>
          </div>
        </div>

        <div className="support-body" id="supportBody">
          <div className="support-msg">
            Xin chào! Tôi là <b>Trợ lý ảo</b> của Công an phường Bình Dương. Tôi có thể giúp bạn:
            <span className="time">hôm nay</span>
          </div>

          <div className="support-actions">
            <Link href="/thu-tuc-hanh-chinh" className="support-action" onClick={() => setOpen(false)}>
              <div className="ic"><svg><use href="#i-doc" /></svg></div>
              <span>Tra cứu thủ tục hành chính</span>
            </Link>
            <Link href="/phan-anh" className="support-action" onClick={() => setOpen(false)}>
              <div className="ic"><svg><use href="#i-megaphone" /></svg></div>
              <span>Gửi phản ánh trực tuyến</span>
            </Link>
            <Link href="/hoi-dap" className="support-action" onClick={() => setOpen(false)}>
              <div className="ic"><svg><use href="#i-help" /></svg></div>
              <span>Hỏi đáp pháp luật</span>
            </Link>
            <Link href="/lich-tiep-cong-dan" className="support-action" onClick={() => setOpen(false)}>
              <div className="ic"><svg><use href="#i-cal" /></svg></div>
              <span>Đặt lịch tiếp dân</span>
            </Link>
            <a href="tel:113" className="support-action danger">
              <div className="ic"><svg><use href="#i-phone" /></svg></div>
              <span>Gọi khẩn cấp 113</span>
            </a>
            <Link href="/van-ban-phap-luat" className="support-action" onClick={() => setOpen(false)}>
              <div className="ic"><svg><use href="#i-scroll" /></svg></div>
              <span>Văn bản pháp luật</span>
            </Link>
          </div>

          <div className="support-msg mt-4">
            Hoặc đặt câu hỏi trực tiếp ở khung bên dưới — tôi sẽ trả lời nhanh nhất có thể.
          </div>
        </div>

        <div className="support-foot">
          <input
            type="text"
            className="support-input"
            id="supportInput"
            placeholder="Nhập câu hỏi của bạn..."
          />
          <button
            className="support-send"
            id="supportSend"
            aria-label="Gửi"
            onClick={handleSend}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>

        <div className="support-footnote">
          Khẩn cấp gọi ngay <b>113</b> · Câu trả lời mang tính tham khảo
        </div>
      </div>
    </>
  );
}
