import React                              from 'react'
import {
  IWithValidationProps,
  withValidation
}                                         from '../../validation'
import AutoComplete, {IAutoCompleteProps} from '../../components/InputText/AutoComplete'

const AutoCompleteWithValidation : <T extends any>(props : IWithValidationProps<T> & IAutoCompleteProps) =>
React.ReactElement<IWithValidationProps<T> & IAutoCompleteProps> = ({...rest}) => {
  return (
    <AutoComplete {...rest}/>
  )
}

export default withValidation(AutoCompleteWithValidation)
