// Run: node --env-file=.env.local scripts/seed-unitProfile.mjs
//
// Seed / cập nhật singleton `unitProfile` cho Sanity từ giá trị fallback
// trong `components/sections/GioiThieuTabs.tsx`.
//
// Script sẽ ghi đè toàn bộ document `_id: "unitProfile"` (createOrReplace).
// Chỉ dùng khi cần khởi tạo lần đầu hoặc reset về giá trị mặc định —
// KHÔNG chạy trên production nếu biên tập viên đã chỉnh trong Studio.

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  console.error("✗ Thiếu NEXT_PUBLIC_SANITY_PROJECT_ID trong .env.local");
  process.exit(1);
}
if (!token) {
  console.error("✗ Thiếu SANITY_API_TOKEN (cần token có quyền write).");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Document khớp với schema tại sanity/schemas/unitProfile.ts.
// Giá trị fallback lấy từ components/sections/GioiThieuTabs.tsx.
const doc = {
  _id: "unitProfile",
  _type: "unitProfile",

  unitDescription1:
    "Công an phường Bình Dương là đơn vị trực thuộc Công an Thành phố Hồ Chí Minh. Đơn vị được thành lập trên cơ sở sáp nhập các phường Hòa Phú, Phú Mỹ, Phú Tân và Phú Chánh theo chủ trương sắp xếp đơn vị hành chính của tỉnh Bình Dương cũ (nay là TP.HCM).",
  unitDescription2:
    "Nhiệm vụ chính: bảo đảm an ninh trật tự, phòng chống tội phạm, quản lý hành chính về trật tự xã hội, đăng ký cư trú, cấp Căn cước công dân, và phục vụ nhân dân trên địa bàn phường.",

  duties: [
    {
      _type: "object",
      _key: "duty-antt",
      title: "Đảm bảo an ninh trật tự",
      body: "Phòng ngừa, đấu tranh chống các loại tội phạm, tệ nạn xã hội trên địa bàn phường.",
    },
    {
      _type: "object",
      _key: "duty-cutru",
      title: "Quản lý cư trú & CCCD",
      body: "Đăng ký thường trú, tạm trú, cấp Căn cước công dân, khai báo lưu trú.",
    },
    {
      _type: "object",
      _key: "duty-phuongtien",
      title: "Quản lý phương tiện",
      body: "Đăng ký xe mô tô, xe gắn máy và phương tiện thuộc thẩm quyền cấp phường.",
    },
    {
      _type: "object",
      _key: "duty-phucvu",
      title: "Phục vụ nhân dân",
      body: "Tiếp công dân, giải quyết khiếu nại, tố cáo, hỗ trợ thủ tục hành chính.",
    },
  ],

  // TODO: UPDATE WITH REAL DATA — quân số mỗi đội cần xác nhận lại
  // với chỉ huy đơn vị trước khi công bố.
  departments: [
    {
      _type: "object",
      _key: "dept-antt",
      label: "Đội Cảnh sát ANTT",
      sub: "12 cán bộ chiến sĩ",
    },
    {
      _type: "object",
      _key: "dept-hinhsu",
      label: "Đội Cảnh sát Hình sự",
      sub: "8 cán bộ chiến sĩ",
    },
    {
      _type: "object",
      _key: "dept-hanhchinh",
      label: "Đội Quản lý hành chính",
      sub: "10 cán bộ chiến sĩ",
    },
    {
      _type: "object",
      _key: "dept-khuvuc",
      label: "Cảnh sát Khu vực",
      sub: "4 cán bộ phụ trách 4 KP",
    },
  ],

  // TODO: UPDATE WITH REAL DATA — số liệu thống kê cần xác nhận lại
  // với chỉ huy đơn vị trước khi công bố.
  orgStats: [
    {
      _type: "object",
      _key: "stat-quanso",
      label: "Tổng quân số:",
      value: "38 cán bộ chiến sĩ",
    },
    {
      _type: "object",
      _key: "stat-diaban",
      label: "Địa bàn:",
      value: "4 khu phố · ~112.500 dân",
    },
    {
      _type: "object",
      _key: "stat-truso",
      label: "Trụ sở:",
      value: "01 trụ sở chính",
    },
    {
      _type: "object",
      _key: "stat-hoatdong",
      label: "Hoạt động:",
      value: "24/7 với đường dây nóng",
    },
  ],
};

try {
  const result = await client.createOrReplace(doc);
  console.log("✓ unitProfile seeded:", result._id);
  console.log("  - projectId:", projectId);
  console.log("  - dataset:", dataset);
  console.log(
    "  - fields ghi:",
    Object.keys(doc)
      .filter((k) => !k.startsWith("_"))
      .join(", ")
  );
} catch (err) {
  console.error("✗ Seed thất bại:", err?.message ?? err);
  process.exit(1);
}
