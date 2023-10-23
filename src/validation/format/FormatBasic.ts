import React from 'react'

import {
  IFormatCurrency,
  IFormatRuleProps
} from '../index'

export const ACTION_INSERT = 'insert'
export const ACTION_DELETE = 'delete'
export const ACTION_CHANGE = 'change'

export interface IFormatResult {
  text ?: string
  cursor ?: number
}

export interface IFormatClassInterface {
  onMouseUp : (event : React.MouseEvent<HTMLInputElement>, valueCurrent : string) => IFormatResult
  onFocusHandler : (event : React.FocusEvent<HTMLInputElement>, currentValue : string) => IFormatResult
  onChangeHandler : (event : React.ChangeEvent<HTMLInputElement>, previousValue : string) => IFormatResult
  onKeyDownHandler : (event : React.KeyboardEvent<HTMLInputElement>, currentValue : string) => IFormatResult
  onBlurHandler : (event : React.FocusEvent<HTMLInputElement>, currentValue : string) => string
  isValidation : () => boolean
    /** if required then format must be completed in other case empty field is allowed */
  isRequired : () => boolean
  validateField : (value : string) => string | boolean
}

export class FormatBasic implements IFormatClassInterface {

  protected properties : IFormatRuleProps

  constructor (props : IFormatRuleProps) {
    this.properties = props
  }

  isSameProperties (props : IFormatRuleProps) {
    const keys = Object.keys(props)
    if (keys.length !== Object.keys(this.properties).length) {
      return false
    }
    return keys.every((key) => {
      return this.properties[key as keyof IFormatRuleProps] === props[key as keyof IFormatRuleProps]
    })
  }

  format (value : string) : string {
    return value
  }

  isRequired () {
    return !!this.properties.required
  }

    // eslint-disable-next-line no-unused-vars
  onChangeHandler (event : React.ChangeEvent<HTMLInputElement>, previousValue : string) : IFormatResult {
    return {}
  }

  onFocusHandler (event : React.FocusEvent<HTMLInputElement>, currentValue : string) : IFormatResult {
    return {
      text: currentValue,
      cursor: -1
    }
  }

  onBlurHandler (event : React.FocusEvent<HTMLInputElement>, currentValue : string) : string {
    return currentValue
  }

    // eslint-disable-next-line no-unused-vars
  onKeyDownHandler (event : React.KeyboardEvent<HTMLInputElement>, currentValue : string) : IFormatResult {
    return {}
  }

    // eslint-disable-next-line no-unused-vars
  onMouseUp (event : React.MouseEvent<HTMLInputElement>, valueCurrent : string) : IFormatResult {
    return {}
  }

  isValidation () : boolean {
    return !!this.properties.validate || !!this.properties.validationMessage
  }

  validateField (value : string) : string | boolean {
    return false
  }

}

export const isFormatRuleCurrency = (value : any) : value is IFormatCurrency => {
  if (!value) {
    return false
  }
  if ((value as IFormatCurrency).format === 'CURRENCY') {
    return true
  }
  return false
}
