import jwt_decode from 'jwt-decode'

const getLocalToken = () => {
  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null
  return token
}

const saveToken = (data) => {
  const token = localStorage.setItem('authTokens', JSON.stringify(data))
  return token
}

const extractJWTData = () => {
  const user = localStorage.getItem('authTokens') ? jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access) : null
  return user
}

export {
  getLocalToken,
  saveToken,
  extractJWTData
}