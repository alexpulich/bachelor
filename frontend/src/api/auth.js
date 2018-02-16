import { HTTP } from './common'

export const Auth = {
  login (data) {
    return HTTP.post('/rest-auth/login/', data).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  },
  registration(data) {
    return HTTP.post('/rest-auth/registration/', data).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  }
}
