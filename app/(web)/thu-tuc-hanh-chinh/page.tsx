import type { Metadata } from "next";
import Link from "next/link";
import { getPageContent, getProcedures } from "@/sanity/lib/queries";
import PageHeader from "@/components/ui/PageHeader";
import { PROCEDURE_CATEGORY_LABELS, PROCEDURE_CATEGORY_OPTIONS } from "@/constants/procedure";

export const metadata: Metadata = {
  title: "Thủ tục hành chính",
  description: "Hướng dẫn chi tiết các thủ tục thuộc thẩm quyền Công an phường — minh bạch, công khai, thực hiện trực tuyến.",
};

const CATEGORIES = [
  { value: "", label: "Tất cả" },
  ...PROCEDURE_CATEGORY_OPTIONS,
];

export default async function ProceduresPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const procedures = await getProcedures(category);
  const pageContent = await getPageContent();

  return (
    <>
      <PageHeader
        title="Thủ tục hành chính"
        breadcrumbs={[{ label: "Thủ tục hành chính" }]}
        description={pageContent?.thu_tuc_hanh_chinh ?? "Hướng dẫn chi tiết các thủ tục thuộc thẩm quyền Công an phường — minh bạch, công khai, thực hiện trực tuyến."}
      />

      <section className="block">
        <div className="container">
          <div className="filter-row">
            {CATEGORIES.map((cat) => {
              const isActive = (cat.value === "" && !category) || cat.value === category;
              return (
                <Link
                  key={cat.value}
                  href={cat.value ? `/thu-tuc-hanh-chinh?category=${cat.value}` : "/thu-tuc-hanh-chinh"}
                  className={isActive ? "chip active" : "chip"}
                >
                  {cat.label}
                </Link>
              );
            })}
          </div>

          {procedures.length === 0 ? (
            <p className="text-center text-[var(--muted)] py-16">
              Chưa có thủ tục nào.
            </p>
          ) : (
            <div className="proc-table">
              <div className="proc-row head">
                <div>Mã</div>
                <div>Tên thủ tục</div>
                <div>Thời gian xử lý</div>
                <div>Phí, lệ phí</div>
                <div>Hình thức</div>
              </div>

              {procedures.map((proc) => (
                <div className="proc-row" key={proc._id}>
                  <div className="code">{proc._id.slice(-6).toUpperCase()}</div>
                  <div>
                    <Link href={`/thu-tuc-hanh-chinh/${proc.slug.current}`}>
                      <h4>{proc.title}</h4>
                    </Link>
                    <div className="sub">
                      Lĩnh vực: {PROCEDURE_CATEGORY_LABELS[proc.category] ?? proc.category}
                    </div>
                  </div>
                  <div className="field">
                    <b>{proc.processingTime}</b>
                    <div className="lbl">Làm việc</div>
                  </div>
                  <div className="field">
                    <b>{proc.fee}</b>
                    <div className="lbl">Lệ phí</div>
                  </div>
                  <div>
                    {proc.onlineServiceUrl ? (
                      <span className="badge online">Trực tuyến</span>
                    ) : (
                      <span className="badge offline">Trực tiếp</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
