import {TWarehouse} from '../../graphql/type_logic/types'
import {ACTIONS}    from './type'

export const setFieldWarehouseTransferDashboard = (field : string, data : string | Date  | TWarehouse ) => (dispatch : any) =>
  dispatch({
    type: ACTIONS.setFieldWarehouseTransferDashboard,
    payload: {
      field,
      data
    }
  })