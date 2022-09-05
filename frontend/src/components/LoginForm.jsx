import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { FormikProvider, useFormik, Form } from 'formik'
import * as yup from 'yup'
import { motion } from 'framer-motion'
import { TextField, Box, InputAdornment, IconButton, Stack, FormControlLabel, Checkbox, Link, Alert } from '@mui/material'
import { Visibility, VisibilityOff  } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab'
import { Link as RouterLink } from 'react-router-dom'
import { toast } from 'react-toastify'

import AuthContext from 'context/AuthContext'
import { easing, animate } from 'utils/animation'

const LoginForm = ({formType}) => {
  const isLogin = formType === 'login'
  const isRegister = formType === 'register'
  const { loginUser, registerUser, user } = useContext(AuthContext)
  const [ showPassword, setShowPassword] = useState(false)
  const [ apiError, setApiError] = useState('')

  const validationSchema = yup.object({
    ...(isRegister && {firstName: yup
      .string('Enter your first name')
      .required('First name is required')}),
    ...(isRegister && {lastName: yup
      .string('Enter your last name')
      .required('Last name is required')}),
    username: yup
      .string('Enter your username')
      .required('Username is required'),
    password: yup
      .string('Enter password')
      // .min(8, 'Password should be 8 char min')
      .required('Password is required')
  })

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values)  => {
      setApiError('')
      if (isLogin) {
        const credentials = {
          username: values.username,
          password: values.password,
        }
        const error = await loginUser(credentials)
        setApiError(error)
      } else if (isRegister) {
        const credentials = {
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
          password: values.password,
        }
        const error = await registerUser(credentials)
        setApiError(error)
      }
      setSubmitting(false)
    }
  })

  const { errors, touched , values, isSubmitting, handleSubmit, getFieldProps, setSubmitting, setErrors, setValues} = formik

  useEffect(() => {
    setErrors({})
    setApiError('')
  }, [formType])

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
            {isRegister ? 
              (
                <Stack
                  // component={motion.div}
                  // initial={{ opacity: 0, y: 60 }}
                  // animate={animate}
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                >
                  <TextField 
                    fullWidth
                    label='First name'
                    {...getFieldProps('firstName')}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                  <TextField 
                    fullWidth
                    label='Last name'
                    {...getFieldProps('lastName')}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Stack>
              )
              :
              null
            }
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
              {apiError ? <Alert severity="warning">{apiError}</Alert> : null}
              <br />
            </Box>
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={animate}
          >
            {isLogin ?
              (
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
                        onClick={() => toast.error("Don't be an old man, remember your stuff !", {
                          position: toast.POSITION.TOP_CENTER,                        
                        })}
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
              )
              : null
            }
            <LoadingButton
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              loading={isSubmitting}
            >
              {isSubmitting? 'loading ...' : isLogin ? 'Login': 'Register'}
            </LoadingButton>
          </Box>
        </Box>
      </Form>
    </FormikProvider>
  )

}

export default LoginForm
