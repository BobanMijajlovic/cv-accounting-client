import {TWarehouse} from '../../graphql/type_logic/types'

export interface IWarehouseTransferDashboard {
  toWarehouse ?: TWarehouse
  dateFrom ?: string | Date
  dateTo ?: string | Date
  status ?: string
}

export enum ACTIONS {
  setFieldWarehouseTransferDashboard = 'WAREHOUSE_TRANSFER_DASHBOARD_SET_FIELD',
}

export interface IStateAction {
  type : ACTIONS,
  payload : {
    field ?: string,
    id ?: string | number
    data ?: string | any
  }
}

export interface IStoreWarehouseTransfer {
  transfer : IWarehouseTransferDashboard
}