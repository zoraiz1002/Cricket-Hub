import { Bell, Moon, Sun, Globe, ChevronDown } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";

export function TopBar() {
  const { theme, toggle } = useTheme();
  return (
    <header className="h-16 border-b bg-card/80 backdrop-blur sticky top-0 z-30 flex items-center justify-between px-4 md:px-6">
      <div className="md:hidden flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-pitch flex items-center justify-center text-primary-foreground font-display">M</div>
        <span className="font-display text-lg">Marburg CC</span>
      </div>
      <div className="hidden md:block text-sm text-muted-foreground">Season 2026 · Marburg Cricket Club</div>

      <div className="flex items-center gap-1 md:gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px] bg-accent text-accent-foreground">3</Badge>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon"><Globe className="w-5 h-5" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Deutsch</DropdownMenuItem>
            <DropdownMenuItem>हिन्दी</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 pl-1 pr-2">
              <Avatar className="w-8 h-8"><AvatarFallback className="bg-pitch text-primary-foreground text-xs">AS</AvatarFallback></Avatar>
              <ChevronDown className="w-4 h-4 hidden sm:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>
              <div className="font-semibold">Aarav Sharma</div>
              <div className="text-xs text-muted-foreground font-normal">Captain · Lions</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link to="/login">Sign out</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
