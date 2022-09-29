import { useValidation }            from '../../../validation'
import ApolloAsyncCall              from '../../../graphql/ApolloAsyncCallClass'
import AutoCompleteResultRenderItem from '../items/autocomplete/AutoCompleteResultRenderItem'
import React, { useEffect }         from 'react'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                   from '../../../components/hooks/useExternalKeybaord'
import {
  TCustomer,
  TItem
}                                   from '../../../graphql/type_logic/types'
import { openDialogItemForm }       from '../items/form/ItemForm'
import AutoCompleteWithValidation   from '../../../components/withValidation/AutoCompleteWithValidation'
import { useInsertItemMutation }    from '../../../graphql/graphql'
import { useTranslationFunction }   from '../../../components/Translation/useTranslation'

interface IAutoCompleteWithValidationModel {
  value: string
}

export interface IAutoCompleteFindItemProps {
  processSelected: (item: TItem)=> void
  supplier?: TCustomer,
  focus?: any
  focusOnMount ?: boolean
  closeFun?: ()=> void
}

export const AutoCompleteFindNormativeItem = ({processSelected, supplier, focusOnMount, focus: focusData, closeFun}: IAutoCompleteFindItemProps) => {

  const { translate } = useTranslationFunction()
  const validation = useValidation<IAutoCompleteWithValidationModel>()
  const {setFieldError, setFieldValue} = validation
  const [mutationInsertItem] = useInsertItemMutation()
  const handlerSearch = React.useCallback(async (value: string): Promise<any> => {
    value = value.trim()
    const data: any = await ApolloAsyncCall.normativeItemsFind(value)
    if (value.length !== 0 && data.length === 0) {
      setFieldError('value', translate('AUTOCOMPLETE_ITEM_SEARCH_VALIDATION_MESSAGE'))
    }
    return data
  }, [setFieldError,translate])

  useEffect(() => {
    if (!focusData || !focusData.value) {
      return 
    }
    setFieldValue('value', focusData.value, true)
    focus()
  }, [focusData, setFieldValue])

  const handlerOpenAddItemDialog = () => {
    const fn = async (item: TItem) => {
      await mutationInsertItem({
        variables: {
          data: item
        }
      }).then((v: any) => {
        const _item = (v.data as any).item
        focus()
        processSelected(_item)
      })
    }

    openDialogItemForm({
      submitFun: fn,
      closeFun: focus
    })
  }

  const {setRef} = useExternalKeyboard((e: KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.F6:
        handlerOpenAddItemDialog()
        break
      case KeyboardEventCodes.Esc:
        closeFun && closeFun()
        break
    }
  }, true, [KeyboardEventCodes.F6, KeyboardEventCodes.Esc], 'auto-complete-find-item')

  const focus = () => {
    const data = validation.getFieldRef('value')
    if (!data) {
      return
    }
    (data.ref as any).current.focus()
  }

  return (
    <div className={'d-flex align-items-center justify-content-around width-parent-full'} ref={setRef}>
      <AutoCompleteWithValidation
                validation={{
                  useValidation: validation,
                  model: 'value',
                  rule: {}
                }}
                focusOnMount={focusOnMount}
                classInputText={'lined-version'}
                useLabel={false}
                fullWidth
                helperText={translate('AUTOCOMPLETE_ITEM_SEARCH_HELPER_TEXT')}
                ComponentResultRender={AutoCompleteResultRenderItem}
                handlerSearch={handlerSearch}
                handlerSelectValue={processSelected}
      />
    </div>

  )
}
