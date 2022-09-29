import ProductionOrderTable from '../../application/components/production-order/views/main/MainView'
import {
  ACTIONS,
  IProductionOrderDashboard,
  IStateAction,
  IStoreProductionOrder
}                     from './type'
import ProductionForm from '../../application/components/production-order/views/instance/ProductionForm'

const initStateTabs = {
  tabName : 'Production order',
  tabContent : ProductionOrderTable
}

export const initialState : IStoreProductionOrder = {
  productionOrderTabs : [initStateTabs],
  activeTab : {
    activeTab : 0,
    triggerChange : 0
  },
  productionOrder : {} as IProductionOrderDashboard
}

export default (state = initialState, action: IStateAction): IStoreProductionOrder => {
  switch (action.type) {
    case ACTIONS.removeProductionOrderTab:
      return ((state) => {
        const index = state.productionOrderTabs.findIndex(x => x.id === action.payload.id)
        if (index !== -1) {
          return state
        }
        const productionOrderTabs = [...state.productionOrderTabs]
        productionOrderTabs.splice(index,1)
        return {
          ...state,
          activeTab: {
            activeTab: 0,
            triggerChange: (new Date()).getTime()
          },
          productionOrderTabs
        }
      })(state)
    case ACTIONS.addProductionOrderTab:
      return ((state) => {
        return {
          ...state,
          activeTab: {
            activeTab: Number(action.payload.id),
            triggerChange: (new Date()).getTime()
          },
          productionOrderTabs : [
            {...initStateTabs},
            {
              tabName: 'Production Order Form',
              tabContent: ProductionForm,
              tabContentProps: {
                productionOrderId: action.payload.id
              }
            }
          ]
        }
      })(state) as IStoreProductionOrder
    case ACTIONS.setFieldProductionOrderDashboard:
      const { payload } = action
      const { field, data } = payload
      return {
        ...state,
        productionOrder: {
          ...state.productionOrder,
          [field as string]: data
        }  
      }
    default:
      return state
  }
}
