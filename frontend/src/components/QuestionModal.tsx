import React from 'react'
import {Box,  Dialog, DialogContent, DialogTitle, DialogActions, Button, Grid, TextField, DialogContentText} from '@mui/material'
// import { useForm, Controller } from 'react-hook-form'
import {useFormik, Formik} from 'formik'
import * as yup from 'yup'

import { IQuestionInterface } from 'interfaces/question-interface'

// TODO: fix handleClose: any
interface IQuestionModalProps {
  open: boolean,
  onSubmit: (values: any) => void,
  handleClose: any,
  question: IQuestionInterface | null,
}

const QuestionModal: React.FC<IQuestionModalProps> = ({open, onSubmit, handleClose, question}) => {
  const isNew = question ? false : true

  const handleSubmit = (values) => {
    onSubmit(values)
    handleClose()
  }
// TODO: use QuestionForm component inside modal
  return (
      <Box>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose} fullWidth>
          <DialogTitle>
            {isNew ? 'Add question': `Update question`}
          </DialogTitle>
          <br />
          <DialogContent>
            <Formik
              initialValues={{
                id: !isNew ? question?.id : '',
                name: !isNew ? question?.name : '',
                info: !isNew ? question?.info : '',
                body: !isNew ? question?.body : '',
                video_timestamp: !isNew ? question?.video_timestamp : '',
              }}
              validationSchema={yup.object().shape({
                name: yup.string().max(100).required('Name is required'),
              })}
              onSubmit={(values, actions) => handleSubmit(values)}
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
                    />
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="name"
                      value={values.name}
                      onChange={handleChange}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && String(errors.name)}
                    />
                    <TextField
                      fullWidth
                      id="info"
                      name="info"
                      label="info"
                      value={values.info}
                      onChange={handleChange}
                      error={touched.info && Boolean(errors.info)}
                      helperText={touched.info && String(errors.info)}
                    />
                    <TextField
                      fullWidth
                      id="body"
                      name="body"
                      label="body"
                      value={values.body}
                      onChange={handleChange}
                      error={touched.body && Boolean(errors.body)}
                      helperText={touched.body && String(errors.body)}
                    />
                    <TextField
                      fullWidth
                      id="video_timestamp"
                      name="video_timestamp"
                      label="timestamp"
                      value={values.video_timestamp}
                      onChange={handleChange}
                      error={touched.video_timestamp && Boolean(errors.video_timestamp)}
                      helperText={touched.video_timestamp && String(errors.video_timestamp)}
                    />
                  </Box>
                  <DialogActions sx={{mt: 4}}>
                    <Grid container justifyContent='space-between'>
                      <Button 
                        onClick={handleClose} 
                        color='secondary'
                      >
                        CANCEL
                      </Button>
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
  )
}
export default QuestionModal
