import { createContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import jwt_decode from 'jwt-decode'

import { axiosInstance } from 'lib/axiosInstance'
import { extractJWTData } from 'utils/auth'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(extractJWTData())
  const [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
  const history = useHistory()
  const [loading, setLoading] = useState(true)

  const loginUser = async (formData) => {
    const response = await axiosInstance.post('/api/token', {
      'username': formData.username,
      'password': formData.password
    })
    if (response.status === 200) {
      const data = response.data
      setAuthTokens(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem('authTokens', JSON.stringify(data))
      // history.push('/games')
    } else if (response.status === 401){
      return 'Invalid credentials'
    } else {
      toast.error('OOOPS Something is wrong !')
    }
  }

  const logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    history.push('/login')
  }

  const updateToken = async () => {
    if (authTokens) {
      const response = await axiosInstance.post('/api/token/refresh', {
        'refresh': authTokens?.refresh
      })
      const data = response.data
      if (response.status === 200) {
        setAuthTokens(data)
        setUser(jwt_decode(data.access))
        localStorage.setItem('authTokens', JSON.stringify(data))
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
      if (authTokens) {
        updateToken()
      }
    }, fourMinutes)
    return () => clearInterval(interval)
  }, [authTokens, loading])

  const contextData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
  }

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
} 