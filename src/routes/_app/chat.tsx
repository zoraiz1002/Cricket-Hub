import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Bell, QrCode, Vote, Upload, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/chat")({ component: Chat });

function Chat() {
  const [msg, setMsg] = useState("Lions match starts at 14:00 sharp. Be at the ground by 13:15.");
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="font-display text-4xl">Broadcast Center</h1>
        <p className="text-muted-foreground">Reach the squad on WhatsApp, push, and in-app.</p>
      </div>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="font-display tracking-wide flex items-center gap-2"><MessageCircle className="w-5 h-5" />Compose broadcast</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Textarea rows={4} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type your message..." />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline">All players</Badge>
              <Badge variant="outline">Captains</Badge>
              <Badge variant="outline">+ Add group</Badge>
            </div>
            <div className="flex gap-2">
              <Button className="bg-success text-success-foreground hover:bg-success/90"><Send className="w-4 h-4 mr-2" />WhatsApp reminder</Button>
              <Button className="bg-pitch text-primary-foreground"><Bell className="w-4 h-4 mr-2" />Send push</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardHeader><CardTitle className="font-display tracking-wide flex items-center gap-2"><QrCode className="w-5 h-5 text-accent" />Check-in QR</CardTitle></CardHeader>
          <CardContent className="text-center space-y-3">
            <div className="aspect-square max-w-[180px] mx-auto rounded-xl bg-foreground p-4 grid grid-cols-8 gap-0.5">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className={`aspect-square ${Math.random() > 0.5 ? "bg-background" : "bg-foreground"}`} />
              ))}
            </div>
            <div className="text-xs text-muted-foreground">Share with players for instant check-in</div>
            <Button variant="outline" size="sm" className="w-full">Regenerate</Button>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader><CardTitle className="font-display tracking-wide flex items-center gap-2"><Vote className="w-5 h-5 text-accent" />MVP voting</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Aarav Sharma", pct: 62 },
              { name: "Liam Becker", pct: 24 },
              { name: "Vikram Singh", pct: 14 },
            ].map((p) => (
              <div key={p.name}>
                <div className="flex justify-between text-sm mb-1"><span>{p.name}</span><span className="font-display">{p.pct}%</span></div>
                <div className="h-2 rounded-full bg-muted overflow-hidden"><div className="h-full bg-gold" style={{ width: `${p.pct}%` }} /></div>
              </div>
            ))}
            <Button size="sm" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Cast vote</Button>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader><CardTitle className="font-display tracking-wide flex items-center gap-2"><Upload className="w-5 h-5 text-accent" />Match highlights</CardTitle></CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:bg-muted/30 cursor-pointer">
              <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <div className="text-sm font-semibold">Drop images or videos</div>
              <div className="text-xs text-muted-foreground">PNG, JPG, MP4 up to 100 MB</div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground text-center">No uploads yet</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
