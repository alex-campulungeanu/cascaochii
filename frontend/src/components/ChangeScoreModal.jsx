import React from 'react'
import { Dialog, DialogContent, DialogTitle, FormControl, DialogActions, Button, Grid, TextField } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'

// TODO: maybe i can find a better user experience when changing the score
const ChangeScoreModal = ({open, onSubmit, handleClose, currentPlayer}) => {
  const {register, control, handleSubmit} = useForm({
    mode: 'onSubmit',
    shouldUnregister: true
  })

  return (
    <>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Score for <b>{currentPlayer.name}</b></DialogTitle>
        {/* <br /> */}
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} id="changeScoreForm">
            <TextField
              sx={{ display: 'none'}}
              value={currentPlayer ? currentPlayer.id : -1}
              // type="hidden"
              {...register('id')}
            />
            <Controller
              name='score'
              control={control}
              type="number"
              defaultValue={currentPlayer.score}
              render={({ field: { onChange, value }}) => {
                return (
                  <Grid sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <TextField
                      sx={{width: '6rem'}}
                      type='number' 
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                      onChange={onChange}
                      value={value}
                    />
                  </Grid>
                )
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent='space-between'>
            <Button onClick={handleClose} color='secondary'>M-am razgandit</Button>
            <Button 
              onClick={handleClose}
              type="submit"
              form='changeScoreForm'
              color='primary'
              variant='contained'
            >
              Salveaza
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default ChangeScoreModal
