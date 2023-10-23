import {ACTIONS} from './type'

export const openActiveBackground = (unique : number, action ?: (data : any) => void) => (dispatch : any) =>
  dispatch({
    type: ACTIONS.openNewActiveBackground,
    payload: {
      unique,
      action
    }
  })

export const closeActiveBackground = (unique : number) => (dispatch : any) =>
  dispatch({
    type: ACTIONS.closeActiveBackground,
    payload: {
      unique
    }
  })
