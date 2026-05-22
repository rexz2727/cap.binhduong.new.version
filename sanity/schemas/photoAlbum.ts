import { ImagesIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const photoAlbumSchema = defineType({
  name: "photoAlbum",
  title: "Album ảnh",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({ name: "title", title: "Tiêu đề album", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Đường dẫn", type: "slug", options: { source: "title", maxLength: 100 }, validation: (r) => r.required() }),
    defineField({ name: "date", title: "Ngày", type: "date", validation: (r) => r.required() }),
    defineField({ name: "coverImage", title: "Ảnh bìa", type: "image", options: { hotspot: true } }),
    defineField({ name: "description", title: "Mô tả", type: "text", rows: 3 }),
    defineField({
      name: "category", title: "Danh mục", type: "string",
      options: {
        list: [
          { title: "Hoạt động đơn vị", value: "hoat-dong" },
          { title: "Sự kiện", value: "su-kien" },
          { title: "Cộng đồng", value: "cong-dong" },
        ],
      },
    }),
    defineField({
      name: "photos", title: "Danh sách ảnh", type: "array",
      of: [{
        type: "image",
        options: { hotspot: true },
        fields: [defineField({ name: "caption", title: "Chú thích", type: "string" })],
      }],
    }),
  ],
  preview: { select: { title: "title", subtitle: "date", media: "coverImage" } },
});
