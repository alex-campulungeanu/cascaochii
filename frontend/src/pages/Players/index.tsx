import React, { useState, useEffect } from 'react';
import { Card, Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography, Paper, Button, Tooltip, SvgIcon } from '@mui/material'

import PlayerModal from 'components/PlayerModal';
import { getAllPlayersService, createPlayerService, updatePlayerService, deletePlayerService } from 'services/players.service'
import { IPlayerResponse } from 'interfaces/player-interface';
import ConfirmationDeleteDialog from 'components/common/ConfirmationDialog'
import Row from 'pages/Players/Row'

export default function PlayersTable() {
  const [ currentPlayer, setCurrentPlayer] = useState<IPlayerResponse | null>(null)
  const [ modalOpen, setModalOpen ] = useState(false)
  const [ players, setPlayers ] = useState<IPlayerResponse[]>([])
  const [ openDelete, setOpenDelete ] = useState(false)

  const getPlayers = async () => {
    const response = await getAllPlayersService()
    return response.data
  }

  const handleNewPlayer = () => {
    setCurrentPlayer(null)
    setModalOpen(true)
    console.log('open modal for new player')
  }

  const handleClickEdit = (player) => {
    console.log('editing new player')
    setCurrentPlayer(player)
    setModalOpen(true);
  };
  

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setModalOpen(false);
    }
  }

  const handleDeleteConf = (player: IPlayerResponse) => {
    setCurrentPlayer(player)
    setOpenDelete(true)
  }

  const handleDelete = async () => {
    if (currentPlayer) {
      console.log(`Delete player with id ${currentPlayer.id}`)
      const playerId = currentPlayer.id
      // TODO:  fix this any
      const response = await deletePlayerService(playerId)
      if (response.status === 200) {
        const data = await getPlayers()
        setPlayers(data)
      } else {
        console.log('Error occured when deleting player')
      }
    }
    setOpenDelete(false)
  }

  const onSubmit = async (formData) => {
    console.log(formData.id)
    if (formData.id) {
      const data = {
        name: formData.name,
        active: formData.active,
      }
      const response = await updatePlayerService(formData.id, data)
    } else {
      const data = {
        name: formData.name,
      }
      const response = await createPlayerService(data)
    }
    getPlayers().then(data => setPlayers(data))
  }

  useEffect(() => {
    getPlayers().then(data => setPlayers(data))
  }, [])

  return (
    <>
      <Box sx={{marginLeft: '10px'}}>
        <Button
          sx={{marginBottom: '10px'}}
          variant='contained'
          color='secondary'
          onClick={() => handleNewPlayer()}
        >
          Add player
        </Button>
        <Card component={Paper} sx={{ width: '80%' }}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell align="right">Active</TableCell>
                <TableCell align="right">Games played</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players.map((player) => (
                <Row 
                  key={player.name} 
                  row={player}
                  handleDeleteConfirmation = {handleDeleteConf}
                  handleEditPlayer = {handleClickEdit}
                />
              ))}
            </TableBody>
          </Table>
        </Card>
      </Box>
      <PlayerModal 
        player={currentPlayer}
        open={modalOpen}
        handleClose={handleClose}
        onSubmit={onSubmit}
      />
      <ConfirmationDeleteDialog 
        title='Delete the player'
        content='Are you sure to delete ?'
        handleClose={() => setOpenDelete(false)}
        open={openDelete}
        handleYes={handleDelete}
      />
    </>
  );
}