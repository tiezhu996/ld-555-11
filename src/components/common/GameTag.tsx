import { gameConfigs } from '../../constants/game-configs';
import type { GameTitle } from '../../constants/enums';

interface GameTagProps {
  game: GameTitle;
  active?: boolean;
  onClick?: (game: GameTitle) => void;
}

export function GameTag({ game, active = false, onClick }: GameTagProps) {
  const config = gameConfigs[game];
  const content = (
    <>
      <span className="game-tag__icon">{config.icon}</span>
      <span>{config.label}</span>
    </>
  );
  if (onClick) {
    return (
      <button className={`game-tag ${active ? 'is-active' : ''}`} style={{ '--tag-color': config.color } as React.CSSProperties} onClick={() => onClick(game)}>
        {content}
      </button>
    );
  }
  return (
    <span className="game-tag" style={{ '--tag-color': config.color } as React.CSSProperties}>
      {content}
    </span>
  );
}
