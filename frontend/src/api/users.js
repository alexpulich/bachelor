import { HTTP } from './common'

const ENDPOINT = '/users/';

export const Users = {
  item (userId) {
    return HTTP.get(ENDPOINT + userId).then(response => {
      return response.data
    })
  },
  list (userId) {
    return HTTP.get(ENDPOINT).then(response => {
      return response.data
    })
  },
}
