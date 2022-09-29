import React from 'react'
import {
  IWithValidationProps,
  withValidation
}            from '../../validation'
import {
  ISelectProps,
  Select
}            from '../../components/Select'

const SelectTextWithValidation :  <T extends any>(props : IWithValidationProps<T> & ISelectProps) =>
React.ReactElement<IWithValidationProps<T> & ISelectProps> = ({...rest}) => {
  return (
    <Select
            {...rest}
    />
  )
}

export default withValidation(SelectTextWithValidation)
