import {
  ACTIONS,
  IFinanceTransferDocumentDashboard,
  IStateAction,
  IStoreFinanceTransferDocument
} from './type'

const initialState: IStoreFinanceTransferDocument = {
  financeTransferDocumentFilter: {} as IFinanceTransferDocumentDashboard
}

export default ( state = initialState, action : IStateAction ) : IStoreFinanceTransferDocument => {
  switch ( action.type ) {
    case ACTIONS.setFieldFinanceTransferDocumentDashboard:
      return ( ( state ) => {
        const { payload } = action
        const { field, data } = payload
        return {
          ...state,
          financeTransferDocumentFilter : {
            ...state.financeTransferDocumentFilter,
            [field as string] : data
          }
        }
      } )( state ) as IStoreFinanceTransferDocument
    default:
      return state
  }
}
