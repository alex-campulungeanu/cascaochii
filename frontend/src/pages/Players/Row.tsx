import React from 'react';
import { Card, Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography, Paper, Button, Tooltip, SvgIcon, Chip } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {format, parseISO} from 'date-fns'

import { IPlayerResponse } from 'interfaces/player-interface';


interface IRowProps {
  row: IPlayerResponse;
  handleDeleteConfirmation:  (player: IPlayerResponse) => void;
  handleEditPlayer: (player: IPlayerResponse) => void;
}

const getStatusType = (status) => {
  const map = {
    1: {
      text: 'ACTIVE',
      color: 'success'
    },
    0: {
      text: 'INACTIVE',
      color: 'error'
    }
  }
  const { text, color } = map[status]
  return (
    <Chip label={text} color={color} variant="outlined" />
  )
}

export default function Row({row, handleDeleteConfirmation, handleEditPlayer}: IRowProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{getStatusType(row.active)}</TableCell>
        <TableCell align="right">{row.games.length}</TableCell>
        <TableCell align="right">
          <Tooltip title="Edit">
            <Button onClick={() => handleEditPlayer(row)}>
              <SvgIcon fontSize='medium'>
                <EditIcon />    
              </SvgIcon> 
            </Button>
          </Tooltip>
          <Tooltip title="Delete">
            <span>
              <Button
                onClick={() => handleDeleteConfirmation(row)}
                disabled={row.games.length !== 0}
              >
                <SvgIcon fontSize='medium'>
                  <DeleteIcon />
                </SvgIcon>
              </Button>
            </span>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Game</TableCell>
                    <TableCell align="right">Score</TableCell>
                    {/* <TableCell align="right">Total price ($)</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.games.map((gameRow) => (
                    <TableRow key={gameRow.game_id}>
                      <TableCell component="th" scope="row">
                        {format(parseISO(gameRow.game_date), 'dd/MM/yyyy')}
                      </TableCell>
                      <TableCell>{gameRow.game_name}</TableCell>
                      <TableCell align="right">{gameRow.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}