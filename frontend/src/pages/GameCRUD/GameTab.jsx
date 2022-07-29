import React, {useState, useEffect}from 'react'
import { Box } from '@mui/system';
import { Formik } from 'formik'
import * as Yup from 'yup'
import {Grid, Card, CardContent, TextField, Button} from '@mui/material'
import {makeStyles} from '@mui/styles'
import axios from 'axios'
import {useHistory, useParams} from 'react-router-dom'

import {DirectionSnackbar}  from 'components/DirectionSnackbar'
import {API_URL} from 'config/constants'

const useStyles = makeStyles((theme) => ({
  root: {},
  name: {
    width: '50%',
  },
  description: {
    width: '100%'
  },
  vendor: {
    width: 150,
  },
  vendorError: {
    width: 120
  }
}))

const GameForm = () => {
  const classes = useStyles()
  const history = useHistory()
  const [openSnack, setOpenSnack] = useState(false)
  const [game, setGame] = useState(null)
  const {id} = useParams()
  const isNew = id ? false: true

  const getGame = async () => {
    const response = await axios.get(`${API_URL}/game/games/${id}/`)
    return response.data
  }

  useEffect(() => {
    if (!isNew) {
      getGame().then(game => setGame(game))
    }
  }, [])

  const handleSubmitGame = async (values, actions) => {
    const postData = values
    if (isNew) {
      const response = await axios.post(`${API_URL}/game/games/`, postData)
      if (response.status === 201) {
        actions.resetForm()
        const newGameId = response.data.id
        history.push(`/games/${newGameId}/edit`)
        // setOpenSnack(true)
      } else {
        console.log('Some error when adding game')
      }
    } else {
      console.log('Update game', postData)
      const response = await axios.put(`${API_URL}/game/games/${id}/`, postData)
      console.log(response)
    }
  }

  if (!game && !isNew) return <div>Loading</div>

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      m: isNew ? 3 : ''
    }}>
      <Formik
        initialValues={{
          name: game ? game.name: '',
          url: game ? game.url: '',
          description: game ? game.description: '',
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(100).required('Name is required'),
          url: Yup.string().max(1024).required('URL is required'),
          description: Yup.string().max(5000),
        })}
        onSubmit={(values, actions) => handleSubmitGame(values, actions)}
      >
        {
          ({ errors, handleChange, handleSubmit, isSubmitting, touched, values, resetForm }) => (
            <form onSubmit={handleSubmit} >
              <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                  <Card>
                    <CardContent>
                      <TextField 
                        label="Game name" 
                        name="name" 
                        variant="outlined"
                        className={classes.name}
                        onChange={handleChange}
                        value={values.name}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                      />
                      <Box mt={3}>
                        <TextField 
                          fullWidth 
                          label="URL" 
                          name="url" 
                          variant="outlined"
                          onChange={handleChange}
                          value={values.url} 
                          error={Boolean(touched.url && errors.url)}
                          helperText={touched.url && errors.url}/>
                      </Box>
                      <Box mt={3}>
                        <TextField 
                          fullWidth 
                          label="Description" 
                          name="description" 
                          variant="outlined"
                          onChange={handleChange}
                          value={values.description} />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Box mt={3}>
                <Button color="secondary" variant="contained" type="submit" disabled={false}>
                  {isNew ? 'Create game' : 'Update game'}
                </Button>
              </Box>
              <DirectionSnackbar open={openSnack} message='Game created !' />
            </form>
          )
        }
      </Formik>
    </Box>
  )
}

export default GameForm
