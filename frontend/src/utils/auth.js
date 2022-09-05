import jwt_decode from 'jwt-decode'

const getLocalAccessToken = () => {
  const access = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null
  return access
}

const saveToken = (data) => {
  const token = localStorage.setItem('userInfo', JSON.stringify(data))
  return token
}

const extractJWTData = () => {
  const user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
  return user
}

export {
  saveToken,
  extractJWTData,
  getLocalAccessToken
}