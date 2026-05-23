import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import EmergencyRow from "@/components/sections/EmergencyRow";
import ValuesStrip from "@/components/sections/ValuesStrip";
import QuickLinks from "@/components/sections/QuickLinks";
import LatestNews from "@/components/sections/LatestNews";
import NguoiTotViecTot from "@/components/sections/NguoiTotViecTot";
import { getLatestNews, getGoodDeeds, getHeroStats, getHomeContent, getEmergencyContent } from "@/sanity/lib/queries";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.description,
};

export default async function HomePage() {
  const [latestNews, goodDeeds, heroStats, homeContent, emergencyContent] = await Promise.all([
    getLatestNews(6),
    getGoodDeeds(6),
    getHeroStats(),
    getHomeContent(),
    getEmergencyContent(),
  ]);

  return (
    <>
      <HeroSection stats={heroStats} homeContent={homeContent} />
      <EmergencyRow emergencyContent={emergencyContent} />
      <ValuesStrip homeContent={homeContent} />
      <QuickLinks />
      <LatestNews posts={latestNews} />
      <NguoiTotViecTot posts={goodDeeds} />
    </>
  );
}
