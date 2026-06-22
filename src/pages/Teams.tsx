import { useMemo, useState } from 'react';
import { EmptyState } from '../components/common/EmptyState';
import { GameTag } from '../components/common/GameTag';
import { TeamCard } from '../components/common/TeamCard';
import { gameTitleOptions, PlayerRank, playerRankOptions, type GameTitle } from '../constants/enums';
import { usePlayer } from '../hooks/usePlayer';
import { useTeam } from '../hooks/useTeam';

export function Teams() {
  const { teams } = useTeam();
  const { players } = usePlayer();
  const [query, setQuery] = useState('');
  const [game, setGame] = useState<GameTitle | 'ALL'>('ALL');
  const [rank, setRank] = useState<PlayerRank | 'ALL'>('ALL');
  const filtered = useMemo(() => teams.filter((team) => {
    const captain = players.find((player) => player.id === team.captainId);
    return (game === 'ALL' || team.game === game) && (rank === 'ALL' || captain?.rank === rank) && team.name.toLowerCase().includes(query.toLowerCase());
  }), [game, players, query, rank, teams]);

  return (
    <div className="page">
      <div className="page-title-row"><div><p className="eyebrow">Teams</p><h1>战队广场</h1></div><input className="search" placeholder="搜索战队" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
      <div className="filters"><button className={`chip ${game === 'ALL' ? 'is-active' : ''}`} onClick={() => setGame('ALL')}>全部游戏</button>{gameTitleOptions.map((option) => <GameTag key={option} game={option} active={game === option} onClick={setGame} />)}</div>
      <div className="filters"><button className={`chip ${rank === 'ALL' ? 'is-active' : ''}`} onClick={() => setRank('ALL')}>全部段位</button>{playerRankOptions.map((option) => <button className={`chip ${rank === option ? 'is-active' : ''}`} key={option} onClick={() => setRank(option)}>{option}</button>)}</div>
      <section className="card-grid">{filtered.map((team) => <TeamCard key={team.id} team={team} captain={players.find((player) => player.id === team.captainId)} />)}</section>
      {filtered.length === 0 && <EmptyState title="未找到战队" detail="换一个关键词或筛选条件。" />}
    </div>
  );
}
