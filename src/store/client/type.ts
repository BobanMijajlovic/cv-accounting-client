import {TClient} from '../../graphql/type_logic/types'

export enum CLIENT_ACTIONS {
  fetchClient = 'FETCH_CLIENT'
}

export interface IStateAction {
  type : CLIENT_ACTIONS,
  payload : {
    field ?: string,
    id ?: string
    data ?: string | any
  }
}

export interface IStoreClient {
  client : TClient
}