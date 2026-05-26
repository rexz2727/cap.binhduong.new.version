export interface ServiceCard {
  label: string;
  description: string;
  href: string;
  icon: string;
}

export const SERVICE_CARDS: ServiceCard[] = [
  { label: "Cấp CCCD", description: "Căn cước công dân", href: "/thu-tuc-hanh-chinh", icon: "#i-doc" },
  { label: "Đăng ký cư trú", description: "Thường trú, tạm trú", href: "/thu-tuc-hanh-chinh", icon: "#i-doc" },
  { label: "Đăng ký xe", description: "Mô tô, xe gắn máy", href: "/thu-tuc-hanh-chinh", icon: "#i-shield" },
  { label: "Hộ chiếu", description: "Cấp, gia hạn hộ chiếu", href: "/thu-tuc-hanh-chinh", icon: "#i-globe" },
  { label: "Đặt lịch hẹn", description: "Lịch tiếp công dân", href: "/lich-tiep-cong-dan", icon: "#i-cal" },
  { label: "Gửi phản ánh", description: "Kiến nghị trực tuyến", href: "/phan-anh", icon: "#i-mail" },
];
