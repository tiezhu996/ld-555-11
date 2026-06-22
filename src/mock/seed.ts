import { matchDb } from '../db/match-db';
import { playerDb } from '../db/player-db';
import { teamDb } from '../db/team-db';
import { tournamentDb } from '../db/tournament-db';
import { withFriendlyError } from '../utils/storage';
import { mockMatches, mockPlayers, mockTeams, mockTournaments } from './mock-data';

const SEED_KEY = 'ggarena-seeded-v1';

export async function seedDatabase(): Promise<void> {
  await withFriendlyError(async () => {
    const seeded = localStorage.getItem(SEED_KEY);
    if (seeded) return;
    await Promise.all([
      teamDb.saveMany(mockTeams),
      tournamentDb.saveMany(mockTournaments),
      playerDb.saveMany(mockPlayers),
      matchDb.saveMany(mockMatches),
    ]);
    localStorage.setItem(SEED_KEY, 'true');
  }, '初始化演示数据失败，请刷新页面重试。');
}
