import {ACTIONS} from './type'
import {TUser}   from '../../graphql/type_logic/types'

export const redirectLink = (link : string) =>
  ({
    type: ACTIONS.setRedirectLink, payload: {
      data: link
    }
  })

export const setLoggedUser = (user : TUser) => ({
  type: ACTIONS.setUser, payload: {
    data: user
  }
})

export const clearLoggedUser = () => ({
  type: ACTIONS.clearUser
})
