const getLocalAccessToken = () => {
  const access = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') || '{}').access : null
  return access
}

const saveToken = (data) => {
  const token = localStorage.setItem('userInfo', JSON.stringify(data))
  return token
}

const extractJWTData = () => {
  const user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') || '{}') : null
  return user
}

export {
  saveToken,
  extractJWTData,
  getLocalAccessToken
}