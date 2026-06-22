import { useEffect } from 'react';
import { useTournamentStore } from '../stores/tournamentStore';

export function useTournament() {
  const tournaments = useTournamentStore((state) => state.tournaments);
  const loading = useTournamentStore((state) => state.loading);
  const loadTournaments = useTournamentStore((state) => state.loadTournaments);
  const createTournament = useTournamentStore((state) => state.createTournament);
  const registerTeam = useTournamentStore((state) => state.registerTeam);
  useEffect(() => {
    if (tournaments.length === 0) void loadTournaments();
  }, [loadTournaments, tournaments.length]);
  return { tournaments, loading, loadTournaments, createTournament, registerTeam };
}
