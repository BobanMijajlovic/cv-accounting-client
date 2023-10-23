import {
  ACTIONS,
  IStateAction,
  IStoreItem
} from './type'

export const initialState: IStoreItem = {} as IStoreItem

export default (state = initialState,action: IStateAction) : IStoreItem => {
  switch (action.type) {
    case ACTIONS.setFieldItemDashboard:
      return ((state) => {
        const {payload} = action
        const {field, data} = payload
        return {
          ...state,
          [field as string]: data
        }
      })(state) as IStoreItem
    default:
      return state
  }
}