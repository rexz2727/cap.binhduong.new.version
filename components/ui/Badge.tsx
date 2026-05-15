const CATEGORY_LABELS: Record<string, { label: string; className: string }> = {
  "tin-tuc":    { label: "Tin tức",    className: "bg-blue-100 text-blue-800" },
  "thong-bao":  { label: "Thông báo", className: "bg-yellow-100 text-yellow-800" },
  "canh-bao":   { label: "Cảnh báo",  className: "bg-red-100 text-red-800" },
  "nghi-quyet": { label: "Nghị quyết", className: "bg-purple-100 text-purple-800" },
  "ke-hoach":   { label: "Kế hoạch",  className: "bg-green-100 text-green-800" },
  "quyet-dinh": { label: "Quyết định", className: "bg-orange-100 text-orange-800" },
  "thong-tu":   { label: "Thông tư",  className: "bg-teal-100 text-teal-800" },
  "cu-tru":     { label: "Cư trú",    className: "bg-indigo-100 text-indigo-800" },
  "cmnd-cccd":  { label: "CMND/CCCD", className: "bg-cyan-100 text-cyan-800" },
  "xe-co":      { label: "Phương tiện", className: "bg-pink-100 text-pink-800" },
  "khac":       { label: "Khác",      className: "bg-gray-100 text-gray-800" },
};

export default function Badge({ category }: { category: string }) {
  const config = CATEGORY_LABELS[category] ?? CATEGORY_LABELS["khac"];
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}
