import React, {
  HTMLAttributes,
  PropsWithoutRef
}            from 'react'
import Label from '../basic/Label'

export interface IButtonSwitchProps extends PropsWithoutRef<HTMLAttributes<HTMLInputElement>> {
  label : string
  value :  boolean | string
  onHandlerChange : (e : any) => void,
  classNames ?: string
}

const ButtonSwitch = ({label,value,onHandlerChange,classNames,...rest} : IButtonSwitchProps) => {

  const onClickHandler = (e : React.MouseEvent<HTMLElement>) => {
    if (onHandlerChange) {
      const event = {
        persist: () => {},
        target: {
          value: !value as any
        }
      } as any
      onHandlerChange(event)
    }
  }
    
  return (
    <div className={'d-flex flex-column'}>
      <Label label={label} />
      <input className={`toggle toggle-ios${value ? ' checked' : ''}${classNames ? ` ${classNames}` : ''}`} onClick={onClickHandler} id="cb1" type="checkbox"/>
      <label className={'toggle-btn'} htmlFor="cb1">
      </label>
    </div>
  )
}

ButtonSwitch.defaultProps = {
  size: 2
}

export default ButtonSwitch