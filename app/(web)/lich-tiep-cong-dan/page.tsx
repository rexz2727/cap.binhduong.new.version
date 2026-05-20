import type { Metadata } from "next";
import Link from "next/link";
import { getScheduleByMonth } from "@/sanity/lib/queries";
import PageHeader from "@/components/ui/PageHeader";
import type { CitizenSchedule } from "@/types/citizenSchedule";

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

export default async function LichTiepCongDanPage({ searchParams }: Props) {
  const { month } = await searchParams;
  const now = new Date();
  const currentMonth =
    month && /^\d{4}-\d{2}$/.test(month)
      ? month
      : `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const { startDate, endDate, label } = getMonthBounds(currentMonth);
  const schedules = await getScheduleByMonth(startDate, endDate);
  const grouped = groupByDate(schedules);
  const sortedDates = Object.keys(grouped).sort();

  return (
    <>
      <PageHeader
        title="Lịch tiếp công dân"
        breadcrumbs={[{ label: "Lịch tiếp công dân" }]}
        description="Lịch tiếp công dân định kỳ của cán bộ Công an phường Bình Dương"
      />
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href={`/lich-tiep-cong-dan?month=${prevMonth(currentMonth)}`}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium transition-colors"
          >
            ← Tháng trước
          </Link>
          <h2 className="text-xl font-bold text-police-navy capitalize">{label}</h2>
          <Link
            href={`/lich-tiep-cong-dan?month=${nextMonth(currentMonth)}`}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium transition-colors"
          >
            Tháng sau →
          </Link>
        </div>

        {/* Info banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-8 text-sm text-blue-800">
          <p className="font-semibold mb-0.5">Thông tin tiếp công dân</p>
          <p>
            Địa điểm: Trụ sở Công an phường Bình Dương — Số 01, Đường D27, KP. Hòa Phú 1.
            Công dân cần mang theo CCCD/CMND và giấy tờ liên quan.
          </p>
        </div>

        {sortedDates.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-3">📅</p>
            <p>Chưa có lịch tiếp công dân trong tháng này.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedDates.map((date) => {
              const daySchedules = grouped[date];
              const dateObj = new Date(date + "T00:00:00");
              const dayLabel = dateObj.toLocaleDateString("vi-VN", {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });

              return (
                <div key={date} className="border border-gray-200 rounded-2xl overflow-hidden">
                  <div className="bg-police-navy text-white px-5 py-3">
                    <span className="font-semibold capitalize">{dayLabel}</span>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {daySchedules.map((item) => (
                      <div
                        key={item._id}
                        className="px-5 py-4 flex flex-col sm:flex-row sm:items-start gap-3"
                      >
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="text-gray-500 font-medium">Giờ tiếp: </span>
                            <span className="text-police-navy font-semibold">{item.timeSlot}</span>
                            {item.isRegular && (
                              <span className="ml-2 inline-block px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs">
                                Thường kỳ
                              </span>
                            )}
                          </div>
                          <div>
                            <span className="text-gray-500 font-medium">Cán bộ trực: </span>
                            <span>
                              {item.officer.rank && `${item.officer.rank} `}
                              <span className="font-medium">{item.officer.fullName}</span>
                              {item.officer.position && (
                                <span className="text-gray-500"> — {item.officer.position}</span>
                              )}
                            </span>
                          </div>
                          {item.location && (
                            <div>
                              <span className="text-gray-500 font-medium">Địa điểm: </span>
                              <span>{item.location}</span>
                            </div>
                          )}
                        </div>
                        {item.note && (
                          <p className="text-sm text-gray-500 italic sm:w-48 shrink-0">{item.note}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
