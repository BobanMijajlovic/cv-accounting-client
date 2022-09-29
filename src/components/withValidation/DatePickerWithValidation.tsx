import React from 'react'
import {
  IWithValidationProps,
  withValidation
}            from '../../validation'
import {
  IInputTextDatePickerProps,
  InputTextDatePicker
}            from '../../components/InputText'

const DatePickerWithValidation : <T extends any>(props : IWithValidationProps<T> & IInputTextDatePickerProps) =>
React.ReactElement<IWithValidationProps<T> & IInputTextDatePickerProps> = ({...rest}) => {
  return (
    <InputTextDatePicker {...rest}/>
  )
}

export default withValidation(DatePickerWithValidation)
