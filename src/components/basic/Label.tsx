import React      from 'react'
import {IconProp} from '@fortawesome/fontawesome-svg-core'

interface ILabelProps {
  label : string,
  required ?: boolean,
  error ?: boolean | string
  classNames ?: string
  children ?:  IconProp | React.FunctionComponent
}

const Label = ({label, required, error, classNames,children} : ILabelProps) => {
  return (
    <label className={`hw-label${error ? ' error' : ''}${classNames ? ` ${classNames}` : ''}`}>
      <div className={'d-flex justify-content-between align-items-center w-100'}>
        <div> {label && label.length !== 0 ? label : <>&nbsp;</>} {required ? <small className={'required'}>*</small> : null}</div>
        <div>{children}</div>
      </div>
    </label>
  )
}

export default React.memo(Label)
