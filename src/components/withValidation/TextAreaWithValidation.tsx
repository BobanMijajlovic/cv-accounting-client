import React from 'react'
import {
  IWithValidationProps,
  withValidation
}            from '../../validation'
import {
  ITextAreaProps,
  TextArea
}            from '../InputText'

const TextAreaWithValidation: <T extends any>(props: IWithValidationProps<T> & ITextAreaProps) =>
React.ReactElement<IWithValidationProps<T> & ITextAreaProps> = ({...rest}) => {
  return (
    <TextArea
            {...rest}
    />
  )
}

export default withValidation(TextAreaWithValidation)
