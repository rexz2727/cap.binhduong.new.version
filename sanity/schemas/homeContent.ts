import { defineType, defineField, defineArrayMember } from "sanity";

export const homeContentSchema = defineType({
  name: "homeContent",
  title: "Nội dung trang chủ",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Eyebrow (trên tiêu đề)",
      type: "string",
      description: 'Dòng nhỏ phía trên h1. VD: "Cổng thông tin chính thống"',
    }),
    defineField({
      name: "heroH1Part1",
      title: "Tiêu đề H1 — phần 1",
      type: "string",
      description: 'VD: "Vì an ninh trật tự —"',
    }),
    defineField({
      name: "heroH1Part2",
      title: "Tiêu đề H1 — phần 2 (màu nhấn)",
      type: "string",
      description: 'VD: "vì nhân dân phục vụ."',
    }),
    defineField({
      name: "heroLead",
      title: "Đoạn mô tả dẫn (lead)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroQuickTags",
      title: "Tra cứu nhanh (tags)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Nhãn", type: "string" }),
            defineField({ name: "href", title: "Đường dẫn", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
    defineField({
      name: "valuesItems",
      title: "4 giá trị nổi bật (ValuesStrip)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon SVG (href)",
              type: "string",
              description: 'VD: "#i-shield", "#i-check-shield", "#i-clock-fast", "#i-users"',
            }),
            defineField({ name: "title", title: "Tiêu đề", type: "string" }),
            defineField({ name: "desc", title: "Mô tả", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "desc" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "heroH1Part1" },
    prepare: () => ({ title: "Nội dung trang chủ" }),
  },
});
