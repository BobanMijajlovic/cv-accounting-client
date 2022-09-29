import { TCustomer } from '../../graphql/type_logic/types'

export interface IFinanceTransferDocumentDashboard {
  customer? : TCustomer
  dateFrom? : string | Date
  dateTo? : string | Date
  status? : string
  flag? : string
}

export enum ACTIONS {
  setFieldFinanceTransferDocumentDashboard = 'FINANCE_TRANSFER_DOCUMENT_DASHBOARD_SET_FIELD',
}

export interface IStateAction {
  type : ACTIONS,
  payload : {
    field? : string
    id? : string
    data? : string | any
  }
}

export interface IStoreFinanceTransferDocument {
  financeTransferDocumentFilter : IFinanceTransferDocumentDashboard,
}