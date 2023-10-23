import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef
}                                  from 'react'
import {guid}                      from '../../application/utils/Utils'
import {APP_BAR_KEYBOARD_LISTENER} from '../Button/ButtonHeaderComponent'
import _                           from 'lodash'
import {
  ID_APPLICATION_MAIN_DIV,
  ID_APPLICATION_SIDE_BAR,
  ID_APPLICATION_UP_BAR
}                                  from '../../application/layout/main'

export enum EVENTS {
  NewEvent = 'NewEvent',
  RemoveEvent = 'RemoveEvent'
}

interface IReducerAction {
  type: EVENTS,
  payload: KeyboardEvent

}

interface IDispatchListener {
  stopPropagation: boolean,
  dispatch: any
  keys?: string[],
  name?: string,
  refAtt?: string
}

let listeners: IDispatchListener[] = []

const reducer = (state: KeyboardEvent[], action: IReducerAction) => {
  switch (action.type) {
    case EVENTS.NewEvent:
      return [...state, action.payload]
    case EVENTS.RemoveEvent:
      return state.filter(x => x !== action.payload)
  }
}

/**
 *
 * @param eventHandler : handler to use for key event in component
 * @param stopPropagation : perform stopPropagation()
 * @param keys: list of keys code to react in handler, list is down
 *
 *   useExternalKeyboard((e:KeyboardEvent)=>{
 *        /// process event
 *   },false)
 *
 */
/** DOM that have this Attribute will first catch event
 *  just set ref={setRef} to that DOM,
 *  setRef is function that is got from this hook
 * */
export const ATTRIBUTE_KEYBOARD_HANDLER = 'ATTRIBUTE_KEYBOARD_HANDLER_USE_EXT'

export const ATTRIBUTE_KEYBOARD_ROOT_EMITTER = 'ATTRIBUTE_KEYBOARD_HANDLER_USE_ROOT_EMITTER'

export const useExternalKeyboardParentRoot = () => {

  const ref = useRef()

  const setRef = useCallback((data: any) => {
    if (!data || ref.current) {
      return
    }
    ref.current = data
    if (!data.hasAttribute(ATTRIBUTE_KEYBOARD_ROOT_EMITTER)) {
      data.setAttribute(ATTRIBUTE_KEYBOARD_ROOT_EMITTER, guid())
    }
  }, [])

  return {
    setRef
  }
}

const processListener = (listener: IDispatchListener, listeners: IDispatchListener[], event: KeyboardEvent) => {
  if ((!listener.keys || listener.keys.length === 0) && listener.stopPropagation) {
    listener.dispatch({
      type: EVENTS.NewEvent,
      payload: event
    })
    return true
  }

  const isKey = !(listener.keys || []).every((k) => !(event.key === k || event.code === k))
  const listenerIndex = listeners.findIndex(l => l === listener)
  if (isKey) {
    listeners.splice(listenerIndex, 1)
    listener.dispatch({
      type: EVENTS.NewEvent,
      payload: event
    })
    /** if stop propagation then  break */
    if (listener.stopPropagation) {
      return true
    }
  }
  return false
}

