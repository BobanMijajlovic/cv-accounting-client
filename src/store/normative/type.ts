export enum ACTIONS {
  setFieldNormativeDashboard = 'NORMATIVE_DASHBOARD_SET_FIELD',
  setSelectedNormative = 'NORMATIVE_SET_SELECTED',
  resetSelectedNormative= 'NORMATIVE_RESET_SELECTED'
}

export interface IStateAction {
  type: ACTIONS,
  payload: {
    field?: string,
    id?: string
    data?: string | any
  }
}

export interface INormativeSelected {
  id: string
  label: string
}

export interface IStoreNormative {
  selectedId ?: string
  searchState ?: string
  selectedNormative : INormativeSelected[]
}