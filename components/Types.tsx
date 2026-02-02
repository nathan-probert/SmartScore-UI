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
}


export type HistoryEntry = {
  date: string;
  players: Player[];
  scoredCount: number;
};