import {ACTIONS} from './type'
import {TTax}    from '../../graphql/type_logic/types'

export const fetchVats = (data : TTax[]) => ({
  type: ACTIONS.fetchVats, payload: {
    data
  }
})