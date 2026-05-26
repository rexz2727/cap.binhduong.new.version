import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const newsSchema = defineType({
  name: "newsPost",
  title: "Tin tức",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "main", title: "Nội dung chính", default: true },
    { name: "english", title: "🇬🇧 Tiếng Anh" },
  ],
  fields: [
    defineField({ name: "title", title: "Tiêu đề", type: "string", group: "main", validation: (r) => r.required().max(200) }),
    defineField({ name: "slug", title: "Đường dẫn", type: "slug", group: "main", options: { source: "title", maxLength: 100 }, validation: (r) => r.required() }),
    defineField({ name: "publishedAt", title: "Ngày đăng", type: "datetime", group: "main", validation: (r) => r.required() }),
    defineField({
      name: "category", title: "Phân loại", type: "string", group: "main",
      options: {
        list: [
          { title: "An ninh trật tự", value: "an-ninh-trat-tu" },
          { title: "Hoạt động đơn vị", value: "hoat-dong-don-vi" },
          { title: "Người tốt việc tốt", value: "nguoi-tot-viec-tot" },
          { title: "Thông báo", value: "thong-bao" },
          { title: "Chỉ đạo điều hành", value: "chi-dao-dieu-hanh" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "isFeatured", title: "Ghim lên slider trang chủ", type: "boolean", group: "main", initialValue: false }),
    defineField({ name: "excerpt", title: "Tóm tắt", type: "text", rows: 3, group: "main", validation: (r) => r.required().max(300) }),
    defineField({
      name: "mainImage", title: "Ảnh đại diện", type: "image", group: "main", options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Mô tả ảnh", type: "string" })],
    }),
    defineField({ name: "body", title: "Nội dung", type: "array", group: "main", of: [{ type: "block" }, { type: "image" }] }),
    defineField({ name: "titleEn", title: "Tiêu đề (EN)", type: "string", group: "english" }),
    defineField({ name: "excerptEn", title: "Tóm tắt (EN)", type: "text", rows: 3, group: "english" }),
    defineField({ name: "bodyEn", title: "Nội dung (EN)", type: "array", of: [{ type: "block" }], group: "english" }),
  ],
  orderings: [{ title: "Mới nhất", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "category", date: "publishedAt", media: "mainImage" },
    prepare: ({ title, subtitle, date, media }) => ({
      title,
      subtitle: [subtitle, date ? new Date(date).toLocaleDateString("vi-VN") : null].filter(Boolean).join(" · "),
      media,
    }),
  },
});
