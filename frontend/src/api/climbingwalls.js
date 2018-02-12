import { HTTP } from './common'

export const Climbingwalls = {
  list () {
    return HTTP.get('/climbingwalls/').then(response => {
      return response.data
    })
  },

  item (climbingWallId) {
    return HTTP.get('/climbingwalls/' + climbingWallId).then(response => {
      return response.data
    })
  },

  routes(climbingWallId) {
    return HTTP.get('/climbingwalls/' + climbingWallId + '/routes/').then(response => {
      return response.data
    })
  }
}
