import React, {useState}       from 'react'
import {IInputTextProps}       from './InputText'
import InputTextWithValidation from '../withValidation/InputTextWithValidation'
import {
  minLength,
  required,
  useValidation
}                              from '../../validation'

type TBankAccount = {
  first: string,
  middle: string,
  last: string
}

const InputBankAccount = (props: IInputTextProps) => {

  const [typeState, setTypeState]: [boolean, (r: boolean)=> void] = useState(false as boolean)
  const handlerOnClickChangeState = React.useCallback(() => {
    setTypeState(!typeState)
  }, [typeState, setTypeState])

  const validation = useValidation<TBankAccount>()

  return (

    <div>
      <InputTextWithValidation
        validation={{
          useValidation: validation,
          model: 'first',
          rule: {
            required
          },
          format: {
            rule: {
              format: '###',
              mask: ' ',
              validSize: 3
            },
            validationMessage: '3 numbers needed'
          }
        }}
        selectOnFocus={true}
      />

      <InputTextWithValidation
        validation={{
          useValidation: validation,
          model: 'middle',
          rule: {
            required,
            minLength: minLength({min: 6})
          },
          format: {
            rule: {
              format: '###########',
              mask: ' ',
              validSize: 6
            },
            validationMessage: '6 numbers needed'
          }
        }}
        selectOnFocus={true}
      />

      <InputTextWithValidation
        validation={{
          useValidation: validation,
          model: 'last',
          rule: {
            required
          },
          format: {
            rule: {
              format: '##',
              mask: ' ',
              validSize: 2
            },
            validationMessage: '2 numbers needed'
          }
        }}
        selectOnFocus={true}
      />

    </div>

  )
}

export default InputBankAccount
