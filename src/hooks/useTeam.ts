import { useEffect } from 'react';
import { useTeamStore } from '../stores/teamStore';

export function useTeam() {
  const teams = useTeamStore((state) => state.teams);
  const loading = useTeamStore((state) => state.loading);
  const loadTeams = useTeamStore((state) => state.loadTeams);
  const createTeam = useTeamStore((state) => state.createTeam);
  const updateTeam = useTeamStore((state) => state.updateTeam);
  const disbandTeam = useTeamStore((state) => state.disbandTeam);
  useEffect(() => {
    if (teams.length === 0) void loadTeams();
  }, [loadTeams, teams.length]);
  return { teams, loading, loadTeams, createTeam, updateTeam, disbandTeam };
}
