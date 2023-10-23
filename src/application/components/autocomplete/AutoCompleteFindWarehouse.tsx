import {useValidation}                   from '../../../validation'
import ApolloAsyncCall                   from '../../../graphql/ApolloAsyncCallClass'
import React, {useEffect}                from 'react'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                        from '../../../components/hooks/useExternalKeybaord'
import ButtonShortcut                    from '../../../components/Button/ButtonShortcut'
import {faWarehouse}                     from '@fortawesome/free-solid-svg-icons'
import {TWarehouse}                      from '../../../graphql/type_logic/types'
import AutoCompleteWithValidation        from '../../../components/withValidation/AutoCompleteWithValidation'
import {useInsertWarehouseMutation}      from '../../../graphql/graphql'
import AutoCompleteResultRenderWarehouse from '../warehouse/autocomplete/AutoCompleteResultRenderWarehouse'
import {openDialogWarehouseForm}         from '../warehouse/form/Warehouse'
import ConditionalRendering              from '../../../components/Util/ConditionalRender'

interface IAutoCompleteWithValidationModel {
  value : string
}

export interface IAutoCompleteFindWarehouseProps {
  processSelected : (warehouse : TWarehouse) => void
  focus ?: any
  label ?: string,
  error ?: boolean | string
  helperText ?: string
  notShowDefineButton ?: boolean
  focusOnMount ?: boolean
}

export const AutoCompleteFindWarehouse = ({processSelected, focus: focusData,notShowDefineButton,focusOnMount,label,error} : IAutoCompleteFindWarehouseProps) => {
  const validation = useValidation<IAutoCompleteWithValidationModel>()
  const {setFieldError, setFieldValue, getFieldRef} = validation
  const [mutationInsertWarehouse] = useInsertWarehouseMutation()
  const handlerSearch = React.useCallback(async (value : string) : Promise<any> => {
    value = value.trim()
    const data : any = await ApolloAsyncCall.warehouseFind(value)
    if (value.length !== 0 && data.length === 0) {
      setFieldError('value', 'No warehouses found with this rule')
    }
    return data
  }, [setFieldError])

  const focus = React.useCallback(() => {
    const data = getFieldRef('value')
    if (!data) {
      return
    }
    (data.ref as any).current.focus()
  }, [getFieldRef])

  useEffect(() => {
    if (!focusData) {
      return
    }
    setFieldValue('value', focusData.value, true)
    focus()
  }, [focusData, setFieldValue, focus])

  const handlerOpenAddWarehouseDialog = () => {
    const fn = async (warehouse : TWarehouse) => {
      await mutationInsertWarehouse({
        variables: {
          data: warehouse
        }
      }).then((v : any) => {
        const _item = (v.data as any).item
        focus()
        processSelected(_item)
      })
    }
    openDialogWarehouseForm({
      submitFun: fn
    })
  }

  const { setRef } = useExternalKeyboard((e : KeyboardEvent) => {
    handlerOpenAddWarehouseDialog()
  }, true, [KeyboardEventCodes.F6],'find-warehouse-dialog')

  useEffect(() => {
    if (error) {
      setFieldError('value', error as string)
      return
    }
  }, [error, setFieldError])

  return (
    <div className={'d-flex align-items-center justify-content-around width-parent-full'} ref={setRef}>
      <ConditionalRendering condition={!notShowDefineButton}>
        <ButtonShortcut
            icon={faWarehouse}
            onClick={handlerOpenAddWarehouseDialog}
            style={{minWidth: '55px'}}
            label={'define'}
            shortcut={KeyboardEventCodes.F6}
            classNames={'hw-shortcut-button primary sm hw-button-border-color mr-3'}
        />
      </ConditionalRendering>
     
      <AutoCompleteWithValidation
                focusOnMount={focusOnMount}
                validation={{
                  useValidation: validation,
                  model: 'value',
                  rule: {}
                }}
                classInputText={'lined-version'}
                label={label}
                useLabel={!!label}
                fullWidth
                helperText={'search by name/description'}
                ComponentResultRender={AutoCompleteResultRenderWarehouse}
                handlerSearch={handlerSearch}
                handlerSelectValue={processSelected}
      />
    </div>

  )
}
