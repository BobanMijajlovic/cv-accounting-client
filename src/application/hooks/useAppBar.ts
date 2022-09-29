import {
  useCallback,
  useEffect,
  useMemo,
  useState
}                             from 'react'
import {IButtonShortcutProps} from '../../components/Button/ButtonShortcut'
import {guid}                 from '../utils/Utils'

export interface IUseAppBarState {
  headerRendered ?: boolean
  currentButtonsId ?: string,
  buttonsForPage : IButtonShortcutProps[]
}

let listeners : any[] = []

let appBarState : IUseAppBarState = {
  headerRendered: false,
  buttonsForPage: []
}

export const useAppBar = (header ?: string) => {

  const [state, setState] : [IUseAppBarState, (r : IUseAppBarState) => void] = useState(appBarState)

  const triggerAllListeners = useCallback((data : IUseAppBarState) => {
    appBarState = data
    for (const l of listeners) {
      l(appBarState)
    }
  }, [])

  useEffect(() => {
    listeners.push(setState)
    if (header === 'header') {
      triggerAllListeners({
        ...appBarState,
        headerRendered: true
      })
    }
    return () => {
      listeners = listeners.filter(li => li !== setState)
    }
  }, [setState, triggerAllListeners, header])

  const headerRendered = useMemo(() => state.headerRendered, [state.headerRendered])

  const setButtonsForPage = useCallback((buttonsForPage : IButtonShortcutProps[]) : string => {
    if (!headerRendered) {
      return ''
    }
    const id = guid()
    triggerAllListeners({
      ...appBarState,
      buttonsForPage,
      currentButtonsId: id
    })
    return id
  }, [triggerAllListeners, headerRendered])

  const clearButtonsForPage = useCallback((id : string) => {
    if (id !== appBarState.currentButtonsId) {
      return
    }
    triggerAllListeners({
      ...appBarState,
      buttonsForPage: [],
      currentButtonsId: ''
    })
  }, [triggerAllListeners])

  return {
    appBarState: state,
    setButtonsForPage,
    clearButtonsForPage
  }

}
