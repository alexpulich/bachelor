import axios from 'axios'

export const HTTP = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
})

HTTP.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) config.headers.authorization = 'JWT ' + sessionStorage.getItem("token");
    return config;
  },
  error => Promise.reject(error)
);

HTTP.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error.response.status == 401) {
      sessionStorage.removeItem('token');
    }
    return Promise.reject(error);
  });
