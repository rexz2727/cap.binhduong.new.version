import { StarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const goodDeedSchema = defineType({
  name: "goodDeed",
  title: "Người tốt việc tốt",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({ name: "name", title: "Họ tên / Tên tấm gương", type: "string", validation: (r) => r.required().max(200) }),
    defineField({ name: "slug", title: "Đường dẫn", type: "slug", options: { source: "name", maxLength: 100 }, validation: (r) => r.required() }),
    defineField({
      name: "photo", title: "Ảnh chân dung", type: "image", options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Mô tả ảnh", type: "string" })],
    }),
    defineField({ name: "role", title: "Chức danh / Vai trò", type: "string", validation: (r) => r.required().max(150) }),
    defineField({ name: "summary", title: "Tóm tắt thành tích", type: "text", rows: 3, validation: (r) => r.required().max(300) }),
    defineField({ name: "body", title: "Nội dung chi tiết", type: "array", of: [{ type: "block" }, { type: "image" }] }),
    defineField({ name: "date", title: "Ngày tôn vinh", type: "datetime", validation: (r) => r.required() }),
  ],
  orderings: [{ title: "Mới nhất", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: {
    select: { title: "name", subtitle: "role", date: "date", media: "photo" },
    prepare: ({ title, subtitle, date, media }) => ({
      title,
      subtitle: [subtitle, date ? new Date(date).toLocaleDateString("vi-VN") : null].filter(Boolean).join(" · "),
      media,
    }),
  },
});
