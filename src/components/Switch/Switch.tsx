import React, {
  HTMLAttributes,
  InputHTMLAttributes,
  PropsWithoutRef,
  useEffect,
  useState
} from 'react'

interface ISwitchProps extends PropsWithoutRef<HTMLAttributes<HTMLInputElement>> {
  labelOn: string
  labelOff: string
  value ?:  boolean
  onClick ?: ()=> void
  size ?: 'md' | 'sm' | 'lg'
}

const Switch = ({labelOn, labelOff, value, onChange, size = 'lg'}:ISwitchProps) => {
    
  const onClickHandler = () => {
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
    <label className={`switch ${size}`} onClick={onClickHandler}>
      <input className={'switch-input'} type='checkbox' defaultChecked={value}/>
      <span className={'switch-label'} data-on={labelOn} data-off={labelOff}></span>
      <span className={'switch-handle'}></span>
    </label>
  )
}

export default Switch