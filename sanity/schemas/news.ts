import { defineField, defineType } from "sanity";

export const newsSchema = defineType({
  name: "newsPost",
  title: "Tin tức",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Tiêu đề", type: "string", validation: (r) => r.required().max(200) }),
    defineField({ name: "slug", title: "Đường dẫn", type: "slug", options: { source: "title", maxLength: 100 }, validation: (r) => r.required() }),
    defineField({ name: "publishedAt", title: "Ngày đăng", type: "datetime", validation: (r) => r.required() }),
    defineField({
      name: "category", title: "Phân loại", type: "string",
      options: { list: [{ title: "Tin tức", value: "tin-tuc" }, { title: "Thông báo", value: "thong-bao" }, { title: "Cảnh báo", value: "canh-bao" }], layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "excerpt", title: "Tóm tắt", type: "text", rows: 3, validation: (r) => r.required().max(300) }),
    defineField({
      name: "mainImage", title: "Ảnh đại diện", type: "image", options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Mô tả ảnh", type: "string" })],
    }),
    defineField({ name: "body", title: "Nội dung", type: "array", of: [{ type: "block" }, { type: "image" }] }),
  ],
  orderings: [{ title: "Mới nhất", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "mainImage" } },
});
