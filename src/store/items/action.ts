import { TItem }   from '../../graphql/type_logic/types'
import { ACTIONS } from './type'

export const setFieldItemDashboard = (field: string, data: string | Date | TItem) => (dispatch: any) =>
  dispatch({
    type:ACTIONS.setFieldItemDashboard, payload:{
      field,
      data
    }
  })