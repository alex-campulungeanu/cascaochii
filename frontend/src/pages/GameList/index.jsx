import React, {useState, useEffect, useconte, useContext} from 'react'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Box, Button, Card, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow, Typography} from '@mui/material'
import {format, parseISO} from 'date-fns'

import {API_URL} from 'config/constants'
import AuthContext from 'context/AuthContext';
import { axiosInstance } from 'lib/axiosInstance';

const GameList = () => {
  const [games, setGames] = useState([])
  const { user } = useContext(AuthContext)

  const getAllGames = async () => {
    const response = await axiosInstance.get(`${API_URL}/game/games/`)
    return response.data
  }

  useEffect(() => {
    getAllGames().then(data => {
      setGames(data)
    })
  }, [])

  // TODO: add a confirmation modal
  const handleDeleteGame = async (id) => {
    console.log('Should delete with modal')
    // const response = await axiosInstance.delete(`${API_URL}/game/games/${id}/`)
    // if (response.status === 204) {
    //   getAllGames().then(data => setGames(data))
    // }
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
                    <Button component={Link} to={`/games/${game.id}/edit`} >
                      <SvgIcon fontSize='medium'>
                        <EditIcon />    
                      </SvgIcon>
                    </Button>
                    <Button onClick={() => handleDeleteGame(game.id)}>
                      <SvgIcon fontSize='medium'>
                        <DeleteIcon />    
                      </SvgIcon>
                    </Button>
                    <Button component={Link} to={`/games/${game.id}`} >
                      <SvgIcon fontSize='medium'>
                        <ArrowForwardIcon />    
                      </SvgIcon>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </Box>
    </div>
  )
}

export default GameList
