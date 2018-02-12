import axios from 'axios'

export const HTTP = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
  // headers: {
  //   'Authorization': 'Token '+sessionStorage.getItem('token')
  // }
})

HTTP.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) config.headers.authorization = 'Token '+sessionStorage.getItem("token");
    return config;
  },
  error => Promise.reject(error));
