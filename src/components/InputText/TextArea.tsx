import React, {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  PropsWithoutRef,
  useEffect,
  useState
}                               from 'react'
import {
  FOCUS_ID,
  IFocusIDProps
}                               from '../../application/constants/FocusElementIDs'
import { IInputFontSizeProps }  from './InputText'
import Label                    from '../basic/Label'
import { IconProp }             from '@fortawesome/fontawesome-svg-core'
import HelperText               from '../basic/HelperText'
import SelectTextWithValidation from '../withValidation/SelectTextWithValidation'

export interface ITextAreaProps extends PropsWithoutRef<InputHTMLAttributes<HTMLTextAreaElement>>, IFocusIDProps {
  error?: string | boolean
  label: string
  labelIcon?: IconProp | React.FunctionComponent
  fontSize?: IInputFontSizeProps
  helperText?: string
  fullWidth?: boolean,
  inputRef?: React.Ref<HTMLTextAreaElement>
  useHelpText?: boolean
  useLabel?: boolean
  classNames?: string
  selectOnFocus?: boolean
  upperCase?: boolean
  resize ?: boolean
  lined ?: boolean
}

const TextArea =  (props : ITextAreaProps) => {

  const {error,value, focusId, onFocus, onBlur, onKeyDown, inputRef, selectOnFocus, fullWidth, label, required, helperText, fontSize, useHelpText, classNames, useLabel, onChange, upperCase, labelIcon, resize, lined, ...rest} = props

  const rootClass = React.useMemo(() => {
    return `hw-text-area-root${error ? ' error' : ''}${fullWidth ? ' full-width' : ''}${props.readOnly ? ' readOnly' : ''}${props.disabled ? ' disabled' : ''}${resize ? ' resize' : ''}${lined ? ' lined-version' : ''}${classNames ? ` ${classNames}` : ''}`
  }, [error, fullWidth, props.readOnly, props.disabled, classNames])

  const [selectionOnFocus, setSelectionOnFocus] = useState(false)

  useEffect(() => {
    if (!selectionOnFocus || !selectOnFocus || !inputRef) {
      return
    }
    (inputRef as any).current.select()
  }, [selectionOnFocus, setSelectionOnFocus, selectOnFocus, inputRef])

  const _onFocusHandler = React.useCallback((e: FocusEvent<HTMLTextAreaElement>) => {
    if (selectOnFocus && inputRef && (inputRef as any).current) {
      setSelectionOnFocus(true)
    }
    if ( e.target.value.length > 0 ) {
      setImmediate( () => {
        e.target.selectionStart = e.target.value.length
      }, 1 )
    }
    onFocus && onFocus(e)
  }, [onFocus, selectOnFocus, setSelectionOnFocus])

  const _onBlurHandler = React.useCallback((e: FocusEvent<HTMLTextAreaElement>) => {
    setSelectionOnFocus(false)
    onBlur && onBlur(e)
  }, [onBlur, setSelectionOnFocus])

  const _onChangeHandler = React.useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    if (upperCase) {
      e.target.value = e.target.value.toUpperCase()
    }
    onChange && onChange(e)
  }, [onChange, upperCase])

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
      <textarea
            ref={inputRef}
            className={`hw-text-area${fontSize ? ` font-${fontSize.type}-${fontSize.size}` : ''}`}
            onChange={_onChangeHandler}
            onFocus={_onFocusHandler}
            onBlur={_onBlurHandler}
            value={value}
            {...rest}
      />
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

TextArea.defaultProps = {
  useLabel: true,
  useHelpText: true,
  rows: 4
}

export default TextArea