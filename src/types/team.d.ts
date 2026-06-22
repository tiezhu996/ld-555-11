import type { GameTitle } from '../constants/enums';

export interface Team {
  id: string;
  name: string;
  logo: string;
  game: GameTitle;
  members: string[];
  captainId: string;
  rank: number;
  wins: number;
  losses: number;
  bio: string;
  createdAt: string;
}
