import { Outlet } from "@tanstack/react-router";
import { SideNav, BottomNav } from "./nav";
import { TopBar } from "./topbar";

export function AppShell() {
  return (
    <div className="min-h-screen flex bg-background">
      <SideNav />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
