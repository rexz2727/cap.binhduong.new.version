import { BellIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const announcementSchema = defineType({
  name: "announcement",
  title: "Thông báo ticker",
  type: "document",
  icon: BellIcon,
  fields: [
    defineField({ name: "text", title: "Nội dung thông báo", type: "string", validation: (r) => r.required().max(200) }),
    defineField({ name: "url", title: "Link khi click (tuỳ chọn)", type: "url" }),
    defineField({ name: "isActive", title: "Đang hiển thị", type: "boolean", initialValue: true }),
    defineField({ name: "expiryDate", title: "Tự ẩn sau ngày", type: "datetime" }),
    defineField({ name: "priority", title: "Thứ tự (số nhỏ = ưu tiên cao)", type: "number", initialValue: 10 }),
  ],
  preview: {
    select: { title: "text", isActive: "isActive", expiryDate: "expiryDate" },
    prepare: ({ title, isActive, expiryDate }) => ({
      title,
      subtitle: [
        isActive ? "Đang hiển thị" : "Đã ẩn",
        expiryDate ? `Hết hạn: ${new Date(expiryDate).toLocaleDateString("vi-VN")}` : null,
      ].filter(Boolean).join(" · "),
      media: BellIcon,
    }),
  },
});
