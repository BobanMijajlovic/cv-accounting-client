import { ACTIONS } from './type'
import { TItem }   from '../../graphql/type_logic/types';

export const removeProductionOrderTab = ( id : string ) =>
  ( {
    type : ACTIONS.removeProductionOrderTab,
    payload : {
      id
    }
  } )

export const addProductionOrderTab = ( id : string ) =>
  ( {
    type : ACTIONS.addProductionOrderTab,
    payload : {
      id
    }
  } )

export const setFieldProductionOrderDashboard = ( field : string, data : string | Date | TItem ) => ( dispatch : any ) =>
  dispatch( {
    type : ACTIONS.setFieldProductionOrderDashboard, payload : {
      field,
      data
    }
  } )