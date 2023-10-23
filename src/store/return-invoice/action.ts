import { ACTIONS }   from './type'
import { TCustomer } from '../../graphql/type_logic/types'

export const removeReturnInvoiceTab = ( id : string ) => ( {
  type : ACTIONS.removeReturnInvoiceTab,
  payload : {
    id
  }
} )

export const addReturnInvoiceTab = ( id : string ) => ( dispatch : any ) =>
  dispatch( {
    type : ACTIONS.addReturnInvoiceTab,
    payload : {
      id
    }
  } )

export const setFieldReturnInvoiceDashboard = ( field : string, data : string | Date | TCustomer ) => ( dispatch : any ) =>
  dispatch( {
    type : ACTIONS.setFieldReturnInvoiceDashboard, payload : {
      field,
      data
    }
  } )