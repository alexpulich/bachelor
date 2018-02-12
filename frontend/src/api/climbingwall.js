import { HTTP } from './common'

export const Climbingwalls = {
  /*
  create (config) {
    return HTTP.post('/notes/', config).then(response => {
      return response.data
    })
  },
  delete (note) {
    return HTTP.delete(`/notes/${note.id}/`)
  },
  */
  list () {
    return HTTP.get('/climbing_walls/').then(response => {
      return response.data
    })
  }
}
