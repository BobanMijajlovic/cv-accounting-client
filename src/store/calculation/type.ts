import {ITabDefinition} from '../../components/Tabs/Tabs'
import {TCustomer}      from '../../graphql/type_logic/types'

export interface ICalculationDashboard {
  supplier ?: TCustomer
  dateFrom ?: string | Date
  dateTo ?: string | Date
  status ?: string
}

export enum ACTIONS {
  removeCalculationTab = 'CALCULATION_TAB_REMOVE',
  addCalculationTab = 'CALCULATION_TAB_ADD',
  setFieldCalculationDashboard = 'CALCULATION_DASHBOARD_SET_FIELD',
  setActiveTab = 'CALCULATION_TABS_SET_ACTIVE'
}

export interface IStateAction {
  type : ACTIONS,
  payload : {
    field ?: string,
    id ?: string | number
    data ?: string | any
  }
}

export interface IStoreCalculation {
  calculationTabs : ITabDefinition[]
  activeTab : number
  calculation : ICalculationDashboard
}
