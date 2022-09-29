export enum CATEGORY_DASHBOARD {
  setFieldCategoryDashboard = 'CATEGORY_DASHBOARD_SET_FIELD',
}

export interface IStateAction {
  type: CATEGORY_DASHBOARD,
  payload: {
    field?: string,
    id?: string
    data?: string | any
  }
}

export interface IStoreCategory {
  checked ?: string
  expanded : string[]
}