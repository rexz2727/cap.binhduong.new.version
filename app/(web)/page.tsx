import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import NewsCarousel from "@/components/sections/NewsCarousel";
import LatestNews from "@/components/sections/LatestNews";
import NguoiTotViecTot from "@/components/sections/NguoiTotViecTot";
import PhotoAlbumPreview from "@/components/sections/PhotoAlbumPreview";
import VideoPreview from "@/components/sections/VideoPreview";
import QuickLinks from "@/components/sections/QuickLinks";
import ContactInfo from "@/components/sections/ContactInfo";
import {
  getLatestNews,
  getFeaturedNews,
  getNguoiTotViecTot,
  getPhotoAlbums,
  getVideos,
} from "@/sanity/lib/queries";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.description,
};

export default async function HomePage() {
  const [latestNews, featuredNews, nguoiTotViecTot, photoAlbums, videos] = await Promise.all([
    getLatestNews(6),
    getFeaturedNews(),
    getNguoiTotViecTot(6),
    getPhotoAlbums(4),
    getVideos("all", 4),
  ]);

  return (
    <>
      <HeroSection />
      <NewsCarousel posts={featuredNews} />
      <QuickLinks />
      <LatestNews posts={latestNews} />
      <NguoiTotViecTot posts={nguoiTotViecTot} />
      <PhotoAlbumPreview albums={photoAlbums} />
      <VideoPreview videos={videos} />
      <ContactInfo />
    </>
  );
}
