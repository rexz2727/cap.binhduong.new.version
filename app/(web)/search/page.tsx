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
  newsPost: { label: "Tin tức", color: "bg-blue-100 text-blue-700", href: (s: string) => `/tin-tuc/${s}` },
  procedure: { label: "Thủ tục", color: "bg-green-100 text-green-700", href: (s: string) => `/thu-tuc-hanh-chinh/${s}` },
  legalDocument: { label: "Văn bản", color: "bg-orange-100 text-orange-700", href: (s: string) => `/van-ban-phap-luat/${s}` },
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
      <div className="max-w-4xl mx-auto px-4 py-10">
        <form method="GET" action="/search" className="flex gap-2 mb-10">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Nhập từ khóa tìm kiếm..."
            autoFocus
            className="flex-1 border border-gray-300 rounded-xl px-5 py-3 text-sm outline-none focus:border-police-navy focus:ring-2 focus:ring-police-navy/20 transition-all"
            aria-label="Từ khóa tìm kiếm"
          />
          <button
            type="submit"
            className="bg-police-navy hover:bg-police-navy/90 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
          >
            Tìm kiếm
          </button>
        </form>

        {!query ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🔍</p>
            <p>Nhập từ khóa để bắt đầu tìm kiếm.</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">😔</p>
            <p>
              Không tìm thấy kết quả cho{" "}
              <strong className="text-gray-700">&ldquo;{query}&rdquo;</strong>.
            </p>
            <p className="text-sm mt-2">Thử từ khóa ngắn hơn hoặc tổng quát hơn.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-5">
              Tìm thấy <strong className="text-police-navy">{results.length}</strong> kết quả cho
              {" "}&ldquo;{query}&rdquo;
            </p>
            <div className="space-y-3">
              {results.map((item) => {
                const meta = TYPE_META[item._type];
                return (
                  <Link
                    key={item._id}
                    href={meta.href(item.slug.current)}
                    className="flex items-start gap-4 p-4 rounded-2xl border border-gray-200 hover:border-police-navy hover:shadow-sm transition-all"
                  >
                    <span className={`shrink-0 mt-0.5 text-xs font-semibold px-2.5 py-1 rounded-full ${meta.color}`}>
                      {meta.label}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-police-navy text-sm leading-snug">{item.title}</p>
                      {item.excerpt && (
                        <p className="text-gray-500 text-xs mt-1 line-clamp-2">{item.excerpt}</p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
