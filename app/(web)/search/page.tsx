import type { Metadata } from "next";
import Link from "next/link";
import { searchAll } from "@/sanity/lib/queries";
import PageHeader from "@/components/ui/PageHeader";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q
      ? `Kết quả tìm kiếm "${q}" | Công an phường Bình Dương`
      : "Tìm kiếm | Công an phường Bình Dương",
  };
}

const TYPE_META = {
  newsPost: { label: "Tin tức", pill: "cat-pill", href: (s: string) => `/tin-tuc/${s}` },
  procedure: { label: "Thủ tục", pill: "cat-pill info", href: (s: string) => `/thu-tuc-hanh-chinh/${s}` },
  legalDocument: { label: "Văn bản", pill: "cat-pill warning", href: (s: string) => `/van-ban-phap-luat/${s}` },
} as const;

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const results = query ? await searchAll(query) : [];

  return (
    <>
      <PageHeader
        title="Tìm kiếm"
        breadcrumbs={[{ label: "Tìm kiếm" }]}
        description="Tìm kiếm trong tin tức, thủ tục hành chính và văn bản pháp luật"
      />
      <section className="block">
        <div className="container-narrow">
          <form method="GET" action="/search" className="flex gap-2 mb-8">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Nhập từ khóa tìm kiếm..."
              autoFocus
              className="flex-1 text-sm outline-none"
              style={{
                border: "1px solid var(--border-strong)",
                borderRadius: "var(--radius)",
                padding: "12px 16px",
                background: "var(--surface)",
                color: "var(--ink)",
              }}
              aria-label="Từ khóa tìm kiếm"
            />
            <button type="submit" className="btn btn-primary">
              Tìm kiếm
            </button>
          </form>

          {!query ? (
            <div className="text-center py-16 text-subtle">
              <p className="text-4xl mb-3">🔍</p>
              <p>Nhập từ khóa để bắt đầu tìm kiếm.</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-16 text-subtle">
              <p className="text-4xl mb-3">😔</p>
              <p>
                Không tìm thấy kết quả cho{" "}
                <strong className="text-ink-2">&ldquo;{query}&rdquo;</strong>.
              </p>
              <p className="text-sm mt-2">Thử từ khóa ngắn hơn hoặc tổng quát hơn.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted mb-5">
                Tìm thấy <strong className="text-navy">{results.length}</strong> kết quả cho{" "}
                &ldquo;{query}&rdquo;
              </p>
              <div className="flex flex-col gap-3">
                {results.map((item) => {
                  const meta = TYPE_META[item._type];
                  return (
                    <Link
                      key={item._id}
                      href={meta.href(item.slug.current)}
                      className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-surface hover:border-navy transition-all"
                    >
                      <span className={`${meta.pill} shrink-0 mt-0.5`}>{meta.label}</span>
                      <div className="min-w-0">
                        <p className="font-semibold text-navy text-sm leading-snug">
                          {item.title}
                        </p>
                        {item.excerpt && (
                          <p className="text-muted text-xs mt-1 line-clamp-2">{item.excerpt}</p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
