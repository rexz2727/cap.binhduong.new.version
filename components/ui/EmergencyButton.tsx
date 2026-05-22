export default function EmergencyButton() {
  return (
    <a
      href="tel:113"
      data-print="hide"
      className="btn btn-red"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        display: "none",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        borderRadius: 0,
        padding: "12px",
      }}
      aria-label="Gọi khẩn cấp 113"
    >
      <svg width="16" height="16"><use href="#i-phone" /></svg>
      GỌI KHẨN CẤP 113
    </a>
  );
}
