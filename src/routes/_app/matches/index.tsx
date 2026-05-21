import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { mockFixtures, mockTeams, mockPlayers } from "@/lib/mock-data";
import { Radio, Plus } from "lucide-react";

export const Route = createFileRoute("/_app/matches/")({ component: Matches });

function Matches() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl">Matches</h1>
          <p className="text-muted-foreground">Live games, fixtures, and match setup.</p>
        </div>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90"><Link to="/matches/live"><Radio className="w-4 h-4 mr-2" />Open live scorer</Link></Button>
      </div>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="font-display tracking-wide">New match setup</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Team A</Label>
              <Select defaultValue={mockTeams[0].id}><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{mockTeams.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Team B</Label>
              <Select defaultValue={mockTeams[1].id}><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{mockTeams.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-muted/30">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Playing XI — {mockTeams[0].name}</CardTitle></CardHeader>
              <CardContent className="space-y-2 max-h-64 overflow-auto">
                {mockPlayers.slice(0, 11).map((p) => (
                  <label key={p.id} className="flex items-center gap-3 p-2 rounded hover:bg-card cursor-pointer">
                    <Checkbox defaultChecked />
                    <span className="text-sm flex-1">{p.name}</span>
                    <Badge variant="outline" className="text-xs">{p.specialization}</Badge>
                  </label>
                ))}
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Playing XI — {mockTeams[1].name}</CardTitle></CardHeader>
              <CardContent className="space-y-2 max-h-64 overflow-auto">
                {mockPlayers.slice(0, 6).concat(mockPlayers.slice(0, 5)).map((p, i) => (
                  <label key={i} className="flex items-center gap-3 p-2 rounded hover:bg-card cursor-pointer">
                    <Checkbox defaultChecked />
                    <span className="text-sm flex-1">{p.name}</span>
                    <Badge variant="outline" className="text-xs">{p.specialization}</Badge>
                  </label>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Toss Winner</Label>
              <Select defaultValue="t1"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{mockTeams.slice(0, 2).map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Toss decision</Label>
              <div className="flex rounded-lg border overflow-hidden">
                <button className="flex-1 py-2 bg-accent text-accent-foreground font-semibold text-sm">Bat</button>
                <button className="flex-1 py-2 bg-card text-muted-foreground text-sm">Bowl</button>
              </div>
            </div>
          </div>

          <Button asChild className="bg-pitch text-primary-foreground w-full md:w-auto"><Link to="/matches/live"><Plus className="w-4 h-4 mr-2" />Start match</Link></Button>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="font-display tracking-wide">Recent & upcoming</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {mockFixtures.map((f) => (
            <div key={f.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
              <div>
                <div className="font-semibold">{f.teamA} vs {f.teamB}</div>
                <div className="text-xs text-muted-foreground">{f.date} · {f.venue}</div>
              </div>
              <Badge variant={f.status === "live" ? "destructive" : "outline"}>{f.status.toUpperCase()}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
