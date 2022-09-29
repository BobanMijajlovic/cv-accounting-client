import React, {useEffect}         from 'react'
import {useValidation}            from '../../../validation'
import {TWarehouseItemInfo}       from '../../../graphql/type_logic/types'
import AutoCompleteWithValidation from '../../../components/withValidation/AutoCompleteWithValidation'
import ApolloAsyncCall            from '../../../graphql/ApolloAsyncCallClass'
import AutoCompleteWarehouseItem  from '../warehouse/tabs/transfer/autocomplete/AutoCompleteWarehouseItem'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                 from '../../../components/hooks/useExternalKeybaord'

interface IAutoCompleteWithValidationModel {
  value : string
}

interface IAutoCompleteBasicProps {
  warehouseId : string
  processSelected : (warehouseItemInfo : TWarehouseItemInfo) => void,
  label ?: string,
  helperText ?: string
  error ?: boolean | string
  focus ?: any
  focusOnMount ?: boolean
  closeFun ?: () => void
}

const AutoCompleteFindWarehouseItem = <T extends any>({processSelected, label, helperText, error, focus: focusData, focusOnMount,warehouseId,closeFun} : IAutoCompleteBasicProps) => {

  const validation = useValidation<IAutoCompleteWithValidationModel>()
  const {getFieldRef, setFieldError, setFieldValue} = validation

  const handlerSearch = React.useCallback(async (value : string) : Promise<any> => {
    value = value.trim()
        /** find bank account by client */
    const data : any = await ApolloAsyncCall.warehouseItem(value,Number(warehouseId))
    if (value.length !== 0 && data.length === 0) {
      setFieldError('value', 'No warehouse item found with this rule')
    }
    return data
  }, [setFieldError, warehouseId])

  const currentRef = (getFieldRef('value')?.ref as any)?.current

  const focus = React.useCallback(() => {
        currentRef?.focus()
  }, [currentRef])

  useEffect(() => {
    focus()
    if (!focusData) {
      return
    }
    setFieldValue('value', focusData.value, true)
  }, [focusData, setFieldValue, focus])

  useEffect(() => {
    if (error) {
      setFieldError('value', error as string)
      return
    }
  }, [error, setFieldError])

  const { setRef } = useExternalKeyboard((e : KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.Esc: closeFun && closeFun(); break
    }
  }, true, [KeyboardEventCodes.F6,KeyboardEventCodes.Esc],'auto-complete-find-item')

  return (
    <div className={'d-flex align-items-center justify-content-around width-parent-full'} ref={setRef}>
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
                ComponentResultRender={AutoCompleteWarehouseItem}
                handlerSearch={handlerSearch}
                handlerSelectValue={processSelected}
      />
    </div>
  )
}

export default AutoCompleteFindWarehouseItem

