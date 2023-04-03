import { AxiosResponse } from 'axios'

import { axiosInstance } from 'lib/axiosInstance'
import {API_URL} from 'config/constants'
import { IPlayerGameResponse, IPlayerResponse} from 'interfaces/player-interface'

export const getAllPlayersService = async () => {
  const response: AxiosResponse<IPlayerResponse[]> = await axiosInstance.get(`${API_URL}/housekeeping/players/`)
  return response
}

export const createPlayerService = async (data: any) => {
  const response =  await axiosInstance.post(`${API_URL}/housekeeping/players/add`, data)
  return response
}

export const updatePlayerService = async (id: number, data: any) => {
  const response = await axiosInstance.put(`${API_URL}/housekeeping/players/${id}/update`, data)
  return response
}

export const deletePlayerService = async (id: number) => {
  const response = await axiosInstance.delete(`${API_URL}/housekeeping/players/${id}/delete`)
  return response
}

export const getPlayersForGame = async (id: string) => {
  const response: AxiosResponse<IPlayerGameResponse[]> =  await axiosInstance.get(`${API_URL}/game/${id}/players/`)
  return response
}

export const assignPlayerOnGame = async(gameId: string, data: any) => {
  const response: any = await axiosInstance.post(`${API_URL}/game/${gameId}/player/assign`, data)
  return response
}

export const updatePlayerOnGame = async(gameId: string, data: any) => {
  const response: any = await axiosInstance.put(`${API_URL}/game/${gameId}/player/update`, data)
  return response
}

export const updateGamePlayerDetails = async(gameId: string, data: any) => {
  const response: any = await axiosInstance.put(`${API_URL}/game/${gameId}/gameplayer/update`, data)
  return response
}