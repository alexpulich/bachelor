import { HTTP } from './common'

const ENDPOINT = '/competitions/'
const RESULTS_SUBENDPOINT = '/results/'
const RESULTS_ENDPOINT = '/competitionresults/'
const PARTICIPANT_ENDPOINT = '/competitionparticipants/'

export const Competitions = {
  participate (participant) {
    return HTTP.post(PARTICIPANT_ENDPOINT, participant).then(response => {
      return response.data
    }).catch(error => {
      return {errors: error.response.data}
    })
  },
  dismiss (participation_id) {
    return HTTP.delete(PARTICIPANT_ENDPOINT + participation_id + '/').
      then(response => {
        return response.data
      }).
      catch(error => {
        return {errors: error.response.data}
      })
  },

  item (id) {
    return HTTP.get(ENDPOINT + id + '/').then(response => {
      return response.data
    }).catch(error => {
      return {errors: error.response.data}
    })
  },
  results (id) {
    return HTTP.get(ENDPOINT + id + RESULTS_SUBENDPOINT).then(response => {
      return response.data
    }).catch(error => {
      return {errors: error.response.data}
    })
  },
  addResults(results) {
    return HTTP.post(RESULTS_ENDPOINT, results).then(response => {
      return response.data
    }).catch(error => {
      return { errors: error.response.data }
    })
  }
}
