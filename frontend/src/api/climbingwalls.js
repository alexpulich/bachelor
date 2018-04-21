import { HTTP } from './common'

const ENDPOINT = '/climbingwalls/';
const PICTURES_ENDPOINT = '/climbingwallpictures/'
const SHORT = 'short/';
const COMPETITIONS = '/competitions/';

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
  },

  pictures(climbingwallId) {
    return HTTP.get(ENDPOINT + climbingwallId + '/pictures/').then(response => {
      return response.data
    })
  },

  competitions(climbingwallId) {
    return HTTP.get(ENDPOINT + climbingwallId + COMPETITIONS).then(response => {
      return response.data
    })
  },

  uploadPicture(picture) {
    return HTTP.post(PICTURES_ENDPOINT, picture).then(response => {
      return response.data
    }).catch(error => {
      return {errors: error.response.data}
    })
  },

  deletePicture(picture) {
    return HTTP.patch(PICTURES_ENDPOINT + picture.id + '/', picture).then(response => {
      return response.data
    }).catch(error => {
      return {errors: error.response.data}
    })
  }
}
