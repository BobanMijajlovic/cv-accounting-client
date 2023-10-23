import React          from 'react'
import _              from 'lodash'
import SpinnerLoading from '../components/Spinner/SpinnerLoading'

export const slowImport = (value: any, ms = 1000): Promise<any> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(value)
    }, ms)
  })
}

export const ComponentLazy = (props: any) => {
  const {
    component,
    ...rest
  } = props
  const C = component
  return (_.get(component, '$$typeof') === Symbol.for('react.lazy')) ? <React.Suspense fallback={<SpinnerLoading classNames={'hw-spinner-center'}/>}><C {...rest}/></React.Suspense> : <C {...rest} />
}
