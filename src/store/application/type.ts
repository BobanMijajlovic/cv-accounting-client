import {TUser} from '../../graphql/type_logic/types'

export interface IApplicationStore {
  redirectLink : string
  loggedUser ?: TUser | null
}

export enum ACTIONS {
  setUser = 'APPLICATION_SET_LOGGED_USER',
  clearUser = 'APPLICATION_CLEAR_LOGGED_USER',
  setRedirectLink = 'APPLICATION_SET_REDIRECT_LINK'
}

export interface IStateAction {
  type : ACTIONS,
  payload : {
    data ?: string | TUser
  }
}