export const useExternalKeyboard = (eventHandler?: (event: KeyboardEvent)=> void, stopPropagation?: boolean, keys?: string[], name?: string) => {

  const [events, dispatch] = useReducer(reducer, [])
  const ref = useRef()
  const data = useMemo(() => {
    if (!eventHandler) {
      return null
    }
    const data = listeners.find(li => li.dispatch === dispatch)
    if (!data) {
      return {
        dispatch,
        stopPropagation: !!stopPropagation,
        keys,
        name,
        refAtt: (ref.current as any)?.getAttribute(ATTRIBUTE_KEYBOARD_HANDLER)
      }
    }

    const isSame = () => {
      if (!!stopPropagation !== data.stopPropagation) {
        return false
      }
      if (name || data.name) {
        if (name !== data.name) {
          return false
        }
      }
      if (keys || data.keys) {
        if (keys?.length !== data.keys?.length) {
          return false
        }
        if (!keys?.every((x, index) => data.keys?.[index] === x)) {
          return false
        }
      }

      if (ref.current) {
        const att = (ref.current as any)?.getAttribute(ATTRIBUTE_KEYBOARD_HANDLER)
        if (att !== data.refAtt) {
          return false
        }
      }
      return true
    }

    return isSame() ? data : {
      dispatch,
      stopPropagation: !!stopPropagation,
      keys,
      name,
      refAtt: (ref.current as any)?.getAttribute(ATTRIBUTE_KEYBOARD_HANDLER)
    }
  }, [stopPropagation, keys, name, eventHandler])

  useEffect(() => {
    if (!data) {
      return
    }
    const index = listeners.findIndex(f => f.dispatch === dispatch)
    if (index > -1) {
      listeners.splice(index, 1, data)
      return
    }
    if (!data.refAtt) {
      data.refAtt = (ref.current as any)?.getAttribute(ATTRIBUTE_KEYBOARD_HANDLER)
    }
    listeners.push(data)

  }, [data, dispatch])

  useEffect(() => {
    return () => {
      listeners = listeners.filter(li => li.dispatch !== dispatch)
    }
  }, [])

  useEffect(() => {
    if (!eventHandler || events.length === 0) {
      return
    }
    const ev = events[0]
    eventHandler(ev)
    dispatch({
      type: EVENTS.RemoveEvent,
      payload: ev
    })
  }, [eventHandler, events])

  const checkRealFocusOwner = (event: any) => {
    if (event.target !== document.body && event.target !== document.documentElement) {
      const sideBarRoot = document.getElementById(ID_APPLICATION_SIDE_BAR)
      const sideUpRoot = document.getElementById(ID_APPLICATION_UP_BAR)
      let target = event.target
      while (target && target !== document.body && target !== document.documentElement && target !== sideBarRoot && target !== sideUpRoot) {
        target = target.parentNode
      }
      if (target || target === document.body || target === document.documentElement) {
        return event.target
      }
    }

    /** check is in bar, or is in side bar and if yes then do i again */

    const elems = (document.getElementById('model-container-id')?.getElementsByClassName('class-document-modal-root') || [])
    if (elems.length > 0) {
      const dialog = elems[elems.length - 1]
      const activeElems = dialog.querySelectorAll(`[${ATTRIBUTE_KEYBOARD_HANDLER}]`)
      if (activeElems.length > 0) {
        const el = activeElems[0]
        if (!el.hasAttribute('tabIndex')) {
          el.setAttribute('tabIndex', `${_.random(9000, 900000)}`)
        }
        return el
      }
    }

    const elem = document.getElementById(ID_APPLICATION_MAIN_DIV)
    if (elem) {
      const activeElems = elem.querySelectorAll(`[${ATTRIBUTE_KEYBOARD_HANDLER}]`)
      if (activeElems.length > 0) {
        const el = activeElems[0]
        if (!el.hasAttribute('tabIndex')) {
          el.setAttribute('tabIndex', `${_.random(9000, 900000)}`)
        }
        return el
      }
    }

    return event.target
  }

  const dispatchKeyEvent = (event: KeyboardEvent) => {
    if (([...Array(12).keys() as any].map((x: any, i: number) => `F${i + 1}`)).indexOf(event.key) !== -1) {
      event.preventDefault()
    }

    const _listeners = [...listeners]

    let target: any = checkRealFocusOwner(event)
    const startTarget = target as any
    while (target && target !== document.body && target !== document.documentElement) {
      if (target.hasAttribute(ATTRIBUTE_KEYBOARD_HANDLER)) {
        const data = target.getAttribute(ATTRIBUTE_KEYBOARD_HANDLER)
        const listener = _listeners.find(l => l.refAtt === data)
        if (listener && processListener(listener, _listeners, event)) {
          return
        }
      }
      target = target.parentNode
    }

    const isDialogsOpen = (() => {
      const dialogRoot = document.getElementById('model-container-id')
      if (!dialogRoot) {
        return false
      }
      const elems = dialogRoot.querySelectorAll(`[${ATTRIBUTE_KEYBOARD_ROOT_EMITTER}]`)
      return elems?.length > 0
    })()

    const rootParent = (() => {
      let target = startTarget
      while (target && target !== document.body && target !== document.documentElement) {
        if (target.hasAttribute(ATTRIBUTE_KEYBOARD_ROOT_EMITTER)) {
          return target
        }
        target = target.parentNode
      }
      return null
    })()

    if (rootParent) {
      const list = Array.from(rootParent.querySelectorAll(`[${ATTRIBUTE_KEYBOARD_HANDLER}`))
      while (list.length > 0) {
        const elem = list.pop()
        const data = (elem as any).getAttribute(ATTRIBUTE_KEYBOARD_HANDLER)
        const listener = _listeners.find(l => l.refAtt === data)
        if (listener && processListener(listener, _listeners, event)) {
          return
        }
      }
    }

    /** if not stop propagation then inform all with no keys predefined */
    const len = _listeners.length
    for (let i = len - 1; i >= 0; i--) {
      const l = _listeners[i]
      if (l.keys && l.keys.length !== 0) {
        continue
      }
      l.dispatch({
        type: EVENTS.NewEvent,
        payload: event
      })
    }
    /** inform app  bar */
    if (isDialogsOpen) {
      return
    }
    const bar = _listeners.find(f => f.name === APP_BAR_KEYBOARD_LISTENER)
    if (bar) {
      bar.dispatch({
        type: EVENTS.NewEvent,
        payload: event
      })
    }
    return true
  }

  const setRef = useCallback((data: any) => {
    if (!data || ref.current) {
      return
    }
    ref.current = data
    if (!data.hasAttribute(ATTRIBUTE_KEYBOARD_HANDLER)) {
      const refId = guid()
      data.setAttribute(ATTRIBUTE_KEYBOARD_HANDLER, refId)
      const listener = listeners.find(f => f.dispatch === dispatch)
      if (listener) {
        listener.refAtt = refId
      }
    }
  }, [dispatch])

  return {
    dispatchKeyEvent,
    setRef,
    ref
  }
}

export const isKeyboardEvent = (e: KeyboardEvent, keys: string[]) => {
  return !keys.every((x => {
    return !(e.key === x || e.code === x)
  }))
}

export enum KeyboardEventCodes {
  ArrowDown = 'ArrowDown',
  ArrowUp = 'ArrowUp',
  Enter = 'Enter',
  Tab = 'Tab',
  Insert = 'Help',
  Esc = 'Escape',
  F1 = 'F1',
  F2 = 'F2',
  F3 = 'F3',
  F4 = 'F4',
  F5 = 'F5',
  F6 = 'F6',
  F7 = 'F7',
  F8 = 'F8',
  F9 = 'F9',
  F10 = 'F10',
  F11 = 'F11',
  F12 = 'F12',
  FANY = 'FANY KEY'
}

