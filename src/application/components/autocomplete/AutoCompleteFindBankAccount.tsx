import React, {useEffect}              from 'react'
import {useValidation}                 from '../../../validation'
import {TBankAccount}                  from '../../../graphql/type_logic/types'
import AutoCompleteWithValidation      from '../../../components/withValidation/AutoCompleteWithValidation'
import ApolloAsyncCall                 from '../../../graphql/ApolloAsyncCallClass'
import AutoCompleteBankAccountCustomer from '../bank-transaction/autocomplete/AutoCompleteBankAccountCustomer'

interface IAutoCompleteWithValidationModel {
  value : string
}

export interface IAutoCompleteBasicProps {
  processSelected : (bankAccount : TBankAccount) => void,
  label ?: string,
  helperText ?: string
  error ?: boolean | string
  focus ?: boolean
  focusData ?: any
  focusOnMount ?: boolean
  classNames ?: string
  resetData?: boolean
}

const AutoCompleteFindBankAccount = <T extends any>({ processSelected, label, helperText, error, focus:_focus, focusData, focusOnMount, classNames, resetData } : IAutoCompleteBasicProps) => {

  const validation = useValidation<IAutoCompleteWithValidationModel>()
  const {getFieldRef, setFieldError, setFieldValue, resetValidations} = validation

  const handlerSearch = React.useCallback(async (value : string) : Promise<any> => {
    value = value.trim()
        /** find bank account by client */
    const data : any = await ApolloAsyncCall.bankAccounts(value)
    if (value.length !== 0 && data.length === 0) {
      setFieldError('value', 'No bank account found with this rule')
    }
    return data
  }, [setFieldError])

  const currentRef = (getFieldRef('value')?.ref as any)?.current

  const focus = React.useCallback(() => {
        currentRef?.focus()
  }, [currentRef])
  
  useEffect(() => {
    if (_focus) {
      focus()
      return
    }
  },[_focus, focus])

  useEffect(() => {
    focus()
    if (!focusData) {
      return
    }
    setFieldValue('value', focusData.value, true)
  }, [focusData, setFieldValue, focus])
  
  useEffect( () => {
    if (!resetData) {
      return
    }
    setFieldValue('value','',false)
  },[resetData, setFieldValue])

  useEffect(() => {
    if (error) {
      setFieldError('value', error as string)
      return
    }
  }, [error, setFieldError])

  return (
    <div className={`d-flex align-items-center justify-content-around width-parent-full${classNames ? ` ${classNames}` : ''}`}>
      <AutoCompleteWithValidation
                validation={{
                  useValidation: validation,
                  model: 'value',
                  rule: {}
                }}
                focusOnMount={focusOnMount}
                lined
                label={label}
                fullWidth
                helperText={helperText}
                ComponentResultRender={AutoCompleteBankAccountCustomer}
                handlerSearch={handlerSearch}
                handlerSelectValue={processSelected}
      />
    </div>
  )
}

export default AutoCompleteFindBankAccount

