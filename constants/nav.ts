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
  { label: "Hỏi đáp", href: "/hoi-dap" },
  { label: "Người tốt việc tốt", href: "/nguoi-tot-viec-tot" },
  {
    label: "Thư viện",
    href: "/thu-vien-anh",
    children: [
      { label: "Thư viện ảnh", href: "/thu-vien-anh" },
      { label: "Video", href: "/video" },
    ],
  },
  { label: "Lịch tiếp công dân", href: "/lich-tiep-cong-dan" },
  { label: "Truy nã", href: "/truy-na" },
];
