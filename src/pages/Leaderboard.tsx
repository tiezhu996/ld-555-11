import { useState } from 'react';
import { GameTag } from '../components/common/GameTag';
import { PlayerBadge } from '../components/common/PlayerBadge';
import { TeamCard } from '../components/common/TeamCard';
import { gameTitleOptions, type GameTitle } from '../constants/enums';
import { rankConfigs } from '../constants/rank-configs';
import { usePlayer } from '../hooks/usePlayer';
import { useTeam } from '../hooks/useTeam';
import { useTournament } from '../hooks/useTournament';
import { winRate } from '../utils/format';

type Tab = 'team' | 'player' | 'tournament';

export function Leaderboard() {
  const { teams } = useTeam();
  const { players } = usePlayer();
  const { tournaments } = useTournament();
  const [tab, setTab] = useState<Tab>('team');
  const [game, setGame] = useState<GameTitle | 'ALL'>('ALL');
  const filteredTeams = teams.filter((team) => game === 'ALL' || team.game === game).sort((a, b) => b.rank - a.rank);

  return (
    <div className="page">
      <div className="page-title-row"><div><p className="eyebrow">Leaderboard</p><h1>排行榜</h1></div></div>
      <div className="tabs">{(['team', 'player', 'tournament'] as Tab[]).map((item) => <button className={tab === item ? 'is-active' : ''} key={item} onClick={() => setTab(item)}>{item === 'team' ? '战队排名' : item === 'player' ? '个人段位' : '赛事积分'}</button>)}</div>
      {tab === 'team' && <div className="filters"><button className={`chip ${game === 'ALL' ? 'is-active' : ''}`} onClick={() => setGame('ALL')}>全部游戏</button>{gameTitleOptions.map((option) => <GameTag key={option} game={option} active={game === option} onClick={setGame} />)}</div>}
      {tab === 'team' && <div className="table-list">{filteredTeams.map((team) => <div className="table-row" key={team.id}><TeamCard team={team} compact /><span>积分 {1000 - team.rank * 32}</span><span>胜率 {winRate(team.wins, team.losses)}%</span></div>)}</div>}
      {tab === 'player' && <div className="table-list">{[...players].sort((a, b) => b.score - a.score).map((player) => <div className="table-row" key={player.id}><PlayerBadge player={player} /><span style={{ color: rankConfigs[player.rank].color }}>{rankConfigs[player.rank].label}</span><strong>{player.score}</strong></div>)}</div>}
      {tab === 'tournament' && <div className="table-list">{tournaments.map((tour) => <div className="table-row" key={tour.id}><span>{tour.name}</span><GameTag game={tour.game} /><strong>{tour.teams.length * 100} 积分池</strong></div>)}</div>}
    </div>
  );
}
