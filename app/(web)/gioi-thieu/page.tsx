import type { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";
import { getPageContent, getPersonnel, getUnitProfile } from "@/sanity/lib/queries";
import PageHeader from "@/components/ui/PageHeader";
import GioiThieuTabs from "@/components/sections/GioiThieuTabs";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: "Giới thiệu về Công an phường Bình Dương và ban lãnh đạo đơn vị",
};

export default async function AboutPage() {
  const personnel = await getPersonnel();
  const unitProfile = await getUnitProfile();
  const pageContent = await getPageContent();

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
        description={pageContent?.gioi_thieu ?? "Tìm hiểu về đơn vị, chức năng nhiệm vụ và ban lãnh đạo Công an phường Bình Dương."}
      />
      <section className="block">
        <div className="container">
          <GioiThieuTabs personnel={mappedPersonnel} unitProfile={unitProfile} />
        </div>
      </section>
    </>
  );
}
