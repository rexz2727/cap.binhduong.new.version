export const SITE = {
  name: "Công an phường Bình Dương",
  shortName: "CAP Bình Dương",
  address: "Số 01, Đường D27, Khu phố Hòa Phú 1, Phường Bình Dương, Thành phố Hồ Chí Minh",
  phone: "0274 3515 097",
  email: "conganphuongbinhduong@gmail.vn",
  hotline: "069.318.7878 - 113",
  workingHours: "Thứ Hai – Thứ Sáu: 7:00 – 11:30, 13:30 – 17:00 | Thứ Bảy: 7:30 – 11:30",
  description:
    "Cổng thông tin chính thống của Công an phường Bình Dương — phục vụ nhân dân, đảm bảo an ninh trật tự.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cap-binhduong.vercel.app",
  facebook: "https://www.facebook.com/hcmconganphuongbinhduong",
  youtube: "Đang cập nhật",
  zalo: "https://zalo/hcmcapbinhduong",

} as const;
