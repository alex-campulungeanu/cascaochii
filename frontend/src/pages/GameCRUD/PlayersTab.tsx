import React, {useState, useEffect} from 'react'
import { Button, Modal, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, Box, Autocomplete, TextField, Grid, InputLabel, TableContainer, Card } from '@mui/material';
import axios, { AxiosResponse } from 'axios'
import {useParams} from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import PlayerModal from 'components/PlayerModal'
import {API_URL} from 'config/constants'
import { IPlayerGameResponse, IPlayerResponse } from 'interfaces/player-interface'
import { getPlayersForGame, assignPlayerOnGame, updatePlayerOnGame, getAllPlayersService } from 'services/players.service'

interface IParamsInterface {
  id: string
}

const PlayersTab = () => {
  const {id} = useParams<IParamsInterface>()
  const [players, setPlayers] = useState<IPlayerGameResponse[]>([])
  const [allPlayers, setAllPlayers] = useState<any[]>([])
  const [newPlayer, setNewPlayer] = useState<IPlayerResponse | null>(null)

  const getAllPlayers = async () => {
    const response: AxiosResponse<IPlayerResponse[]> = await getAllPlayersService()
    return response.data
  }

  const getPlayers = async () => {
    const response: AxiosResponse<IPlayerGameResponse[]> = await getPlayersForGame(id)
    return response.data
  }
  const handleAssignNewPlayer = async () => {
    const res = await assignPlayerOnGame(id, newPlayer)
    getPlayers().then(data => setPlayers(data))
    setNewPlayer(null)
  }

  // TODO: add a popup when deleting success or failed
  const handleDelete = async (player: IPlayerGameResponse) => {
    const playerId = player.player_id
    const response = await axios.delete(`${API_URL}/game/${id}/player/${playerId}/delete/`);
    if (response.status === 204) {
      const data = await getPlayers()
      setPlayers(data)
    } else {
      console.log(response)
      console.log('Error occured when deleting player')
    }
  }

  useEffect(() => {
    getPlayers().then(data => setPlayers(data))
    getAllPlayers().then(data => setAllPlayers(data))
  }, [])

  const handleChangePlayer = (value, newValue) => {
    setNewPlayer(newValue)
  }

  return (
    // TODO: move Add player button to end
    // TODO: change widith, it's not working when name is BIG
    <Box>
      <Box sx={{ 
        display: 'flex',
        mb: 2
      }}>
        {allPlayers && 
          <>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={allPlayers}
              value={newPlayer}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Player" />}
              onChange = {handleChangePlayer}
              getOptionLabel={(option: IPlayerResponse) => option.name}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleAssignNewPlayer()}
              startIcon={<AddIcon />}
              sx={{marginLeft: '15px'}}
              disabled={!newPlayer}
            >
              Add player
            </Button>
          </>
        }
      </Box>
      <Card component={Paper} sx={{ width: '30%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="200" align="left">Name</TableCell>
              <TableCell width="100" align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((item, i) => {
              return (
                <TableRow 
                  key={`${item.player_id}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{item.player_name}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDelete(item)}
                      color="secondary"
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </Box>
  )
}

export default PlayersTab
