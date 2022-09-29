import {
  ACTIONS,
  IStateAction,
  IStoreWarehouseTransfer,
  IWarehouseTransferDashboard
} from './type'
const initialState : IStoreWarehouseTransfer = {
  transfer: {} as IWarehouseTransferDashboard
}

export default (state = initialState, action : IStateAction) : IStoreWarehouseTransfer => {
  switch (action.type) {
    case ACTIONS.setFieldWarehouseTransferDashboard:
      return ((state) => {
        const {payload} = action
        const {field, data} = payload
        return {
          ...state,
          transfer: {
            ...state.transfer,
            [field as string]: data
          }
        }
      })(state) as IStoreWarehouseTransfer

    default:
      return state
  }
}
