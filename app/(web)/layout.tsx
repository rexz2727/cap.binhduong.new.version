import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import CopBubble from "@/components/ui/CopBubble";
import EmergencyButton from "@/components/ui/EmergencyButton";
import { getActiveAnnouncements } from "@/sanity/lib/queries";
import IconDefs from "@/components/layout/IconDefs";

export default async function WebLayout({ children }: { children: React.ReactNode }) {
  const announcements = await getActiveAnnouncements();

  return (
    <>
      <IconDefs />
      <Header announcements={announcements} />
      <main className="flex-1 pb-12 sm:pb-0">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <CopBubble />
      <EmergencyButton />
    </>
  );
}
