import {useCallback}         from 'react'
import {TItem}               from '../../graphql/type_logic/types'
import {useStateGlobalHooks} from './useStateGlobalHooks'

interface IUseItemState {
  selected ?: TItem
}

const useItemHook = 'useItemHook-4830-84390'

export const useItem = () => {

  const [state, setState] : [IUseItemState, (r : IUseItemState) => void] = useStateGlobalHooks<IUseItemState>(useItemHook)

  const setSelected = useCallback((selected : TItem) => {
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
