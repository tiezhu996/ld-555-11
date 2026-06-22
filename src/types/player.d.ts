import type { GameTitle, PlayerRank } from '../constants/enums';

export type OnlineStatus = 'online' | 'offline' | 'in-game';

export interface Player {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  mainGame: GameTitle;
  rank: PlayerRank;
  score: number;
  teams: string[];
  matchHistory: string[];
  onlineStatus: OnlineStatus;
}
