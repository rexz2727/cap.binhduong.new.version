export const QNA_CATEGORY_OPTIONS = [
  { value: "cu-tru", label: "Cư trú" },
  { value: "cccd", label: "CCCD" },
  { value: "vneid", label: "VNeID" },
  { value: "xe-may", label: "Xe máy" },
  { value: "hanh-chinh", label: "Hành chính" },
  { value: "khac", label: "Khác" },
] as const;

export const QNA_CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  QNA_CATEGORY_OPTIONS.map(({ value, label }) => [value, label])
);
