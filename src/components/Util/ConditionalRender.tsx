import React, {
  PropsWithChildren,
  useEffect,
  useState
} from 'react'

export interface IConditionalRendering extends PropsWithChildren<any> {
  condition: boolean
  placeHolder?: string
  timeout?: number
}

const ConditionalRendering = ({ condition, placeHolder, children, timeout = 0 }: IConditionalRendering) => {

  const [state, setState] = useState(condition)

  useEffect(() => {
    let refTh = 0
    if (condition) {
      setState(true)
      return
    }
    refTh = setTimeout(() => {
      setState(false)
    }, timeout)
    return () => {
      clearTimeout(refTh)
    }
  }, [condition, setState, timeout])

  if (!state) {
    return <>{placeHolder ? <span className={'opacity-2'}>{placeHolder}</span> : null}</>
  }
  return (
    <>
      {children}
    </>
  )
}

export default ConditionalRendering
