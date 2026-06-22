import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameConfigs } from '../constants/game-configs';
import { GameTitle, TournamentFormat, TournamentStatus, gameTitleOptions, tournamentFormatOptions } from '../constants/enums';
import { useTournament } from '../hooks/useTournament';
import { mockWebSocket } from '../mock/websocket';
import type { Tournament } from '../types/tournament';
import { isNonEmpty } from '../utils/validation';

export function CreateTournament() {
  const navigate = useNavigate();
  const { createTournament } = useTournament();
  const [name, setName] = useState('社区周赛');
  const [game, setGame] = useState<GameTitle>(GameTitle.VALORANT);
  const [format, setFormat] = useState<TournamentFormat>(TournamentFormat.SINGLE_ELIM);
  const [rules, setRules] = useState('准时签到，尊重裁判判罚。');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!isNonEmpty(name)) return;
    const tournament: Tournament = {
      id: crypto.randomUUID(),
      name,
      game,
      format,
      teamSize: gameConfigs[game].defaultTeamSize,
      maxTeams: 16,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10),
      prize: '社区奖金池',
      status: TournamentStatus.REGISTRATION,
      rules,
      teams: [],
      bracket: { rounds: [{ name: '待确认', matches: [] }] },
    };
    await createTournament(tournament);
    mockWebSocket.pushTournamentCreated(name);
    navigate(`/tournaments/${tournament.id}`);
  }

  return (
    <div className="page narrow-page">
      <p className="eyebrow">Create</p>
      <h1>创建赛事</h1>
      <form className="form-panel" onSubmit={handleSubmit}>
        <label>赛事名称<input value={name} onChange={(event) => setName(event.target.value)} /></label>
        <label>游戏<select value={game} onChange={(event) => setGame(event.target.value as GameTitle)}>{gameTitleOptions.map((option) => <option key={option} value={option}>{gameConfigs[option].label}</option>)}</select></label>
        <label>赛制<select value={format} onChange={(event) => setFormat(event.target.value as TournamentFormat)}>{tournamentFormatOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>
        <label>规则<textarea value={rules} onChange={(event) => setRules(event.target.value)} rows={5} /></label>
        <button className="button button--primary" type="submit">保存并开放报名</button>
      </form>
    </div>
  );
}
