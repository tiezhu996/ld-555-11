import { create } from 'zustand';
import { teamDb } from '../db/team-db';
import type { Team } from '../types/team';
import { withFriendlyError } from '../utils/storage';

interface TeamState {
  teams: Team[];
  loading: boolean;
  loadTeams: () => Promise<void>;
  createTeam: (team: Team) => Promise<void>;
  updateTeam: (team: Team) => Promise<void>;
  disbandTeam: (id: string) => Promise<void>;
}

export const useTeamStore = create<TeamState>((set) => ({
  teams: [],
  loading: false,
  loadTeams: async () => {
    set({ loading: true });
    try {
      const teams = await withFriendlyError(() => teamDb.getAll());
      set({ teams, loading: false });
    } catch {
      set({ loading: false });
    }
  },
  createTeam: async (team) => {
    const saved = await withFriendlyError(() => teamDb.save(team));
    set((state) => ({ teams: [...state.teams, saved] }));
  },
  updateTeam: async (team) => {
    const saved = await withFriendlyError(() => teamDb.save(team));
    set((state) => ({ teams: state.teams.map((item) => (item.id === saved.id ? saved : item)) }));
  },
  disbandTeam: async (id) => {
    await withFriendlyError(() => teamDb.remove(id));
    set((state) => ({ teams: state.teams.filter((team) => team.id !== id) }));
  },
}));
