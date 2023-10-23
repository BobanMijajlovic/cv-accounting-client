import {TClient}        from '../../graphql/type_logic/types'
import {CLIENT_ACTIONS} from './type'

export const fetchClient = (data : TClient) => ({
  type: CLIENT_ACTIONS.fetchClient, payload: {
    data
  }
})