import { HTTP } from './common'

const ENDPOINT = '/users/';
const PROFILE_ENDPOINT = '/profiles/';
const ROUTES_ENDPOINT = '/routes/';

export const Users = {
  item (userId) {
    return HTTP.get(ENDPOINT + userId  + '/').then(response => {
      return response.data
    })
  },
  list () {
    return HTTP.get(ENDPOINT).then(response => {
      return response.data
    })
  },
  profile (profileId) {
    return HTTP.get(PROFILE_ENDPOINT + profileId + '/').then(response => {
      return response.data
    })
  },
  routes (userId) {
    return HTTP.get(ENDPOINT + userId + ROUTES_ENDPOINT).then(response => {
      return response.data
    })
  },
  set (user) {
    return HTTP.patch(PROFILE_ENDPOINT + user.id + '/', user)
    .then(response => {
      return response.data
    })
    .catch(error => {
      return {errors: error.response.data}
    })
  },

}
