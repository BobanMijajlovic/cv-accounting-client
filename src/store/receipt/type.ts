import {TItem}              from '../../graphql/type_logic/types'
import {IDiscountSurcharge} from '../../application/components/calculation/views/InstanceView/items/DiscountForm'

export interface IReceiptItem {
  id : string
  item : TItem
  quantity : number | string
  price : number | string
  discount ?: IDiscountSurcharge
}

export interface IReceiptPayment {
  id : string
  type : number
  value : string
}

export enum ACTIONS {
  addItem = 'SALE_DASHBOARD_ADD_ITEM',
  removeItem = 'SALE_DASHBOARD_REMOVE_ITEM',
  addPayment = 'SALE_DASHBOARD_ADD_PAYMENT',
  removePayment = 'SALE_DASHBOARD_REMOVE_PAYMENT',
  setFieldReceiptItem = 'SALE_DASHBOARD_EDIT_ITEM',
  clearReceipt = 'SALE_DASHBOARD_CLEAR_RECEIPT'
}

export interface IStateAction {
  type : ACTIONS,
  payload : {
    field ?: string,
    id ?: string | number
    data ?: string | any
  }
}

export interface IStoreReceipt {
  items : IReceiptItem[]
  payments : IReceiptPayment[]
}
