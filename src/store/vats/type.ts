import {TTax} from '../../graphql/type_logic/types'

export enum ACTIONS {
  fetchVats = 'FETCH_VATS'
}

export interface IStateAction {
  type : ACTIONS,
  payload : {
    field ?: string,
    id ?: string
    data ?: string | any
  }
}

export interface IStoreVats {
  vats : TTax[]
}