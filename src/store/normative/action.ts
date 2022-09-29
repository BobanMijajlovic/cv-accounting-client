import {
  ACTIONS,
  INormativeSelected
} from './type'

export const setFieldNormativeDashboard = ( field : string, data : string | undefined ) => ( dispatch : any ) =>
  dispatch( {
    type : ACTIONS.setFieldNormativeDashboard,
    payload : {
      field,
      data
    }
  } )

export const setSelectedNormative = ( data : INormativeSelected | undefined) => ( dispatch : any ) =>
  dispatch( {
    type : ACTIONS.setSelectedNormative,
    payload : {
      data
    }
  } )

export const resetSelectedNormative = () => ( dispatch : any ) =>
  dispatch( {
    type : ACTIONS.resetSelectedNormative,
  } )