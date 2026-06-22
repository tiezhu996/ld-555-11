import type { Match } from '../types/match';
import { deleteRecord, getAllRecords, putManyRecords, putRecord } from './index';

export const matchDb = {
  getAll: () => getAllRecords<Match>('matches'),
  save: (match: Match) => putRecord('matches', match),
  saveMany: (matches: Match[]) => putManyRecords('matches', matches),
  remove: (id: string) => deleteRecord('matches', id),
};
