import { defineField, defineType } from "sanity";

export const draftDocumentSchema = defineType({
  name: "draftDocument",
  title: "Văn bản dự thảo",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Tên dự thảo", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Đường dẫn", type: "slug", options: { source: "title", maxLength: 120 }, validation: (r) => r.required() }),
    defineField({ name: "description", title: "Mô tả / Mục tiêu lấy ý kiến", type: "text", rows: 4 }),
    defineField({ name: "deadline", title: "Hạn góp ý", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "fileUrl", title: "Link tải dự thảo (PDF)", type: "url" }),
    defineField({ name: "publishedAt", title: "Ngày đăng", type: "datetime" }),
  ],
  preview: { select: { title: "title", subtitle: "deadline" } },
});
