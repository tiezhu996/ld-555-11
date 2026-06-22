import type { Tournament } from '../types/tournament';
import { deleteRecord, getAllRecords, putManyRecords, putRecord } from './index';

export const tournamentDb = {
  getAll: () => getAllRecords<Tournament>('tournaments'),
  save: (tournament: Tournament) => putRecord('tournaments', tournament),
  saveMany: (tournaments: Tournament[]) => putManyRecords('tournaments', tournaments),
  remove: (id: string) => deleteRecord('tournaments', id),
};
