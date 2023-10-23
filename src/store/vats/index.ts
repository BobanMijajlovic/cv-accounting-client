import {ACTIONS,IStateAction,IStoreVats} from './type'
import {TTax}       from '../../graphql/type_logic/types'

export const initialState : IStoreVats = {
  vats: [] as TTax[]
}

export default  (state = initialState, action : IStateAction) : IStoreVats => {
  switch (action.type) {
    case ACTIONS.fetchVats:
      return ((state) => {
        const {payload} = action
        const {data} = payload
        return {
          ...state,
          vats: data
        }
      })(state) as IStoreVats
    default:
      return state
  }

}
