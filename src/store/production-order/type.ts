import {
  IActiveTabTrigger,
  ITabDefinition
}                from '../../components/Tabs/Tabs'
import { TItem } from '../../graphql/type_logic/types';

export interface IProductionOrderDashboard {
  item?: TItem
  dateFrom? : string | Date
  dateTo? : string | Date,
  status? : string
}

export enum ACTIONS {
  removeProductionOrderTab = 'PRODUCTION_ORDER_TAB_REMOVE',
  addProductionOrderTab = 'PRODUCTION_ORDER_TAB_ADD',
  setFieldProductionOrderDashboard = 'PRODUCTION_ORDER_DASHBOARD_SET_FIELD'
}

export interface IStateAction {
  type : ACTIONS,
  payload : {
    field? : string
    id? : string
    data? : string | any
  }
}

export interface IStoreProductionOrder {
  productionOrderTabs : ITabDefinition[],
  activeTab : IActiveTabTrigger,
  productionOrder : IProductionOrderDashboard
}