import type { Metadata } from "next";
import Link from "next/link";
import { getScheduleByMonth, getSiteSettings, getPageContent } from "@/sanity/lib/queries";
import PageHeader from "@/components/ui/PageHeader";
import type { CitizenSchedule } from "@/types/citizenSchedule";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Lịch tiếp công dân | Công an phường Bình Dương",
  description: "Lịch tiếp công dân định kỳ của Công an phường Bình Dương.",
};

interface Props {
  searchParams: Promise<{ month?: string }>;
}

function getMonthBounds(monthStr: string): { startDate: string; endDate: string; label: string } {
  const [year, month] = monthStr.split("-").map(Number);
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0);
  const label = start.toLocaleDateString("vi-VN", { month: "long", year: "numeric" });
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
    label,
  };
}

function prevMonth(monthStr: string): string {
  const [year, month] = monthStr.split("-").map(Number);
  const d = new Date(year, month - 2, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function nextMonth(monthStr: string): string {
  const [year, month] = monthStr.split("-").map(Number);
  const d = new Date(year, month, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function groupByDate(schedules: CitizenSchedule[]): Record<string, CitizenSchedule[]> {
  return schedules.reduce<Record<string, CitizenSchedule[]>>((acc, item) => {
    (acc[item.date] ??= []).push(item);
    return acc;
  }, {});
}

function formatDayNum(dateStr: string): string {
  const [, month, day] = dateStr.split("-");
  return `${day}/${month}`;
}

function formatDayLabel(dateStr: string): string {
  const dateObj = new Date(dateStr + "T00:00:00");
  return dateObj.toLocaleDateString("vi-VN", { weekday: "long" });
}

export default async function LichTiepCongDanPage({ searchParams }: Props) {
  const { month } = await searchParams;
  const now = new Date();
  const currentMonth =
    month && /^\d{4}-\d{2}$/.test(month)
      ? month
      : `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const { startDate, endDate, label } = getMonthBounds(currentMonth);
  const [schedules, siteSettings, pageContent] = await Promise.all([
    getScheduleByMonth(startDate, endDate),
    getSiteSettings(),
    getPageContent(),
  ]);
  const grouped = groupByDate(schedules);
  const sortedDates = Object.keys(grouped).sort();

  return (
    <>
      <PageHeader
        title="Lịch tiếp công dân"
        breadcrumbs={[{ label: "Lịch tiếp công dân" }]}
        description={pageContent?.lich_tiep_cong_dan ?? "Lịch tiếp công dân định kỳ của Ban lãnh đạo và cán bộ Công an phường Bình Dương."}
      />
      <section className="block">
        <div className="container max-w-[960px]">
          <div className="schedule-nav">
            <Link
              href={`/lich-tiep-cong-dan?month=${prevMonth(currentMonth)}`}
              className="btn btn-secondary"
            >
              <svg width="14" height="14"><use href="#i-chev-left" /></svg> Tháng trước
            </Link>
            <h2 className="m-0">{label}</h2>
            <Link
              href={`/lich-tiep-cong-dan?month=${nextMonth(currentMonth)}`}
              className="btn btn-secondary"
            >
              Tháng sau <svg width="14" height="14"><use href="#i-chev-right" /></svg>
            </Link>
          </div>

          <div className="notice mb-6">
            <svg className="ic"><use href="#i-warn" /></svg>
            <div>
              <b>Thông tin tiếp công dân:</b> Địa điểm tại Trụ sở Công an phường Bình Dương — {siteSettings?.address ?? SITE.address}. Công dân vui lòng mang theo <b>CCCD/CMND</b> và giấy tờ liên quan. Liên hệ đặt lịch trước qua số <b>{siteSettings?.phone ?? SITE.phone}</b>.
            </div>
          </div>

          {sortedDates.length === 0 ? (
            <div className="schedule-day">
              <div className="day-head">
                <span className="day-num">—</span>
                Chưa có lịch trong tháng này
              </div>
              <div className="schedule-slot justify-center text-[var(--muted)]">
                Không có dữ liệu lịch tiếp công dân cho tháng này.
              </div>
            </div>
          ) : (
            sortedDates.map((date) => {
              const daySchedules = grouped[date];
              return (
                <div key={date} className="schedule-day">
                  <div className="day-head">
                    <span className="day-num">{formatDayNum(date)}</span>
                    {formatDayLabel(date)} · Tiếp công dân định kỳ
                  </div>
                  {daySchedules.map((item) => (
                    <div key={item._id} className="schedule-slot">
                      <span className="time">{item.timeSlot}</span>
                      <div>
                        <div className="lbl">Cán bộ trực</div>
                        <b>
                          {item.officer.rank && `${item.officer.rank} `}
                          {item.officer.fullName}
                        </b>
                        {item.officer.position && (
                          <><br />{item.officer.position}</>
                        )}
                      </div>
                      <div>
                        <div className="lbl">Nội dung</div>
                        {item.note ?? "Tiếp công dân chung"}
                      </div>
                      <div>
                        <div className="lbl">Trạng thái</div>
                        {item.isRegular ? (
                          <span className="recurring">Thường kỳ</span>
                        ) : (
                          <span className="text-[11px] bg-[var(--gold-soft)] text-[var(--gold-deep)] px-2 py-0.5 rounded-full font-semibold">
                            Chuyên đề
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })
          )}
        </div>
      </section>
    </>
  );
}
