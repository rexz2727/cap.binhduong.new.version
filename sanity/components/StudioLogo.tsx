import React from "react";

export function StudioLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <img
        src="/logo/Cong_An_Hieu.jpg"
        alt="Huy hiệu Công an"
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
      <span style={{ fontWeight: 600, fontSize: "14px", whiteSpace: "nowrap" }}>
        Công an phường Bình Dương
      </span>
    </div>
  );
}
