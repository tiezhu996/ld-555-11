import type { TournamentFormat } from '../../constants/enums';
import type { BracketRound } from '../../types/tournament';
import { tournamentFormatLabels } from '../../utils/format';

interface BracketChartProps {
  format: TournamentFormat;
  rounds: BracketRound[];
  compact?: boolean;
}

export function BracketChart({ format, rounds, compact = false }: BracketChartProps) {
  return (
    <div className={`bracket bracket--${compact ? 'compact' : 'full'}`}>
      <div className="bracket__label">{tournamentFormatLabels[format]}</div>
      <div className="bracket__rounds">
        {rounds.map((round) => (
          <section className="bracket__round" key={round.name}>
            <h4>{round.name}</h4>
            {round.matches.map((match) => (
              <div className="bracket__match" key={match.id}>
                <span>{match.teamA}</span>
                <strong>{match.scoreA} : {match.scoreB}</strong>
                <span>{match.teamB}</span>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
