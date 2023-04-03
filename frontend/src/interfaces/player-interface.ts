export interface IPlayerGameResponse {
  player_id: number,
  player_name: string,
  score: number
}

export interface IPlayerResponse {
  id: number,
  name: string,
  active: number,
  games: Array<{
    score: number,
    game_id: number,
    game_name: string,
    game_date: string
  }>
}
