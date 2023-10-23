import {
  IActiveTabTrigger,
  ITabDefinition
}                    from '../../components/Tabs/Tabs'
import { TCustomer } from '../../graphql/type_logic/types'

export interface IReturnInvoiceDashboard {
  customer? : TCustomer
  dateFrom? : string | Date
  dateTo? : string | Date,
  status? : string
}

export enum ACTIONS {
  removeReturnInvoiceTab = 'RETURN_INVOICE_TAB',
  addReturnInvoiceTab = 'RETURN_INVOICE_TAB_ADD',
  setFieldReturnInvoiceDashboard = 'RETURN_INVOICE_DASHBOARD_SET_FIELD'
}

export interface IStateAction {
  type : ACTIONS,
  payload : {
    field? : string
    id? : string
    data? : string | any
  }
}

export interface IStoreReturnInvoice {
  returnInvoiceTabs : ITabDefinition[]
  activeTab : IActiveTabTrigger,
  returnInvoice : IReturnInvoiceDashboard
}