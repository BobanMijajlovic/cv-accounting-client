import React, {useRef}   from 'react'
import {
  useDispatch,
  useSelector
}                        from 'react-redux'
import {IReduxStore}     from '../index'
import {
  closeActiveBackground,
  openActiveBackground
}                        from './action'
import _ from 'lodash'

export const useActiveBackground = () => {

  const uniqueNumber = useRef<number>(0)
  const dispatch = useDispatch()
  const {activeBackgrounds} = useSelector((state : IReduxStore) => state.activeBackground)

  const activeBackground = React.useMemo(() => {
    return activeBackgrounds.find(x => x.unique === uniqueNumber.current)
  }, [activeBackgrounds])

  const openCloseActiveBackground = React.useCallback((open : boolean = false) => {
    if (open) {
      const unique = _.random(1, 99999999999)
      uniqueNumber.current = unique
      dispatch(openActiveBackground(unique))
    } else {
      dispatch(closeActiveBackground(uniqueNumber.current))
    }
  }, [dispatch])

  const isOpen = React.useMemo(() => {
    return activeBackground ? true : false
  }, [activeBackground])
  const zIndex = React.useMemo(() => {
    return activeBackground ? activeBackground.zIndex : 0
  }, [activeBackground])

  const style = React.useMemo(() => {
    if (!activeBackground) {
      return {}
    }
    return {
      zIndex: activeBackground.zIndex + 1
    }
  }, [activeBackground])

  return {
    activeBackground: activeBackgrounds,
    isOpen,
    zIndex,
    openCloseActiveBackground,
    style
  }
}

