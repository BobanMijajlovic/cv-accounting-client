import React      from 'react'
import {
  IWithValidationProps,
  withValidation
} from '../../validation'
import {
  CheckBox,
  ICheckBoxProps
} from '../CheckBox'

const CheckBoxWithValidation : <T extends any>(props : IWithValidationProps<T> & ICheckBoxProps) =>
React.ReactElement<IWithValidationProps<T> & ICheckBoxProps> = ({...rest}) => {
  return (
    <CheckBox
        {...rest}
    />
  )
}

export default withValidation(CheckBoxWithValidation)
