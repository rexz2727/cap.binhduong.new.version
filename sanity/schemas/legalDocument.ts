import { defineField, defineType } from "sanity";

export const legalDocumentSchema = defineType({
  name: "legalDocument",
  title: "Văn bản pháp luật",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Tên văn bản", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Đường dẫn", type: "slug", options: { source: "title", maxLength: 120 }, validation: (r) => r.required() }),
    defineField({ name: "documentNumber", title: "Số hiệu văn bản", type: "string", validation: (r) => r.required() }),
    defineField({ name: "issuedDate", title: "Ngày ban hành", type: "date", validation: (r) => r.required() }),
    defineField({ name: "issuingBody", title: "Cơ quan ban hành", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "category", title: "Loại văn bản", type: "string",
      options: { list: [{ title: "Nghị quyết", value: "nghi-quyet" }, { title: "Kế hoạch", value: "ke-hoach" }, { title: "Quyết định", value: "quyet-dinh" }, { title: "Thông tư", value: "thong-tu" }, { title: "Khác", value: "khac" }] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "summary", title: "Tóm tắt nội dung", type: "text", rows: 4 }),
    defineField({ name: "fileUrl", title: "Link tải file (PDF)", type: "url" }),
  ],
  preview: { select: { title: "title", subtitle: "documentNumber" } },
});
