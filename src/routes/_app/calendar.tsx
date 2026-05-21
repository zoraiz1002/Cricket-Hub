import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockFixtures } from "@/lib/mock-data";
import { Calendar as CalIcon, Cloud, CloudRain, Sun, ExternalLink, MapPin } from "lucide-react";

export const Route = createFileRoute("/_app/calendar")({ component: CalendarPage });

const days = Array.from({ length: 35 }, (_, i) => i - 3);
const matchDays = [25, 27];

function CalendarPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl">Calendar</h1>
          <p className="text-muted-foreground">May 2026 · upcoming fixtures and practice.</p>
        </div>
        <Button variant="outline"><ExternalLink className="w-4 h-4 mr-2" />Sync to Google Calendar</Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader><CardTitle className="font-display tracking-wide flex items-center gap-2"><CalIcon className="w-5 h-5" />May 2026</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 text-xs text-muted-foreground mb-2">
              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => <div key={d} className="text-center font-semibold uppercase">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((d, i) => {
                const valid = d > 0 && d <= 31;
                const isMatch = matchDays.includes(d);
                return (
                  <div key={i} className={`aspect-square rounded-lg border p-2 text-sm flex flex-col ${valid ? "bg-card" : "bg-muted/30 text-muted-foreground/40"} ${isMatch ? "border-accent bg-accent/10" : ""}`}>
                    <span className={isMatch ? "font-bold text-accent" : ""}>{valid ? d : ""}</span>
                    {isMatch && <span className="mt-auto text-[10px] text-accent-foreground bg-accent rounded px-1 truncate">Match</span>}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="shadow-card bg-pitch text-primary-foreground border-0">
            <CardHeader><CardTitle className="font-display tracking-wide">Match Day Weather</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Sun className="w-14 h-14 text-accent" />
                <div>
                  <div className="font-display text-4xl">22°</div>
                  <div className="text-sm opacity-80">Sunny · light breeze</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-5 text-center text-xs">
                {[["Sat",24,Sun],["Sun",19,Cloud],["Mon",17,CloudRain]].map(([d,t,I]: any) => (
                  <div key={d} className="p-2 rounded bg-primary-foreground/10">
                    <div className="opacity-70">{d}</div>
                    <I className="w-5 h-5 mx-auto my-1" />
                    <div className="font-display">{t}°</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader><CardTitle className="font-display tracking-wide">Next fixtures</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {mockFixtures.map((f) => (
                <div key={f.id} className="p-3 rounded-lg border bg-muted/30">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm">{f.teamA}</span>
                    <Badge variant={f.status === "live" ? "destructive" : "outline"} className="text-[10px]">{f.status}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">vs {f.teamB}</div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" />{f.venue} · {f.date}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
