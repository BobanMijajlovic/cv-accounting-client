import React, {
  HTMLAttributes,
  PropsWithoutRef
}                        from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSquare}        from '@fortawesome/free-regular-svg-icons'

import {faCheckSquare} from '@fortawesome/free-solid-svg-icons'
import HelperText      from '../basic/HelperText'

export interface ICheckBoxProps extends PropsWithoutRef<HTMLAttributes<HTMLInputElement>> {
  'component-direction' ?: 'row' | 'column' | 'column-reverse' | 'row-reverse'
  label ?: string
  value ?:  boolean | string
  disabled ?: boolean
  helperText ?: string
  error ?: boolean | string
  classNames ?: string
  labelColor ?: 'primary'|'danger'|'grey'
  labelSize ?: 0|1|2|3|4|5
  labelClass ?: string
}

const CheckBox = (props : ICheckBoxProps) => {
  const {'component-direction': direction, value, label, classNames, onChange, disabled,helperText,error,labelColor,labelSize,labelClass} = props

  const onClickHandler = (e : React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      return
    }
    if (onChange) {
      const event = {
        persist: () => {},
        target: {
          value: !value as any
        }
      } as any
      onChange(event)
    }
  }

  return (
    <div className={`hw-check-box-root flex-direction-${direction}${error ? ' error' : ''}${classNames ? ` ${classNames}` : ''}${disabled ? ' hw-disabled' : ''}`}>
      <div className={`hw-check-box-data${disabled ? ' hw-disabled' : ''}${error ? ' error' : ''}`} onClick={onClickHandler}>
        <FontAwesomeIcon icon={faCheckSquare}
                                 className={`hw-check-box-icon ${value ? 'hw-visible' : 'hw-invisible'}`}/>
        <FontAwesomeIcon icon={faSquare}
                                 className={`hw-check-box-icon ${value ? 'hw-invisible' : 'hw-visible'}`}/>
      </div>
      <div className={`hw-check-box-label${labelColor ? ` ${labelColor}` : ''}${labelSize ? ` font-smaller-${labelSize}` : ''}${labelClass ? ` ${labelClass}` : ''}`}>
        {label}
      </div>
      {helperText ? <HelperText
          error={error}
          text={helperText}
      /> : null}
    </div>
  )
}

CheckBox.defaultProps = {
  'component-direction': 'row',
  labelColor: 'primary',
  labelSize: 3
}

export default CheckBox
