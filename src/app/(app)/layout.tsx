
"use client";

import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import type { ReactNode } from "react";
import { Logo } from "@/components/logo";

function AppHeader() {
  const { isMobile } = useSidebar();
  if (!isMobile) return null;

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <Logo className="text-lg" />
      </div>
    </header>
  )
}


export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <AppHeader />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
