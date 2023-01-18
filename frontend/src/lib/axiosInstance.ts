import axios from 'axios'
import { toast } from 'react-toastify'

import { API_URL } from 'config/constants'
import { getLocalAccessToken } from 'utils/auth'

const customeInstance = axios.create({
  baseURL: API_URL,
});

const onRequest = (config) => {
  // const loggedUserJson = window.sessionStorage.getItem(STORAGE_USER_CONTAINER) || '{}'
  // const user = JSON.parse(loggedUserJson)
  const token = getLocalAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

const onRequestError = (error) => {
  return Promise.reject(error);
}

const onResponse = (response) => {
  if (response.status === 204) {
    toast.error('The server respond dramaticaly wrong !')
    return Promise.reject('The server respond dramaticaly wrong !')
  } else {
  return Promise.resolve(response);
  }
}

const onResponseError = (error) => {
  // const status = error.status || (error.response ? error.response.status : 0);
  const status = error.response ? error.response.status : 0;
  if (status === 403 || status === 401) {
    return error.response
    // return Promise.reject(error.response)
  }
  if (status === 500 || status === 502) {
    toast.error('Something is wrong !')
    return Promise.reject('Something whent wrong !');
  } else {
    console.log('Else error', error)
    const response = error.response
    return Promise.resolve(response);
  }
}

function setupAxiosInterceptors(axiosInstance) {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}

export const axiosInstance = setupAxiosInterceptors(customeInstance)