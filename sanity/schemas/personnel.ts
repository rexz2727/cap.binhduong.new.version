import { defineField, defineType } from "sanity";

export const personnelSchema = defineType({
  name: "personnel",
  title: "Cán bộ lãnh đạo",
  type: "document",
  fields: [
    defineField({ name: "fullName", title: "Họ và tên", type: "string", validation: (r) => r.required() }),
    defineField({ name: "rank", title: "Cấp bậc", type: "string", validation: (r) => r.required() }),
    defineField({ name: "position", title: "Chức vụ", type: "string", validation: (r) => r.required() }),
    defineField({ name: "unit", title: "Đơn vị", type: "string", initialValue: "Công an phường Bình Dương" }),
    defineField({ name: "photo", title: "Ảnh", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", title: "Thứ tự hiển thị", type: "number", initialValue: 99 }),
  ],
  orderings: [{ title: "Thứ tự hiển thị", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "fullName", subtitle: "position", media: "photo" } },
});
