import { HTTP } from './common'

const ENDPOINT = '/climbingwalls/';
const SHORT = 'short/';

export const Climbingwalls = {
  set(climbingwall) {
    return HTTP.patch(ENDPOINT + climbingwall.id + '/', climbingwall)
    .then(response => {
      return response.data
    })
    .catch(error => {
      return {errors: error.response.data}
    })
  },

  list () {
    return HTTP.get(ENDPOINT).then(response => {
      return response.data
    })
  },

  short () {
    return HTTP.get(ENDPOINT + SHORT).then(response => {
      return response.data
    })
  },

  item (climbingWallId) {
    return HTTP.get(ENDPOINT + climbingWallId + '/').then(response => {
      return response.data
    })
  },

  routes(climbingWallId) {
    return HTTP.get(ENDPOINT + climbingWallId + '/routes/').then(response => {
      return response.data
    })
  }
}
