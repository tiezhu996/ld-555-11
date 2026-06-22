import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { EmptyState } from '../components/common/EmptyState';
import { GameTag } from '../components/common/GameTag';
import { gameTitleOptions, TournamentStatus, tournamentStatusOptions, type GameTitle } from '../constants/enums';
import { useTournament } from '../hooks/useTournament';
import { formatDate, tournamentFormatLabels, tournamentStatusLabels } from '../utils/format';

export function Tournaments() {
  const { tournaments } = useTournament();
  const [params] = useSearchParams();
  const [game, setGame] = useState<GameTitle | 'ALL'>((params.get('game') as GameTitle) || 'ALL');
  const [status, setStatus] = useState<TournamentStatus | 'ALL'>('ALL');
  const filtered = tournaments.filter((item) => (game === 'ALL' || item.game === game) && (status === 'ALL' || item.status === status));

  return (
    <motion.div className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-title-row">
        <div><p className="eyebrow">Tournaments</p><h1>赛事大厅</h1></div>
        <Link className="button button--primary" to="/tournaments/create">创建赛事</Link>
      </div>
      <div className="filters">
        <button className={`chip ${game === 'ALL' ? 'is-active' : ''}`} onClick={() => setGame('ALL')}>全部游戏</button>
        {gameTitleOptions.map((option) => <GameTag key={option} game={option} active={game === option} onClick={setGame} />)}
      </div>
      <div className="filters">
        <button className={`chip ${status === 'ALL' ? 'is-active' : ''}`} onClick={() => setStatus('ALL')}>全部状态</button>
        {tournamentStatusOptions.map((option) => <button className={`chip ${status === option ? 'is-active' : ''}`} key={option} onClick={() => setStatus(option)}>{tournamentStatusLabels[option]}</button>)}
      </div>
      <section className="tournament-grid">
        {filtered.map((item, idx) => (
          <motion.div className="tournament-card" key={item.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
            <GameTag game={item.game} />
            <h2>{item.name}</h2>
            <p>{tournamentFormatLabels[item.format]} · {formatDate(item.startDate)} 开赛</p>
            <div className="stat-line"><span>{item.teams.length}/{item.maxTeams} 队</span><span>{tournamentStatusLabels[item.status]}</span></div>
            <Link className="button" to={`/tournaments/${item.id}`}>查看详情</Link>
          </motion.div>
        ))}
      </section>
      {filtered.length === 0 && <EmptyState title="没有匹配赛事" detail="调整游戏或状态筛选后再试。" />}
    </motion.div>
  );
}
