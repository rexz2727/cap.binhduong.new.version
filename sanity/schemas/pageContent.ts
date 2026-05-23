import { defineType, defineField } from "sanity";

export const pageContentSchema = defineType({
  name: "pageContent",
  title: "Mô tả các trang",
  type: "document",
  fields: [
    defineField({ name: "gioi_thieu", title: "Trang Giới thiệu", type: "text", rows: 2 }),
    defineField({ name: "tin_tuc", title: "Trang Tin tức", type: "text", rows: 2 }),
    defineField({ name: "van_ban_phap_luat", title: "Trang Văn bản pháp luật", type: "text", rows: 2 }),
    defineField({ name: "thu_tuc_hanh_chinh", title: "Trang Thủ tục hành chính", type: "text", rows: 2 }),
    defineField({ name: "hoi_dap", title: "Trang Hỏi đáp", type: "text", rows: 2 }),
    defineField({ name: "thu_vien_anh", title: "Trang Thư viện ảnh", type: "text", rows: 2 }),
    defineField({ name: "video", title: "Trang Video", type: "text", rows: 2 }),
    defineField({ name: "lich_tiep_cong_dan", title: "Trang Lịch tiếp công dân", type: "text", rows: 2 }),
    defineField({ name: "truy_na", title: "Trang Truy nã", type: "text", rows: 2 }),
    defineField({ name: "nguoi_tot_viec_tot", title: "Trang Người tốt việc tốt", type: "text", rows: 2 }),
    defineField({ name: "chinh_sach_phap_luat", title: "Trang Chính sách pháp luật", type: "text", rows: 2 }),
    defineField({ name: "search", title: "Trang Tìm kiếm", type: "text", rows: 2 }),
    defineField({ name: "so_do_trang", title: "Trang Sơ đồ trang", type: "text", rows: 2 }),
  ],
  preview: {
    prepare: () => ({ title: "Mô tả các trang" }),
  },
});
