// Run: node --env-file=.env.local scripts/seed-homeContent.mjs
//
// Seed / cập nhật singleton `homeContent` cho Sanity từ giá trị fallback
// trong `components/sections/HeroSection.tsx`.
//
// Script sẽ ghi đè toàn bộ document `_id: "homeContent"` (createOrReplace).
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

// Document khớp với schema tại sanity/schemas/homeContent.ts.
// Giá trị fallback lấy từ components/sections/HeroSection.tsx.
const doc = {
  _id: "homeContent",
  _type: "homeContent",

  heroEyebrow: "Cổng thông tin chính thống",
  heroH1Part1: "Vì an ninh trật tự —",
  heroH1Part2: "vì nhân dân phục vụ.",
  heroLead:
    "Cổng thông tin điện tử của Công an phường Bình Dương, TP. Hồ Chí Minh. Tra cứu thủ tục hành chính, gửi phản ánh trực tuyến, tiếp cận thông tin pháp luật mọi lúc — minh bạch, nhanh chóng, đúng pháp luật.",

  // TODO: UPDATE WITH REAL DATA — href hiện đang là "#" trong component fallback.
  // Cần thay bằng đường dẫn thật tới trang thủ tục tương ứng.
  heroQuickTags: [
    {
      _type: "object",
      _key: "tag-cccd",
      label: "Cấp CCCD",
      href: "#",
    },
    {
      _type: "object",
      _key: "tag-tamtru",
      label: "Đăng ký tạm trú",
      href: "#",
    },
    {
      _type: "object",
      _key: "tag-xemay",
      label: "Xe máy điện",
      href: "#",
    },
    {
      _type: "object",
      _key: "tag-hochieu",
      label: "Hộ chiếu",
      href: "#",
    },
  ],
};

try {
  const result = await client.createOrReplace(doc);
  console.log("✓ homeContent seeded:", result._id);
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
