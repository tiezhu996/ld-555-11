import { BracketChart } from '../components/common/BracketChart';
import { PlayerBadge } from '../components/common/PlayerBadge';
import { TeamCard } from '../components/common/TeamCard';
import { rankConfigs } from '../constants/rank-configs';
import { usePlayer } from '../hooks/usePlayer';
import { useTeam } from '../hooks/useTeam';
import { useTournamentStore } from '../stores/tournamentStore';

export function Profile() {
  const { players, currentPlayerId, updateProfile } = usePlayer();
  const { teams } = useTeam();
  const tournaments = useTournamentStore((state) => state.tournaments);
  const player = players.find((item) => item.id === currentPlayerId) || players[0];
  if (!player) return <div className="page">加载中</div>;
  const rank = rankConfigs[player.rank];
  const myTeams = teams.filter((team) => player.teams.includes(team.id));
  const relatedTournament = tournaments.find((tour) => tour.teams.some((teamId) => player.teams.includes(teamId)));

  return (
    <div className="page detail-page">
      <section className="profile-grid">
        <div className="panel"><PlayerBadge player={player} size="lg" /><p>{player.bio}</p><button className="button" onClick={() => void updateProfile({ ...player, bio: `${player.bio} 已更新` })}>编辑资料</button></div>
        <div className="panel"><h2>段位成就</h2><div className="progress"><span style={{ width: `${Math.min(100, (player.score / rank.maxScore) * 100)}%` }} /></div><p>{rank.label} · {player.score}/{rank.maxScore}</p></div>
      </section>
      <section className="card-grid">{myTeams.map((team) => <TeamCard key={team.id} team={team} captain={player} compact />)}</section>
      {relatedTournament && <section className="panel"><h2>参赛记录</h2><BracketChart compact format={relatedTournament.format} rounds={relatedTournament.bracket.rounds} /></section>}
    </div>
  );
}
