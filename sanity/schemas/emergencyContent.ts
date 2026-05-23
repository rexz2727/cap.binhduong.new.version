import { defineType, defineField, defineArrayMember } from "sanity";

export const emergencyContentSchema = defineType({
  name: "emergencyContent",
  title: "Thanh khẩn cấp (Emergency Row)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tiêu đề thanh",
      type: "string",
      description: 'VD: "Trường hợp khẩn cấp gọi ngay"',
    }),
    defineField({
      name: "emergencyNumbers",
      title: "Số điện thoại khẩn cấp",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "number", title: "Số", type: "string" }),
            defineField({ name: "label", title: "Nhãn", type: "string" }),
            defineField({ name: "href", title: "Href (tel:...)", type: "string" }),
          ],
          preview: { select: { title: "number", subtitle: "label" } },
        }),
      ],
    }),
    defineField({
      name: "externalLinks",
      title: "Liên kết ngoài",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Nhãn", type: "string" }),
            defineField({ name: "href", title: "URL", type: "url" }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Thanh khẩn cấp" }),
  },
});
