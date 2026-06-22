import type { Player } from '../types/player';
import { deleteRecord, getAllRecords, putManyRecords, putRecord } from './index';

export const playerDb = {
  getAll: () => getAllRecords<Player>('players'),
  save: (player: Player) => putRecord('players', player),
  saveMany: (players: Player[]) => putManyRecords('players', players),
  remove: (id: string) => deleteRecord('players', id),
};
