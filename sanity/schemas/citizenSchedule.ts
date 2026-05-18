import { defineField, defineType } from "sanity";

export const citizenScheduleSchema = defineType({
  name: "citizenSchedule",
  title: "Lịch tiếp công dân",
  type: "document",
  fields: [
    defineField({
      name: "officer", title: "Cán bộ tiếp dân", type: "reference",
      to: [{ type: "personnel" }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "date", title: "Ngày tiếp", type: "date", validation: (r) => r.required() }),
    defineField({ name: "timeSlot", title: "Khung giờ", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", title: "Địa điểm", type: "string" }),
    defineField({ name: "note", title: "Ghi chú đặc biệt", type: "text", rows: 2 }),
    defineField({ name: "isRegular", title: "Lịch thường xuyên (không phải đột xuất)", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "date", subtitle: "timeSlot", officer: "officer.fullName" },
    prepare: ({ title, subtitle, officer }: { title: string; subtitle: string; officer?: string }) => ({
      title: `${title} — ${officer ?? "Chưa phân công"}`,
      subtitle,
    }),
  },
});
