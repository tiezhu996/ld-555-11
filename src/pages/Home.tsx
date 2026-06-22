import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Swords, Trophy } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { GameTag } from '../components/common/GameTag';
import { TeamCard } from '../components/common/TeamCard';
import { gameTitleOptions, TournamentStatus } from '../constants/enums';
import { useTeam } from '../hooks/useTeam';
import { useTournament } from '../hooks/useTournament';
import { useChatStore } from '../stores/chatStore';
import { usePlayerStore } from '../stores/playerStore';
import { formatDate, tournamentStatusLabels, winRate } from '../utils/format';

export function Home() {
  const { tournaments } = useTournament();
  const { teams } = useTeam();
  const players = usePlayerStore((state) => state.players);
  const onlineCount = useChatStore((state) => state.onlineUserIds.length);
  const [index, setIndex] = useState(0);
  const highlights = tournaments.filter((item) => item.status !== TournamentStatus.FINISHED);
  const featured = highlights[index % Math.max(highlights.length, 1)];
  const recommendedTeams = useMemo(() => [...teams].sort((a, b) => winRate(b.wins, b.losses) - winRate(a.wins, a.losses)).slice(0, 3), [teams]);

  return (
    <motion.div className="page home-page" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
      <section className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">本地模拟 · 电竞社区中控台</p>
          <h1>把战队、赛事和段位排行放进同一块战术屏。</h1>
          <div className="quick-actions">
            <Link className="button button--primary" to="/tournaments/create"><Plus size={18} />创建赛事</Link>
            <Link className="button" to="/teams"><Swords size={18} />创建战队</Link>
            <Link className="button" to="/tournaments"><Trophy size={18} />加入比赛</Link>
          </div>
        </div>
        <div className="live-panel">
          <span>在线玩家</span>
          <strong className="pulse-number">{onlineCount}</strong>
          <p>mock WebSocket 正在推送在线状态、邀请和比分。</p>
        </div>
      </section>

      {featured && (
        <section className="feature-strip">
          <button className="icon-button" onClick={() => setIndex((value) => Math.max(value - 1, 0))}><ChevronLeft size={18} /></button>
          <div>
            <GameTag game={featured.game} />
            <h2>{featured.name}</h2>
            <p>{formatDate(featured.startDate)} - {formatDate(featured.endDate)} · {tournamentStatusLabels[featured.status]} · {featured.prize}</p>
          </div>
          <Link className="button button--primary" to={`/tournaments/${featured.id}`}>查看赛程</Link>
          <button className="icon-button" onClick={() => setIndex((value) => value + 1)}><ChevronRight size={18} /></button>
        </section>
      )}

      <section className="section-head">
        <h2>游戏分类</h2>
        <div className="tag-row">{gameTitleOptions.map((game) => <Link key={game} to={`/tournaments?game=${game}`}><GameTag game={game} /></Link>)}</div>
      </section>

      <section className="card-grid">
        {recommendedTeams.map((team) => <TeamCard key={team.id} team={team} captain={players.find((player) => player.id === team.captainId)} />)}
      </section>
    </motion.div>
  );
}
