import { useEffect } from 'react';
import { usePlayerStore } from '../stores/playerStore';

export function usePlayer() {
  const players = usePlayerStore((state) => state.players);
  const currentPlayerId = usePlayerStore((state) => state.currentPlayerId);
  const loading = usePlayerStore((state) => state.loading);
  const loadPlayers = usePlayerStore((state) => state.loadPlayers);
  const updateProfile = usePlayerStore((state) => state.updateProfile);
  const setOnlineStatus = usePlayerStore((state) => state.setOnlineStatus);
  useEffect(() => {
    if (players.length === 0) void loadPlayers();
  }, [loadPlayers, players.length]);
  return { players, currentPlayerId, loading, loadPlayers, updateProfile, setOnlineStatus };
}
