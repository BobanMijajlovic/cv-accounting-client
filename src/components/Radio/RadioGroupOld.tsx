import React, {
  HTMLAttributes,
  PropsWithChildren,
}                 from 'react'
import HelperText from '../basic/HelperText'
import Label      from '../basic/Label'

export interface IRadioGroupProps extends PropsWithChildren<HTMLAttributes<HTMLElement>> {
  label ?: string
  value ?: string | number
  error ?: string | boolean
  required ?: boolean
  helperText ?: string
  'component-direction' ?: 'row' | 'column'
  'align-items' ?: 'center' | 'start' | 'end'
}

const RadioGroup = ({children, required, label, error, helperText, 'align-items': alignItems, 'component-direction': direction, onChange, value, className} : IRadioGroupProps) => {

  const radioChangedHandler = (value ?: string | number) => {
    if (onChange) {
      const event = {
        persist: () => {},
        target: {
          value: value as any
        }
      } as any
      onChange(event)
    }
  }
  return (
    <div className={`hw-radio-group-root${className ? ` ${className}` : ''}`}>
      {label ? <Label
                label={label}
                required={required}
                error={error}
      /> : null
      }
      <div className={`hw-radio-group-data flex-direction-${direction} flex-align-items-${alignItems}`}>
        {(children as any)({
          value,
          onRadioChanged: radioChangedHandler
        })}
      </div>
      {helperText ? <HelperText
                error={error}
                text={helperText}
      /> : null}
    </div>
  )
}

RadioGroup.defaultProps = {
  'component-direction': 'row',
  'align-items': 'start',
}

export default RadioGroup
