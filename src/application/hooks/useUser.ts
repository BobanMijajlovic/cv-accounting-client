import {useCallback}         from 'react'
import {TUser}               from '../../graphql/type_logic/types'
import {useStateGlobalHooks} from './useStateGlobalHooks'

interface IUseUserState {
  selected ?: TUser
}

const useUserHook = 'useUserHook-4830-84390'

export const useUser = () => {

  const [state, setState] : [IUseUserState, (r : IUseUserState) => void] = useStateGlobalHooks<IUseUserState>(useUserHook)

  const setSelected = useCallback((selected : TUser) => {
    setState({
      ...state,
      selected
    })
  }, [state, setState])

  return {
    data: state,
    setSelected
  }
}
