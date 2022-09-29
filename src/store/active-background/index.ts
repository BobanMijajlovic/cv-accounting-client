import {
  ACTIONS,
  IStateAction,
  IStoreActiveBackground
} from './type'

export const initialState : IStoreActiveBackground = {
  activeBackgrounds: []
}

export default (state = initialState, action : IStateAction) : IStoreActiveBackground => {

  switch (action.type) {
    default:
      return state

    case ACTIONS.openNewActiveBackground:

      return ((state) => {
        const index = state.activeBackgrounds.findIndex(x => x.unique === action.payload.unique)
        if (index !== -1) {
          return state
        }
        const zIndex = state.activeBackgrounds.reduce((acc, x) => {
          return acc <= x.zIndex ? (+x.zIndex) + 4 : acc
        },500)
        const {unique, action: actionFn} = action.payload
        return {
          activeBackgrounds: [...state.activeBackgrounds, {unique, action: actionFn, zIndex}]
        } as IStoreActiveBackground
      })(state)

    case ACTIONS.closeActiveBackground:

      return ((state) => {
        const {unique} = action.payload
        const index = state.activeBackgrounds.findIndex(x => x.unique === unique)
        if (index < 0) {
          return state
        }
        const backgrounds = [...state.activeBackgrounds]
        backgrounds.splice(index, 1)
        return {
          activeBackgrounds: [...backgrounds]
        } as IStoreActiveBackground
      })(state)
  }
}
