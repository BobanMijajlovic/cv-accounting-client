import {
  ACTIONS,
  IDialogUI,
  IStateAction
} from './type'

export const initialState : IDialogUI[] = [] as IDialogUI[]

export default (state = initialState, action : IStateAction) : IDialogUI[] => {

  switch (action.type) {
    case ACTIONS.closeActiveDialog:
      return state.filter(x => x.guid !== action.payload.id)

    case ACTIONS.openNewDialog:
      return ((state) => {
        const {payload} = action
        const index = state.findIndex(x => `${x.guid}` === `${payload.id}`)
        if (index !== -1) {
          return state
        }
        return [...state, {
          guid: `${payload.id}`
        }]
      })(state)
    default:
      return state
  }

}
