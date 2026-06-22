import { Link } from 'react-router-dom';
import { gameConfigs } from '../../constants/game-configs';
import type { Player } from '../../types/player';
import type { Team } from '../../types/team';
import { winRate } from '../../utils/format';
import { GameTag } from './GameTag';

interface TeamCardProps {
  team: Team;
  captain?: Player;
  compact?: boolean;
}

export function TeamCard({ team, captain, compact = false }: TeamCardProps) {
  const game = gameConfigs[team.game];
  return (
    <Link className={`team-card ${compact ? 'team-card--compact' : ''}`} to={`/teams/${team.id}`}>
      <div className="team-card__mark" style={{ background: game.color }}>{team.logo}</div>
      <div className="team-card__main">
        <div className="team-card__top">
          <h3>{team.name}</h3>
          <span>#{team.rank}</span>
        </div>
        {!compact && <p>{team.bio}</p>}
        <div className="team-card__meta">
          <GameTag game={team.game} />
          <span>{team.wins}W / {team.losses}L</span>
          <span>胜率 {winRate(team.wins, team.losses)}%</span>
        </div>
        {captain && <small>队长：{captain.username}</small>}
      </div>
    </Link>
  );
}
