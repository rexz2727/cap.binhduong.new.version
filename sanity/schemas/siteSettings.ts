import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

// Singleton document — chỉ có 1 document duy nhất cho toàn site.
// Thay thế các giá trị hardcode trong constants/site.ts để biên tập viên
// có thể cập nhật trực tiếp qua Sanity Studio.
export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Cấu hình trang web",
  type: "document",
  icon: CogIcon,
  // Singleton: chặn tạo bản sao mới và không cho xoá thông qua Structure builder
  // (Structure builder sẽ enforce thêm — schema chỉ khai báo dữ liệu).
  fields: [
    defineField({
      name: "name",
      title: "Tên đơn vị",
      description: "Tên đầy đủ của đơn vị hiển thị trên header/footer (ví dụ: Công an phường Bình Dương).",
      type: "string",
      validation: (r) => r.max(200),
    }),
    defineField({
      name: "address",
      title: "Địa chỉ trụ sở",
      description: "Địa chỉ đầy đủ của trụ sở Công an phường (số nhà, đường, khu phố, phường, thành phố).",
      type: "string",
      validation: (r) => r.required().max(300),
    }),
    defineField({
      name: "phone",
      title: "Số điện thoại bàn",
      description: "Số điện thoại cố định của trụ sở (ví dụ: 0274 3515 097).",
      type: "string",
      validation: (r) => r.required().max(50),
    }),
    defineField({
      name: "email",
      title: "Email liên hệ chính",
      description: "Email công vụ dùng để tiếp nhận phản ánh, kiến nghị.",
      type: "string",
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: "hotline",
      title: "Đường dây nóng",
      description: "Số khẩn cấp / hotline trực ban (ví dụ: 069.318.7878 - 113).",
      type: "string",
      validation: (r) => r.required().max(100),
    }),
    defineField({
      name: "workingHours",
      title: "Giờ làm việc (Thứ Hai – Thứ Sáu)",
      description: "Ví dụ: 7:00 – 11:30, 13:30 – 17:00",
      type: "string",
      validation: (r) => r.required().max(150),
    }),
    defineField({
      name: "workingHoursSat",
      title: "Giờ làm việc (Thứ Bảy)",
      description: "Ví dụ: 7:30 – 11:30. Bỏ trống nếu không làm việc Thứ Bảy.",
      type: "string",
      validation: (r) => r.max(150),
    }),
    defineField({
      name: "description",
      title: "Mô tả ngắn về cổng thông tin",
      description: "Dùng cho meta description SEO và phần giới thiệu chung.",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(500),
    }),
    defineField({
      name: "facebook",
      title: "URL trang Facebook",
      description: "Đường dẫn đầy đủ tới fanpage chính thức.",
      type: "url",
    }),
    defineField({
      name: "youtube",
      title: "URL kênh YouTube",
      description: "Đường dẫn đầy đủ tới kênh YouTube chính thức.",
      type: "url",
    }),
    defineField({
      name: "zalo",
      title: "URL Zalo Official Account",
      description: "Đường dẫn đầy đủ tới tài khoản Zalo OA.",
      type: "url",
    }),
    defineField({
      name: "relatedAgencies",
      title: "Cơ quan / đơn vị liên quan",
      description: "Danh sách liên kết tới các cơ quan, đơn vị phối hợp hiển thị ở footer.",
      type: "array",
      of: [
        {
          type: "object",
          name: "relatedAgency",
          title: "Cơ quan liên quan",
          fields: [
            defineField({
              name: "label",
              title: "Tên hiển thị",
              type: "string",
              validation: (r) => r.required().max(150),
            }),
            defineField({
              name: "href",
              title: "Đường dẫn (URL)",
              type: "url",
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    }),
    defineField({
      name: "emergencyNumbers",
      title: "Số điện thoại khẩn cấp",
      description: "Danh sách các số khẩn cấp hiển thị nhanh (113, 114, 115, ...).",
      type: "array",
      of: [
        {
          type: "object",
          name: "emergencyNumber",
          title: "Số khẩn cấp",
          fields: [
            defineField({
              name: "label",
              title: "Nhãn (ví dụ: Cảnh sát 113)",
              type: "string",
              validation: (r) => r.required().max(100),
            }),
            defineField({
              name: "number",
              title: "Số điện thoại",
              type: "string",
              validation: (r) => r.required().max(50),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "number" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Cấu hình trang web",
      subtitle: "Singleton — chỉ có một bản duy nhất",
    }),
  },
});
