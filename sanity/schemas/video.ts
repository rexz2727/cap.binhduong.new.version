import { PlayIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const videoSchema = defineType({
  name: "video",
  title: "Video",
  type: "document",
  icon: PlayIcon,
  fields: [
    defineField({ name: "title", title: "Tiêu đề", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Đường dẫn", type: "slug", options: { source: "title", maxLength: 100 }, validation: (r) => r.required() }),
    defineField({ name: "date", title: "Ngày đăng", type: "date", validation: (r) => r.required() }),
    defineField({
      name: "youtubeId", title: "YouTube Video ID", type: "string",
      description: "Chỉ nhập ID (ví dụ: dQw4w9WgXcQ), không nhập full URL",
      validation: (r) => r.required(),
    }),
    defineField({ name: "thumbnail", title: "Ảnh thumbnail (tuỳ chọn)", type: "image", options: { hotspot: true } }),
    defineField({ name: "description", title: "Mô tả", type: "text", rows: 3 }),
    defineField({
      name: "category", title: "Danh mục", type: "string",
      options: {
        list: [
          { title: "Hoạt động đơn vị", value: "hoat-dong" },
          { title: "An ninh trật tự", value: "an-ninh" },
          { title: "Cộng đồng", value: "cong-dong" },
        ],
      },
    }),
  ],
  preview: { select: { title: "title", subtitle: "date", media: "thumbnail" } },
});
