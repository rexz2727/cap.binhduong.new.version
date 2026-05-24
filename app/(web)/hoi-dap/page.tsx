import type { Metadata } from "next";
import { getPageContent, getQnaAnswered, getSiteSettings } from "@/sanity/lib/queries";
import PageHeader from "@/components/ui/PageHeader";
import QnaCard from "@/components/ui/QnaCard";
import Link from "next/link";
import { SITE } from "@/constants/site";
import { QNA_CATEGORY_OPTIONS } from "@/constants/qna";

export const metadata: Metadata = {
  title: "Hỏi đáp pháp luật | Công an phường Bình Dương",
  description: "Giải đáp thắc mắc pháp luật về cư trú, CCCD, VNeID, xe máy và thủ tục hành chính.",
};

const CATEGORIES = [
  { value: "all", label: "Tất cả" },
  ...QNA_CATEGORY_OPTIONS,
];

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function HoiDapPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const [items, siteSettings] = await Promise.all([
    getQnaAnswered(category ?? "all", 50),
    getSiteSettings(),
  ]);
  const pageContent = await getPageContent();

  return (
    <>
      <PageHeader
        title="Hỏi đáp pháp luật"
        breadcrumbs={[{ label: "Hỏi đáp pháp luật" }]}
        description={pageContent?.hoi_dap ?? "Tổng hợp câu hỏi thường gặp và giải đáp của cán bộ Công an phường Bình Dương."}
      />

      <section className="block">
        <div className="container">
          <div className="qna-layout">
            <div>
              <div className="filter-row">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.value}
                    href={cat.value === "all" ? "/hoi-dap" : `/hoi-dap?category=${cat.value}`}
                    className={`chip${(cat.value === "all" && !category) || cat.value === category ? " active" : ""}`}
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>

              <div className="qna-callout">
                <div>
                  <div className="t">Chưa tìm thấy câu trả lời?</div>
                  <div className="s">Gửi câu hỏi — cán bộ sẽ trả lời trong 1–3 ngày làm việc.</div>
                </div>
                <Link href="/hoi-dap/gui-cau-hoi" className="btn btn-red">
                  Gửi câu hỏi
                </Link>
              </div>

              {items.length === 0 ? (
                <div className="qna-list text-center py-12 text-[var(--muted)]">
                  <p>Chưa có câu hỏi nào trong danh mục này.</p>
                </div>
              ) : (
                <div className="qna-list">
                  {items.map((qna) => (
                    <QnaCard key={qna._id} qna={qna} />
                  ))}
                </div>
              )}
            </div>

            <aside>
              <div className="aside-card">
                <h4>Câu hỏi xem nhiều</h4>
                <div className="aside-list">
                  <Link href="/hoi-dap?category=vneid">Cách kích hoạt VNeID mức 2 tại nhà</Link>
                  <Link href="/hoi-dap?category=cccd">Thủ tục đổi CCCD khi sai thông tin</Link>
                  <Link href="/hoi-dap?category=cu-tru">Đăng ký tạm trú cho người ngoại tỉnh</Link>
                  <Link href="/hoi-dap?category=xe-may">Mức phạt khi không đội mũ bảo hiểm</Link>
                  <Link href="/hoi-dap?category=cccd">Làm gì khi mất CCCD?</Link>
                </div>
              </div>

              <div className="aside-card bg-[var(--navy-soft)] border-[var(--gold)]">
                <h4 className="text-[var(--red-deep)] border-[var(--gold)]">
                  Liên hệ trực tiếp
                </h4>
                <div className="text-[13.5px] text-[var(--ink-2)] leading-[1.6]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <svg width="16" height="16" className="text-[var(--red)]">
                      <use href="#i-phone" />
                    </svg>
                    {siteSettings?.phone ?? SITE.phone}
                  </div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <svg width="16" height="16" className="text-[var(--red)]">
                      <use href="#i-mail" />
                    </svg>
                    {SITE.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" className="text-[var(--red)]">
                      <use href="#i-clock" />
                    </svg>
                    T2–T6: 7:00–17:00
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
