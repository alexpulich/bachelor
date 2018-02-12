import { HTTP } from './common'

export const Routes = {
  list () {
    return HTTP.get('/routes/').then(response => {
      return response.data
    })
  },

  item (routeId) {
    return HTTP.get('/routes/' + routeId).then(response => {
      return response.data
    })
  },
}
