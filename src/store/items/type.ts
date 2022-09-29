export enum ACTIONS {
  setFieldItemDashboard = 'ITEM_DASHBOARD_SET_FIELD'
}

export interface IStateAction {
  type: ACTIONS,
  payload: {
    field?: string,
    id?: string
    data?: string | any
  }
}

export interface IStoreItem {
  selectedId ?: string
  searchState ?: string
}