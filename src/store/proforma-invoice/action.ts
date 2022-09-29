import {ACTIONS} from './type'
import {
  TInvoice,
  TCustomer,
} from '../../graphql/type_logic/types'

export const removeProformaInvoiceTab = (id : string) =>
  ({
    type: ACTIONS.removeProformaInvoiceTab, payload: {
      id
    }
  })

export const addProformaInvoiceTab = (id : string) => (dispatch : any, getState : any) =>
  dispatch({
    type: ACTIONS.addProformaInvoiceTab, payload: {
      id
    }
  })

export const setFieldProformaInvoiceDashboard = (field : string, data : string | Date | TInvoice | TCustomer) => (dispatch : any) =>
  dispatch({
    type: ACTIONS.setFieldProformaInvoiceDashboard, payload: {
      field,
      data
    }
  })

