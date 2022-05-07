import axios from 'axios';
import { Notyf } from 'notyf'

const httpClient = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com/`,
  // withCredentials: true
});

let notyf = new Notyf()

httpClient.interceptors.response.use(response => {
  // Edit response config
  if (response.config.method === 'post' || response.config.method === 'put') {
    notyf.success('Successfully updated')
  }
  
  return response;
}, error => {
  const notyf = new Notyf()
  // console.log('config', error.config)

  if (!error.response) {
    notyf.error("No internet connection!")
  }

  if (parseInt(error.response?.status) === 422) {
    notyf.error(error.response.data.message)
  }

  if (parseInt(error.response?.status) === 401) {
    notyf.error(error.response.data.message)
    debouncedGetToken()
  }

  if (parseInt(error.response?.status) === 403) {
    notyf.error(error.response.data.message)
  }

  if (parseInt(error.response?.status) === 413) {
    notyf.error(error.response.data.message)
  }
  if (parseInt(error.response?.status) === 500) {
    notyf.error(error.response.data.message)
  }
  return Promise.reject(error);
});

export const httpGet = (params) => httpClient.request({
  method: 'get',
  ...params
});

export const httpPost = (params) => httpClient.request({
  method: 'post',
  ...params
})


export const httpDelete = (params) => httpClient({
  method: 'delete',
  ...params
});

export const httpPut = (params) => httpClient({
  method: 'put',
  ...params
});
