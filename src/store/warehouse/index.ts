import {
  ACTIONS,
  IStateAction,
  IStoreWarehouse
} from './type'

export const initialState : IStoreWarehouse = {
  warehouses: []
}

export default (state = initialState, action : IStateAction) : IStoreWarehouse => {
  switch (action.type) {

    case ACTIONS.removeWarehouseFromArray:

      return ((state) => {
        const index = state.warehouses.findIndex(x => x.warehouseId === action.payload.id)
        if (index === -1) {
          return state
        }
        const warehouses = [...state.warehouses]
        warehouses.splice(index, 1)
        return {
          ...state,
          warehouses
        }
      })(state)

    case ACTIONS.setFieldWarehouseDashboard:
      return ((state) => {
        const {payload} = action
        const {id: warehouseId, field, data} = payload
        const index = state.warehouses.findIndex(x => x.warehouseId === warehouseId)
        if (index === -1) {
          return {
            ...state,
            warehouses: [...state.warehouses, {warehouseId: payload.id, [field as string]: data}]
          } as any
        }

        const record = {
          ...state.warehouses[index],
          [action.payload.field as string]: action.payload.data
        }
        const warehouses = [...state.warehouses]
        warehouses[index] = record
        return {
          ...state,
          warehouses: [...warehouses]
        }
      })(state) as IStoreWarehouse

    case ACTIONS.addWarehouseTabToArray:
      return ((state) => {
        const index = state.warehouses.findIndex(x => x.warehouseId === action.payload.id)
        if (index !== -1) {
          return state
        }
        return {
          ...state,
          warehouses: [...state.warehouses, {
            warehouseId: action.payload.id
          }]
        } as IStoreWarehouse
      })(state)

    default:
      return state
  }
}
