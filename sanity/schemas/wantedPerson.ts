import { SearchIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const wantedPersonSchema = defineType({
  name: "wantedPerson",
  title: "Đối tượng truy nã",
  type: "document",
  icon: SearchIcon,
  fields: [
    defineField({ name: "fullName", title: "Họ và tên", type: "string", validation: (r) => r.required() }),
    defineField({ name: "aliases", title: "Bí danh / Tên khác", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "photo", title: "Ảnh", type: "image", options: { hotspot: true } }),
    defineField({ name: "birthYear", title: "Năm sinh", type: "number" }),
    defineField({ name: "hometown", title: "Quê quán", type: "string" }),
    defineField({ name: "crime", title: "Tội danh", type: "string", validation: (r) => r.required() }),
    defineField({ name: "warrantDate", title: "Ngày phát lệnh truy nã", type: "date" }),
    defineField({ name: "warrantAgency", title: "Cơ quan ra lệnh truy nã", type: "string" }),
    defineField({
      name: "status", title: "Trạng thái", type: "string",
      options: {
        list: [
          { title: "Đang truy nã", value: "dang-truy-na" },
          { title: "Đã bắt", value: "da-bat" },
        ],
        layout: "radio",
      },
      initialValue: "dang-truy-na",
      validation: (r) => r.required(),
    }),
    defineField({ name: "note", title: "Ghi chú", type: "text", rows: 3 }),
  ],
  preview: {
    select: { title: "fullName", crime: "crime", status: "status", media: "photo" },
    prepare: ({ title, crime, status, media }) => ({
      title,
      subtitle: [crime, status === "da-bat" ? "Đã bắt" : "Đang truy nã"].filter(Boolean).join(" · "),
      media,
    }),
  },
});
