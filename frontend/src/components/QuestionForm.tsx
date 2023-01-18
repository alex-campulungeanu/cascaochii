import React from 'react'
import {Box, DialogActions, Button, Grid, TextField} from '@mui/material'
import {Formik} from 'formik'
import * as yup from 'yup'

const QuestionForm = ({question, onSubmit, onCancel, onDelete}) => {
  const isNew = question ? false : true

  const handleSubmit = (values) => {
    onSubmit(values)
  }

  const handleDelete = (values) => {
    onDelete(values)
  }

  const handleCancel = () => {
    onCancel()
  }

  return (
    <Formik
      initialValues={{
        id: !isNew ? question.id : '',
        name: !isNew ? question.name : '',
        info: !isNew ? question.info : '',
        body: !isNew ? question.body : '',
        video_timestamp: !isNew ? question.video_timestamp : '',
      }}
      validationSchema={yup.object().shape({
        name: yup.string().max(100).required('Name is required'),
        info: yup.string().max(100).required('Info is required'),
        body: yup.string().max(100).required('Body is required'),
        video_timestamp: yup.string().max(100).required('Timestamp is required'),
      })}
      onSubmit={(values, actions) => handleSubmit(values)}
    >
      {({ errors, handleChange, handleSubmit, isSubmitting, touched, values, resetForm }) => (
        <form onSubmit={handleSubmit}>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1},
              width: '70%'
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
            <Grid sx={{display: 'flex'}}>
              <Button 
                color='secondary'
                onClick={() => handleCancel()}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(values)}
                color='secondary'
                variant='contained'
                sx={{ml: 1}}
              >
                Delete
              </Button>
              <Button
                type="submit"
                color='secondary'
                variant='contained'
                sx={{ml: 1}}
              >
                Update
              </Button>
            </Grid>
          </DialogActions>
        </form>
      )}
    </Formik>
  )
}

export default QuestionForm