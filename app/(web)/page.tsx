import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import EmergencyRow from "@/components/sections/EmergencyRow";
import ValuesStrip from "@/components/sections/ValuesStrip";
import QuickLinks from "@/components/sections/QuickLinks";
import LatestNews from "@/components/sections/LatestNews";
import NguoiTotViecTot from "@/components/sections/NguoiTotViecTot";
import PhotoAlbumPreview from "@/components/sections/PhotoAlbumPreview";
import VideoPreview from "@/components/sections/VideoPreview";
import {
  getLatestNews,
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
  const [latestNews, nguoiTotViecTot, photoAlbums, videos] = await Promise.all([
    getLatestNews(6),
    getNguoiTotViecTot(6),
    getPhotoAlbums(4),
    getVideos("all", 4),
  ]);

  return (
    <>
      <HeroSection />
      <EmergencyRow />
      <ValuesStrip />
      <QuickLinks />
      <LatestNews posts={latestNews} />
      <NguoiTotViecTot posts={nguoiTotViecTot} />
      <PhotoAlbumPreview albums={photoAlbums} />
      <VideoPreview videos={videos} />
    </>
  );
}
