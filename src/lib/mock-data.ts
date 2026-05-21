export type Specialization = "Batsman" | "Bowler" | "All-Rounder" | "Wicketkeeper";
export type Availability = "Available" | "Injured" | "Unavailable";

export interface Player {
  id: string;
  name: string;
  age: number;
  specialization: Specialization;
  battingStyle: "Right" | "Left";
  bowlingStyle: string;
  availability: Availability;
  runs: number;
  wickets: number;
  matches: number;
  avatar?: string;
}

export interface Team {
  id: string;
  name: string;
  captain: string;
  squadSize: number;
  wins: number;
  losses: number;
  badge: string;
}

export interface Fixture {
  id: string;
  teamA: string;
  teamB: string;
  date: string;
  venue: string;
  status: "upcoming" | "live" | "completed";
}

export const mockTeams: Team[] = [
  { id: "t1", name: "Marburg Lions", captain: "Aarav Sharma", squadSize: 15, wins: 12, losses: 3, badge: "🦁" },
  { id: "t2", name: "Hessen Hawks", captain: "Liam Becker", squadSize: 14, wins: 9, losses: 6, badge: "🦅" },
  { id: "t3", name: "Frankfurt Falcons", captain: "Rohan Patel", squadSize: 16, wins: 10, losses: 5, badge: "🪶" },
  { id: "t4", name: "Giessen Gladiators", captain: "Max Müller", squadSize: 13, wins: 7, losses: 8, badge: "⚔️" },
];

export const mockPlayers: Player[] = [
  { id: "p1", name: "Aarav Sharma", age: 28, specialization: "All-Rounder", battingStyle: "Right", bowlingStyle: "Right-arm medium", availability: "Available", runs: 842, wickets: 24, matches: 18 },
  { id: "p2", name: "Liam Becker", age: 25, specialization: "Batsman", battingStyle: "Left", bowlingStyle: "—", availability: "Available", runs: 1102, wickets: 2, matches: 20 },
  { id: "p3", name: "Rohan Patel", age: 31, specialization: "Bowler", battingStyle: "Right", bowlingStyle: "Right-arm fast", availability: "Injured", runs: 210, wickets: 38, matches: 17 },
  { id: "p4", name: "Max Müller", age: 22, specialization: "Wicketkeeper", battingStyle: "Right", bowlingStyle: "—", availability: "Available", runs: 678, wickets: 0, matches: 16 },
  { id: "p5", name: "Vikram Singh", age: 26, specialization: "All-Rounder", battingStyle: "Right", bowlingStyle: "Left-arm spin", availability: "Available", runs: 540, wickets: 19, matches: 15 },
  { id: "p6", name: "Jonas Weber", age: 24, specialization: "Bowler", battingStyle: "Left", bowlingStyle: "Right-arm medium-fast", availability: "Unavailable", runs: 88, wickets: 27, matches: 14 },
];

export const mockFixtures: Fixture[] = [
  { id: "f1", teamA: "Marburg Lions", teamB: "Hessen Hawks", date: "2026-05-25", venue: "Marburg Oval", status: "live" },
  { id: "f2", teamA: "Frankfurt Falcons", teamB: "Giessen Gladiators", date: "2026-05-27", venue: "Frankfurt Ground", status: "upcoming" },
  { id: "f3", teamA: "Marburg Lions", teamB: "Frankfurt Falcons", date: "2026-06-02", venue: "Marburg Oval", status: "upcoming" },
];

export const pointsTable = [
  { team: "Marburg Lions", p: 15, w: 12, l: 3, nrr: "+1.42", pts: 24 },
  { team: "Frankfurt Falcons", p: 15, w: 10, l: 5, nrr: "+0.88", pts: 20 },
  { team: "Hessen Hawks", p: 15, w: 9, l: 6, nrr: "+0.31", pts: 18 },
  { team: "Giessen Gladiators", p: 15, w: 7, l: 8, nrr: "-0.65", pts: 14 },
];
