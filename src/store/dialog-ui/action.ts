import {ACTIONS} from './type'

export const openDialogUI = (id : string) => (dispatch : any, getState : any) =>
  dispatch({
    type: ACTIONS.openNewDialog, payload: {
      id
    }
  })

export const closeActiveDialogUI  = (id : string) => (dispatch : any, getState : any) =>
  dispatch({
    type: ACTIONS.closeActiveDialog, payload: {
      id
    }
  })