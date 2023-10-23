import React, {useEffect}             from 'react'
import {useValidation}                from '../../../validation'
import AutoCompleteResultRenderClient from '../customer/autocomplete/AutoCompleteResultRenderCustomer'
import {TCustomer}                    from '../../../graphql/type_logic/types'
import AutoCompleteWithValidation     from '../../../components/withValidation/AutoCompleteWithValidation'
import ApolloAsyncCall                from '../../../graphql/ApolloAsyncCallClass'
import { useTranslationFunction }     from '../../../components/Translation/useTranslation'

interface IAutoCompleteWithValidationModel {
  value : string
}

export interface IAutoCompleteBasicProps {
  processSelected : (customer : TCustomer) => void,
  label ?: string,
  helperText ?: string
  error ?: boolean | string
  focus ?: any
  focusOnMount ?: boolean
  disabled ?: boolean
  classNames ?: string
}

const AutoCompleteFindCustomer = <T extends any>({processSelected, label, helperText, error, focus: focusData, focusOnMount, disabled, classNames} : IAutoCompleteBasicProps) => {

  const { translate } = useTranslationFunction()
  const validation = useValidation<IAutoCompleteWithValidationModel>()
  const {getFieldRef, setFieldError, setFieldValue} = validation

  const handlerSearch = React.useCallback(async (value : string) : Promise<any> => {
    value = value.trim()
    const data : any = await ApolloAsyncCall.customerFind(value)
    if (value.length !== 0 && data.length === 0) {
      setFieldError('value', translate('AUTOCOMPLETE_CUSTOMER_SEARCH_VALIDATION_MESSAGE'))
    }
    return data
  }, [setFieldError])

  const ref = getFieldRef('value')?.ref?.current

  const focus = React.useCallback(() => {
    ref && (ref as any).focus()
  }, [ref])

  useEffect(() => {
    focus()
    if (!focusData) {
      return
    }
    setFieldValue('value', focusData.value, true)
  }, [focusData,focus,setFieldValue])

  useEffect(() => {
    if (error) {
      setFieldError('value', error as string)
      return
    }
  }, [error, setFieldError])
  return (
    <div className={`d-flex align-items-center justify-content-around width-parent-full${classNames ? ` ${classNames}` : ''}`}>
      <AutoCompleteWithValidation
                disabled={disabled}
                validation={{
                  useValidation: validation,
                  model: 'value',
                  rule: {}
                }}
                focusOnMount={focusOnMount}
                classInputText={'lined-version'}
                label={label}
                fullWidth
                helperText={helperText}
                ComponentResultRender={AutoCompleteResultRenderClient}
                handlerSearch={handlerSearch}
                handlerSelectValue={processSelected}
      />
    </div>
  )
}

export default AutoCompleteFindCustomer

