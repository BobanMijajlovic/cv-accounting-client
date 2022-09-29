import React, {
  FocusEvent,
  InputHTMLAttributes,
  PropsWithoutRef,
  useEffect,
  useState
}                                        from 'react'
import {
  FORMAT_CURRENCY_STANDARD,
  FORMAT_QUANTITY_STANDARD,
  IFormatCurrency,
  IFormatNumberRule,
  IWithValidationProps,
  required,
  useValidation,
  withValidation
}                                        from '../../../validation'
import { FormatCurrency }                from '../../../validation/format/FormatCurrency'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                        from '../../hooks/useExternalKeybaord'
import { EVENT_TYPE_TABLE_CUSTOM_EVENT } from '../TableHeader'
import { toNumberFixed }                 from '../../../application/utils/Utils'

export interface IInputTextEditProps extends PropsWithoutRef<InputHTMLAttributes<HTMLInputElement>> {
  error?: string | boolean
  inputRef?: React.Ref<HTMLInputElement>
  align?: 'align-left' | 'align-center' | 'align-right',
  classNames?: string
  lined?: boolean,
  selectOnFocus?: boolean
}

const InputTextEditor = ({
  selectOnFocus,
  inputRef,
  onFocus,
  error,
  classNames,
  align,
  lined,
  ...rest
}: IInputTextEditProps) => {

  const [selectionOnFocus, setSelectionOnFocus] = useState(false)

  const rootClass = React.useMemo(() => {
    return `hw-input-text-root hw-edit-cell-input-text d-flex ${lined ? 'lined-version' : ''} ${error ? 'error' : ''}   ${align ? ` ${align}` : ' align-left'}${classNames ? ` ${classNames}` : ''}`
  }, [lined, error, align, classNames])

  useEffect(() => {
    if (!(inputRef as any).current) {
      return
    }
    (inputRef as any).current.focus()
  }, [inputRef])

  useEffect(() => {
    if (selectionOnFocus) {
      (inputRef as any).current.select()
      setSelectionOnFocus(false)
    }
  }, [selectionOnFocus, setSelectionOnFocus, selectOnFocus, inputRef])

  const _onFocusHandler = (e: FocusEvent<HTMLInputElement>) => {
    if (selectOnFocus && inputRef && (inputRef as any).current) {
      setSelectionOnFocus(true)
    }
    onFocus && onFocus(e)
  }

  return (
    <div className={rootClass}>
      <input
        className={'flex-grow-1'}
        ref={inputRef}
        size={1}
        onFocus={_onFocusHandler}
        {...rest}

      />
    </div>
  )
}
export default InputTextEditor

const _InputTextEditWithValidation: <T extends any>(props: IWithValidationProps<T> & IInputTextEditProps)=>
React.ReactElement<IWithValidationProps<T> & IInputTextEditProps> = ({ ...rest }) => {
  return (
    <InputTextEditor
      {...rest}
    />
  )
}

export const InputTextEditWithValidation = withValidation(_InputTextEditWithValidation)

interface ITextEditorModelValidation {
  value: string
}

export const EVENT_TYPE_CHANGE_MODEL_FIELD = 'change-model-field'

export interface IInputTextEditor {
  value: string,
  field: string
  model: any,
  rule?: IFormatCurrency | IFormatNumberRule
}

export const InputTextEditorNumber = ({ value, field, model, rule }: IInputTextEditor) => {

  const _value = React.useMemo(() => {
    value = `${toNumberFixed(value)}`
    const format = new FormatCurrency({ rule } as any)
    return format.format(value, true)
  }, [value, rule])

  const validation = useValidation<ITextEditorModelValidation>({
    initialData: { value: _value }
  })

  const { setRef } = useExternalKeyboard((e: KeyboardEvent) => {
    (async () => {
      const data = await validation.validate()
      const newValue = validation.getFieldValue('value')
      const event = new CustomEvent(EVENT_TYPE_TABLE_CUSTOM_EVENT, {
        bubbles: true,
        cancelable: false,
        detail: {
          type: EVENT_TYPE_CHANGE_MODEL_FIELD,
          value: newValue?.length !== 0 ? newValue : _value,
          field,
          model
        }
      })
      const f = data.refs.find(x => x.field === 'value')
      if (f) {
        (f as any).ref.current.dispatchEvent(event)
      }
    })()
  }, true, [KeyboardEventCodes.Enter, KeyboardEventCodes.Tab])

  return (
    <div ref={setRef}>
      <InputTextEditWithValidation
        validation={{
          useValidation: validation,
          model: 'value',
          rule: {
            required
          },
          format: {
            rule: rule,
            validationMessage: ''
          }
        }}
        selectOnFocus
        align={'align-right'}
      />
    </div>
  )
}

export const InputTextEditorCurrency = ({ value, field, model, rule }: IInputTextEditor) => {
  return <InputTextEditorNumber value={value} field={field} model={model} rule={FORMAT_CURRENCY_STANDARD}/>
}

export const InputTextEditorQuantity = ({ value, field, model, rule }: IInputTextEditor) => {
  return <InputTextEditorNumber value={value} field={field} model={model} rule={FORMAT_QUANTITY_STANDARD}/>
}

