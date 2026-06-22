import { createElement } from 'react';
import { CreateTournament } from '../pages/CreateTournament';
import { Home } from '../pages/Home';
import { Leaderboard } from '../pages/Leaderboard';
import { Profile } from '../pages/Profile';
import { TeamDetail } from '../pages/TeamDetail';
import { Teams } from '../pages/Teams';
import { TournamentDetail } from '../pages/TournamentDetail';
import { Tournaments } from '../pages/Tournaments';

export const routes = [
  { path: '/', element: createElement(Home) },
  { path: '/tournaments', element: createElement(Tournaments) },
  { path: '/tournaments/create', element: createElement(CreateTournament) },
  { path: '/tournaments/:id', element: createElement(TournamentDetail) },
  { path: '/teams', element: createElement(Teams) },
  { path: '/teams/:id', element: createElement(TeamDetail) },
  { path: '/profile', element: createElement(Profile) },
  { path: '/leaderboard', element: createElement(Leaderboard) },
];
