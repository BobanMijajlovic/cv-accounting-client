import {
  useCallback,
  useEffect,
  useRef
}             from 'react'
import {guid} from '../utils/Utils'

export const useBackground = (closeFn : () => void) => {

  const elemId = useRef('')

  const closeBackground = useCallback(() => {
    const elem = document.getElementById(elemId.current)
    if (elem) {
      document.body.removeChild(elem)
      closeFn()
      elemId.current = ''
    }
  }, [])

  const openBackground = useCallback(() => {
    const id = guid()
    const elemHolder = document.createElement('div')
    elemHolder.setAttribute('id', id)
    elemHolder.setAttribute('class', 'background-panel')
    elemHolder.addEventListener('click', () => {
      closeBackground()
    })
    document.body.appendChild(elemHolder)
    elemId.current = id
  }, [])

  useEffect(() => {
    return () => closeBackground()
  }, [closeBackground])

  return {
    openBackground,
    closeBackground
  }

}
