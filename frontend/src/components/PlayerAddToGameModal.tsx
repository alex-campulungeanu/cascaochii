import React from 'react'
import {Box,  Dialog, DialogContent, DialogTitle, DialogActions, Button, Grid, TextField, DialogContentText} from '@mui/material'
import {useFormik, Formik} from 'formik'
import * as yup from 'yup'


const PlayerModal = ({open, onSubmit, handleClose, player}) => {
  const isNew = player ? false : true

  const handleSubmit = (values) => {
    console.log(values)
    onSubmit(values)
    handleClose()
  }

  return (
      <Box>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose} fullWidth>
          <DialogTitle>
            {isNew ? 'Add player': `Update player`}
          </DialogTitle>
          <DialogContent>
            <Formik
              initialValues={{
                id: !isNew ? player.id : '',
                name: !isNew ? player.name : '',
              }}
              validationSchema={yup.object().shape({
                name: yup.string().max(100).required('Name is required'),
              })}
              onSubmit={(values, actions) => handleSubmit(values)}
            >
              {({ errors, handleChange, handleSubmit, isSubmitting, touched, values, resetForm }) => {
                return (
                <form onSubmit={handleSubmit}>
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1},
                    }}
                  >
                    <TextField
                      sx={{ display: 'none'}}
                      id="id"
                      name="id"
                      value={values.id}
                      onChange={handleChange}
                      // {...register('id')}
                    />
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Player name"
                      value={values.name}
                      onChange={handleChange}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && String(errors.name)}
                    />
                  </Box>
                  <DialogActions sx={{mt: 4}}>
                    <Grid container justifyContent='space-between'>
                      <Button onClick={handleClose} color='secondary'>CANCEL</Button>
                      <Button
                        // onClick={handleClose}
                        type="submit"
                        color='primary'
                        variant='contained'
                      >
                        Salveaza
                      </Button>
                    </Grid>
                  </DialogActions>
                </form>
              )}}
            </Formik>
          </DialogContent>
        </Dialog>
      </Box>
  )
}
export default PlayerModal
