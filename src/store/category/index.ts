import {
  CATEGORY_DASHBOARD,
  IStateAction,
  IStoreCategory
} from './type'

export const initialState : IStoreCategory = {
  expanded : ['1']
}

export default ( state = initialState, action : IStateAction ) : IStoreCategory => {
  switch ( action.type ) {
    case CATEGORY_DASHBOARD.setFieldCategoryDashboard:
      return ( ( state ) => {
        const { payload } = action
        const { field, data } = payload
        return {
          ...state,
          [field as string] : data
        }
      } )( state ) as IStoreCategory
    default:
      return state
  }
}