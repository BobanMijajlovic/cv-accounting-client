import {
  IActiveTabTrigger,
  ITabDefinition
} from '../../components/Tabs/Tabs'
import {IInvoiceDashboard} from '../invoice/type'

export enum ACTIONS {
  removeProformaInvoiceTab = 'PROFORMA_INVOICE_TAB_REMOVE',
  addProformaInvoiceTab = 'PROFORMA_INVOICE_TAB_ADD',
  setFieldProformaInvoiceDashboard = 'PROFORMA_INVOICE_DASHBOARD_SET_FIELD'
}

export interface IStateAction {
  type : ACTIONS,
  payload : {
    field ?: string,
    id ?: string
    data ?: string | any
  }
}

export interface IStoreProformaInvoice {
  proformaInvoiceTabs : ITabDefinition[]
  activeTab: IActiveTabTrigger,
  proformaInvoice : IInvoiceDashboard
}
