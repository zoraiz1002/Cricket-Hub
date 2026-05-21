import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Player, Team, Fixture } from '@/lib/mock-data';

// --- HOOK FOR FETCHING/MANAGING TEAMS ---
export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('teams')
        .select(`
          id,
          name,
          captain:profiles!captain_id(full_name),
          logo_url
        `);

      if (error) throw error;

      // Map Supabase relation format safely into your app's frontend interface
      const formattedTeams: Team[] = (data || []).map((t: any) => ({
        id: t.id,
        name: t.name,
        captain: t.captain?.full_name || 'No Captain Assigned',
        squadSize: 0, // Calculated or aggregated as needed
        wins: 0,
        losses: 0,
        badge: t.logo_url || '🏏'
      }));

      setTeams(formattedTeams);
    } catch (err) {
      console.error('Error fetching teams:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return { teams, loading, refetch: fetchTeams };
}

// --- HOOK FOR FETCHING/MANAGING PLAYERS ---
export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*');

      if (error) throw error;

      const formattedPlayers: Player[] = (data || []).map((p: any) => ({
        id: p.id,
        name: p.full_name,
        age: p.age || 25,
        specialization: p.player_role || 'All-Rounder',
        battingStyle: p.batting_style || 'Right',
        bowlingStyle: p.bowling_style || '—',
        availability: p.is_available ? 'Available' : 'Unavailable',
        runs: 0, // Pull fields directly if player_stats cache table is populated
        wickets: 0,
        matches: 0,
        avatar: p.avatar_url
      }));

      setPlayers(formattedPlayers);
    } catch (err) {
      console.error('Error fetching profiles:', err);
    } finally {
      setLoading(false);
    }
  };

  // Real-time listener: Whenever an admin/captain changes an availability status, sync layout instantly
  useEffect(() => {
    fetchPlayers();

    const channel = supabase
      .channel('realtime-profiles')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
        fetchPlayers();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { players, loading, refetch: fetchPlayers };
}

// --- HOOK FOR MATCH UPDATES & BALL-BY-BALL MUTATIONS ---
export function useMatchScoring(matchId: string) {
  const [scoreLog, setScoreLog] = useState<any[]>([]);

  const addBall = async (ballData: {
    overNo: number;
    ballNo: number;
    runsOffBat: number;
    extras: number;
    extraType: string;
    isWicket: boolean;
  }) => {
    const { error } = await supabase
      .from('ball_by_ball_log')
      .insert([{
        match_id: matchId,
        innings_no: 1,
        over_no: ballData.overNo,
        ball_no: ballData.ballNo,
        runs_off_bat: ballData.runsOffBat,
        extras: ballData.extras,
        extra_type: ballData.extraType,
        is_wicket: ballData.isWicket
      }]);

    if (error) console.error('Failed to register ball:', error.message);
  };

  const undoLastBall = async () => {
    // Fetch latest transaction id logged for the match instance
    const { data } = await supabase
      .from('ball_by_ball_log')
      .select('id')
      .eq('match_id', matchId)
      .order('timestamp', { ascending: false })
      .limit(1);

    if (data && data.length > 0) {
      await supabase
        .from('ball_by_ball_log')
        .delete()
        .eq('id', data[0].id);
    }
  };

  return { addBall, undoLastBall };
}