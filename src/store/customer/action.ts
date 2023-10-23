import { TCustomer }        from '../../graphql/type_logic/types'
import { CUSTOMER_ACTIONS } from './type'

export const setFieldCustomerDashboard = (field: string, data: string | Date | TCustomer) => (dispatch: any) =>
  dispatch({
    type:CUSTOMER_ACTIONS.setFieldCustomerDashboard, payload:{
      field,
      data
    }
  })