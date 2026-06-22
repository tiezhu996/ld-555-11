import type { Team } from '../types/team';
import { deleteRecord, getAllRecords, putManyRecords, putRecord } from './index';

export const teamDb = {
  getAll: () => getAllRecords<Team>('teams'),
  save: (team: Team) => putRecord('teams', team),
  saveMany: (teams: Team[]) => putManyRecords('teams', teams),
  remove: (id: string) => deleteRecord('teams', id),
};
