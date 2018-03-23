import { HTTP } from './common'


export const Misc = {
  kinds() {
    return HTTP.get('/climbingkinds/').then(response => {
      return response.data
    })
  }
}
