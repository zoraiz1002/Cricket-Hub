import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockFixtures, mockTeams } from "@/lib/mock-data";
import { Activity, Trophy, Users, TrendingUp, Radio, Calendar } from "lucide-react";

export const Route = createFileRoute("/_app/dashboard")({ component: Dashboard });

function Dashboard() {
  const live = mockFixtures.find((f) => f.status === "live");
  const stats = [
    { label: "Matches Played", value: "15", icon: Activity, trend: "+2 this week" },
    { label: "Active Players", value: "42", icon: Users, trend: "6 unavailable" },
    { label: "Tournaments", value: "3", icon: Trophy, trend: "1 ongoing" },
    { label: "Win Rate", value: "80%", icon: TrendingUp, trend: "+5% vs last season" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-display text-4xl">Good afternoon, Aarav</h1>
        <p className="text-muted-foreground">Here's what's happening at Marburg CC today.</p>
      </div>

      {live && (
        <Card className="bg-pitch text-primary-foreground border-0 overflow-hidden relative shadow-glow">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
            <Badge className="bg-destructive text-destructive-foreground">LIVE</Badge>
          </div>
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-3">
              <Radio className="w-4 h-4" /> Match in progress · {live.venue}
            </div>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="font-display text-3xl md:text-4xl">{live.teamA} vs {live.teamB}</div>
                <div className="mt-3 flex gap-6">
                  <div><div className="text-xs opacity-70">Score</div><div className="font-display text-3xl text-accent">142/4</div></div>
                  <div><div className="text-xs opacity-70">Overs</div><div className="font-display text-3xl">14.2</div></div>
                  <div><div className="text-xs opacity-70">RR</div><div className="font-display text-3xl">9.92</div></div>
                </div>
              </div>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/matches/live">Open Live Scoring →</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, trend }) => (
          <Card key={label} className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-5 h-5 text-primary" />
                <span className="text-xs text-success">{trend}</span>
              </div>
              <div className="font-display text-3xl">{value}</div>
              <div className="text-xs text-muted-foreground mt-1">{label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display tracking-wide">Upcoming Fixtures</CardTitle>
            <Button asChild variant="ghost" size="sm"><Link to="/calendar">View all</Link></Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockFixtures.filter((f) => f.status === "upcoming").map((f) => (
              <div key={f.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
                <div>
                  <div className="font-semibold">{f.teamA} vs {f.teamB}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" />{f.date} · {f.venue}</div>
                </div>
                <Badge variant="outline">Upcoming</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader><CardTitle className="font-display tracking-wide">Top Teams</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {mockTeams.slice(0, 4).map((t, i) => (
              <div key={t.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                <span className="w-6 text-center font-display text-accent">{i + 1}</span>
                <span className="text-2xl">{t.badge}</span>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.wins}W · {t.losses}L</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
