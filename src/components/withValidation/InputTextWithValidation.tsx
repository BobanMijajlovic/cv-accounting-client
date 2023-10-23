import React from 'react'
import {
  IWithValidationProps,
  withValidation
}            from '../../validation'
import {
  IInputTextProps,
  InputText
}            from '../../components/InputText'

const InputTextWithValidation : <T extends any>(props : IWithValidationProps<T> & IInputTextProps) =>
React.ReactElement<IWithValidationProps<T> & IInputTextProps> = ({...rest}) => {
  return (
    <InputText
            {...rest}
    />
  )
}

export default withValidation(InputTextWithValidation)
