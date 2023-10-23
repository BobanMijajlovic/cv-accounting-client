import {
  ACTIONS,
  IReceiptItem,
  IReceiptPayment
} from './type'

export const removeItem = (id : string) =>
  ({
    type: ACTIONS.removeItem, payload: {
      id
    }
  })

export const removePayment = (id : string|number) => (dispatch : any, getState : any) =>
  dispatch({
    type: ACTIONS.removePayment, payload: {
      id
    }
  })

export const addItem = (data : IReceiptItem ) => (dispatch : any) =>
  dispatch({
    type: ACTIONS.addItem, payload: {
      data
    }
  })

export const addPayment = (data : IReceiptPayment ) => (dispatch : any) =>
  dispatch({
    type: ACTIONS.addPayment, payload: {
      data
    }
  })
export const setFieldReceiptItem = (id : string, field : string, data : any ) => (dispatch : any) =>
  dispatch({
    type: ACTIONS.setFieldReceiptItem, payload: {
      id,
      field,
      data
    }
  })

export const clearReceipt = ( ) => (dispatch : any) =>
  dispatch({
    type: ACTIONS.clearReceipt, payload: {}
  })

