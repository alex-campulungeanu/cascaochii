import { createContext, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import jwt_decode from 'jwt-decode'

import { axiosInstance } from 'lib/axiosInstance'
import { extractJWTData } from 'utils/auth'

interface IAuthContextData {
  loginUser: (formData: { username: string; password: string; }) => Promise<string>,
  logoutUser:() => void,
  registerUser: (formData: { username: string; password: string; }) => Promise<string>,
  user: {first_name: string, last_name: string } | null
}

const AuthContext = createContext<IAuthContextData | undefined>(undefined)

export default AuthContext

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw Error (' not able to create useAuth')
  }
  return context
}

export const AuthProvider = ({children}) => {
  // TOOD: i don't need user and userInfo variables
  const [user, setUser] = useState(extractJWTData())
  const history = useHistory()
  const [loading, setLoading] = useState(true)

  const loginUser = async (formData) => {
    const response = await axiosInstance.post('/accounts/login', {
      'username': formData.username,
      'password': formData.password
    })
    if (response.status === 200) {
      const data = response.data
      setUser(data)
      localStorage.setItem('userInfo', JSON.stringify(data))
      // history.push('/games')
      return 'Login success'
    } else if (response.status === 401){
      return 'Invalid credentials'
    } else {
      toast.error('OOOPS Something is wrong !')
      return 'OOOPS Something is wrong !'
    }
  }

  const registerUser = async (formData) => {
    const response = await axiosInstance.post('/accounts/register', {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      password: formData.password,
    })
    if (response.status === 200) {
      const data = response.data
      history.push('/games')
      return 'Register success'
    } else {
      return response.data.message
    }
  }

  const logoutUser = () => {
    setUser(null)
    localStorage.removeItem('userInfo')
    history.push('/login')
  }

  const updateToken = async () => {
    if (user) {
      const response = await axiosInstance.post('/accounts/token/refresh', {
        'refresh': user?.refresh
      })
      const data = response.data
      if (response.status === 200) {
        const newUser = {...user, access: data.access, refresh: data.refresh}
        setUser(newUser)
        localStorage.setItem('userInfo', JSON.stringify(newUser))
      } else {
        logoutUser()
      }
    }
    if (loading) {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (loading) {
      updateToken()
    }
    const fourMinutes = 1000 * 60 * 4
    const interval = setInterval(() => {
      if (user) {
        updateToken()
      }
    }, fourMinutes)
    return () => clearInterval(interval)
  }, [user, loading])

  const contextData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
    registerUser: registerUser,
  }

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
} 