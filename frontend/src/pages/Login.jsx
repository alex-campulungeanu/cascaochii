import React from 'react'
import { Container, Divider, Typography } from '@mui/material'
import { motion } from 'framer-motion'

import LoginForm from 'components/LoginForm'
import * as styles from './Login.module.css'
import LoginLogo from 'components/LoginLogo'

const easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: {duration: 0.6, ease: easing}
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    }
  }
}

const Login = () => {
  return (
    <div className={styles.root}>
      <Container maxWidth='sm'>
        <div className={styles.content}>
          <motion.div className={styles.heading} {...fadeInUp}>
            <LoginLogo />
          </motion.div>
          <Divider sx={{my: 3}} component={motion.div} {...fadeInUp}>
            <Typography sx={{color: 'text.secondary'}}>
              Login to your account
            </Typography>
          </Divider>
          <LoginForm />
        </div>
      </Container>
    </div>
  )
}

export default Login



// import React, { useContext } from 'react'
// import { Redirect } from 'react-router'
// import { useFormik } from 'formik'
// import * as yup from 'yup'
// import { Button, TextField } from '@mui/material'

// import AuthContext from 'context/AuthContext'
// import * as styles from './Login.module.css'

// const validationSchema = yup.object({
//   username: yup
//     .string('Enter your username')
//     .required('Username is required'),
//   password: yup
//     .string('Enter password')
//     // .min(8, 'Password should be 8 char min')
//     .required('Password is required')
// })

// const Login = () => {
//   const { loginUser, user } = useContext(AuthContext)
//   const formik = useFormik({
//     initialValues: {
//       username: '',
//       password: ''
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values)  => {
//       loginUser(values)
//     }
//   })

//   if (user) {
//     return (
//       <Redirect to='/games' />
//     )
//   }

//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit} className={styles.container}>
//         <TextField 
//           id='username'
//           name='username'
//           label='Username'
//           value={formik.values.username}
//           onChange={formik.handleChange}
//           error={formik.touched.username && Boolean(formik.errors.username)}
//         />
//         <TextField 
//           id='password'
//           name='password'
//           label='Password'
//           value={formik.values.password}
//           onChange={formik.handleChange}
//           error={formik.touched.password && Boolean(formik.errors.password)}
//         />
//         <Button color='primary' variant='contained' type='submit'>
//           Login
//         </Button>
//       </form>
//     </div>
//   )
// }

// export default Login
