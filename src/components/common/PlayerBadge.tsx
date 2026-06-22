import { rankConfigs } from '../../constants/rank-configs';
import type { Player } from '../../types/player';

interface PlayerBadgeProps {
  player: Player;
  size?: 'sm' | 'md' | 'lg';
}

export function PlayerBadge({ player, size = 'md' }: PlayerBadgeProps) {
  const rank = rankConfigs[player.rank];
  return (
    <div className={`player-badge player-badge--${size}`}>
      <div className="avatar">{player.avatar}</div>
      <div className="player-badge__body">
        <strong>{player.username}</strong>
        <span style={{ color: rank.color }}>{rank.icon} {rank.label} · {player.score}</span>
      </div>
      <i className={`status-dot status-dot--${player.onlineStatus}`} title={player.onlineStatus} />
    </div>
  );
}
