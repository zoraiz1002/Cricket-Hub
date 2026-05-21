import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home, Users, Trophy, BarChart3, MessageSquare, Calendar, Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/teams", label: "Teams", icon: Users },
  { to: "/matches", label: "Matches", icon: Target },
  { to: "/tournaments", label: "Tournaments", icon: Trophy },
  { to: "/stats", label: "Stats", icon: BarChart3 },
  { to: "/chat", label: "Chat", icon: MessageSquare },
  { to: "/calendar", label: "Calendar", icon: Calendar },
];

export function SideNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden md:flex flex-col w-60 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-sidebar-primary-foreground font-display text-xl">M</div>
          <div>
            <div className="font-display text-lg leading-none">Marburg</div>
            <div className="text-xs text-sidebar-foreground/70">Cricket Club</div>
          </div>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const active = path.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-primary font-semibold"
                  : "hover:bg-sidebar-accent/60 text-sidebar-foreground/85"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-sidebar-border text-xs text-sidebar-foreground/60">
        v1.0 · Season 2026
      </div>
    </aside>
  );
}

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const items = navItems.slice(0, 5);
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-sidebar text-sidebar-foreground border-t border-sidebar-border z-40 grid grid-cols-5">
      {items.map((item) => {
        const active = path.startsWith(item.to);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "flex flex-col items-center justify-center py-2.5 text-[10px] gap-1",
              active ? "text-sidebar-primary" : "text-sidebar-foreground/70"
            )}
          >
            <Icon className="w-5 h-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
