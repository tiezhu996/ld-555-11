import { GameTitle, PlayerRank, TournamentFormat, TournamentStatus } from '../constants/enums';
import type { Match } from '../types/match';
import type { Player } from '../types/player';
import type { Team } from '../types/team';
import type { Tournament } from '../types/tournament';

export const mockPlayers: Player[] = [
  { id: 'p-01', username: 'NullFlash', avatar: 'NF', bio: '主打控图和残局处理。', mainGame: GameTitle.CSGO, rank: PlayerRank.GRANDMASTER, score: 3820, teams: ['team-01'], matchHistory: ['m-01', 'm-08'], onlineStatus: 'online' },
  { id: 'p-02', username: 'VantaRay', avatar: 'VR', bio: '先锋位，擅长突破。', mainGame: GameTitle.VALORANT, rank: PlayerRank.MASTER, score: 3310, teams: ['team-02'], matchHistory: ['m-02'], onlineStatus: 'in-game' },
  { id: 'p-03', username: 'BaronMint', avatar: 'BM', bio: '上单，偏团队型。', mainGame: GameTitle.LOL, rank: PlayerRank.DIAMOND, score: 2860, teams: ['team-03'], matchHistory: ['m-03'], onlineStatus: 'online' },
  { id: 'p-04', username: 'OrbitNine', avatar: 'O9', bio: '四号位游走。', mainGame: GameTitle.DOTA2, rank: PlayerRank.MASTER, score: 3180, teams: ['team-04'], matchHistory: ['m-04'], onlineStatus: 'offline' },
  { id: 'p-05', username: 'DropZone', avatar: 'DZ', bio: '架枪位与运营指挥。', mainGame: GameTitle.PUBG, rank: PlayerRank.PLATINUM, score: 2210, teams: ['team-05'], matchHistory: ['m-05'], onlineStatus: 'online' },
  { id: 'p-06', username: 'RunePilot', avatar: 'RP', bio: '中路法核。', mainGame: GameTitle.LOL, rank: PlayerRank.GOLD, score: 1850, teams: ['team-06'], matchHistory: ['m-06'], onlineStatus: 'offline' },
  { id: 'p-07', username: 'SmokeKit', avatar: 'SK', bio: '道具位，重视复盘。', mainGame: GameTitle.CSGO, rank: PlayerRank.PLATINUM, score: 2440, teams: ['team-07'], matchHistory: ['m-07'], onlineStatus: 'in-game' },
  { id: 'p-08', username: 'ShardFox', avatar: 'SF', bio: '后期核心，稳定输出。', mainGame: GameTitle.DOTA2, rank: PlayerRank.DIAMOND, score: 2790, teams: ['team-08'], matchHistory: ['m-08'], onlineStatus: 'online' },
  { id: 'p-09', username: 'SpikeMute', avatar: 'SM', bio: '哨位，擅长信息差。', mainGame: GameTitle.VALORANT, rank: PlayerRank.SILVER, score: 1360, teams: ['team-09'], matchHistory: ['m-09'], onlineStatus: 'offline' },
  { id: 'p-10', username: 'FinalRing', avatar: 'FR', bio: '决赛圈指挥。', mainGame: GameTitle.PUBG, rank: PlayerRank.BRONZE, score: 820, teams: ['team-10'], matchHistory: ['m-10'], onlineStatus: 'online' },
];

export const mockTeams: Team[] = [
  { id: 'team-01', name: 'North Byte', logo: 'NB', game: GameTitle.CSGO, members: ['p-01', 'p-07'], captainId: 'p-01', rank: 1, wins: 42, losses: 8, bio: '纪律性极强的爆破图战队。', createdAt: '2026-01-08T10:00:00.000Z' },
  { id: 'team-02', name: 'Redline Protocol', logo: 'RP', game: GameTitle.VALORANT, members: ['p-02', 'p-09'], captainId: 'p-02', rank: 2, wins: 37, losses: 11, bio: '快节奏进攻和大胆转点。', createdAt: '2026-01-11T10:00:00.000Z' },
  { id: 'team-03', name: 'Baron Static', logo: 'BS', game: GameTitle.LOL, members: ['p-03', 'p-06'], captainId: 'p-03', rank: 3, wins: 35, losses: 13, bio: '围绕资源团设计节奏。', createdAt: '2026-01-15T10:00:00.000Z' },
  { id: 'team-04', name: 'Aegis Rail', logo: 'AR', game: GameTitle.DOTA2, members: ['p-04', 'p-08'], captainId: 'p-04', rank: 4, wins: 32, losses: 16, bio: '后期团战执行力稳定。', createdAt: '2026-02-02T10:00:00.000Z' },
  { id: 'team-05', name: 'Quiet Circle', logo: 'QC', game: GameTitle.PUBG, members: ['p-05', 'p-10'], captainId: 'p-05', rank: 5, wins: 28, losses: 17, bio: '擅长低风险转移和卡边。', createdAt: '2026-02-12T10:00:00.000Z' },
  { id: 'team-06', name: 'Midwave', logo: 'MW', game: GameTitle.LOL, members: ['p-06'], captainId: 'p-06', rank: 6, wins: 24, losses: 20, bio: '新晋战队，重视训练赛数据。', createdAt: '2026-02-18T10:00:00.000Z' },
  { id: 'team-07', name: 'Utility Lab', logo: 'UL', game: GameTitle.CSGO, members: ['p-07'], captainId: 'p-07', rank: 7, wins: 22, losses: 21, bio: '道具体系研究型队伍。', createdAt: '2026-03-01T10:00:00.000Z' },
  { id: 'team-08', name: 'Dire Current', logo: 'DC', game: GameTitle.DOTA2, members: ['p-08'], captainId: 'p-08', rank: 8, wins: 19, losses: 24, bio: '英雄池深，BP 灵活。', createdAt: '2026-03-05T10:00:00.000Z' },
  { id: 'team-09', name: 'Spike Harbor', logo: 'SH', game: GameTitle.VALORANT, members: ['p-09'], captainId: 'p-09', rank: 9, wins: 16, losses: 25, bio: '偏防守反击的学院队。', createdAt: '2026-03-12T10:00:00.000Z' },
  { id: 'team-10', name: 'Blue Zone Echo', logo: 'BE', game: GameTitle.PUBG, members: ['p-10'], captainId: 'p-10', rank: 10, wins: 13, losses: 28, bio: '开放招募，主攻周末杯。', createdAt: '2026-03-20T10:00:00.000Z' },
];

