"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/constants/site";
import type { UnitProfile } from "@/types/unitProfile";

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
  unitProfile?: UnitProfile | null;
}

export default function GioiThieuTabs({ personnel, unitProfile }: Props) {
  const [active, setActive] = useState<Tab>("function");

  const dutyItems = (unitProfile?.duties && unitProfile.duties.length > 0)
    ? unitProfile.duties.map((d, i) => ({ n: i + 1, title: d.title, body: d.body }))
    : [
        { n: 1, title: "Đảm bảo an ninh trật tự", body: "Phòng ngừa, đấu tranh chống các loại tội phạm, tệ nạn xã hội trên địa bàn phường." },
        { n: 2, title: "Quản lý cư trú & CCCD", body: "Đăng ký thường trú, tạm trú, cấp Căn cước công dân, khai báo lưu trú." },
        { n: 3, title: "Quản lý phương tiện", body: "Đăng ký xe mô tô, xe gắn máy và phương tiện thuộc thẩm quyền cấp phường." },
        { n: 4, title: "Phục vụ nhân dân", body: "Tiếp công dân, giải quyết khiếu nại, tố cáo, hỗ trợ thủ tục hành chính." },
      ];

  const deptItems = (unitProfile?.departments && unitProfile.departments.length > 0)
    ? unitProfile.departments
    : [
        { _key: "1", label: "Đội Cảnh sát ANTT", sub: "12 cán bộ chiến sĩ" },
        { _key: "2", label: "Đội Cảnh sát Hình sự", sub: "8 cán bộ chiến sĩ" },
        { _key: "3", label: "Đội Quản lý hành chính", sub: "10 cán bộ chiến sĩ" },
        { _key: "4", label: "Cảnh sát Khu vực", sub: "4 cán bộ phụ trách 4 KP" },
      ];

  const statItems = (unitProfile?.orgStats && unitProfile.orgStats.length > 0)
    ? unitProfile.orgStats
    : [
        { _key: "1", label: "Tổng quân số:", value: "38 cán bộ chiến sĩ" },
        { _key: "2", label: "Địa bàn:", value: "4 khu phố · ~112.500 dân" },
        { _key: "3", label: "Trụ sở:", value: "01 trụ sở chính" },
        { _key: "4", label: "Hoạt động:", value: "24/7 với đường dây nóng" },
      ];

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
      <div className={active === "function" ? "tab-pane is-active" : "tab-pane"}>
        <div className="org-card">
          <h3>Về đơn vị</h3>
          {unitProfile?.unitDescription1 ? (
            <p>{unitProfile.unitDescription1}</p>
          ) : (
            <p>
              <b>Công an phường Bình Dương</b> là đơn vị trực thuộc Công an Thành phố Hồ Chí Minh. Đơn vị được thành lập trên cơ sở sáp nhập các phường Hòa Phú, Phú Mỹ, Phú Tân và Phú Chánh theo chủ trương sắp xếp đơn vị hành chính của tỉnh Bình Dương cũ (nay là TP.HCM).
            </p>
          )}
          {unitProfile?.unitDescription2 ? (
            <p>{unitProfile.unitDescription2}</p>
          ) : (
            <p>
              Nhiệm vụ chính: <b>bảo đảm an ninh trật tự</b>, phòng chống tội phạm, quản lý hành chính về trật tự xã hội, đăng ký cư trú, cấp Căn cước công dân, và phục vụ nhân dân trên địa bàn phường.
            </p>
          )}

          <div className="ward-grid">
            <div className="ward-cell"><b>Hòa Phú</b><div className="lbl">Đơn vị sáp nhập</div></div>
            <div className="ward-cell"><b>Phú Mỹ</b><div className="lbl">Đơn vị sáp nhập</div></div>
            <div className="ward-cell"><b>Phú Tân</b><div className="lbl">Đơn vị sáp nhập</div></div>
            <div className="ward-cell"><b>Phú Chánh</b><div className="lbl">Đơn vị sáp nhập</div></div>
          </div>
        </div>

        <div className="org-card">
          <h3>Chức năng &amp; nhiệm vụ chính</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {dutyItems.map((item) => (
              <div key={item.n} className="duty-item">
                <div className="duty-num">{item.n}</div>
                <div>
                  <b className="text-[var(--navy)] text-[14.5px] font-bold">{item.title}</b>
                  <div className="text-[13px] text-[var(--muted)] mt-1">{item.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sơ đồ tổ chức */}
      <div className={active === "org" ? "tab-pane is-active" : "tab-pane"}>
        <div className="org-card">
          <h3>Sơ đồ tổ chức</h3>
          <p>Bộ máy tổ chức Công an phường Bình Dương được thiết kế theo nguyên tắc tinh gọn, hiệu quả — phù hợp với địa bàn dân cư sau sáp nhập.</p>

          <div className="mt-6">
            <div className="grid place-items-center mb-8">
              <div className="org-top-card">
                <div className="text-[11.5px] text-[var(--gold)] uppercase tracking-widest font-semibold">Cấp lãnh đạo</div>
                <div className="text-base font-bold mt-1">Ban Chỉ huy</div>
                <div className="text-xs opacity-75 mt-0.5">1 Trưởng + 3 Phó Trưởng</div>
              </div>
              <div className="w-0.5 h-8 bg-[var(--gold)] -mt-0.5"></div>
            </div>

            <div className="grid grid-cols-4 gap-4 relative">
              <div className="absolute -top-4 left-[12.5%] right-[12.5%] h-0.5 bg-[var(--gold)]"></div>
              {deptItems.map((branch) => (
                <div key={branch._key} className="ward-cell relative bg-[var(--surface)] border-[var(--navy)]">
                  <div className="absolute -top-4 left-1/2 w-0.5 h-4 bg-[var(--gold)]"></div>
                  <b className="text-[var(--navy)]">{branch.label}</b>
                  <div className="lbl">{branch.sub}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-[14px] mt-8 text-[13px] text-[var(--muted)]">
              {statItems.map((stat) => (
                <div key={stat._key}><b className="text-[var(--ink-2)]">{stat.label}</b> {stat.value}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ban lãnh đạo */}
      <div className={active === "leaders" ? "tab-pane is-active" : "tab-pane"}>
        <div className="org-card">
          <h3>Ban Lãnh đạo</h3>
          <p className="mb-6">Đội ngũ cán bộ chỉ huy giàu kinh nghiệm, được đào tạo bài bản, cam kết phục vụ nhân dân.</p>
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
            <p className="text-[var(--muted)] text-sm">Chưa có thông tin nhân sự.</p>
          )}
        </div>
      </div>

      {/* Lịch tiếp công dân */}
      <div className={active === "schedule" ? "tab-pane is-active" : "tab-pane"}>
        <div className="org-card text-center px-8 py-12">
          <svg width="48" height="48" className="text-[var(--gold-deep)] mb-[14px]"><use href="#i-cal" /></svg>
          <h3 className="justify-center inline-flex">Lịch tiếp công dân</h3>
          <p className="max-w-[520px] mx-auto mt-2 mb-6">Xem chi tiết lịch tiếp công dân định kỳ hàng tháng — gồm thời gian, cán bộ trực và nội dung tiếp.</p>
          <Link href="/lich-tiep-cong-dan" className="btn btn-red text-sm">Xem lịch tháng này →</Link>
        </div>
      </div>

      {/* Liên hệ */}
      <div className={active === "contact" ? "tab-pane is-active" : "tab-pane"}>
        <div className="org-card">
          <h3>Thông tin liên hệ</h3>
          <div className="grid grid-cols-2 gap-6 mt-2">
            <div className="flex gap-[14px]">
              <svg width="20" height="20" className="text-[var(--red)] shrink-0 mt-0.5"><use href="#i-pin" /></svg>
              <div>
                <div className="text-[11.5px] text-[var(--subtle)] uppercase tracking-[0.04em] font-semibold">Địa chỉ</div>
                <div className="text-sm text-[var(--ink)] mt-0.5">{SITE.address}</div>
              </div>
            </div>
            <div className="flex gap-[14px]">
              <svg width="20" height="20" className="text-[var(--red)] shrink-0 mt-0.5"><use href="#i-phone" /></svg>
              <div>
                <div className="text-[11.5px] text-[var(--subtle)] uppercase tracking-[0.04em] font-semibold">Điện thoại</div>
                <div className="text-sm text-[var(--ink)] mt-0.5 tabular-nums">{SITE.phone}</div>
                <div className="text-[12.5px] text-[var(--muted)] mt-0.5">Đường dây nóng: <b className="text-[var(--red)]">113</b></div>
              </div>
            </div>
            <div className="flex gap-[14px]">
              <svg width="20" height="20" className="text-[var(--red)] shrink-0 mt-0.5"><use href="#i-mail" /></svg>
              <div>
                <div className="text-[11.5px] text-[var(--subtle)] uppercase tracking-[0.04em] font-semibold">Email</div>
                <div className="text-sm text-[var(--ink)] mt-0.5">{SITE.email}</div>
              </div>
            </div>
            <div className="flex gap-[14px]">
              <svg width="20" height="20" className="text-[var(--red)] shrink-0 mt-0.5"><use href="#i-clock" /></svg>
              <div>
                <div className="text-[11.5px] text-[var(--subtle)] uppercase tracking-[0.04em] font-semibold">Giờ làm việc</div>
                {SITE.workingHours.split(" | ").map((line, i) => (
                  <div key={i} className={`text-sm text-[var(--ink)]${i === 0 ? " mt-0.5" : ""}`}>{line}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
