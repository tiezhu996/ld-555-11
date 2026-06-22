import { create } from 'zustand';
import { playerDb } from '../db/player-db';
import type { OnlineStatus, Player } from '../types/player';
import { withFriendlyError } from '../utils/storage';

interface PlayerState {
  players: Player[];
  currentPlayerId: string;
  loading: boolean;
  loadPlayers: () => Promise<void>;
  updateProfile: (player: Player) => Promise<void>;
  setOnlineStatus: (playerId: string, status: OnlineStatus) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  players: [],
  currentPlayerId: 'p-01',
  loading: false,
  loadPlayers: async () => {
    set({ loading: true });
    try {
      const players = await withFriendlyError(() => playerDb.getAll());
      set({ players, loading: false });
    } catch {
      set({ loading: false });
    }
  },
  updateProfile: async (player) => {
    const saved = await withFriendlyError(() => playerDb.save(player));
    set((state) => ({ players: state.players.map((item) => (item.id === saved.id ? saved : item)) }));
  },
  setOnlineStatus: (playerId, status) => {
    set((state) => ({ players: state.players.map((player) => (player.id === playerId ? { ...player, onlineStatus: status } : player)) }));
  },
}));
