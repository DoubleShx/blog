import axios from 'axios';;

const httpClient = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com/`,
  // withCredentials: true
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
