export default function EmergencyButton() {
  return (
    <a
      href="tel:113"
      data-print="hide"
      className="btn btn-red fixed bottom-0 left-0 right-0 z-40 hidden items-center justify-center gap-2 rounded-none p-3"
      aria-label="Gọi khẩn cấp 113"
    >
      <svg width="16" height="16"><use href="#i-phone" /></svg>
      GỌI KHẨN CẤP 113
    </a>
  );
}
