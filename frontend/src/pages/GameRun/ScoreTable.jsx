import React, {useState, useRef, useMemo, useEffect} from 'react'
import { Button, Modal, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import axios from 'axios'
import {useParams} from 'react-router-dom'

import ChangeScorModal from 'components/ChangeScoreModal'
import {API_URL} from '../../config/constants'

const ScoreTable = () => {
  const {id} = useParams()
  const [open, setOpen] = React.useState(false);
  const [allPlayers, setAllPlayers] = useState([])
  const [currentPlayer, setCurrentPlayer] = useState({});

  const getAllPlayers = async () => {
    try {
      const response = await axios.get(`${API_URL}/${id}/players/`);
      console.log(response)
      return response.data;
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    getAllPlayers().then((data) => {
      setAllPlayers(data)
    })
  }, [])

  const handleClickOpen = (item) => {
    console.log(item)
    setCurrentPlayer(item)
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  }

  const onSubmit = async (formData) => {
    const data = {
      ...currentPlayer,
      score: formData.score
    }
    const response = await axios.put(`${API_URL}/players/${formData.id}/`, data);
    getAllPlayers().then((data) => setAllPlayers(data))
  }

  return (
    <>
      <Paper sx={{width: '30%'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography>Player</Typography></TableCell>
              <TableCell><Typography>Score</Typography></TableCell>
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
                  <TableCell component="th" scope="row">{item.name}</TableCell>
                  <TableCell>{item.score}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleClickOpen(item)}
                      color="secondary"
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
      
    <ChangeScorModal 
      currentPlayer = {currentPlayer}
      open={open}
      handleClose={handleClose}
      onSubmit={onSubmit}
    />

    </>
  )
}

export default ScoreTable
