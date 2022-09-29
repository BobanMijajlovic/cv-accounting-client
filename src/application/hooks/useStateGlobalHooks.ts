import {
  useCallback,
  useEffect,
  useState
} from 'react'

const listeners : any = {}
const staticObjects : any = {}

export const useStateGlobalHooks = <T>(name : string, initial ?: T) : [T, (r : T) => void] => {
  const [state, _setState] : [T, (r : T) => void] = useState({} as T)

  const setState = useCallback((data : T) => {
    staticObjects[name] = data
    listeners[name].forEach((l : any) => l(data))
  }, [name])
  useEffect(() => {
    !listeners[name] && (listeners[name] = [])
    const list = listeners[name]
    list.push(_setState)
    if (!staticObjects[name]) {
      staticObjects[name] = initial ? {...initial} : {}
    }
    _setState(staticObjects[name])
    return () => {
      listeners[name] = listeners[name].filter((li : any) => li !== _setState)
      if (listeners[name].length === 0) {
        staticObjects[name] = undefined
      }
    }
  }, [_setState, name, initial])

  return [state, setState]
}
