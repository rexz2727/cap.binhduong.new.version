"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/constants/site";

type Tab = "function" | "org" | "leaders" | "schedule" | "contact";

const TABS: { id: Tab; label: string }[] = [
  { id: "function", label: "Chức năng & nhiệm vụ" },
  { id: "org", label: "Sơ đồ tổ chức" },
  { id: "leaders", label: "Ban lãnh đạo" },
  { id: "schedule", label: "Lịch tiếp công dân" },
  { id: "contact", label: "Liên hệ" },
];

interface PersonnelItem {
  _id: string;
  fullName: string;
  rank?: string;
  position?: string;
  photoUrl: string | null;
}

interface Props {
  personnel: PersonnelItem[];
}

export default function GioiThieuTabs({ personnel }: Props) {
  const [active, setActive] = useState<Tab>("function");

  return (
    <>
      <div className="about-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`about-tab${active === tab.id ? " active" : ""}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Chức năng & nhiệm vụ */}
      <div className="tab-pane" style={{ display: active === "function" ? undefined : "none" }}>
        <div className="org-card">
          <h3>Về đơn vị</h3>
          <p>
            <b>Công an phường Bình Dương</b> là đơn vị trực thuộc Công an Thành phố Hồ Chí Minh. Đơn vị được thành lập trên cơ sở sáp nhập các phường Hòa Phú, Phú Mỹ, Phú Tân và Phú Chánh theo chủ trương sắp xếp đơn vị hành chính của tỉnh Bình Dương cũ (nay là TP.HCM).
          </p>
          <p>
            Nhiệm vụ chính: <b>bảo đảm an ninh trật tự</b>, phòng chống tội phạm, quản lý hành chính về trật tự xã hội, đăng ký cư trú, cấp Căn cước công dân, và phục vụ nhân dân trên địa bàn phường.
          </p>

          <div className="ward-grid">
            <div className="ward-cell"><b>Hòa Phú</b><div className="lbl">Đơn vị sáp nhập</div></div>
            <div className="ward-cell"><b>Phú Mỹ</b><div className="lbl">Đơn vị sáp nhập</div></div>
            <div className="ward-cell"><b>Phú Tân</b><div className="lbl">Đơn vị sáp nhập</div></div>
            <div className="ward-cell"><b>Phú Chánh</b><div className="lbl">Đơn vị sáp nhập</div></div>
          </div>
        </div>

        <div className="org-card">
          <h3>Chức năng &amp; nhiệm vụ chính</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "16px", marginTop: "8px" }}>
            {[
              { n: 1, title: "Đảm bảo an ninh trật tự", body: "Phòng ngừa, đấu tranh chống các loại tội phạm, tệ nạn xã hội trên địa bàn phường." },
              { n: 2, title: "Quản lý cư trú & CCCD", body: "Đăng ký thường trú, tạm trú, cấp Căn cước công dân, khai báo lưu trú." },
              { n: 3, title: "Quản lý phương tiện", body: "Đăng ký xe mô tô, xe gắn máy và phương tiện thuộc thẩm quyền cấp phường." },
              { n: 4, title: "Phục vụ nhân dân", body: "Tiếp công dân, giải quyết khiếu nại, tố cáo, hỗ trợ thủ tục hành chính." },
            ].map((item) => (
              <div key={item.n} style={{ display: "flex", gap: "14px", padding: "18px", background: "var(--surface-2)", borderRadius: "var(--radius)" }}>
                <div style={{ width: "36px", height: "36px", background: "var(--gold)", color: "var(--navy-deep)", borderRadius: "8px", display: "grid", placeItems: "center", fontWeight: 700, flexShrink: 0 }}>{item.n}</div>
                <div>
                  <b style={{ color: "var(--navy)", fontSize: "14.5px" }}>{item.title}</b>
                  <div style={{ fontSize: "13px", color: "var(--muted)", marginTop: "4px" }}>{item.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sơ đồ tổ chức */}
      <div className="tab-pane" style={{ display: active === "org" ? undefined : "none" }}>
        <div className="org-card">
          <h3>Sơ đồ tổ chức</h3>
          <p>Bộ máy tổ chức Công an phường Bình Dương được thiết kế theo nguyên tắc tinh gọn, hiệu quả — phù hợp với địa bàn dân cư sau sáp nhập.</p>

          <div style={{ marginTop: "24px" }}>
            <div style={{ display: "grid", placeItems: "center", marginBottom: "32px" }}>
              <div style={{ background: "var(--navy)", color: "white", padding: "18px 28px", borderRadius: "var(--radius-lg)", textAlign: "center", minWidth: "280px", boxShadow: "var(--shadow)" }}>
                <div style={{ fontSize: "11.5px", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Cấp lãnh đạo</div>
                <div style={{ fontSize: "16px", fontWeight: 700, marginTop: "4px" }}>Ban Chỉ huy</div>
                <div style={{ fontSize: "12px", opacity: 0.75, marginTop: "2px" }}>1 Trưởng + 3 Phó Trưởng</div>
              </div>
              <div style={{ width: "2px", height: "32px", background: "var(--gold)", marginTop: "-2px" }}></div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px", position: "relative" }}>
              <div style={{ position: "absolute", top: "-16px", left: "12.5%", right: "12.5%", height: "2px", background: "var(--gold)" }}></div>
              {[
                { label: "Đội Cảnh sát ANTT", sub: "12 cán bộ chiến sĩ" },
                { label: "Đội Cảnh sát Hình sự", sub: "8 cán bộ chiến sĩ" },
                { label: "Đội Quản lý hành chính", sub: "10 cán bộ chiến sĩ" },
                { label: "Cảnh sát Khu vực", sub: "4 cán bộ phụ trách 4 KP" },
              ].map((branch) => (
                <div key={branch.label} className="ward-cell" style={{ background: "var(--surface)", borderColor: "var(--navy)", position: "relative" }}>
                  <div style={{ position: "absolute", top: "-16px", left: "50%", width: "2px", height: "16px", background: "var(--gold)" }}></div>
                  <b style={{ color: "var(--navy)" }}>{branch.label}</b>
                  <div className="lbl">{branch.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px", marginTop: "32px", fontSize: "13px", color: "var(--muted)" }}>
              <div><b style={{ color: "var(--ink-2)" }}>Tổng quân số:</b> 38 cán bộ chiến sĩ</div>
              <div><b style={{ color: "var(--ink-2)" }}>Địa bàn:</b> 4 khu phố · ~112.500 dân</div>
              <div><b style={{ color: "var(--ink-2)" }}>Trụ sở:</b> 01 trụ sở chính</div>
              <div><b style={{ color: "var(--ink-2)" }}>Hoạt động:</b> 24/7 với đường dây nóng</div>
            </div>
          </div>
        </div>
      </div>

      {/* Ban lãnh đạo */}
      <div className="tab-pane" style={{ display: active === "leaders" ? undefined : "none" }}>
        <div className="org-card">
          <h3>Ban Lãnh đạo</h3>
          <p style={{ marginBottom: "24px" }}>Đội ngũ cán bộ chỉ huy giàu kinh nghiệm, được đào tạo bài bản, cam kết phục vụ nhân dân.</p>
          {personnel.length > 0 ? (
            <div className="personnel-grid">
              {personnel.map((person) => (
                <div key={person._id} className="person-card">
                  <div className="photo">
                    {person.photoUrl ? (
                      <Image
                        src={person.photoUrl}
                        alt={person.fullName}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    ) : null}
                  </div>
                  <div className="name">{person.fullName}</div>
                  {person.rank && <div className="rank">{person.rank}</div>}
                  {person.position && <div className="position">{person.position}</div>}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--muted)", fontSize: "14px" }}>Chưa có thông tin nhân sự.</p>
          )}
        </div>
      </div>

      {/* Lịch tiếp công dân */}
      <div className="tab-pane" style={{ display: active === "schedule" ? undefined : "none" }}>
        <div className="org-card" style={{ textAlign: "center", padding: "48px 32px" }}>
          <svg width="48" height="48" style={{ color: "var(--gold-deep)", marginBottom: "14px" }}><use href="#i-cal" /></svg>
          <h3 style={{ justifyContent: "center", display: "inline-flex" }}>Lịch tiếp công dân</h3>
          <p style={{ maxWidth: "520px", margin: "8px auto 24px" }}>Xem chi tiết lịch tiếp công dân định kỳ hàng tháng — gồm thời gian, cán bộ trực và nội dung tiếp.</p>
          <Link href="/lich-tiep-cong-dan" className="btn btn-red" style={{ fontSize: "14px" }}>Xem lịch tháng này →</Link>
        </div>
      </div>

      {/* Liên hệ */}
      <div className="tab-pane" style={{ display: active === "contact" ? undefined : "none" }}>
        <div className="org-card">
          <h3>Thông tin liên hệ</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginTop: "8px" }}>
            <div style={{ display: "flex", gap: "14px" }}>
              <svg width="20" height="20" style={{ color: "var(--red)", flexShrink: 0, marginTop: "2px" }}><use href="#i-pin" /></svg>
              <div>
                <div style={{ fontSize: "11.5px", color: "var(--subtle)", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>Địa chỉ</div>
                <div style={{ fontSize: "14px", color: "var(--ink)", marginTop: "2px" }}>{SITE.address}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "14px" }}>
              <svg width="20" height="20" style={{ color: "var(--red)", flexShrink: 0, marginTop: "2px" }}><use href="#i-phone" /></svg>
              <div>
                <div style={{ fontSize: "11.5px", color: "var(--subtle)", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>Điện thoại</div>
                <div style={{ fontSize: "14px", color: "var(--ink)", marginTop: "2px", fontVariantNumeric: "tabular-nums" }}>{SITE.phone}</div>
                <div style={{ fontSize: "12.5px", color: "var(--muted)", marginTop: "2px" }}>Đường dây nóng: <b style={{ color: "var(--red)" }}>113</b></div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "14px" }}>
              <svg width="20" height="20" style={{ color: "var(--red)", flexShrink: 0, marginTop: "2px" }}><use href="#i-mail" /></svg>
              <div>
                <div style={{ fontSize: "11.5px", color: "var(--subtle)", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>Email</div>
                <div style={{ fontSize: "14px", color: "var(--ink)", marginTop: "2px" }}>{SITE.email}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "14px" }}>
              <svg width="20" height="20" style={{ color: "var(--red)", flexShrink: 0, marginTop: "2px" }}><use href="#i-clock" /></svg>
              <div>
                <div style={{ fontSize: "11.5px", color: "var(--subtle)", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>Giờ làm việc</div>
                <div style={{ fontSize: "14px", color: "var(--ink)", marginTop: "2px" }}>Thứ Hai – Thứ Sáu: 7:00 – 11:30, 13:30 – 17:00</div>
                <div style={{ fontSize: "14px", color: "var(--ink)" }}>Thứ Bảy: 7:30 – 11:30</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
