import { useParams } from 'react-router-dom';
import { BracketChart } from '../components/common/BracketChart';
import { EmptyState } from '../components/common/EmptyState';
import { GameTag } from '../components/common/GameTag';
import { TeamCard } from '../components/common/TeamCard';
import { TournamentStatus } from '../constants/enums';
import { useTeam } from '../hooks/useTeam';
import { useTournament } from '../hooks/useTournament';
import { useMatchStore } from '../stores/matchStore';
import { usePlayerStore } from '../stores/playerStore';
import { tournamentFormatLabels, tournamentStatusLabels } from '../utils/format';

export function TournamentDetail() {
  const { id } = useParams();
  const { tournaments, registerTeam, unregisterTeam } = useTournament();
  const { teams } = useTeam();
  const players = usePlayerStore((state) => state.players);
  const matches = useMatchStore((state) => state.matches);
  const tournament = tournaments.find((item) => item.id === id);
  if (!tournament) return <div className="page"><EmptyState title="赛事不存在" detail="请返回赛事大厅重新选择。" /></div>;
  const joinedTeams = teams.filter((team) => tournament.teams.includes(team.id));
  const waitlistTeams = teams.filter((team) => tournament.waitlist.includes(team.id));
  const tournamentMatches = matches.filter((match) => match.tournamentId === tournament.id);
  const currentTeamId = teams[0]?.id || '';
  const isInTeams = tournament.teams.includes(currentTeamId);
  const isInWaitlist = tournament.waitlist.includes(currentTeamId);
  const waitlistPosition = tournament.waitlist.indexOf(currentTeamId) + 1;
  const isFull = tournament.teams.length >= tournament.maxTeams;

  return (
    <div className="page detail-page">
      <section className="detail-hero">
        <GameTag game={tournament.game} />
        <h1>{tournament.name}</h1>
        <p>{tournamentFormatLabels[tournament.format]} · {tournament.prize} · {tournamentStatusLabels[tournament.status]}</p>
        <p className="detail-meta">参赛 {tournament.teams.length}/{tournament.maxTeams}{tournament.waitlist.length > 0 && ` · 候补 ${tournament.waitlist.length}`}</p>
        {tournament.status === TournamentStatus.REGISTRATION && (
          isInTeams || isInWaitlist ? (
            <div className="hero-actions">
              {isInTeams && <span className="badge badge--success">已报名</span>}
              {isInWaitlist && <span className="badge badge--warning">候补第 {waitlistPosition} 位</span>}
              <button className="button button--ghost" onClick={() => void unregisterTeam(tournament.id, currentTeamId)}>退出赛事</button>
            </div>
          ) : (
            <button className="button button--primary" onClick={() => void registerTeam(tournament.id, currentTeamId)}>
              {isFull ? '加入候补' : '报名 North Byte'}
            </button>
          )
        )}
      </section>
      <BracketChart format={tournament.format} rounds={tournament.bracket.rounds} />
      <section className="section-head"><h2>参赛队伍</h2><span>{tournament.teams.length}/{tournament.maxTeams}</span></section>
      <div className="card-grid">{joinedTeams.map((team) => <TeamCard key={team.id} team={team} captain={players.find((player) => player.id === team.captainId)} compact />)}</div>
      {waitlistTeams.length > 0 && (
        <>
          <section className="section-head"><h2>候补队列</h2><span>{waitlistTeams.length} 队</span></section>
          <div className="card-grid">
            {waitlistTeams.map((team, index) => (
              <div key={team.id} className="waitlist-card">
                <TeamCard team={team} captain={players.find((player) => player.id === team.captainId)} compact />
                <span className="badge badge--warning">#{index + 1}</span>
              </div>
            ))}
          </div>
        </>
      )}
      <section className="timeline">
        <h2>对局结果</h2>
        {tournamentMatches.map((match) => <div className="timeline-item" key={match.id}>{match.teamA} vs {match.teamB}<strong>{match.score.a} : {match.score.b}</strong></div>)}
      </section>
    </div>
  );
}
