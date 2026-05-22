const CATEGORY_CONFIG: Record<string, { label: string; modifier?: string }> = {
  "an-ninh-trat-tu":    { label: "An ninh trật tự" },
  "hoat-dong-don-vi":   { label: "Hoạt động đơn vị" },
  "nguoi-tot-viec-tot": { label: "Người tốt việc tốt" },
  "thong-bao":          { label: "Thông báo", modifier: "info" },
  "chi-dao-dieu-hanh":  { label: "Chỉ đạo điều hành", modifier: "info" },
  "canh-bao":           { label: "Cảnh báo", modifier: "warning" },
};

export default function Badge({ category }: { category: string }) {
  const config = CATEGORY_CONFIG[category] ?? { label: category };
  const className = config.modifier ? `cat-pill ${config.modifier}` : "cat-pill";
  return <span className={className}>{config.label}</span>;
}
