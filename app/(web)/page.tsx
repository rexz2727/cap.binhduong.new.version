import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import EmergencyRow from "@/components/sections/EmergencyRow";
import ValuesStrip from "@/components/sections/ValuesStrip";
import QuickLinks from "@/components/sections/QuickLinks";
import LatestNews from "@/components/sections/LatestNews";
import NguoiTotViecTot from "@/components/sections/NguoiTotViecTot";
import { getLatestNews, getNguoiTotViecTot, getHeroStats } from "@/sanity/lib/queries";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.description,
};

export default async function HomePage() {
  const [latestNews, nguoiTotViecTot, heroStats] = await Promise.all([
    getLatestNews(6),
    getNguoiTotViecTot(6),
    getHeroStats(),
  ]);

  return (
    <>
      <HeroSection stats={heroStats} />
      <EmergencyRow />
      <ValuesStrip />
      <QuickLinks />
      <LatestNews posts={latestNews} />
      <NguoiTotViecTot posts={nguoiTotViecTot} />
    </>
  );
}
