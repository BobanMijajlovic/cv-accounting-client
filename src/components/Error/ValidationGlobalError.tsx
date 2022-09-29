import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faExclamationCircle,
  faTimes
}                        from '@fortawesome/free-solid-svg-icons'

interface IValidationGlobalErrorProps {
  error : boolean|string
  classNames ?: string
  resetFunction ?: () => void
  position ?: 'top' | 'top-right' | 'top-left' | 'bottom' | 'bottom-left' | 'bottom-right'
}

const ValidationGlobalError = ({error,classNames,resetFunction,position = 'top-right'} : IValidationGlobalErrorProps) => {
    
  return (
    <div className={`global-error ${position}${classNames ? ` ${classNames}` : ''}`}>
      <FontAwesomeIcon  icon={faExclamationCircle}/>
      <div>{error}</div>
      <FontAwesomeIcon  data-action={'validation-error-clear'} className={'cursor-pointer'} onClick={resetFunction}  icon={faTimes}/>
    </div>
  )
}

export default ValidationGlobalError