import { Divider, Tabs, Tab, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'

import Questions from './Questions'
import ScoreTable from './ScoreTable'
import Video from 'components/Video'
import Prize from './Prize'
import {API_URL} from 'config/constants'
import { IGameInterfaceApi } from 'interfaces/game-interface'

const tabs = [
  {value: 'video', label: 'Video'},
  {value: 'players', label: 'Players'},
  {value: 'questions', label: 'Questions'},
  {value: 'prize', label: 'Prize'},
]

interface IParamsInterface {
  id: string
}

const Game = () => {
  const { id } = useParams<IParamsInterface>();
  const [currentTab, setCurrentTab] = useState('players')
  const [game, setGame] = useState<IGameInterfaceApi | null>(null)

  const getGame = async () => {
    const response: AxiosResponse<IGameInterfaceApi> = await axios.get(`${API_URL}/game/games/${id}/`)
    return response.data
  }

  useEffect(() => {
    getGame().then(game => setGame(game))
  }, [])

  const handleTabsChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue)
  }

  return (
    <>
      <Box sx={{ marginLeft: '30px'}}>
        <Box>{game?.name}</Box>
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
          <Box mt={3}>
            {currentTab === 'players' && <ScoreTable />}
            {currentTab === 'questions' && <Questions questions={game.questions} url={game.url}/>}
            {currentTab === 'video' && <Video url={game.url}/>}
            {currentTab === 'prize' && <Prize />}
          </Box>    
        )}
      </Box>
    </>
  )
}

export default Game
