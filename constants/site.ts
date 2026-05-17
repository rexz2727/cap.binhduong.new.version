export const SITE = {
  name: "Công an phường Bình Dương",
  shortName: "CA Phường Bình Dương",
  address: "Số 01, Đường D27, KP. Hòa Phú 1, Phường Bình Dương, TP. Hồ Chí Minh",
  phone: "0274 3515 097",
  email: "cong-an-phuong-binh-duong@mail.gov.vn",
  hotline: "113",
  workingHours: "Thứ Hai – Thứ Sáu: 7:00 – 11:30, 13:30 – 17:00 | Thứ Bảy: 7:30 – 11:30",
  description:
    "Cổng thông tin chính thống của Công an phường Bình Dương — phục vụ nhân dân, đảm bảo an ninh trật tự.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cap-binhduong.vercel.app",
} as const;
