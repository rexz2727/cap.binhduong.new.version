export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  {
    label: "Tin tức",
    href: "/tin-tuc",
    children: [
      { label: "Tất cả tin tức", href: "/tin-tuc" },
      { label: "Thông báo", href: "/tin-tuc?category=thong-bao" },
      { label: "Cảnh báo", href: "/tin-tuc?category=canh-bao" },
    ],
  },
  { label: "Văn bản pháp luật", href: "/van-ban-phap-luat" },
  { label: "Thủ tục hành chính", href: "/thu-tuc-hanh-chinh" },
  { label: "Phản ánh", href: "/phan-anh" },
];
