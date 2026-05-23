export const LEGAL_CATEGORY_OPTIONS = [
  { value: "nghi-quyet", label: "Nghị quyết" },
  { value: "ke-hoach", label: "Kế hoạch" },
  { value: "quyet-dinh", label: "Quyết định" },
  { value: "thong-tu", label: "Thông tư" },
  { value: "khac", label: "Khác" },
] as const;

export const LEGAL_CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  LEGAL_CATEGORY_OPTIONS.map(({ value, label }) => [value, label])
);
