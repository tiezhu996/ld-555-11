import { PlayerRank } from './enums';

export const rankConfigs: Record<PlayerRank, { label: string; icon: string; color: string; minScore: number; maxScore: number }> = {
  [PlayerRank.BRONZE]: { label: '青铜', icon: 'Ⅲ', color: '#a86f42', minScore: 0, maxScore: 999 },
  [PlayerRank.SILVER]: { label: '白银', icon: 'Ⅱ', color: '#aeb7c2', minScore: 1000, maxScore: 1499 },
  [PlayerRank.GOLD]: { label: '黄金', icon: 'Ⅰ', color: '#e2b447', minScore: 1500, maxScore: 1999 },
  [PlayerRank.PLATINUM]: { label: '铂金', icon: '◇', color: '#71d8d4', minScore: 2000, maxScore: 2499 },
  [PlayerRank.DIAMOND]: { label: '钻石', icon: '◇', color: '#8aa2ff', minScore: 2500, maxScore: 2999 },
  [PlayerRank.MASTER]: { label: '大师', icon: '✦', color: '#b26dff', minScore: 3000, maxScore: 3499 },
  [PlayerRank.GRANDMASTER]: { label: '宗师', icon: '✹', color: '#ff5d8f', minScore: 3500, maxScore: 9999 },
};
