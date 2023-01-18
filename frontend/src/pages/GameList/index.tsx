import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Box, Button, Card, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography} from '@mui/material'
import {format, parseISO} from 'date-fns'
import { toast } from 'react-toastify';

import {API_URL} from 'config/constants'
import { useAuth } from 'context/AuthContext';
import { axiosInstance } from 'lib/axiosInstance';
import { IGameInterfaceApi } from 'interfaces/game-interface'
import { AxiosResponse } from 'axios';
import ConfirmationDeleteDialog from 'components/common/ConfirmationDialog'

const GameList = () => {
  const [games, setGames] = useState<IGameInterfaceApi[]>([])
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [currentGame, setCurrentGame] = useState<IGameInterfaceApi | null>(null)
  const { user } = useAuth()

  const getAllGames = async () => {
    const response: AxiosResponse<IGameInterfaceApi[]> = await axiosInstance.get(`${API_URL}/game/games/`)
    return response.data
  }

  useEffect(() => {
    getAllGames().then(data => {
      setGames(data)
    })
  }, [])

  const handleDeleteConfirmation = (game: IGameInterfaceApi) => {
    setCurrentGame(game)
    setOpenDelete(true)
  }

  // TODO: add a confirmation modal
  const handleDeleteGame = async () => {
    console.log('Should delete with modal')
    if (currentGame != null) {
      const response = await axiosInstance.delete(`${API_URL}/game/games/${currentGame.id}/`)
      if (response.status === 200) {
        getAllGames().then(data => setGames(data))
        toast.success('Game deleted !')
      } else {
        toast.error('Unable to delete the game !')
      }
    }
    setOpenDelete(false)
  }

  return (
    <div>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'row-reverse',
        m: 4 }}>
        <Button 
          variant="contained"
          component={Link}
          to="/games/create"
        >
          Add Game
        </Button>
      </Box>
      <Box 
        minWidth={1050}
        sx={{
          mx: 4
        }}
      >
        <Card>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> Game name </TableCell>
                <TableCell> Questions </TableCell>
                <TableCell> Players </TableCell>
                <TableCell> Status </TableCell>
                <TableCell> Create date </TableCell>
                <TableCell> Actions </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {games.map((game) => (
                <TableRow
                  hover
                  key={game.id}
                >
                  <TableCell>
                    <Box alignItems="center" display="flex" >
                      <Typography color="textPrimary" variant="body1" >
                        {game.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {game.questions.length}
                  </TableCell>
                  <TableCell>
                    {game.players.length}
                  </TableCell>
                  <TableCell>
                    active
                    {/* {getStatusType(game.active)} */}
                  </TableCell>
                  <TableCell>
                    {/* {moment(game.created_at).format('YYYY/MM/DD')} */}
                    {format(parseISO(game.created_at), 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <Button component={Link} to={`/games/${game.id}/edit`} >
                        <SvgIcon fontSize='medium'>
                          <EditIcon />    
                        </SvgIcon> 
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <Button onClick={() => handleDeleteConfirmation(game)}>
                        <SvgIcon fontSize='medium'>
                          <DeleteIcon />    
                        </SvgIcon>
                      </Button>
                    </Tooltip>
                    <Tooltip title="Play">
                      <Button component={Link} to={`/games/${game.id}`} >
                        <SvgIcon fontSize='medium'>
                          <ArrowForwardIcon />    
                        </SvgIcon>
                      </Button>
                      </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </Box>
      <ConfirmationDeleteDialog 
        title='Delete the game'
        content='Are you sure to delete ?'
        handleClose={() => setOpenDelete(false)}
        open={openDelete}
        handleYes={handleDeleteGame}
      />
    </div>
  )
}

export default GameList
