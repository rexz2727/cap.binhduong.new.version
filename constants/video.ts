export const VIDEO_CATEGORY_OPTIONS = [
  { value: "hoat-dong", label: "Hoạt động" },
  { value: "an-ninh", label: "An ninh" },
  { value: "cong-dong", label: "Cộng đồng" },
] as const;

export const VIDEO_CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  VIDEO_CATEGORY_OPTIONS.map(({ value, label }) => [value, label])
);
