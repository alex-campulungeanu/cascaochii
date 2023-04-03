import React from 'react'
import {Box,  Dialog, DialogContent, DialogTitle, DialogActions, Button, Grid, TextField, DialogContentText, Select, MenuItem, InputLabel} from '@mui/material'
import {useFormik, Formik} from 'formik'
import * as yup from 'yup'
import { IPlayerResponse } from 'interfaces/player-interface'

// const validationSchema = yup.object({
//   name: yup
//     .string('Enter the name')
//     .required('Name is required')
// })

interface IPlayerModalProps {
  open: boolean,
  onSubmit: (values: any) => any,
  handleClose: () => any,
  player: IPlayerResponse | null
}

const PlayerModal = ({open, onSubmit, handleClose, player}: IPlayerModalProps) => {
  const isNew = player ? false : true

  // const formik = useFormik({
  //   initialValues: {
  //     name: 'default name',
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: (values) => {
  //     // console.log(JSON.stringify(values, null, 2));
  //     console.log('submit changes')
  //   },
  // });

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
                id: !isNew ? player?.id : '',
                name: !isNew ? player?.name : '',
                active: !isNew ? player?.active : 1,
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
                    sx={{marginLeft: 1, marginTop: 2}}
                  >
                    <Box sx={{marginBottom: 1}}>
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
                    <Select
                      // labelId="demo-simple-select-label"
                      id="active"
                      name='active'
                      label="Status"
                      onChange={handleChange}
                      value={values.active}
                      variant="outlined"
                    >
                      <MenuItem value={1} key={1}>Active</MenuItem>
                      <MenuItem value={0} key={0}>Inactive</MenuItem>
                    </Select>
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
