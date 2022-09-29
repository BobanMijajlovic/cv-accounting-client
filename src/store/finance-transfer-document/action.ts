import { TCustomer } from '../../graphql/type_logic/types'
import { ACTIONS }   from './type'

export const setFieldFinanceTransferDocumentDashboard = ( field : string, data : string | Date | TCustomer ) => ( dispatch : any ) =>
  dispatch( {
    type : ACTIONS.setFieldFinanceTransferDocumentDashboard,
    payload : {
      field,
      data
    }
  } )    

