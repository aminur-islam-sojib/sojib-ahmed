import AsideBar from "@/components/Shared/Asidebar/Asidebar";
import Navbar from "@/components/Shared/Navbar/Navbar";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="pb-10 max-w-7xl mx-auto">
      <AnalyticsTracker />
      <section className="grid grid-cols-4 py-5 pb-12 md:pb-0 sm:py-12 px-5 sm:px-5 md:px-10 gap-5 sm:gap-10">
        <aside className="col-span-4 lg:col-span-1">
          <div className="sticky top-12 overflow-y-auto">
            <AsideBar />
          </div>
        </aside>

        <main className="col-span-4 md:col-span-4 lg:col-span-3">
          <div className="bg-[#1e1e1f] w-full border border-[#383838] rounded-2xl p-5 relative">
            <div className="fixed bottom-0 left-0 right-0 z-50 lg:absolute lg:top-0 lg:right-0 lg:left-auto lg:bottom-auto">
              <Navbar />
            </div>

            <div className="w-full">{children}</div>
          </div>
        </main>
      </section>
    </section>
  );
}

