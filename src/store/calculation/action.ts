import {ACTIONS} from './type'
import {
  TCalculation,
  TCustomer
}                from '../../graphql/type_logic/types'

export const removeCalculationTab = (id : string) =>
  ({
    type: ACTIONS.removeCalculationTab, payload: {
      id
    }
  })

export const addCalculationTab = (id : string) =>
  ({
    type: ACTIONS.addCalculationTab, payload: {
      id
    }
  })

export const setActiveTabAction = (id : number) =>
  ({
    type: ACTIONS.setActiveTab, payload: {
      id
    }
  })

export const setFieldCalculationDashboard = (field : string, data : string | Date | TCalculation | TCustomer) => (dispatch : any) =>
  dispatch({
    type: ACTIONS.setFieldCalculationDashboard, payload: {
      field,
      data
    }
  })

