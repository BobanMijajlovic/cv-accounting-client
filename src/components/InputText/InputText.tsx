import React, {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  PropsWithoutRef,
  useEffect,
  useState
}                          from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Label               from '../basic/Label'
import HelperText          from '../basic/HelperText'
import { IconProp }        from '@fortawesome/fontawesome-svg-core'
import {
  FOCUS_ID,
  IFocusIDProps
}                          from '../../application/constants/FocusElementIDs'

interface IIconProps {
  icon?: IconProp
  text ?: string
  handler?: any
  color?: 'danger' | 'primary'
}

interface IInputIconsProps {
  icon?: IIconProps
  iconAction?: IIconActionProps
}

export interface IIconActionProps {
  icon?: IconProp
  text ?: string
  handler?: (e: React.MouseEvent)=> void
  color?: 'danger' | 'primary'
}

export interface IInputFontSizeProps {
  type: 'smaller' | 'bigger'
  size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
}

export interface IInputTextProps extends PropsWithoutRef<InputHTMLAttributes<HTMLInputElement>>, IFocusIDProps {
  error?: string | boolean
  label: string
  labelIcon?: IconProp | React.FunctionComponent
  fontSize?: IInputFontSizeProps
  helperText?: string
  icon?: IIconActionProps
  iconAction?: IIconActionProps
  fullWidth?: boolean,
  inputRef?: React.Ref<HTMLInputElement>
  align?: 'align-left' | 'align-center' | 'align-right',
  useHelpText?: boolean
  useLabel?: boolean
  classNames?: string
  bold?: boolean,
  lined?: boolean,
  selectOnFocus?: boolean
  upperCase?: boolean
}

export interface IInputTextDatePickerProps extends IInputTextProps {
  format?: string
  /** (MMM - long (March)) (MM - short (Mar)) (MM - 2-digit (03)) (dd - 2-digit (01)) ( d - numeric (1)) (yy - 2-digit (12)) (yyyy- numeric (2012) (E - short (Thu)) (EE - long (Thursday))  */
  locales?: string,
  'start-day'?: 'MON' | 'SUN',
  'sub-header'?: 'hide' | 'show',
  'date'?: Date
  /** start day on calendar */
  position?: 'left' | 'right'
  panel?: 'D' | 'M' | 'Y'
  'min-date' ?:  Date
}

/* const InputIcons = React.memo(({icon, iconAction}: IInputIconsProps) => {
  const iconHandler = icon && icon.handler ? Object.assign({}, typeof icon.handler !== 'string' ? {onClick: icon.handler} : {'data-action': icon.handler}) : ''
  return (
    <>
      {icon ?
        icon.icon ?
          <FontAwesomeIcon
          icon={icon.icon}
          className={'hw-input-icon'}
          {...iconHandler}
          /> 
          : icon.text ? <div className={'hw-input-icon-text'}>{icon.text}</div> : null
        : null}
      {iconAction ?
        iconAction.icon ?
          <FontAwesomeIcon
          icon={iconAction.icon}
          className={`hw-input-icon-action${iconAction.color ? ` ${iconAction.color}` : ''} `}
          onClick={(e) => iconAction.handler && iconAction.handler(e)}
          />
          : iconAction.text ?  <div className={'hw-input-icon-text right'}>{iconAction.text}</div> : null
        : null}
    </>
  )
}, ((prevProps, nextProps) => {

  if (prevProps.iconAction !== nextProps.iconAction) {
    return false
  }
  return true
}))*/

const InputIcon = React.memo(({icon,action}: {icon?: IIconActionProps,action?:boolean}) => {
  const iconHandler = icon && icon.handler ? Object.assign({}, typeof icon.handler !== 'string' ? {onClick: icon.handler} : {'data-action': icon.handler}) : ''
  return (
    <>
      {icon ?
        icon.icon ?
          <FontAwesomeIcon
                    icon={icon.icon}
                    className={`hw-input-icon${action ? ' right' : ''}`}
                    {...iconHandler}
          />
          : icon.text ? <div className={`hw-input-icon-text${action ? ' right' : ''}`}>{icon.text}</div> : null
        : null}
    </>
  )
}, ((prevProps, nextProps) => {

  if (prevProps.icon !== nextProps.icon) {
    return false
  }
  return true
}))

const InputText = (props: IInputTextProps) => {

  const {error, focusId, onFocus, onBlur, onKeyDown, inputRef, icon, selectOnFocus, iconAction, fullWidth, label, required, helperText, align, lined, fontSize, useHelpText, bold, classNames, useLabel, onChange, upperCase, labelIcon, ...rest} = props

  const rootClass = React.useMemo(() => {
    return `hw-input-text-root${lined ? ' lined-version' : ''}${error ? ' error' : ''}${fullWidth ? ' full-width' : ''}${props.readOnly ? ' readOnly' : ''}${align ? ` ${align}` : ' align-left'}${props.disabled ? ' disabled' : ''}${bold ? ' bold' : ''}${icon ? ' hw-input-icon-left' : ''}${iconAction ? ' hw-input-icon-right' : ''}${classNames ? ` ${classNames}` : ''}`
  }, [lined, error, fullWidth, props.readOnly, props.disabled, align, bold, classNames])

  const [selectionOnFocus, setSelectionOnFocus] = useState(false)

  useEffect(() => {
    if (!selectionOnFocus || !selectOnFocus || !inputRef) {
      return
    }
    (inputRef as any).current.select()
  }, [selectionOnFocus, setSelectionOnFocus, selectOnFocus, inputRef])

  const _onFocusHandler = React.useCallback((e: FocusEvent<HTMLInputElement>) => {
    if (selectOnFocus && inputRef && (inputRef as any).current) {
      setSelectionOnFocus(true)
    }
    onFocus && onFocus(e)
  }, [onFocus, selectOnFocus, setSelectionOnFocus])

  const _onBlurHandler = React.useCallback((e: FocusEvent<HTMLInputElement>) => {
    setSelectionOnFocus(false)
    onBlur && onBlur(e)
  }, [onBlur, setSelectionOnFocus])

  const _onChangeHandler = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (upperCase) {
      e.target.value = e.target.value.toUpperCase()
    }
    onChange && onChange(e)
  }, [onChange, upperCase])

  /*  const _onKeyDownHandler = React.useCallback((e : React.KeyboardEvent<HTMLInputElement>) => {
      setSelectionOnFocus(false)
      onKeyDown && onKeyDown(e)
    }, [onKeyDown, setSelectionOnFocus, selectOnFocus, onChange])*/

  return (
    <div className={rootClass}>
      {
        useLabel ?
          <Label
            label={label}
            required={required}
            error={error}
            children={labelIcon}
          /> : null
      }
      <div className={'hw-input-group'}>
        <InputIcon icon={icon}/>
        <input
          focus-id={focusId ? focusId : FOCUS_ID.CALCULATION.DOCUMENT_FORM.INVOICE_NUM_INPUT_FIELD}
          className={`hw-input-text${fontSize ? ` font-${fontSize.type}-${fontSize.size}` : ''}`}
          ref={inputRef}
          onChange={_onChangeHandler}
          {...rest}
          onFocus={_onFocusHandler}
          onBlur={_onBlurHandler}
        />
        <InputIcon icon={iconAction} action={true}/>
      </div>
      {
        useHelpText ?
          (
            <HelperText
              error={error}
              text={helperText}
            />
          ) : <></>
      }

    </div>
  )
}

InputText.defaultProps = {
  useHelpText: true,
  useLabel: true
}

export default InputText
