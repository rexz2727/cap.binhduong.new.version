export const NEWS_CATEGORY_OPTIONS = [
  { value: "an-ninh-trat-tu", label: "An ninh trật tự" },
  { value: "hoat-dong-don-vi", label: "Hoạt động đơn vị" },
  { value: "nguoi-tot-viec-tot", label: "Người tốt việc tốt" },
  { value: "thong-bao", label: "Thông báo" },
  { value: "chi-dao-dieu-hanh", label: "Chỉ đạo điều hành" },
] as const;

export const NEWS_CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  NEWS_CATEGORY_OPTIONS.map(({ value, label }) => [value, label])
);

export const NEWS_CATEGORY_CONFIG: Record<string, { label: string; modifier?: string }> = {
  "an-ninh-trat-tu":    { label: "An ninh trật tự" },
  "hoat-dong-don-vi":   { label: "Hoạt động đơn vị" },
  "nguoi-tot-viec-tot": { label: "Người tốt việc tốt" },
  "thong-bao":          { label: "Thông báo", modifier: "info" },
  "chi-dao-dieu-hanh":  { label: "Chỉ đạo điều hành", modifier: "info" },
};
