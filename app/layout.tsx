import type { Metadata } from "next";
import { Inter, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { SITE } from "@/constants/site";
import { getSiteSettings } from "@/sanity/lib/queries";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-bvp",
});

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  const siteName = siteSettings?.name ?? SITE.name;
  const description = siteSettings?.description ?? SITE.description;

  return {
    title: {
      default: siteName,
      template: `%s | ${SITE.shortName}`,
    },
    description,
    keywords: ["công an", "phường Bình Dương", "an ninh trật tự", "thủ tục hành chính"],
    openGraph: {
      type: "website",
      locale: "vi_VN",
      url: SITE.url,
      siteName,
      description,
    },
  };
}

import { LanguageProvider } from "@/lib/i18n";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${inter.variable} ${beVietnamPro.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                var theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            })()`
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
