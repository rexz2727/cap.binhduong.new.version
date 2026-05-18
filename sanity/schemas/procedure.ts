import { defineField, defineType } from "sanity";

export const procedureSchema = defineType({
  name: "procedure",
  title: "Thủ tục hành chính",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Tên thủ tục", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Đường dẫn", type: "slug", options: { source: "title", maxLength: 120 }, validation: (r) => r.required() }),
    defineField({
      name: "category", title: "Lĩnh vực", type: "string",
      options: { list: [{ title: "Cư trú", value: "cu-tru" }, { title: "CMND/CCCD", value: "cmnd-cccd" }, { title: "Phương tiện", value: "xe-co" }, { title: "Khác", value: "khac" }] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "processingTime", title: "Thời gian giải quyết", type: "string" }),
    defineField({ name: "fee", title: "Lệ phí", type: "string" }),
    defineField({ name: "requirements", title: "Thành phần hồ sơ", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "steps", title: "Các bước thực hiện", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "legalBasis", title: "Cơ sở pháp lý", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "forms", title: "Biểu mẫu tải về", type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Tên biểu mẫu", type: "string" }),
          defineField({ name: "fileUrl", title: "Link tải (PDF)", type: "url" }),
        ],
      }],
    }),
    defineField({ name: "onlineServiceUrl", title: "Link nộp hồ sơ trực tuyến (Cổng DVC)", type: "url" }),
  ],
  preview: { select: { title: "title", subtitle: "category" } },
});
