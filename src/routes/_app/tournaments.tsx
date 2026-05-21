import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { pointsTable, mockPlayers } from "@/lib/mock-data";
import { Crown, Zap } from "lucide-react";

export const Route = createFileRoute("/_app/tournaments")({ component: Tournaments });

function Tournaments() {
  const orange = [...mockPlayers].sort((a, b) => b.runs - a.runs).slice(0, 4);
  const purple = [...mockPlayers].sort((a, b) => b.wickets - a.wickets).slice(0, 4);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl">Tournaments</h1>
          <p className="text-muted-foreground">Brackets, points table, and leaderboards.</p>
        </div>
        <Select defaultValue="hcl"><SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="hcl">Hessen Cricket League 2026</SelectItem>
            <SelectItem value="mcl">Marburg Cup 2026</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="font-display tracking-wide">Knockout bracket</CardTitle></CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            {[
              { round: "Semi-finals", matches: [["Marburg Lions","Giessen Gladiators","142","138"],["Frankfurt Falcons","Hessen Hawks","176","170"]] },
              { round: "Final", matches: [["Marburg Lions","Frankfurt Falcons","—","—"]] },
              { round: "Winner", matches: [["TBD","",""]] },
            ].map((col) => (
              <div key={col.round} className="space-y-3">
                <div className="text-xs uppercase text-muted-foreground tracking-wider">{col.round}</div>
                {col.matches.map((m, i) => (
                  <div key={i} className="p-3 rounded-lg border bg-muted/30 space-y-2">
                    {m[0] && (
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{m[0]}</span>
                        <span className="font-display">{m[2]}</span>
                      </div>
                    )}
                    {m[1] && (
                      <div className="flex justify-between items-center text-muted-foreground">
                        <span>{m[1]}</span>
                        <span className="font-display">{m[3]}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="font-display tracking-wide">Points table</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr className="text-left text-xs uppercase text-muted-foreground">
                  <th className="py-2 pr-3">Team</th><th className="px-2 text-center">P</th><th className="px-2 text-center">W</th><th className="px-2 text-center">L</th><th className="px-2 text-center">NRR</th><th className="px-2 text-center">Pts</th>
                </tr>
              </thead>
              <tbody>
                {pointsTable.map((row, i) => (
                  <tr key={row.team} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="py-3 pr-3 font-semibold flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center ${i < 2 ? "bg-success/20 text-success" : "bg-muted"}`}>{i + 1}</span>
                      {row.team}
                    </td>
                    <td className="px-2 text-center">{row.p}</td>
                    <td className="px-2 text-center">{row.w}</td>
                    <td className="px-2 text-center">{row.l}</td>
                    <td className="px-2 text-center">{row.nrr}</td>
                    <td className="px-2 text-center font-display text-lg text-accent">{row.pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <LeaderboardCard title="Orange Cap" subtitle="Most runs" icon={Crown} color="warning" items={orange.map((p) => ({ name: p.name, value: p.runs, sub: `${p.matches} matches` }))} />
        <LeaderboardCard title="Purple Cap" subtitle="Most wickets" icon={Zap} color="primary" items={purple.map((p) => ({ name: p.name, value: p.wickets, sub: `${p.matches} matches` }))} />
      </div>
    </div>
  );
}

function LeaderboardCard({ title, subtitle, icon: Icon, color, items }: { title: string; subtitle: string; icon: any; color: string; items: { name: string; value: number; sub: string }[] }) {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display tracking-wide">
          <Icon className={`w-5 h-5 ${color === "warning" ? "text-warning" : "text-primary"}`} />
          {title}
          <Badge variant="outline" className="ml-auto text-xs">{subtitle}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((it, i) => (
          <div key={it.name} className="flex items-center gap-3 p-2 rounded hover:bg-muted/50">
            <span className="w-6 text-center font-display text-accent">{i + 1}</span>
            <div className="flex-1"><div className="font-semibold text-sm">{it.name}</div><div className="text-xs text-muted-foreground">{it.sub}</div></div>
            <div className="font-display text-xl">{it.value}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
