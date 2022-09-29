import {
  CUSTOMER_ACTIONS,
  IStateAction,
  IStoreCustomer
} from './type'

export const initialState: IStoreCustomer = {}

export default (state = initialState, action: IStateAction): IStoreCustomer => {
  switch (action.type) {
    case CUSTOMER_ACTIONS.setFieldCustomerDashboard:
      return ((state) => {
        const {payload} = action
        const {field, data} = payload
        return {
          ...state,
          [field as string]: data
        }
      })(state) as IStoreCustomer
    default:
      return state
  }
}