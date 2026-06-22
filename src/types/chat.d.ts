export interface NotificationItem {
  id: string;
  type: 'tournament' | 'match' | 'team';
  message: string;
  createdAt: string;
}

export interface LiveScore {
  matchId: string;
  scoreA: number;
  scoreB: number;
}
