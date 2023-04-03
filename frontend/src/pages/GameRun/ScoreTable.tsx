import React, {useState, useRef, useMemo, useEffect} from 'react'
import { Button, Modal, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useParams} from 'react-router-dom'

// import ChangeScorModal from 'components/ChangeScoreModal'
import Podium from 'components/Podium/index'
import { IPlayerGameResponse } from 'interfaces/player-interface'
import { getPlayersForGame, updateGamePlayerDetails } from 'services/players.service'

interface IParamsInterface {
  id: string
}

const ScoreTable = () => {
  const {id} = useParams<IParamsInterface>()
  // const [open, setOpen] = React.useState(false);
  const [allPlayers, setAllPlayers] = useState<IPlayerGameResponse[]>([])
  // const [currentPlayer, setCurrentPlayer] = useState({});

  const getAllPlayers = async () => {
    try {
      const response: any = await getPlayersForGame(id);
      return response.data;
    } catch (e) {
      // TODO: how can i get the e.message without typescript yelling at me
      // https://timmousk.com/blog/typescript-try-catch/
      console.log(e)
      console.log('[+] Some error when fetching getAllPlayers')
    }
  };

  useEffect(() => {
    getAllPlayers().then((data) => {
      setAllPlayers(data)
    })
  }, [])

  // const handleClickOpen = (item) => {
  //   setCurrentPlayer(item)
  //   setOpen(true);
  // };
  
  const handleChangeScore = async (player: IPlayerGameResponse, quantity) => {
    const data = {
      ...player,
      score: player.score + quantity
    }
    // const response = await axios.put(`${API_URL}/game/players/${player.id}/`, data);
    const response = await updateGamePlayerDetails(id, data)
    const dbPlayers = await getAllPlayers()
    setAllPlayers(dbPlayers)
    // getAllPlayers().then((data) => setAllPlayers(data))
  }

  // const handleClose = (event, reason) => {
  //   if (reason !== 'backdropClick') {
  //     setOpen(false);
  //   }
  // }

  // const onSubmit = async (formData) => {
  //   const data = {
  //     ...currentPlayer,
  //     score: formData.score
  //   }
  //   const response = await axios.put(`${API_URL}/game/players/${formData.id}/`, data);
  //   getAllPlayers().then((data) => setAllPlayers(data))
  // }

  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <Paper sx={{width: '40%'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography>Player</Typography></TableCell>
              <TableCell><Typography>Score</Typography></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allPlayers.map((item, i) => {
              return (
                <TableRow 
                  key={`${i}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{item.player_name}</TableCell>
                  <TableCell>{item.score}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleChangeScore(item, -1)}
                      color="error"
                      startIcon={<RemoveIcon />}
                    >
                      Steal the cookie
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleChangeScore(item, 1)}
                      color="success"
                      endIcon={<AddIcon />}
                    >
                      Give a cookie
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vh'}}>
        <Podium players={allPlayers}/>
      </div>
    {/* <ChangeScorModal 
      currentPlayer = {currentPlayer}
      open={open}
      handleClose={handleClose}
      onSubmit={onSubmit}
    /> */}

    </div>
  )
}

export default ScoreTable
