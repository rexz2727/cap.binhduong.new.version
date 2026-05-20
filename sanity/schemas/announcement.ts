import { defineField, defineType } from "sanity";

export const announcementSchema = defineType({
  name: "announcement",
  title: "Thông báo ticker",
  type: "document",
  fields: [
    defineField({ name: "text", title: "Nội dung thông báo", type: "string", validation: (r) => r.required().max(200) }),
    defineField({ name: "url", title: "Link khi click (tuỳ chọn)", type: "url" }),
    defineField({ name: "isActive", title: "Đang hiển thị", type: "boolean", initialValue: true }),
    defineField({ name: "expiryDate", title: "Tự ẩn sau ngày", type: "datetime" }),
    defineField({ name: "priority", title: "Thứ tự (số nhỏ = ưu tiên cao)", type: "number", initialValue: 10 }),
  ],
  preview: {
    select: { title: "text", subtitle: "isActive" },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle ? "Đang hiển thị" : "Đã ẩn",
    }),
  },
});
