import type { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";
import { getPersonnel } from "@/sanity/lib/queries";
import PageHeader from "@/components/ui/PageHeader";
import GioiThieuTabs from "@/components/sections/GioiThieuTabs";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: "Giới thiệu về Công an phường Bình Dương và ban lãnh đạo đơn vị",
};

export default async function AboutPage() {
  const personnel = await getPersonnel();

  const mappedPersonnel = personnel.map((p) => ({
    _id: p._id,
    fullName: p.fullName,
    rank: p.rank,
    position: p.position,
    photoUrl: p.photo ? urlFor(p.photo).width(300).height(400).url() : null,
  }));

  return (
    <>
      <PageHeader
        title="Giới thiệu Công an phường Bình Dương"
        breadcrumbs={[{ label: "Giới thiệu đơn vị" }]}
        description="Đơn vị trực thuộc Công an Thành phố Hồ Chí Minh — vì an ninh Tổ quốc, vì hạnh phúc nhân dân."
      />
      <section className="block">
        <div className="container">
          <GioiThieuTabs personnel={mappedPersonnel} />
        </div>
      </section>
    </>
  );
}
