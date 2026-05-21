import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { SITE } from "@/constants/site";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
});

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

import { LanguageProvider } from "@/lib/i18n";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
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
      <body className={`${beVietnamPro.variable} min-h-screen flex flex-col`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
