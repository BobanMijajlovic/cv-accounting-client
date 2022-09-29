export enum CUSTOMER_ACTIONS {
  setFieldCustomerDashboard = 'CUSTOMER_DASHBOARD_SET_FIELD',

}

export interface IStateAction {
  type: CUSTOMER_ACTIONS,
  payload: {
    field?: string,
    id?: string
    data?: string | any
  }
}

export interface IStoreCustomer {
  selectedId ?: string
  searchState ?: string
  cardDateFrom ?: string|Date,
  cardDateTo ?: string|Date,
  paymentsDateFrom ?: string|Date,
  paymentsDateTo ?: string|Date
}