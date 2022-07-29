import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router'
import { FormikProvider, useFormik, Form } from 'formik'
import * as yup from 'yup'
import { motion } from 'framer-motion'
import { TextField, Box, InputAdornment, IconButton, Stack, FormControlLabel, Checkbox, Link } from '@mui/material'
import { Visibility, VisibilityOff  } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab'
import { Link as RouterLink } from 'react-router-dom'
import { toast } from 'react-toastify'


import AuthContext from 'context/AuthContext'

const validationSchema = yup.object({
  username: yup
    .string('Enter your username')
    .required('Username is required'),
  password: yup
    .string('Enter password')
    // .min(8, 'Password should be 8 char min')
    .required('Password is required')
})

const easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};

const LoginForm = () => {
  const { loginUser, user } = useContext(AuthContext)
  const [ showPassword, setShowPassword] = useState(false)
  const [ apiError, setApiError] = useState('')
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values)  => {
      setApiError('')
      const error = await loginUser(values)
      setApiError(error)
      setSubmitting(false)
    }
  })

  const { errors, touched , values, isSubmitting, handleSubmit, getFieldProps, setSubmitting} = formik

  if (user) {
    return (
      <Redirect to='/games' />
    )
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          component={motion.div}
          animate={{
            transition: {
              staggerChildren: 0.55,
            },
          }}
        >
          <Box 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3
            }}
            component={motion.div}
            initial={{opacty: 0, y: 40}}
            animate={animate}
          >
            <TextField
              fullWidth
              type='text'
              label='Username'
              {...getFieldProps('username')}
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
            />
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label='Password'
              {...getFieldProps('password')}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick = {() => setShowPassword(prev => !prev)}
                    >
                      {showPassword ? <Visibility/> : <VisibilityOff /> }
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box>
              {apiError}
            </Box>
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={animate}
          >
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              sx={{my: 2}}
            >
              <FormControlLabel 
                control={
                  <Checkbox
                    checked={false}
                    onClick={() => toast.error("Don't be old man, remember your stuff !", {
                        position: toast.POSITION.TOP_CENTER,                        
                      })
                    }
                  />
                }
                label="Remember me"
              />
              <Link
                component={RouterLink}
                variant='subtitle2'
                to='#'
                underline='hover'
              >
                Forgot password ?
              </Link>
            </Stack>
            <LoadingButton
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              loading={isSubmitting}
            >
              {isSubmitting? 'loading ...' : 'Login'}
            </LoadingButton>
          </Box>
        </Box>
      </Form>
    </FormikProvider>
  )

  // return (
  //   <div>
  //     <form onSubmit={formik.handleSubmit} className={styles.container}>
  //       <TextField 
  //         id='username'
  //         name='username'
  //         label='Username'
  //         value={formik.values.username}
  //         onChange={formik.handleChange}
  //         error={formik.touched.username && Boolean(formik.errors.username)}
  //       />
  //       <TextField 
  //         id='password'
  //         name='password'
  //         label='Password'
  //         value={formik.values.password}
  //         onChange={formik.handleChange}
  //         error={formik.touched.password && Boolean(formik.errors.password)}
  //       />
  //       <Button color='primary' variant='contained' type='submit'>
  //         Login
  //       </Button>
  //     </form>
  //   </div>
  // )
}

export default LoginForm
