import {IPlayerGameResponse} from 'interfaces/player-interface'
import { IQuestionInterface } from 'interfaces/question-interface'

export interface IGameInterfaceApi {
  id: number,
  name: string,
  url: string,
  description: string,
  questions: IQuestionInterface[],
  players: IPlayerGameResponse[],
  created_at: string
}