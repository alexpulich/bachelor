import { HTTP } from './common'

const ENDPOINT = '/climbingwalls/';

export const Climbingwalls = {
  list () {
    return HTTP.get(ENDPOINT).then(response => {
      return response.data
    })
  },

  item (climbingWallId) {
    return HTTP.get(ENDPOINT + climbingWallId).then(response => {
      return response.data
    })
  },

  routes(climbingWallId) {
    return HTTP.get(ENDPOINT + climbingWallId + '/routes/').then(response => {
      return response.data
    })
  }
}
