import {
  TCustomer,
  TWarehouse,
  TWarehouseItemInfo
} from '../../graphql/type_logic/types'

interface IWarehouseDashboardItem {
  selectedItemId ?: string,
  warehouseId : string,
  warehouse : TWarehouse,
  item ?: TWarehouseItemInfo
  customer ?: TCustomer
  dateFrom ?: string | Date
  dateTo ?: string | Date,
  financeDateFrom ?: string | Date,
  financeDateTo ?: string | Date
}

export enum ACTIONS {
  setFieldWarehouseDashboard = 'WAREHOUSE_DASHBOARD_SET_FIELD',
  removeWarehouseFromArray = 'WAREHOUSE_DASHBOARD_REMOVE_FROM_ARRAY',
  addWarehouseTabToArray = 'WAREHOUSE_TAB_ADD_TO_ARRAY'
}

export interface IStateAction {
  type : ACTIONS,
  payload : {
    field ?: string,
    id ?: string
    data ?: string | TWarehouse | TWarehouseItemInfo | TCustomer
  }
}

export interface IStoreWarehouse {
  warehouses : IWarehouseDashboardItem[]
}

