import React, {
  useEffect,
  useMemo,
  useReducer,
  useRef
} from 'react'

import {omit as _omit} from 'lodash'

import {
  LocalStorage,
  STORAGE_TABLE_SETTINGS
}                          from '../../application/utils/LocalStorage'
import {ITableRowSettings} from '../Table'

enum TABLE_STATE_ACTIONS {
  CHANGE_VISIBILITY = 'CHANGE_VISIBILITY',
  CHANGE_WIDTH = 'CHANGE_WIDTH',
  SET_REF = 'SET_REF'
}

export interface IReducerAction {
  type : TABLE_STATE_ACTIONS.CHANGE_VISIBILITY | TABLE_STATE_ACTIONS.CHANGE_WIDTH | TABLE_STATE_ACTIONS.SET_REF,
  payload : {
    field ?: string,
    visible ?: boolean,
    width ?: number
    resize ?: number
    ref ?: React.Ref<HTMLElement>
  }
}

interface ITableHeaderRefs {
  ref : React.Ref<HTMLElement>,
  field : string
}

interface ITableSettingsReducer {
  settings : ITableRowSettings[]
  refs : ITableHeaderRefs[]
}

const _changeVisibility = (state : ITableSettingsReducer, field : string, visible : boolean) : ITableSettingsReducer => {
  const index = state.settings.findIndex(x => x.field === field)
  if (index === -1) {
    return {
      refs: state.refs,
      settings: [
        ...state.settings,
        {
          field,
          notVisible: !visible
        }
      ]
    }

  }
  const set = state.settings[index]
  const array = [...state.settings]
  let obj = {
    ...set,
    notVisible: !visible
  }

  if (!visible) {
    obj = _omit(obj, ['width']) as any
  } else {
    obj = _omit(obj, ['notVisible']) as any
  }
  array.splice(index, 1, obj)
  return {
    refs: state.refs,
    settings: array
  }
}

const _setRef = (state : ITableSettingsReducer, field : string, ref : React.Ref<HTMLElement>) : ITableSettingsReducer => {
  const index = state.refs.findIndex(x => x.field === field)

  const setting = state.settings.find(x => x.field === field)
  if (!setting) {
    return state
  }

  if (setting.width && setting.width > 45) {
    (ref as any).current.width = setting.width
  }

  if (index === -1) {
    return {
      settings: state.settings,
      refs: [...state.refs, {
        field,
        ref
      }]
    }
  }

  const array = [...state.refs]
  array.splice(index, 1, {
    field,
    ref
  })
  return {
    refs: array,
    settings: state.settings
  }

}

const _changeWidth = (state : ITableSettingsReducer, field : string, resize : number) : ITableSettingsReducer => {
  if (resize < 0) {
    resize++
  } else {
    resize--
  }
  const index = state.settings.findIndex(x => x.field === field)
  if (index === -1) {
    return state
  }

  const settings = [...state.settings]
  const indexSettings = settings.findIndex(x => x.field === field)
  if (indexSettings === -1) {
    return state
  }

  const dataIndex = state.refs.findIndex(x => x.field === field)
  if (dataIndex === -1) {
    return state
  }

  const data = state.refs[dataIndex]
  if (!data.ref) {
    return state
  }
  let width = (data.ref as any).current.width ? +(data.ref as any).current.width : +(data.ref as any).current.offsetWidth

  width += resize
  if (width < 45) {
    return state
  }

  const nextSettingsColumn = settings.findIndex((x, i) => i > index && !x.notVisible)
  let nextSettingWidth = 0

  if (nextSettingsColumn !== -1) {
    const s = state.settings[nextSettingsColumn]
    const nextRef = state.refs.find(x => x.field === s.field)
    if (nextRef) {
      nextSettingWidth = (nextRef.ref as any).current.width ? +(nextRef.ref as any).current.width : +(nextRef.ref as any).current.offsetWidth
      nextSettingWidth -= resize
      if (nextSettingWidth < 45) {
        width = 0
      } else {
        (nextRef.ref as any).current.width = nextSettingWidth
      }
    }
  }
  if (width < 45) {
    return state
  }

  (data.ref as any).current.width = width
  const sett = settings[indexSettings]
  settings.splice(index, 1, {
    ...sett,
    width
  })

  if (nextSettingWidth !== 0) {
    const sett = settings[nextSettingsColumn]
    settings.splice(nextSettingsColumn, 1, {
      ...sett,
      width: nextSettingWidth
    })
  }

  return {
    refs: state.refs,
    settings
  }
}

const tableReducer = (state : ITableSettingsReducer, action : any) : ITableSettingsReducer => {
  switch (action.type) {
    case TABLE_STATE_ACTIONS.CHANGE_VISIBILITY:
      return _changeVisibility(state, action.payload.field, action.payload.visible)
    case TABLE_STATE_ACTIONS.CHANGE_WIDTH:
      return _changeWidth(state, action.payload.field, action.payload.resize)
    case TABLE_STATE_ACTIONS.SET_REF:
      return _setRef(state, action.payload.field, action.payload.ref)

    default:
      return state
  }

}

export const useTableSettings = (name : string, settingsTable : ITableRowSettings[]) => {

  const refThread = useRef<any>()
  const initialData = React.useMemo(() => {
    const data = LocalStorage.getData(STORAGE_TABLE_SETTINGS, name)
    if (!data) {
      return {
        settings: settingsTable,
        refs: []
      }
    }

    return {
      settings: data,
      refs: []
    }

  }, [name, settingsTable])

  const reducer = useMemo(() => tableReducer, [])
  const [state, dispatch] : [ITableSettingsReducer, (s : IReducerAction) => void] = useReducer(reducer, initialData as ITableSettingsReducer)

  useEffect(() => {
    clearInterval(refThread.current)
    refThread.current = setTimeout(() => {
      LocalStorage.saveData(state.settings, STORAGE_TABLE_SETTINGS, name)
    }, 1000)

  }, [state.settings, name])

  const changeVisibility = React.useCallback((field : string, visible : boolean) => {
    dispatch({
      type: TABLE_STATE_ACTIONS.CHANGE_VISIBILITY,
      payload: {
        field,
        visible
      }
    })
  }, [dispatch])

  const changeWidth = React.useCallback((field : string, resize : number) => {
    dispatch({
      type: TABLE_STATE_ACTIONS.CHANGE_WIDTH,
      payload: {
        field,
        resize
      }
    })
  }, [dispatch])

  const setRef = React.useCallback((field : string, ref : React.Ref<HTMLElement>) => {
    dispatch({
      type: TABLE_STATE_ACTIONS.SET_REF,
      payload: {
        field,
        ref
      }
    })
  }, [dispatch])

  return {
    tableSettingsState: state.settings,
    changeVisibility,
    changeWidth,
    setRef
  }
}

