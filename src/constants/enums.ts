export const GameTitle = {
  LOL: 'LOL',
  CSGO: 'CSGO',
  DOTA2: 'DOTA2',
  VALORANT: 'VALORANT',
  PUBG: 'PUBG',
} as const;

export type GameTitle = (typeof GameTitle)[keyof typeof GameTitle];

export const TournamentFormat = {
  SINGLE_ELIM: 'SINGLE_ELIM',
  DOUBLE_ELIM: 'DOUBLE_ELIM',
  ROUND_ROBIN: 'ROUND_ROBIN',
  POINT_BASED: 'POINT_BASED',
} as const;

export type TournamentFormat = (typeof TournamentFormat)[keyof typeof TournamentFormat];

export const TournamentStatus = {
  REGISTRATION: 'REGISTRATION',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: 'FINISHED',
} as const;

export type TournamentStatus = (typeof TournamentStatus)[keyof typeof TournamentStatus];

export const PlayerRank = {
  BRONZE: 'BRONZE',
  SILVER: 'SILVER',
  GOLD: 'GOLD',
  PLATINUM: 'PLATINUM',
  DIAMOND: 'DIAMOND',
  MASTER: 'MASTER',
  GRANDMASTER: 'GRANDMASTER',
} as const;

export type PlayerRank = (typeof PlayerRank)[keyof typeof PlayerRank];

export const gameTitleOptions = Object.values(GameTitle);
export const tournamentFormatOptions = Object.values(TournamentFormat);
export const tournamentStatusOptions = Object.values(TournamentStatus);
export const playerRankOptions = Object.values(PlayerRank);
