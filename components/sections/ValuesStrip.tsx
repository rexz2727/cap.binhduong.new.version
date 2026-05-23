import type { HomeContent } from "@/types/homeContent";

const VALUES = [
  {
    icon: "#i-shield",
    title: "Trang thông tin chính thống",
    desc: "Đơn vị trực thuộc Công an TP.HCM — mọi thông tin đều chính xác và có giá trị pháp lý.",
  },
  {
    icon: "#i-check-shield",
    title: "Bảo mật & an toàn",
    desc: "Dữ liệu phản ánh được mã hóa, bảo vệ danh tính người tố giác theo Luật Tố cáo 2018.",
  },
  {
    icon: "#i-clock-fast",
    title: "Phản hồi nhanh",
    desc: "Cam kết xử lý phản ánh và tin báo trong vòng 24 giờ làm việc.",
  },
  {
    icon: "#i-users",
    title: "Phục vụ 24/7",
    desc: "Cổng thông tin và đường dây nóng hoạt động liên tục, hỗ trợ người dân mọi thời điểm.",
  },
];

export default function ValuesStrip({ homeContent }: { homeContent?: HomeContent | null }) {
  const items =
    homeContent?.valuesItems && homeContent.valuesItems.length > 0
      ? homeContent.valuesItems
      : VALUES;
  return (
    <section className="values-strip">
      <div className="container">
        <div className="values-grid">
          {items.map((item, i) => (
            <div className="value-cell" key={i}>
              <div className="ic">
                <svg>
                  <use href={item.icon} />
                </svg>
              </div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
