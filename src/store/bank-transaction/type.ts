import { TCustomer } from '../../graphql/type_logic/types'
import {
  IActiveTabTrigger,
  ITabDefinition
}                    from '../../components/Tabs/Tabs'

export interface IBankTransactionDashboard {
  customer?: TCustomer
  dateFrom?: string | Date
  dateTo?: string | Date
  bankAccountId?: string
}

export enum ACTIONS {
  removeBankTransactionTab = 'BANK_TRANSACTION_TAB_REMOVE',
  addBankTransactionTab = 'BANK_TRANSACTION_TAB_ADD',
  setFieldBankTransactionDashboard = 'BANK_TRANSACTION_DASHBOARD_SET_FIELD',
  setSelectedBankTransactionItem = 'BANK_TRANSACTION_ITEM_SELECTED',
}

export interface IStateAction {
  type: ACTIONS,
  payload: {
    field?: string,
    id?: string | number
    data?: string | any
  }
}

export interface IStoreBankTransaction {
  bankTransaction: IBankTransactionDashboard,
  bankTransactionTabs: ITabDefinition[]
  activeTab: IActiveTabTrigger
  selectedBankTransactionItemId ?: string
}
