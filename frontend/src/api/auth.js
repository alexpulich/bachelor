import { HTTP } from './common'

export const Auth = {
  login (data) {
    return HTTP.post('/api-token-auth/', data).then(response => {
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
