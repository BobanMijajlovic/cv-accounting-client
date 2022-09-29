import {
  useDispatch,
  useSelector
} from 'react-redux'

import {createSelector} from 'reselect'
import {IReduxStore}    from '../index'
import {
  useEffect,
  useRef
}                       from 'react'
import {
  closeActiveDialogUI,
  openDialogUI
}                       from './action'
import {IDialogUI}      from './type'

const selectDialogId = createSelector(state => state.dialogsUI,
    (_ : any, id : string) => id,
    (dialogs, id) => dialogs.find((x : IDialogUI) => x.guid === id))

export const useDiagramOnce = (id : string) => {
  const dispatch = useDispatch()
  const {guid} = useSelector((state : IReduxStore) => selectDialogId(state, id)) || {}

  const opened = useRef(!!guid)

  useEffect(() => {
    return () => {
      if (!opened.current) {
        dispatch(closeActiveDialogUI(id))
      }
    }

  }, [dispatch, id])

  useEffect(() => {
    if (guid) {
      return
    }
    dispatch(openDialogUI(id))
  }, [id, guid, dispatch])

  return {
    opened: opened.current
  }
}
