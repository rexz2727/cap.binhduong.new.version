import { defineType, defineField, defineArrayMember } from "sanity";

export const feedbackProcessSchema = defineType({
  name: "feedbackProcess",
  title: "Trang Phản ánh trực tuyến",
  type: "document",
  fields: [
    defineField({
      name: "pageDescription",
      title: "Mô tả trang (dưới tiêu đề)",
      type: "text",
      rows: 2,
      description: 'VD: "Gửi tin báo tội phạm, kiến nghị..."',
    }),
    defineField({
      name: "warningNotice",
      title: "Lưu ý quan trọng",
      type: "text",
      rows: 3,
      description: "Nội dung hộp cảnh báo phi khẩn cấp (không bao gồm số 113 — phần đó hardcode).",
    }),
    defineField({
      name: "emergencyDesc",
      title: "Mô tả khẩn cấp (bên cạnh số 113)",
      type: "text",
      rows: 2,
      description: 'VD: "Gọi ngay khi có sự việc đang xảy ra..."',
    }),
    defineField({
      name: "processSteps",
      title: "Quy trình xử lý phản ánh (4 bước)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Tiêu đề bước", type: "string" }),
            defineField({ name: "body", title: "Mô tả bước", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Trang Phản ánh trực tuyến" }),
  },
});
