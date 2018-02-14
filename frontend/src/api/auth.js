import { HTTP } from './common'

export const Auth = {
  login (data) {
    return HTTP.post('/rest-auth/login/', data)

  }
}
