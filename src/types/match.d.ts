export interface Match {
  id: string;
  tournamentId: string;
  teamA: string;
  teamB: string;
  score: {
    a: number;
    b: number;
  };
  winner: string;
  playedAt: string;
  mvp: string;
}
