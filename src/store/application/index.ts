import {
  ACTIONS,
  IApplicationStore,
  IStateAction
}              from './type'
import {TUser} from '../../graphql/type_logic/types'

export const initialState : IApplicationStore = {} as IApplicationStore

export default (state = initialState, action : IStateAction) : IApplicationStore => {
  switch (action.type) {
    case ACTIONS.setRedirectLink:
      return {
        ...state,
        redirectLink: action.payload.data as string
      }

    case ACTIONS.setUser:
      return {
        ...state,
        loggedUser: action.payload.data as TUser
      }

    case ACTIONS.clearUser:
      return {
        ...state,
        loggedUser: null
      }

    default:
      return state
  }
}
