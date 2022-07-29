import React, {useState, useEffect} from 'react'
import { Button, Modal, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, Box } from '@mui/material';
import axios from 'axios'
import {useParams} from 'react-router-dom'

import PlayerModal from 'components/PlayerModal'
import {API_URL} from 'config/constants'

const PlayersTab = () => {
  const {id} = useParams()
  const [currentPlayer, setCurrentPlayer] = useState({})
  const [modalOpen, setModalOpen] = useState(false)
  const [players, setPlayers] = useState([])

  const getPlayers = async () => {
    const response =  await axios.get(`${API_URL}/game/${id}/players/`)
    return response.data
  }

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setModalOpen(false);
    }
  }

  const handleClickEdit = (player) => {
    setCurrentPlayer(player)
    setModalOpen(true);
  };
  
  const handleNewPlayer = () => {
    setCurrentPlayer(null)
    setModalOpen(true);
  }

  // TODO: add a popup when deleting success or failed
  const handleDelete = async (player) => {
    console.log(`delete player with id ${player.id}`)
    const playerId = player.id
    const response = await axios.delete(`${API_URL}/game/players/${playerId}/`);
    if (response.status === 204) {
      getPlayers().then(data => setPlayers(data))
    } else {
      console.log('Error occured when deleting player')
    }
  }

  useEffect(() => {
    getPlayers().then(data => setPlayers(data))
  }, [])

  const onSubmit = async (formData) => {
    console.log(formData.id)
    if (formData.id) {
      const data = {
        id: formData.id,
        name: formData.name,
        game: id 
      }
      const response = await axios.put(`${API_URL}/game/players/${data.id}/`, data);
    } else {
      const data = {
        name: formData.name,
        game: id 
      }
      const response = await axios.post(`${API_URL}/game/players/`, data);
    }
    getPlayers().then(data => setPlayers(data))
  }

  return (
    // TODO: move Add player button to end
    // TODO: change widith, it's not working when name is BIG
    <Box>
      <Box sx={{ 
        display: 'flex',
        mb: 2
      }}>
        <Button 
          variant="contained"
          color="secondary"
          onClick={() => handleNewPlayer()}
        >
          Add player
        </Button>
      </Box>
      <Paper sx={{width: '50%'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography>Name</Typography></TableCell>
              <TableCell><Typography>Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((item, i) => {
              return (
                <TableRow 
                  key={`${i}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{item.name}</TableCell>
                  {/* <TableCell>{item.score}</TableCell> */}
                  <TableCell>
                    <Button
                      onClick={() => handleClickEdit(item)}
                      color="secondary"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(item)}
                      color="secondary"
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
      
    <PlayerModal 
      player={currentPlayer}
      open={modalOpen}
      handleClose={handleClose}
      onSubmit={onSubmit}
    />

    </Box>
  )
}

export default PlayersTab
