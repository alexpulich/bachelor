import { HTTP } from './common'

const ENDPOINT = '/routes/'

export const Routes = {
  set(route) {
    return HTTP.patch(ENDPOINT + route.id + '/', route)
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

  rating () {
    return HTTP.get(ENDPOINT + 'rating/').then(response => {
      return response.data
    })
  },

  pictures(routeId) {
    return HTTP.get(ENDPOINT + routeId + '/pictures/').then(response => {
      return response.data
    })
  },

  item (routeId) {
    return HTTP.get(ENDPOINT + routeId).then(response => {
      return response.data
    })
  },

  add(route) {
    return HTTP.post(ENDPOINT, route).then(response => {
      return response.data
    }).catch(error => {
      return error.response.data
    })
  }
}
