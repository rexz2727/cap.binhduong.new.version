import { defineType, defineField, defineArrayMember } from "sanity";

export const unitProfileSchema = defineType({
  name: "unitProfile",
  title: "Hồ sơ đơn vị (Giới thiệu)",
  type: "document",
  fields: [
    defineField({
      name: "unitDescription1",
      title: "Mô tả đơn vị — đoạn 1",
      type: "text",
      rows: 3,
      description: "Đoạn giới thiệu tổng quan về Công an phường Bình Dương.",
    }),
    defineField({
      name: "unitDescription2",
      title: "Mô tả đơn vị — đoạn 2 (nhiệm vụ)",
      type: "text",
      rows: 3,
      description: "Đoạn mô tả nhiệm vụ chính.",
    }),
    defineField({
      name: "duties",
      title: "Chức năng & nhiệm vụ chính (4 thẻ)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Tiêu đề", type: "string" }),
            defineField({ name: "body", title: "Nội dung", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        }),
      ],
    }),
    defineField({
      name: "departments",
      title: "Các đội/đơn vị (Sơ đồ tổ chức)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Tên đội/đơn vị", type: "string" }),
            defineField({ name: "sub", title: "Quân số", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "sub" } },
        }),
      ],
    }),
    defineField({
      name: "orgStats",
      title: "Số liệu thống kê (Sơ đồ tổ chức)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Nhãn", type: "string" }),
            defineField({ name: "value", title: "Giá trị", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Hồ sơ đơn vị" }),
  },
});
