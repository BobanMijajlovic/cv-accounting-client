import {
  TCustomer,
  TWarehouse,
  TWarehouseItemInfo
}                from '../../graphql/type_logic/types'
import {ACTIONS} from './type'

export const removeWarehouseFromArray = (id : string) =>
  ({
    type: ACTIONS.removeWarehouseFromArray, payload: {
      id
    }
  })

export const setFieldWarehouseDashboard = (id : string, field : string, data : string | Date | TWarehouse | TWarehouseItemInfo | TCustomer) => (dispatch : any) =>
  dispatch({
    type: ACTIONS.setFieldWarehouseDashboard, payload: {
      id,
      field,
      data
    }
  })

export const addWarehouseTabToArray = (id : string) => (dispatch : any, getState : any) =>
  dispatch({
    type: ACTIONS.addWarehouseTabToArray, payload: {
      id
    }
  })