export const mockTournaments: Tournament[] = [
  { id: 'tour-01', name: '裂隙冠军夜', game: GameTitle.LOL, format: TournamentFormat.SINGLE_ELIM, teamSize: 5, maxTeams: 16, startDate: '2026-06-18', endDate: '2026-06-21', prize: '冠军皮肤基金 20000 元', status: TournamentStatus.IN_PROGRESS, rules: 'BO3 单败淘汰，决赛 BO5。', teams: ['team-03', 'team-06'], bracket: { rounds: [{ name: '半决赛', matches: [{ id: 'm-03', teamA: 'team-03', teamB: 'team-06', scoreA: 2, scoreB: 1 }] }] } },
  { id: 'tour-02', name: 'Red Spike Open', game: GameTitle.VALORANT, format: TournamentFormat.DOUBLE_ELIM, teamSize: 5, maxTeams: 12, startDate: '2026-06-20', endDate: '2026-06-23', prize: '外设套装与训练房时长', status: TournamentStatus.REGISTRATION, rules: '双败淘汰，地图池随机。', teams: ['team-02', 'team-09'], bracket: { rounds: [{ name: '胜者组 R1', matches: [{ id: 'm-02', teamA: 'team-02', teamB: 'team-09', scoreA: 0, scoreB: 0 }] }] } },
  { id: 'tour-03', name: 'Dustline Masters', game: GameTitle.CSGO, format: TournamentFormat.ROUND_ROBIN, teamSize: 5, maxTeams: 10, startDate: '2026-06-14', endDate: '2026-06-28', prize: '现金 30000 元', status: TournamentStatus.IN_PROGRESS, rules: '循环赛积分，胜 3 平 1。', teams: ['team-01', 'team-07'], bracket: { rounds: [{ name: '循环轮次', matches: [{ id: 'm-01', teamA: 'team-01', teamB: 'team-07', scoreA: 16, scoreB: 11 }] }] } },
  { id: 'tour-04', name: 'Aegis Weekend', game: GameTitle.DOTA2, format: TournamentFormat.POINT_BASED, teamSize: 5, maxTeams: 8, startDate: '2026-06-10', endDate: '2026-06-12', prize: '训练营名额', status: TournamentStatus.FINISHED, rules: '积分赛，按净胜局排序。', teams: ['team-04', 'team-08'], bracket: { rounds: [{ name: '积分轮', matches: [{ id: 'm-04', teamA: 'team-04', teamB: 'team-08', scoreA: 2, scoreB: 0 }] }] } },
  { id: 'tour-05', name: 'Final Ring Cup', game: GameTitle.PUBG, format: TournamentFormat.POINT_BASED, teamSize: 4, maxTeams: 16, startDate: '2026-06-26', endDate: '2026-06-27', prize: '奖金池 15000 元', status: TournamentStatus.REGISTRATION, rules: '六场积分，击杀和排名双积分。', teams: ['team-05', 'team-10'], bracket: { rounds: [{ name: '地图轮换', matches: [{ id: 'm-05', teamA: 'team-05', teamB: 'team-10', scoreA: 0, scoreB: 0 }] }] } },
  { id: 'tour-06', name: 'Mid Lane Lab', game: GameTitle.LOL, format: TournamentFormat.ROUND_ROBIN, teamSize: 5, maxTeams: 8, startDate: '2026-07-02', endDate: '2026-07-05', prize: '战队推广位', status: TournamentStatus.REGISTRATION, rules: '同组双循环，禁用重复英雄。', teams: ['team-03'], bracket: { rounds: [{ name: '小组赛', matches: [{ id: 'm-06', teamA: 'team-03', teamB: 'team-06', scoreA: 0, scoreB: 0 }] }] } },
  { id: 'tour-07', name: 'Utility Draft', game: GameTitle.CSGO, format: TournamentFormat.SINGLE_ELIM, teamSize: 5, maxTeams: 8, startDate: '2026-07-08', endDate: '2026-07-09', prize: '社区认证徽章', status: TournamentStatus.REGISTRATION, rules: '单败 BO1，决赛 BO3。', teams: ['team-07'], bracket: { rounds: [{ name: '八强', matches: [{ id: 'm-07', teamA: 'team-01', teamB: 'team-07', scoreA: 0, scoreB: 0 }] }] } },
  { id: 'tour-08', name: 'Dire Current Series', game: GameTitle.DOTA2, format: TournamentFormat.DOUBLE_ELIM, teamSize: 5, maxTeams: 12, startDate: '2026-05-21', endDate: '2026-05-25', prize: '复盘课包', status: TournamentStatus.FINISHED, rules: '胜者组 BO3，败者组 BO1。', teams: ['team-04', 'team-08'], bracket: { rounds: [{ name: '败者组决赛', matches: [{ id: 'm-08', teamA: 'team-04', teamB: 'team-08', scoreA: 1, scoreB: 2 }] }] } },
  { id: 'tour-09', name: 'Harbor Night', game: GameTitle.VALORANT, format: TournamentFormat.SINGLE_ELIM, teamSize: 5, maxTeams: 8, startDate: '2026-05-14', endDate: '2026-05-15', prize: '点券 8000', status: TournamentStatus.FINISHED, rules: 'BO3，禁用同图连选。', teams: ['team-02', 'team-09'], bracket: { rounds: [{ name: '决赛', matches: [{ id: 'm-09', teamA: 'team-02', teamB: 'team-09', scoreA: 2, scoreB: 0 }] }] } },
  { id: 'tour-10', name: 'Blue Zone Trials', game: GameTitle.PUBG, format: TournamentFormat.ROUND_ROBIN, teamSize: 4, maxTeams: 16, startDate: '2026-04-30', endDate: '2026-05-02', prize: '直播推荐位', status: TournamentStatus.FINISHED, rules: '三日积分，禁止换人。', teams: ['team-05', 'team-10'], bracket: { rounds: [{ name: '最终日', matches: [{ id: 'm-10', teamA: 'team-05', teamB: 'team-10', scoreA: 68, scoreB: 54 }] }] } },
];

