import {ACTIONS} from './type'
import {
  TBankAccount,
  TCustomer
} from '../../graphql/type_logic/types'

export const removeBankTransactionTab = (id: string) =>
  ({
    type: ACTIONS.removeBankTransactionTab, payload: {
      id
    }
  })

export const selectBankTransactionItem = (id: string|undefined) =>
  ({
    type: ACTIONS.setSelectedBankTransactionItem, payload: {
      id
    }
  })

export const addBankTransactionTab = (id: string) => (dispatch: any, getState: any) =>
  dispatch({
    type: ACTIONS.addBankTransactionTab, payload: {
      id
    }
  })

export const setFieldBankTransactionDashboard = (field : string, data : string | Date  | TCustomer | TBankAccount) => (dispatch : any) =>
  dispatch({
    type: ACTIONS.setFieldBankTransactionDashboard, payload: {
      field,
      data
    }
  })