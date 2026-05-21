import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockPlayers, type Availability } from "@/lib/mock-data";
import { Upload, FileDown, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/stats")({ component: Stats });

const availColor: Record<Availability, string> = {
  Available: "bg-success/15 text-success border-success/30",
  Injured: "bg-warning/15 text-warning border-warning/40",
  Unavailable: "bg-destructive/15 text-destructive border-destructive/30",
};

function Stats() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl">Players & Stats</h1>
          <p className="text-muted-foreground">Profiles, performance, and availability.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><FileText className="w-4 h-4 mr-2" />Export PDF</Button>
          <Button variant="outline"><FileDown className="w-4 h-4 mr-2" />Export CSV</Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockPlayers.map((p) => (
          <Card key={p.id} className="shadow-card overflow-hidden">
            <div className="h-20 bg-pitch relative">
              <Badge className={cn("absolute top-3 right-3 border", availColor[p.availability])}>{p.availability}</Badge>
            </div>
            <CardContent className="p-5 -mt-10 relative">
              <Avatar className="w-16 h-16 border-4 border-card mb-3">
                <AvatarFallback className="bg-accent text-accent-foreground font-display text-xl">
                  {p.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="font-display text-xl">{p.name}</div>
              <div className="text-xs text-muted-foreground">Age {p.age} · {p.specialization}</div>

              <div className="flex flex-wrap gap-1 mt-2">
                <Badge variant="outline" className="text-xs">{p.battingStyle}-hand bat</Badge>
                {p.bowlingStyle !== "—" && <Badge variant="outline" className="text-xs">{p.bowlingStyle}</Badge>}
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t">
                <Stat label="Matches" value={p.matches} />
                <Stat label="Runs" value={p.runs} />
                <Stat label="Wkts" value={p.wickets} />
              </div>

              <div className="mt-4 flex items-center justify-between gap-2">
                <Button variant="outline" size="sm" className="gap-1"><Upload className="w-3 h-3" />Photo</Button>
                <AvailabilityToggle current={p.availability} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <div className="font-display text-xl text-primary">{value}</div>
      <div className="text-[10px] text-muted-foreground uppercase">{label}</div>
    </div>
  );
}

function AvailabilityToggle({ current }: { current: Availability }) {
  const opts: Availability[] = ["Available", "Injured", "Unavailable"];
  return (
    <div className="flex rounded-md border overflow-hidden text-xs">
      {opts.map((o) => (
        <button key={o} className={cn(
          "px-2 py-1",
          current === o ? "bg-pitch text-primary-foreground" : "bg-muted/40 text-muted-foreground hover:bg-muted"
        )}>{o[0]}</button>
      ))}
    </div>
  );
}
