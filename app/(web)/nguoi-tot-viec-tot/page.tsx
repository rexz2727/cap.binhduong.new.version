import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getGoodDeeds, getPageContent } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Người tốt việc tốt | Công an phường Bình Dương",
  description: "Vinh danh những tấm gương tốt trong phong trào Toàn dân bảo vệ an ninh Tổ quốc.",
};

export default async function GoodDeedPage() {
  const deeds = await getGoodDeeds(100);
  const pageContent = await getPageContent();

  return (
    <>
      <PageHeader
        title="Người tốt — Việc tốt"
        breadcrumbs={[{ label: "Người tốt việc tốt" }]}
        description={pageContent?.nguoi_tot_viec_tot ?? "Vinh danh cán bộ, chiến sĩ và quần chúng nhân dân có thành tích xuất sắc trong phong trào Toàn dân bảo vệ an ninh Tổ quốc."}
      />
      <section className="block">
        <div className="container">
          {deeds.length === 0 ? (
            <p className="text-center text-[var(--subtle)] py-16">
              Chưa có gương người tốt việc tốt nào.
            </p>
          ) : (
            <div className="honor-grid pt-4">
              {deeds.map((deed) => {
                const imgUrl = deed.photo
                  ? urlFor(deed.photo).width(240).height(240).url()
                  : null;
                return (
                  <Link
                    key={deed._id}
                    href={`/nguoi-tot-viec-tot/${deed.slug.current}`}
                    className="honor-card"
                  >
                    <div className="avatar">
                      {imgUrl ? (
                        <Image
                          src={imgUrl}
                          alt={deed.name}
                          fill
                          className="object-cover"
                          sizes="120px"
                        />
                      ) : null}
                    </div>
                    <div className="name">{deed.name}</div>
                    <div className="role">{deed.role}</div>
                    <div className="desc">{deed.summary}</div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
