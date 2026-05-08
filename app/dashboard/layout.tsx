"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-grid bg-[length:32px_32px]">
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />
      <Topbar onMenuClick={() => setMobileSidebarOpen(true)} />

      <main
        className="relative min-h-screen"
        style={{
          paddingLeft: "var(--sidebar-width)",
          paddingTop: "var(--topbar-height)",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <div key={pathname}>{children}</div>
        </AnimatePresence>
      </main>
    </div>
  );
}
