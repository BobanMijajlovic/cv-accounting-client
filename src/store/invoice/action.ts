import { ACTIONS } from './type'
import {
  TCustomer,
  TInvoice,
}                  from '../../graphql/type_logic/types'

export const removeInvoiceTab = (id: string) =>
  ({
    type: ACTIONS.removeInvoiceTab, payload: {
      id
    }
  })

export const addInvoiceTab = (id: string) => (dispatch: any, getState: any) =>
  dispatch({
    type: ACTIONS.addInvoiceTab, payload: {
      id
    }
  })

export const setFieldInvoiceDashboard = (field: string, data: string | Date | TInvoice | TCustomer) => (dispatch: any) =>
  dispatch({
    type: ACTIONS.setFieldInvoiceDashboard, payload: {
      field,
      data
    }
  })

