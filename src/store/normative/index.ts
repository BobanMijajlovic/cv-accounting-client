import {
  ACTIONS,
  IStateAction,
  IStoreNormative
} from './type'

export const initialState: IStoreNormative = {
  selectedNormative: []
} as IStoreNormative

export default (state = initialState,action: IStateAction) : IStoreNormative => {
  switch (action.type) {
    case ACTIONS.setFieldNormativeDashboard:
      return ((state) => {
        const {payload} = action
        const {field, data} = payload
        return {
          ...state,
          [field as string]: data
        }
      })(state) as IStoreNormative
    case ACTIONS.setSelectedNormative:
      return ((state) => {
        const {payload} = action
        const {data} = payload
        let selectedNormative = state.selectedNormative
        const index = state.selectedNormative.findIndex(x => x.id === data.id)
        if (index !== -1) {
          selectedNormative = selectedNormative.slice(index,selectedNormative.length)
        } else {
          selectedNormative = [
            data,
            ...state.selectedNormative,
          ]
        }
        
        return {
          ...state,
          selectedNormative
        }
      })(state) as IStoreNormative
    case ACTIONS.resetSelectedNormative:
      return ((state) => {
        return {
          ...state,
          selectedNormative: []
        }
      })(state) as IStoreNormative
    default:
      return state
  }
}