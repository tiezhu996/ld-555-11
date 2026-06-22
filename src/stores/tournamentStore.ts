import { create } from 'zustand';
import { tournamentDb } from '../db/tournament-db';
import type { Tournament } from '../types/tournament';
import { withFriendlyError } from '../utils/storage';

interface TournamentState {
  tournaments: Tournament[];
  loading: boolean;
  loadTournaments: () => Promise<void>;
  createTournament: (tournament: Tournament) => Promise<void>;
  registerTeam: (tournamentId: string, teamId: string) => Promise<void>;
  unregisterTeam: (tournamentId: string, teamId: string) => Promise<void>;
}

export const useTournamentStore = create<TournamentState>((set, get) => ({
  tournaments: [],
  loading: false,
  loadTournaments: async () => {
    set({ loading: true });
    try {
      const tournaments = await withFriendlyError(() => tournamentDb.getAll());
      set({ tournaments, loading: false });
    } catch {
      set({ loading: false });
    }
  },
  createTournament: async (tournament) => {
    const normalized = { ...tournament, waitlist: tournament.waitlist ?? [] };
    const saved = await withFriendlyError(() => tournamentDb.save(normalized));
    set((state) => ({ tournaments: [saved, ...state.tournaments] }));
  },
  registerTeam: async (tournamentId, teamId) => {
    const tournament = get().tournaments.find((item) => item.id === tournamentId);
    if (!tournament) return;
    if (tournament.teams.includes(teamId) || tournament.waitlist.includes(teamId)) return;
    const isFull = tournament.teams.length >= tournament.maxTeams;
    let next: Tournament;
    if (isFull) {
      next = { ...tournament, waitlist: [...tournament.waitlist, teamId] };
    } else {
      next = { ...tournament, teams: [...tournament.teams, teamId] };
    }
    const saved = await withFriendlyError(() => tournamentDb.save(next));
    set((state) => ({ tournaments: state.tournaments.map((item) => (item.id === saved.id ? saved : item)) }));
  },
  unregisterTeam: async (tournamentId, teamId) => {
    const tournament = get().tournaments.find((item) => item.id === tournamentId);
    if (!tournament) return;
    let nextTeams = tournament.teams.filter((id) => id !== teamId);
    let nextWaitlist = tournament.waitlist.filter((id) => id !== teamId);
    const wasInTeams = tournament.teams.includes(teamId);
    if (wasInTeams && nextWaitlist.length > 0) {
      const [promoted, ...rest] = nextWaitlist;
      nextTeams = [...nextTeams, promoted];
      nextWaitlist = rest;
    }
    const saved = await withFriendlyError(() => tournamentDb.save({ ...tournament, teams: nextTeams, waitlist: nextWaitlist }));
    set((state) => ({ tournaments: state.tournaments.map((item) => (item.id === saved.id ? saved : item)) }));
  },
}));