export const mockMatches: Match[] = [
  { id: 'm-01', tournamentId: 'tour-03', teamA: 'team-01', teamB: 'team-07', score: { a: 16, b: 11 }, winner: 'team-01', playedAt: '2026-06-14T19:00:00.000Z', mvp: 'p-01' },
  { id: 'm-02', tournamentId: 'tour-02', teamA: 'team-02', teamB: 'team-09', score: { a: 0, b: 0 }, winner: '', playedAt: '2026-06-20T20:00:00.000Z', mvp: 'p-02' },
  { id: 'm-03', tournamentId: 'tour-01', teamA: 'team-03', teamB: 'team-06', score: { a: 2, b: 1 }, winner: 'team-03', playedAt: '2026-06-18T20:00:00.000Z', mvp: 'p-03' },
  { id: 'm-04', tournamentId: 'tour-04', teamA: 'team-04', teamB: 'team-08', score: { a: 2, b: 0 }, winner: 'team-04', playedAt: '2026-06-11T18:00:00.000Z', mvp: 'p-04' },
  { id: 'm-05', tournamentId: 'tour-05', teamA: 'team-05', teamB: 'team-10', score: { a: 0, b: 0 }, winner: '', playedAt: '2026-06-26T19:30:00.000Z', mvp: 'p-05' },
  { id: 'm-06', tournamentId: 'tour-06', teamA: 'team-03', teamB: 'team-06', score: { a: 0, b: 0 }, winner: '', playedAt: '2026-07-02T20:00:00.000Z', mvp: 'p-06' },
  { id: 'm-07', tournamentId: 'tour-07', teamA: 'team-01', teamB: 'team-07', score: { a: 0, b: 0 }, winner: '', playedAt: '2026-07-08T19:00:00.000Z', mvp: 'p-07' },
  { id: 'm-08', tournamentId: 'tour-08', teamA: 'team-04', teamB: 'team-08', score: { a: 1, b: 2 }, winner: 'team-08', playedAt: '2026-05-24T21:00:00.000Z', mvp: 'p-08' },
  { id: 'm-09', tournamentId: 'tour-09', teamA: 'team-02', teamB: 'team-09', score: { a: 2, b: 0 }, winner: 'team-02', playedAt: '2026-05-15T20:00:00.000Z', mvp: 'p-02' },
  { id: 'm-10', tournamentId: 'tour-10', teamA: 'team-05', teamB: 'team-10', score: { a: 68, b: 54 }, winner: 'team-05', playedAt: '2026-05-02T22:00:00.000Z', mvp: 'p-05' },
];
