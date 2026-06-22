import { GameTitle } from './enums';

export const gameConfigs: Record<GameTitle, { label: string; icon: string; color: string; defaultTeamSize: number }> = {
  [GameTitle.LOL]: { label: '英雄联盟', icon: '⚔', color: '#c8a55f', defaultTeamSize: 5 },
  [GameTitle.CSGO]: { label: 'CS:GO', icon: '⌖', color: '#e27a39', defaultTeamSize: 5 },
  [GameTitle.DOTA2]: { label: 'DOTA2', icon: '◆', color: '#b64a44', defaultTeamSize: 5 },
  [GameTitle.VALORANT]: { label: '无畏契约', icon: 'V', color: '#ff4655', defaultTeamSize: 5 },
  [GameTitle.PUBG]: { label: '绝地求生', icon: '◈', color: '#f2a900', defaultTeamSize: 4 },
};
