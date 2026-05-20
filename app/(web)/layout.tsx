import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import CopBubble from "@/components/ui/CopBubble";
import EmergencyButton from "@/components/ui/EmergencyButton";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 pb-12 sm:pb-0">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <CopBubble />
      <EmergencyButton />
    </>
  );
}
