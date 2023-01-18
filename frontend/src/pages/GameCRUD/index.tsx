import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/system'
import { Divider, Tabs, Tab } from '@mui/material'
import axios, { AxiosResponse } from 'axios'

import {API_URL} from 'config/constants'
import GameTab from 'pages/GameCRUD/GameTab'
import PlayersTab from 'pages/GameCRUD/PlayersTab'
import QuestionsTab from 'pages/GameCRUD/QuestionsTab'
import { IGameInterfaceApi } from 'interfaces/game-interface'

// TODO: change this into a verticla tab, for diversity

const tabs = [
  {value: 'game', label: 'Game detail'},
  {value: 'players', label: 'Players'},
  {value: 'questions', label: 'Questions'},
]

interface ParamsInterface {
  id: string
}

const index = () => {
  const { id } = useParams<ParamsInterface>();
  const [currentTab, setCurrentTab] = useState('game')
  const [game, setGame] = useState<IGameInterfaceApi | null>(null)

  const getGame = async (): Promise<IGameInterfaceApi> => {
    const response: AxiosResponse<IGameInterfaceApi> = await axios.get(`${API_URL}/game/games/${id}/`)
    return response.data
  }

  useEffect(() => {
    getGame().then((game: IGameInterfaceApi) => setGame(game))
  }, [])

  const handleTabsChange = (event, newValue) => {
    setCurrentTab(newValue)
  }

  return (
    <>
      <Box sx={{ width: '100%', ml: 3}}>
        <Box mt={3}>
          <Tabs 
            value={currentTab}
            onChange={handleTabsChange}
          >
            {tabs.map(tab => {
              return (
                <Tab key={tab.value} label={tab.label} value={tab.value}/>
              ) 
              })}
          </Tabs>
        </Box>
        <Divider />
        {game && (
          <Box sx={{ml: 3, mt: 3}}>
            {/* {currentTab === 'game' && <GameTab game={game} />} */}
            {currentTab === 'game' && <GameTab />}
            {currentTab === 'players' && <PlayersTab />}
            {currentTab === 'questions' && <QuestionsTab />}
          </Box>    
        )}
      </Box>
    </>
  )
}

export default index
  