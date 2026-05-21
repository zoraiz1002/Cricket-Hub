import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/signup")({ component: Signup });

function Signup() {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6 p-6 md:p-8 rounded-2xl bg-card shadow-card border">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-full bg-pitch flex items-center justify-center text-primary-foreground font-display">M</div>
            <span className="font-display text-xl">Marburg CC</span>
          </div>
          <h1 className="font-display text-3xl">Create your account</h1>
          <p className="text-sm text-muted-foreground">Join the squad in under a minute.</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => nav({ to: "/dashboard" }), 1000); }} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2"><Label>First name</Label><Input required /></div>
            <div className="space-y-2"><Label>Last name</Label><Input required /></div>
          </div>
          <div className="space-y-2"><Label>Email</Label><Input type="email" required /></div>
          <div className="space-y-2"><Label>Phone (WhatsApp)</Label><Input type="tel" placeholder="+49 ..." required /></div>
          <div className="space-y-2"><Label>Password</Label><Input type="password" required /></div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Role</Label>
              <Select defaultValue="player"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="player">Player</SelectItem>
                  <SelectItem value="captain">Captain / Manager</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Style</Label>
              <Select defaultValue="batsman"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="batsman">Batsman</SelectItem>
                  <SelectItem value="bowler">Bowler</SelectItem>
                  <SelectItem value="allrounder">All-Rounder</SelectItem>
                  <SelectItem value="keeper">Wicketkeeper</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full bg-pitch text-primary-foreground" disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Create account
          </Button>
        </form>

        <p className="text-sm text-center text-muted-foreground">
          Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
