import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/system'
import { Divider, Tabs, Tab } from '@mui/material'
import axios from 'axios'

import {API_URL} from 'config/constants'
import GameTab from 'pages/GameCRUD/GameTab'
import PlayersTab from 'pages/GameCRUD/PlayersTab'
import QuestionsTab from 'pages/GameCRUD/QuestionsTab'

// TODO: change this into a verticla tab, for diversity

const tabs = [
  {value: 'game', label: 'Game detail'},
  {value: 'players', label: 'Players'},
  {value: 'questions', label: 'Questions'},
]

const index = () => {
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState('game')
  const [game, setGame] = useState(null)

  const getGame = async () => {
    const response = await axios.get(`${API_URL}/games/${id}/`)
    return response.data
  }

  useEffect(() => {
    getGame().then(game => setGame(game))
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
            {currentTab === 'game' && <GameTab game={game} />}
            {currentTab === 'players' && <PlayersTab />}
            {currentTab === 'questions' && <QuestionsTab />}
          </Box>    
        )}
      </Box>
    </>
  )
}

export default index
  