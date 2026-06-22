import { Bell, Gamepad2 } from 'lucide-react';
import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ThemeToggle } from './components/common/ThemeToggle';
import { ToastHost } from './components/common/ToastHost';
import { useWebSocket } from './hooks/useWebSocket';
import { seedDatabase } from './mock/seed';
import { useChatStore } from './stores/chatStore';
import { useMatchStore } from './stores/matchStore';
import { usePlayerStore } from './stores/playerStore';
import { useTeamStore } from './stores/teamStore';
import { useTournamentStore } from './stores/tournamentStore';

const navItems = [
  { to: '/', label: '首页' },
  { to: '/tournaments', label: '赛事' },
  { to: '/teams', label: '战队' },
  { to: '/leaderboard', label: '排行' },
  { to: '/profile', label: '我的' },
];

export function App() {
  const unreadCount = useChatStore((state) => state.unreadCount);
  const markAllRead = useChatStore((state) => state.markAllRead);
  useWebSocket();

  useEffect(() => {
    void seedDatabase().then(async () => {
      await Promise.all([
        useTeamStore.getState().loadTeams(),
        useTournamentStore.getState().loadTournaments(),
        usePlayerStore.getState().loadPlayers(),
        useMatchStore.getState().loadMatches(),
      ]);
    });
  }, []);

  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink className="brand" to="/">
          <Gamepad2 size={22} />
          <span>GGArena</span>
        </NavLink>
        <nav>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-button" onClick={markAllRead} aria-label="通知" title="通知">
            <Bell size={18} />
            {unreadCount > 0 && <span className="badge-count">{unreadCount}</span>}
          </button>
          <ThemeToggle />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <ToastHost />
    </div>
  );
}
