import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Trophy, Zap, Users } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-pitch text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <header className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-accent-foreground font-display text-xl">M</div>
          <span className="font-display text-2xl">Marburg CC</span>
        </div>
        <Button asChild variant="secondary" size="sm"><Link to="/login">Sign in</Link></Button>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-12 pb-24 text-center">
        <div className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold uppercase tracking-wider mb-6">Season 2026 · Live</div>
        <h1 className="font-display text-6xl md:text-8xl leading-none mb-6">
          From the pitch.<br />
          <span className="text-accent">For the club.</span>
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
          Live scoring, team management, tournament brackets, and broadcast tools — built for Marburg Cricket Club.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow">
            <Link to="/signup">Join the Club</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
            <Link to="/dashboard">Open Dashboard</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-20 text-left">
          {[
            { icon: Zap, title: "Live Scoring", text: "Ball-by-ball with extras, undo & over editing." },
            { icon: Users, title: "Squad Tools", text: "Player profiles, availability, WhatsApp blasts." },
            { icon: Trophy, title: "Tournaments", text: "Brackets, points tables, Orange & Purple caps." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="p-5 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur">
              <Icon className="w-6 h-6 text-accent mb-3" />
              <div className="font-display text-xl mb-1">{title}</div>
              <div className="text-sm text-primary-foreground/70">{text}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
