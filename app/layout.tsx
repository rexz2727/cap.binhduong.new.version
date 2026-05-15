import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.description,
  keywords: ["công an", "phường Bình Dương", "an ninh trật tự", "thủ tục hành chính"],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE.url,
    siteName: SITE.name,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
