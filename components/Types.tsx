export interface Player {
  id: number;
  player_id: number;
  name: string;
  date: string;
  gpg: number;
  hgpg: number;
  five_gpg: number;
  stat: number;
  tims: number;
  team_name: string;
  tgpg: number;
  otga: number;
  Scored?: boolean;
  injury_status?: string;
  injury_desc?: string;
  // Opposing starting goalie (written by the backend on every Picks row)
  opp_goalie_name?: string;
  opp_goalie_team?: string;
  opp_goalie_status?: string;
  opp_goalie_confirmed?: boolean;
  opp_goalie_nhl_id?: number;
  opp_goalie_gaa?: number;
  opp_goalie_save_pct?: number;
  opp_goalie_record?: string;
  opp_goalie_shutouts?: number;
  opp_goalie_games_played?: number;
  // Projected lineup (forward lines F1-F4; defence is only position_group "D")
  lineup_unit?: string | null;
  lineup_position_group?: string | null;
  pp_unit?: string | null;
  lineup_status?: string | null;
}


export type HistoryEntry = {
  date: string;
  players: Player[];
  scoredCount: number;
};