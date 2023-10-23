import {
  IActiveTabTrigger,
  ITabDefinition
}                    from '../../components/Tabs/Tabs'
import { TCustomer } from '../../graphql/type_logic/types'

export interface IInvoiceDashboard {
  customer?: TCustomer
  dateFrom?: string | Date
  dateTo?: string | Date,
  status?: string
}

export enum ACTIONS {
  removeInvoiceTab = 'INVOICE_TAB_REMOVE',
  addInvoiceTab = 'INVOICE_TAB_ADD',
  setFieldInvoiceDashboard = 'INVOICE_DASHBOARD_SET_FIELD'
}

export interface IStateAction {
  type: ACTIONS,
  payload: {
    field?: string
    id?: string
    data?: string | any
  }
}

export interface IStoreInvoice {
  invoiceTabs: ITabDefinition[]
  activeTab: IActiveTabTrigger,
  invoice: IInvoiceDashboard
}
