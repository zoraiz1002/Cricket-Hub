import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Undo2, Edit3, Users } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/matches/live")({ component: LiveScorer });

interface Ball { type: string; runs: number; label: string }

const BALL_BUTTONS: { label: string; runs: number; type: string; cls: string }[] = [
  { label: "0", runs: 0, type: "run", cls: "" },
  { label: "1", runs: 1, type: "run", cls: "" },
  { label: "2", runs: 2, type: "run", cls: "" },
  { label: "3", runs: 3, type: "run", cls: "" },
  { label: "4", runs: 4, type: "run", cls: "bg-success/15 text-success border-success/30" },
  { label: "6", runs: 6, type: "run", cls: "bg-accent/20 text-accent-foreground border-accent" },
  { label: "Wd", runs: 1, type: "wide", cls: "bg-warning/15 text-warning-foreground border-warning/40" },
  { label: "Nb", runs: 1, type: "noball", cls: "bg-warning/15 text-warning-foreground border-warning/40" },
  { label: "Lb", runs: 1, type: "legbye", cls: "bg-muted" },
  { label: "B", runs: 1, type: "bye", cls: "bg-muted" },
  { label: "W", runs: 0, type: "wicket", cls: "bg-destructive text-destructive-foreground border-destructive col-span-2" },
];

function LiveScorer() {
  const [balls, setBalls] = useState<Ball[]>([
    { type: "run", runs: 4, label: "4" }, { type: "run", runs: 1, label: "1" },
    { type: "run", runs: 0, label: "0" }, { type: "wide", runs: 1, label: "Wd" },
    { type: "run", runs: 6, label: "6" }, { type: "run", runs: 2, label: "2" },
  ]);
  const runs = balls.reduce((s, b) => s + b.runs, 0) + 128;
  const wickets = 4 + balls.filter((b) => b.type === "wicket").length;
  const legalBalls = balls.filter((b) => b.type !== "wide" && b.type !== "noball").length + 86;
  const overs = `${Math.floor(legalBalls / 6)}.${legalBalls % 6}`;
  const rr = (runs / (legalBalls / 6)).toFixed(2);
  const target = 178;
  const ballsLeft = 120 - legalBalls;
  const rrr = ((target - runs) / (ballsLeft / 6)).toFixed(2);

  const addBall = (b: typeof BALL_BUTTONS[number]) => setBalls((arr) => [...arr, { type: b.type, runs: b.runs, label: b.label }]);
  const undo = () => setBalls((arr) => arr.slice(0, -1));

  return (
    <div className="space-y-4 max-w-5xl mx-auto pb-10">
      <div className="flex items-center justify-between">
        <div>
          <Badge className="bg-destructive text-destructive-foreground mb-2 animate-pulse">● LIVE</Badge>
          <h1 className="font-display text-3xl md:text-4xl">Marburg Lions vs Hessen Hawks</h1>
          <p className="text-sm text-muted-foreground">Marburg Oval · 2nd innings · Target {target}</p>
        </div>
      </div>

      {/* Scoreboard */}
      <Card className="bg-pitch text-primary-foreground border-0 shadow-glow">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xs uppercase opacity-70">Score</div>
              <div className="font-display text-5xl text-accent">{runs}/{wickets}</div>
            </div>
            <div>
              <div className="text-xs uppercase opacity-70">Overs</div>
              <div className="font-display text-5xl">{overs}</div>
            </div>
            <div>
              <div className="text-xs uppercase opacity-70">Run Rate</div>
              <div className="font-display text-5xl">{rr}</div>
            </div>
            <div>
              <div className="text-xs uppercase opacity-70">Req. RR</div>
              <div className="font-display text-5xl text-warning">{rrr}</div>
            </div>
          </div>
          <div className="mt-5 pt-5 border-t border-primary-foreground/15 flex flex-wrap items-center justify-between gap-3 text-sm">
            <div>Need <b className="text-accent">{target - runs}</b> off <b>{ballsLeft}</b> balls</div>
            <div>Partnership: <b>48 (32)</b></div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display tracking-wide">This over</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={undo}><Undo2 className="w-4 h-4 mr-1" />Undo</Button>
              <Button variant="outline" size="sm"><Edit3 className="w-4 h-4 mr-1" />Edit over</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-5">
              {balls.slice(-6).map((b, i) => (
                <div key={i} className={cn(
                  "w-10 h-10 rounded-full border-2 flex items-center justify-center font-display text-sm",
                  b.type === "wicket" && "bg-destructive text-destructive-foreground border-destructive",
                  b.runs === 4 && b.type === "run" && "bg-success/20 border-success text-success",
                  b.runs === 6 && b.type === "run" && "bg-accent border-accent text-accent-foreground",
                  (b.type === "wide" || b.type === "noball") && "bg-warning/30 border-warning"
                )}>{b.label}</div>
              ))}
            </div>

            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
              {BALL_BUTTONS.map((b) => (
                <button
                  key={b.label}
                  onClick={() => addBall(b)}
                  className={cn(
                    "h-16 rounded-xl border-2 font-display text-2xl active:scale-95 transition-all hover:shadow-card",
                    b.cls || "bg-card hover:bg-muted"
                  )}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="shadow-card">
            <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold flex items-center gap-2"><Users className="w-4 h-4" />Batting</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-accent/10 border border-accent/30">
                <div><div className="font-semibold">Aarav Sharma *</div><div className="text-xs text-muted-foreground">Striker</div></div>
                <div className="text-right"><div className="font-display text-lg">62</div><div className="text-xs text-muted-foreground">42b · 6×4 1×6</div></div>
              </div>
              <div className="flex justify-between items-center p-2 rounded">
                <div><div className="font-semibold">Liam Becker</div><div className="text-xs text-muted-foreground">Non-striker</div></div>
                <div className="text-right"><div className="font-display text-lg">38</div><div className="text-xs text-muted-foreground">29b · 4×4</div></div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Bowling</CardTitle></CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div><div className="font-semibold">Rohan Patel</div><div className="text-xs text-muted-foreground">3.2 - 0 - 28 - 1</div></div>
                <div className="text-right"><div className="font-display text-lg">8.40</div><div className="text-xs text-muted-foreground">Econ</div></div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Extras</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-4 gap-2 text-center text-xs">
              {[["Wd","4"],["Nb","1"],["B","2"],["Lb","3"]].map(([k,v]) => (
                <div key={k} className="p-2 rounded bg-muted"><div className="font-display text-lg">{v}</div><div className="text-muted-foreground">{k}</div></div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
