import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import LatestNews from "@/components/sections/LatestNews";
import QuickLinks from "@/components/sections/QuickLinks";
import ContactInfo from "@/components/sections/ContactInfo";
import { getLatestNews } from "@/sanity/lib/queries";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.description,
};

export default async function HomePage() {
  const latestNews = await getLatestNews(6);

  return (
    <>
      <HeroSection />
      <QuickLinks />
      <LatestNews posts={latestNews} />
      <ContactInfo />
    </>
  );
}
