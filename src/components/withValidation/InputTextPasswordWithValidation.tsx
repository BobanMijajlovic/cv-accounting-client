import React from 'react'
import {
  IWithValidationProps,
  withValidation
}            from '../../validation'
import {
  IInputTextProps,
  InputTextPassword
}            from '../../components/InputText'

const InputTextPasswordWithValidation : <T extends any>(props : IWithValidationProps<T> & IInputTextProps) =>
React.ReactElement<IWithValidationProps<T> & IInputTextProps> = ({...rest}) => {
  return (
    <InputTextPassword
            {...rest}
    />
  )
}

export default withValidation(InputTextPasswordWithValidation)
