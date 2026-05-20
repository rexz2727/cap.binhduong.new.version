export default function EmergencyButton() {
  return (
    <a
      href="tel:113"
      data-print="hide"
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-2 bg-police-red text-white text-sm font-bold py-3 shadow-lg sm:hidden"
      aria-label="Gọi khẩn cấp 113"
    >
      <span>📞</span>
      <span>GỌI KHẨN CẤP 113</span>
    </a>
  );
}
