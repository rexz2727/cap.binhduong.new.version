// Seed / cập nhật singleton `siteSettings` cho Sanity từ giá trị fallback
// trong `constants/site.ts`.
//
// CÁCH CHẠY (dotenv KHÔNG có trong package.json — dùng cờ native của Node):
//   node --env-file=.env.local scripts/seed-siteSettings.mjs
//
// Script sẽ ghi đè toàn bộ document `_id: "siteSettings"` (createOrReplace).
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

// Document khớp với schema tại sanity/schemas/siteSettings.ts.
// Giá trị mặc định lấy từ constants/site.ts.
const doc = {
  _id: "siteSettings",
  _type: "siteSettings",

  name: "Công an phường Bình Dương",
  address:
    "Số 01, Đường D27, Khu phố Hòa Phú 1, Phường Bình Dương, Thành phố Hồ Chí Minh",
  phone: "0274 3515 097",
  email: "conganphuongbinhduong@gmail.vn",
  hotline: "069.318.7878 - 113",

  // Schema tách giờ làm việc thành 2 trường, nhưng constants/site.ts gộp
  // làm một chuỗi. Ở đây tách lại theo định dạng schema mô tả.
  workingHours: "7:00 – 11:30, 13:30 – 17:00",
  workingHoursSat: "7:30 – 11:30",

  description:
    "Cổng thông tin chính thống của Công an phường Bình Dương — phục vụ nhân dân, đảm bảo an ninh trật tự.",

  facebook: "https://www.facebook.com/hcmconganphuongbinhduong",

  // TODO: UPDATE WITH REAL DATA — constants/site.ts đang để "Đang cập nhật",
  // không phải URL hợp lệ nên field `type: "url"` sẽ báo lỗi trong Studio
  // nếu giữ nguyên. Tạm để null cho tới khi có kênh chính thức.
  youtube: null,

  // TODO: UPDATE WITH REAL DATA — giá trị "https://zalo/hcmcapbinhduong"
  // trong constants/site.ts là URL không hợp lệ (thiếu TLD). Cần thay bằng
  // link Zalo OA thật, ví dụ https://zalo.me/<oa-id>.
  zalo: null,

  // TODO: UPDATE WITH REAL DATA — bổ sung các cơ quan liên quan thật sự
  // (Công an TP.HCM, UBND phường, Cổng dịch vụ công, ...).
  relatedAgencies: [
    // {
    //   _type: "relatedAgency",
    //   _key: "cong-an-tphcm",
    //   label: "Công an Thành phố Hồ Chí Minh",
    //   href: "https://congan.hochiminhcity.gov.vn",
    // },
  ],

  // TODO: UPDATE WITH REAL DATA — danh sách số khẩn cấp mặc định, biên tập
  // viên có thể chỉnh trong Studio sau.
  emergencyNumbers: [
    {
      _type: "emergencyNumber",
      _key: "police-113",
      label: "Cảnh sát phản ứng nhanh",
      number: "113",
    },
    {
      _type: "emergencyNumber",
      _key: "fire-114",
      label: "Cứu hoả",
      number: "114",
    },
    {
      _type: "emergencyNumber",
      _key: "ambulance-115",
      label: "Cấp cứu y tế",
      number: "115",
    },
    {
      _type: "emergencyNumber",
      _key: "hotline-cap",
      label: "Trực ban CAP Bình Dương",
      number: "069.318.7878",
    },
  ],
};

try {
  const result = await client.createOrReplace(doc);
  console.log("✓ siteSettings seeded:", result._id);
  console.log("  - projectId:", projectId);
  console.log("  - dataset:", dataset);
  console.log("  - fields ghi:", Object.keys(doc).filter((k) => !k.startsWith("_")).join(", "));
} catch (err) {
  console.error("✗ Seed thất bại:", err?.message ?? err);
  process.exit(1);
}
