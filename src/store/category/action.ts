import { CATEGORY_DASHBOARD } from './type'

export const setFieldCategoryDashboard = (field: string, data: string | string[] | undefined) => (dispatch: any) =>
  dispatch({
    type:CATEGORY_DASHBOARD.setFieldCategoryDashboard,
    payload:{
      field,
      data
    }
  })