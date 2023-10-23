import React, {ButtonHTMLAttributes} from 'react'
import {IconProp}                    from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon}             from '@fortawesome/react-fontawesome'
import {IFocusIDProps}               from '../../application/constants/FocusElementIDs'

export interface IButtonShortcutProps extends IFocusIDProps, React.PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  label ?: string
  color ?: 'primary' | 'secondary' | 'success' | 'danger' | 'info'
  size ?: 'sm' | 'lg'
  classNames ?: string
  outline ?: boolean
  icon ?: IconProp
  shortcut ?: string
  style ?: any
  forwardedRef ?: any
  onFocus ?: (e : React.FocusEvent<HTMLButtonElement>) => void
  onBlur ?: (e : React.FocusEvent<HTMLButtonElement>) => void
  upload ?: boolean
}

const ButtonShortcut = (props : IButtonShortcutProps) => {
  const {label, color, size, classNames, onFocus, onBlur, forwardedRef, icon, shortcut, outline, focusId, ...rest} = props

  const rootClass = React.useMemo(() => {
    return `hw-shortcut-button-root${color ? ` ${color}` : ''}${size ? ` ${size}` : ' sm'}${outline ? ' outline' : ''}${props.disabled ? ' hw-disabled' : ''}${classNames ? ` ${classNames}` : ''}`
  }, [color, size, outline, props.disabled, classNames])

  const handlerFocus = (e : React.FocusEvent<HTMLButtonElement>) => {
    onFocus && onFocus(e)
  }

  const handlerBlur = (e : React.FocusEvent<HTMLButtonElement>) => {
    onBlur && onBlur(e)
  }

  return (
    <button {...rest} className={rootClass} ref={forwardedRef} onFocus={handlerFocus} onBlur={handlerBlur} focus-id={focusId}>
      {icon ? <FontAwesomeIcon icon={icon} className={'hw-button-icon'}/> : null}
      {label ?
        <span className={'hw-shortcut-label'}>
          <div className={'d-flex flex-fill justify-content-center'}>
            {label}
          </div>
        </span> : null}
      {shortcut ? <span className={'hw-shortcut-label-command'}>{shortcut}</span> : null}
    </button>
  )
}

export default React.forwardRef((props : Pick<IButtonShortcutProps, Exclude<keyof IButtonShortcutProps, 'forwardedRef '>>, ref) => {
  return <ButtonShortcut {...props} forwardedRef={ref}/>
})

