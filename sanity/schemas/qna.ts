import { defineField, defineType } from "sanity";

export const qnaSchema = defineType({
  name: "qna",
  title: "Hỏi đáp công dân",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Câu hỏi", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "askerName", title: "Người hỏi (để trống = ẩn danh)", type: "string" }),
    defineField({ name: "askerEmail", title: "Email người hỏi (không hiển thị công khai)", type: "string" }),
    defineField({
      name: "category", title: "Lĩnh vực", type: "string",
      options: {
        list: [
          { title: "Cư trú", value: "cu-tru" },
          { title: "CCCD / CMND", value: "cccd" },
          { title: "VNeID", value: "vneid" },
          { title: "Đăng ký xe", value: "xe-may" },
          { title: "Hành chính / Pháp luật", value: "hanh-chinh" },
          { title: "Khác", value: "khac" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "answer", title: "Câu trả lời", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "isAnswered", title: "Đã trả lời", type: "boolean", initialValue: false }),
    defineField({ name: "answeredBy", title: "Cán bộ trả lời", type: "string" }),
    defineField({ name: "answeredAt", title: "Ngày trả lời", type: "datetime" }),
    defineField({ name: "viewCount", title: "Lượt xem", type: "number", initialValue: 0 }),
    defineField({ name: "publishedAt", title: "Ngày đăng câu hỏi", type: "datetime" }),
  ],
  preview: {
    select: { title: "question", subtitle: "askerName" },
    prepare: ({ title, subtitle }) => ({
      title: title?.slice(0, 80),
      subtitle: subtitle ?? "Ẩn danh",
    }),
  },
});
