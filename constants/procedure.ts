export const PROCEDURE_CATEGORY_OPTIONS = [
  { value: "cu-tru", label: "Cư trú" },
  { value: "cmnd-cccd", label: "Căn cước công dân" },
  { value: "xe-co", label: "Phương tiện" },
  { value: "khac", label: "Khác" },
] as const;

export const PROCEDURE_CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  PROCEDURE_CATEGORY_OPTIONS.map(({ value, label }) => [value, label])
);
