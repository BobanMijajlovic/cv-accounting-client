import {
  ACTIONS,
  ICalculationDashboard,
  IStateAction,
  IStoreCalculation
}                       from './type'
import CalculationTable from '../../application/components/calculation/views/MainView/MainView'
import CalculationForm  from '../../application/components/calculation/views/InstanceView/Form'

const initSateTabs = {
  tabName: 'Calculations',
  tabContent: CalculationTable,
}

export const initialState : IStoreCalculation = {
  calculationTabs: [
    initSateTabs
  ],
  activeTab: 0,
  calculation: {} as ICalculationDashboard
}

export default (state = initialState, action : IStateAction) : IStoreCalculation => {
  switch (action.type) {
    case ACTIONS.removeCalculationTab:
      const index = state.calculationTabs.findIndex(x => x.id === action.payload.id)
      if (index !== -1) {
        return state
      }
      const calculationTabs = [...state.calculationTabs]
      calculationTabs.splice(index, 1)
      return {
        ...state,
        activeTab: 0,
        calculationTabs
      }

    case ACTIONS.setActiveTab:
      return {
        ...state,
        activeTab: action.payload.id as number
      }

    case ACTIONS.setFieldCalculationDashboard:
      return ((state) => {
        const {payload} = action
        const {field, data} = payload
        return {
          ...state,
          calculation: {
            ...state.calculation,
            [field as string]: data
          }
        }
      })(state) as IStoreCalculation

    case ACTIONS.addCalculationTab:
      return ((state) => {
        return {
          ...state,
          activeTab: Number(action.payload.id),
          calculationTabs: [initSateTabs, {
            tabName: 'Calculation Form',
            tabContent: CalculationForm,
            tabContentProps: {
              calculationId: action.payload.id
            }
          }]
        }
      })(state)
    default:
      return state
  }

}

