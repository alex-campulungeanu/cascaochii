import React, { useState } from 'react'
import { Button, Container, Divider, Link, Typography } from '@mui/material'
import { motion } from 'framer-motion'

import LoginForm from 'components/LoginForm'
import styles from './Login.module.css'
import LoginLogo from 'components/LoginLogo'
import RegisterLogo from 'components/RegisterLogo'
import { easing, fadeInUp} from 'utils/animation'

const Login = () => {
  // TODO: maybe is better to have only a boolean isLogin(true | false)
  const [formType, setFormType] = useState('login')

  const toogleFormType = () => {
    setFormType(current => (current === 'register' ? 'login' : 'register'))
  }

  return (
    <div className={styles.root}>
      <Container maxWidth='sm'>
        <div className={styles.content}>
          <motion.div className={styles.heading} {...fadeInUp}>
            {formType === 'login' ? <LoginLogo /> : <RegisterLogo />}
          </motion.div>
          <Divider sx={{my: 3}} component={motion.div} {...fadeInUp}>
            <Typography sx={{color: 'text.secondary'}}>
            {formType === 'register' ? 'Create new account' : 'Login to your account'}
            </Typography>
          </Divider>
          <LoginForm formType={formType}/>
          <Typography
            component={motion.p}
            {...fadeInUp}
            variant='body2'
            align='center'
            sx={{mt: 3}}
          >
            {formType === 'register' ? "Have an account? ": "Don't have an account? "}
            <Button variant='contained' onClick={toogleFormType}>
              {formType === 'register' ? 'Login' : 'Sign up'}
            </Button>
          </Typography>
        </div>
      </Container>
    </div>
  )
}

export default Login
