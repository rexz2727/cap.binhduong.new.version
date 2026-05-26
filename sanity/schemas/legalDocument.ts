import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const STATUS_LABEL: Record<string, string> = {
  "con-hieu-luc": "Còn hiệu lực",
  "het-hieu-luc": "Hết hiệu lực",
  "cho-hieu-luc": "Chờ hiệu lực",
};

export const legalDocumentSchema = defineType({
  name: "legalDocument",
  title: "Văn bản pháp luật",
  type: "document",
  icon: DocumentIcon,
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
    defineField({ name: "effectiveDate", title: "Ngày có hiệu lực", type: "date" }),
    defineField({
      name: "status", title: "Hiệu lực", type: "string",
      options: {
        list: [
          { title: "Còn hiệu lực", value: "con-hieu-luc" },
          { title: "Hết hiệu lực", value: "het-hieu-luc" },
          { title: "Chờ có hiệu lực", value: "cho-hieu-luc" },
        ],
      },
      initialValue: "con-hieu-luc",
    }),
    defineField({ name: "summary", title: "Tóm tắt nội dung", type: "text", rows: 4 }),
    defineField({ name: "fileUrl", title: "Link tải file (PDF)", type: "url" }),
    defineField({
      name: "attachedFile",
      title: "File đính kèm (upload trực tiếp)",
      description: "Upload PDF, Word, TXT... Ưu tiên hơn 'Link tải file' nếu cả hai đều có.",
      type: "file",
      options: { accept: ".pdf,.doc,.docx,.txt,.html" },
    }),
    defineField({ name: "body", title: "Nội dung chi tiết", type: "array", of: [{ type: "block" }] }),
  ],
  preview: {
    select: { title: "title", documentNumber: "documentNumber", status: "status", issuedDate: "issuedDate" },
    prepare: ({ title, documentNumber, status, issuedDate }) => ({
      title,
      subtitle: [
        documentNumber,
        issuedDate,
        status ? STATUS_LABEL[status] : null,
      ].filter(Boolean).join(" · "),
      media: DocumentIcon,
    }),
  },
});
