import {
  CLIENT_ACTIONS,
  IStateAction,
  IStoreClient
}                   from './type'
import {TClient}    from '../../graphql/type_logic/types'

export const initialState : IStoreClient = {
  client: {} as TClient
}

export default  (state = initialState, action : IStateAction) : IStoreClient => {
  switch (action.type) {
    case CLIENT_ACTIONS.fetchClient:
      return ((state) => {
        const {payload} = action
        const {data} = payload
        return {
          ...state,
          client: data
        }
      })(state) as IStoreClient
    default:
      return state
  }

}