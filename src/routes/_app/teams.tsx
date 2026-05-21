import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockTeams } from "@/lib/mock-data";
import { Plus, Users } from "lucide-react";

export const Route = createFileRoute("/_app/teams")({ component: Teams });

function Teams() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl">Teams</h1>
          <p className="text-muted-foreground">Manage squads, captains, and rosters.</p>
        </div>
        <Button className="bg-pitch text-primary-foreground"><Plus className="w-4 h-4 mr-2" />New team</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockTeams.map((t) => {
          const winRate = Math.round((t.wins / (t.wins + t.losses)) * 100);
          return (
            <Card key={t.id} className="shadow-card hover:shadow-glow transition-shadow group cursor-pointer overflow-hidden">
              <div className="h-2 bg-pitch" />
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">{t.badge}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-xl truncate">{t.name}</div>
                    <div className="text-xs text-muted-foreground">Captain: {t.captain}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1"><Users className="w-3 h-3" />{t.squadSize} players</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t">
                  <div><div className="font-display text-xl text-success">{t.wins}</div><div className="text-[10px] text-muted-foreground uppercase">Wins</div></div>
                  <div><div className="font-display text-xl text-destructive">{t.losses}</div><div className="text-[10px] text-muted-foreground uppercase">Losses</div></div>
                  <div><div className="font-display text-xl text-accent">{winRate}%</div><div className="text-[10px] text-muted-foreground uppercase">Win rate</div></div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">View squad</Button>
                  <Badge variant="secondary">Active</Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
