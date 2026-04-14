export interface statusData {
  map: string;
  name: string;
  tags: string[];
  preset: string;
  players: number;
  round_id: number;
  run_level: number;
  short_name: string;
  panic_bunker: boolean;
  round_start_time: string; // ISO string from JSON
  soft_max_players: number;
}

export interface ServerInformation {
  address: string;
  statusData: statusData;
  inferredTags: object[];
}



