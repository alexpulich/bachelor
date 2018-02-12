import { HTTP } from './common'

export const Climbingwalls = {
  list () {
    return HTTP.get('/climbingwalls/').then(response => {
      return response.data
    })
  }
}
