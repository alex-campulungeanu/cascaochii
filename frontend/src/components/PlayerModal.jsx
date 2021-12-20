import React from 'react'
import {Box,  Dialog, DialogContent, DialogTitle, DialogActions, Button, Grid, TextField, DialogContentText} from '@mui/material'
// import { useForm, Controller } from 'react-hook-form'
import {useFormik, Formik} from 'formik'
import * as yup from 'yup'

// const validationSchema = yup.object({
//   name: yup
//     .string('Enter the name')
//     .required('Name is required')
// })

const PlayerModal = ({open, onSubmit, handleClose, player}) => {
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
                id: !isNew ? player.id : '',
                name: !isNew ? player.name : '',
              }}
              validationSchema={yup.object().shape({
                name: yup.string().max(100).required('Name is required'),
              })}
              onSubmit={(values, actions) => handleSubmit(values, actions)}
            >
              {({ errors, handleChange, handleSubmit, isSubmitting, touched, values, resetForm }) => (
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
                      helperText={touched.name && errors.name}
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
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </Box>



    // <>
    //   <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
    //     <DialogTitle>Add player <b>{player.name}</b></DialogTitle>
    //     {/* <br /> */}
    //     <DialogContent>
    //       <form onSubmit={handleSubmit(onSubmit)} id="changeScoreForm">
    //         <TextField
    //           sx={{ display: 'none'}}
    //           value={player ? player.id : -1}
    //           {...register('id')}
    //         />
    //         <Controller
    //           name='name'
    //           control={control}
    //           type="number"
    //           defaultValue={player.score}
    //           render={({ field: { onChange, value }}) => {
    //             return (
    //               <Grid sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    //                 <TextField
    //                   sx={{width: '6rem'}}
    //                   type='text' 
    //                   // inputProps={{ inputMode: 'text', pattern: '[0-9]*' }} 
    //                   onChange={onChange}
    //                   value={value}
    //                 />
    //               </Grid>
    //             )
    //           }}
    //         />
    //       </form>
    //     </DialogContent>
    //     <DialogActions>
    //       <Grid container justifyContent='space-between'>
    //         <Button onClick={handleClose} color='secondary'>M-am razgandit</Button>
    //         <Button 
    //           onClick={handleClose}
    //           type="submit"
    //           form='changeScoreForm'
    //           color='primary'
    //           variant='contained'
    //         >
    //           Salveaza
    //         </Button>
    //       </Grid>
    //     </DialogActions>
    //   </Dialog>
    // </>
  )
}
export default PlayerModal
