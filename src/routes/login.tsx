import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:flex bg-pitch text-primary-foreground p-12 flex-col justify-between relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-accent-foreground font-display text-xl">M</div>
          <span className="font-display text-2xl">Marburg CC</span>
        </div>
        <div>
          <h2 className="font-display text-5xl leading-tight mb-3">Welcome back<br />to the boundary.</h2>
          <p className="text-primary-foreground/75">Check fixtures, score live matches, and rally the squad — all in one app.</p>
        </div>
        <div className="text-xs text-primary-foreground/60">© 2026 Marburg Cricket Club</div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12 bg-background">
        <div className="w-full max-w-sm space-y-6">
          <div>
            <h1 className="font-display text-3xl">Sign in</h1>
            <p className="text-sm text-muted-foreground">Use your club account to continue.</p>
          </div>

          <Button variant="outline" className="w-full gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
            Continue with Google
          </Button>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" /> OR <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => nav({ to: "/dashboard" }), 800); }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@marburgcc.de" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pwd">Password</Label>
              <Input id="pwd" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full bg-pitch text-primary-foreground" disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Sign in
            </Button>
          </form>

          <p className="text-sm text-center text-muted-foreground">
            New to the club? <Link to="/signup" className="text-primary font-semibold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
