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
  const { tournaments, registerTeam } = useTournament();
  const { teams } = useTeam();
  const players = usePlayerStore((state) => state.players);
  const matches = useMatchStore((state) => state.matches);
  const tournament = tournaments.find((item) => item.id === id);
  if (!tournament) return <div className="page"><EmptyState title="赛事不存在" detail="请返回赛事大厅重新选择。" /></div>;
  const joinedTeams = teams.filter((team) => tournament.teams.includes(team.id));
  const tournamentMatches = matches.filter((match) => match.tournamentId === tournament.id);

  return (
    <div className="page detail-page">
      <section className="detail-hero">
        <GameTag game={tournament.game} />
        <h1>{tournament.name}</h1>
        <p>{tournamentFormatLabels[tournament.format]} · {tournament.prize} · {tournamentStatusLabels[tournament.status]}</p>
        {tournament.status === TournamentStatus.REGISTRATION && <button className="button button--primary" onClick={() => void registerTeam(tournament.id, teams[0]?.id || '')}>报名 North Byte</button>}
      </section>
      <BracketChart format={tournament.format} rounds={tournament.bracket.rounds} />
      <section className="section-head"><h2>参赛队伍</h2></section>
      <div className="card-grid">{joinedTeams.map((team) => <TeamCard key={team.id} team={team} captain={players.find((player) => player.id === team.captainId)} compact />)}</div>
      <section className="timeline">
        <h2>对局结果</h2>
        {tournamentMatches.map((match) => <div className="timeline-item" key={match.id}>{match.teamA} vs {match.teamB}<strong>{match.score.a} : {match.score.b}</strong></div>)}
      </section>
    </div>
  );
}
