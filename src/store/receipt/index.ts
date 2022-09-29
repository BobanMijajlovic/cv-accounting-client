import {
  ACTIONS,
  IStateAction,
  IStoreReceipt
} from './type'

export const initialState : IStoreReceipt = {
  items: [],
  payments: []
}

export default (state = initialState, action : IStateAction) : IStoreReceipt => {
  switch (action.type) {
    case ACTIONS.removeItem:
      return ((state) => {
        const index = state.items.findIndex(x => x.id === action.payload.id)
        if (index === -1) {
          return state
        }
        const items = [...state.items]
        items.splice(index, 1)
        return {
          ...state,
          items:items
        }
      })(state)as IStoreReceipt

    case ACTIONS.removePayment:
      return ((state) => {
        const payments = state.payments.filter(x => x.type !== action.payload.id)
        return {
          ...state,
          payments
        }
      })(state)as IStoreReceipt
      
    case ACTIONS.addItem:
      return ((state) => {
        const {payload} = action
        const {data} = payload
        return {
          ...state,
          items: [
            ...state.items,
            data
          ]
        }
      })(state) as IStoreReceipt

    case ACTIONS.addPayment:
      return ((state) => {
        const {payload} = action
        const {data} = payload
        return {
          ...state,
          payments: [
            ...state.payments,
            data
          ]
        }
      })(state) as IStoreReceipt

    case ACTIONS.clearReceipt :
      return ((state) => {
        return {
          ...state,
          payments: [],
          items: []
        }
      })(state) as IStoreReceipt

    case ACTIONS.setFieldReceiptItem:
      return ((state) => {
        const {payload} = action
        const {id, field, data} = payload
        const index = state.items.findIndex(x => x.id === id)
        if (index === -1) {
          return {
            ...state
          } as any
        }

        const record = {
          ...state.items[index],
          [field as string]: data
        }
        const items = [...state.items]
        items[index] = record
        return {
          ...state,
          items: [...items]
        }
      })(state) as IStoreReceipt
    default:
      return state
  }
}

