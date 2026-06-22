import { useParams } from 'react-router-dom';
import { EmptyState } from '../components/common/EmptyState';
import { GameTag } from '../components/common/GameTag';
import { PlayerBadge } from '../components/common/PlayerBadge';
import { usePlayer } from '../hooks/usePlayer';
import { useTeam } from '../hooks/useTeam';
import { useMatchStore } from '../stores/matchStore';
import { useTournamentStore } from '../stores/tournamentStore';
import { winRate } from '../utils/format';

export function TeamDetail() {
  const { id } = useParams();
  const { teams, updateTeam } = useTeam();
  const { players } = usePlayer();
  const matches = useMatchStore((state) => state.matches);
  const tournaments = useTournamentStore((state) => state.tournaments);
  const team = teams.find((item) => item.id === id);
  if (!team) return <div className="page"><EmptyState title="战队不存在" detail="请返回战队广场重新选择。" /></div>;
  const members = players.filter((player) => team.members.includes(player.id));
  const history = tournaments.filter((item) => item.teams.includes(team.id));

  return (
    <div className="page detail-page">
      <section className="team-hero">
        <div className="team-card__mark">{team.logo}</div>
        <div><GameTag game={team.game} /><h1>{team.name}</h1><p>{team.bio}</p><strong>{team.wins}W / {team.losses}L · 胜率 {winRate(team.wins, team.losses)}%</strong></div>
        <button className="button button--primary" onClick={() => void updateTeam({ ...team, members: Array.from(new Set([...team.members, 'p-01'])) })}>加入战队</button>
      </section>
      <section className="panel"><h2>队员列表</h2><div className="player-list">{members.map((player) => <PlayerBadge key={player.id} player={player} />)}</div></section>
      <section className="timeline"><h2>赛事参与历史</h2>{history.map((item) => <div className="timeline-item" key={item.id}>{item.name}<span>{item.status}</span></div>)}</section>
      <section className="timeline"><h2>对局记录</h2>{matches.filter((match) => match.teamA === team.id || match.teamB === team.id).map((match) => <div className="timeline-item" key={match.id}>{match.teamA} vs {match.teamB}<strong>{match.score.a}:{match.score.b}</strong></div>)}</section>
    </div>
  );
}
