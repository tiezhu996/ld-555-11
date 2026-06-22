import { create } from 'zustand';
import type { LiveScore, NotificationItem } from '../types/chat';

interface ChatState {
  onlineUserIds: string[];
  unreadCount: number;
  liveScores: Record<string, LiveScore>;
  notifications: NotificationItem[];
  setPlayerPresence: (playerId: string, online: boolean) => void;
  updateLiveScore: (score: LiveScore) => void;
  pushNotification: (notification: NotificationItem) => void;
  markAllRead: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  onlineUserIds: ['p-01', 'p-02', 'p-03', 'p-05', 'p-08', 'p-10'],
  unreadCount: 0,
  liveScores: {},
  notifications: [],
  setPlayerPresence: (playerId, online) => {
    set((state) => ({
      onlineUserIds: online
        ? Array.from(new Set([...state.onlineUserIds, playerId]))
        : state.onlineUserIds.filter((id) => id !== playerId),
    }));
  },
  updateLiveScore: (score) => {
    set((state) => ({ liveScores: { ...state.liveScores, [score.matchId]: score } }));
  },
  pushNotification: (notification) => {
    set((state) => ({ notifications: [notification, ...state.notifications].slice(0, 5), unreadCount: state.unreadCount + 1 }));
  },
  markAllRead: () => set({ unreadCount: 0 }),
}));
