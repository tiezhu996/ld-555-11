import { create } from 'zustand';
import { matchDb } from '../db/match-db';
import type { Match } from '../types/match';
import { withFriendlyError } from '../utils/storage';

interface MatchState {
  matches: Match[];
  loading: boolean;
  loadMatches: () => Promise<void>;
  recordResult: (match: Match) => Promise<void>;
}

export const useMatchStore = create<MatchState>((set) => ({
  matches: [],
  loading: false,
  loadMatches: async () => {
    set({ loading: true });
    try {
      const matches = await withFriendlyError(() => matchDb.getAll());
      set({ matches, loading: false });
    } catch {
      set({ loading: false });
    }
  },
  recordResult: async (match) => {
    const saved = await withFriendlyError(() => matchDb.save(match));
    set((state) => ({ matches: state.matches.map((item) => (item.id === saved.id ? saved : item)) }));
  },
}));
