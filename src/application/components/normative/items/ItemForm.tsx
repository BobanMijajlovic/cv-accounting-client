import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
}                                     from 'react'
import { useTranslationFunction }     from '../../../../components/Translation/useTranslation'
import {
  FORMAT_QUANTITY_STANDARD,
  IFieldsRefs,
  required,
  useValidation
}                                     from '../../../../validation'
import { TItem }                      from '../../../../graphql/type_logic/types'
import { useBackground }              from '../../../hooks/useBackgroundPanel'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                     from '../../../../components/hooks/useExternalKeybaord'
import _                              from 'lodash'
import { processErrorGraphQL }        from '../../../../apollo'
import { AutoCompleteFindItem }       from '../../autocomplete/AutoCompleteFindItem'
import ButtonShortcut                 from '../../../../components/Button/ButtonShortcut'
import {
  faBarcode,
  faSearch,
  faTable
}                                     from '@fortawesome/free-solid-svg-icons'
import InputTextWithValidation        from '../../../../components/withValidation/InputTextWithValidation'
import { FOCUS_ID }                   from '../../../constants/FocusElementIDs'
import { useNormativeDashboard }      from '../../../../store/normative/useNormative'
import AutoCompleteResultRenderItem   from '../../items/autocomplete/AutoCompleteResultRenderItem'
import { toNumberFixed }              from '../../../utils/Utils'
import { useNormativesQuery }         from '../../../../graphql/graphql'
import { queryVariablesNormatives }   from '../../../../graphql/variablesQ'
import Label                          from '../../../../components/basic/Label'
import SelectTextWithValidation       from '../../../../components/withValidation/SelectTextWithValidation'
import { _focusElementAfter }         from '../../../../components/EasyModel/EasyModal'
import ConditionalRendering           from '../../../../components/Util/ConditionalRender'
import { FontAwesomeIcon }            from '@fortawesome/react-fontawesome'
import { openDialogPreviewNormative } from '../preview/NormativePreview'

export interface INormativeItemModel {
  quantity: string
  activeNormativeId: string
}

const NormativeItemForm = () => {

  const { translate } = useTranslationFunction()
  const { selectedNormativeId, insertItem } = useNormativeDashboard()
  const validation = useValidation<INormativeItemModel>()
  const { state, resetValidations, getFieldRef, validate, setFieldValue, setFieldError } = validation
  const [currentItem, setCurrentItem]: [TItem, (r: TItem) => void] = useState({} as TItem)
  const [showFindItem, setShowFindItem] = useState({visible:false})

  const [resetValidation, setResetValidation] = useState({reset:false})
  const [focusElement, setFocusElement]: [IFieldsRefs, (r: IFieldsRefs) => void] = useState({} as IFieldsRefs)
  const [normativePreview,setNormativePreview] : [boolean,(b:boolean)=> void] = useState(false as boolean)
  
  const variables = React.useMemo( () => {
    if (!currentItem || !currentItem.id) {
      return 
    }
    return queryVariablesNormatives( Number( currentItem.id ) )
  }, [currentItem] )
  
  const {data} = useNormativesQuery({
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'cache-and-network',
    variables,
    skip: !variables
  })
    
  const norms = useMemo(() => {
    if (!data || !data.data || !data.data.items) {
      return  []
    }
    return data.data.items.map(x => ({
      value: x.id,
      label: x.description
    }))
  }  ,[data])
  
  useEffect(() => {
    if (!norms || norms.length === 0) {
      setNormativePreview(false)
      return 
    }
    setFieldValue('activeNormativeId', `${norms[0].value}`,true)
    setNormativePreview(true)
    return
  },[norms, setFieldValue])
  
  useEffect(() => {
    if (focusElement.ref && focusElement.ref.current) {
      focusElement.ref.current.focus()
    }
  }, [focusElement])

  useEffect(() => {
    if (resetValidation.reset && !setFieldValue) {
      resetValidations(true)
    }
  }, [resetValidation, resetValidations, setFieldValue])

  const _closeFindItem = React.useCallback(() => {
    setShowFindItem({visible:false})
  }, [setShowFindItem])
    
  const {closeBackground:closeBackgroundFindItem, openBackground:openBackgroundFindItem} = useBackground(_closeFindItem)
 
  const openFindItem = () => {
    if (showFindItem?.visible) {
      return
    }
    openBackgroundFindItem()
    setShowFindItem({visible:true})
    setFocusSearch({value:''})
    setResetValidation({reset:true})
  }

  const handlerSetFocus = (field: string) => {
    const refData = getFieldRef(field)
    if (refData && refData.ref) {
      setFocusElement(refData)
    }
  }
  const [focusSearch, setFocusSearch] = useState({value:''})

  const handlerItemSelected = React.useCallback((item: TItem) => {
    setCurrentItem(item || {})
    if (item && item.id) {
      closeBackgroundFindItem()
      handlerSetFocus(norms.length !== 0 ? 'activeNormativeId' : 'quantity')
    }
  }, [setCurrentItem, handlerSetFocus, closeBackgroundFindItem])

  const {setRef} = useExternalKeyboard((e: KeyboardEvent) => {

    switch (e.key) {
      case KeyboardEventCodes.F5:
        openFindItem()
        return

      case KeyboardEventCodes.Enter:
        e.preventDefault()
        handlerInsertItem().then()
        break
    }
  }, true, [KeyboardEventCodes.Tab, KeyboardEventCodes.F2, KeyboardEventCodes.F3, KeyboardEventCodes.F5, KeyboardEventCodes.Enter], 'normative-item-insert-form')

  const handlerInsertItem = async () => {
    const {error, data, validations, refs} = await validate()
    if (error) {
      const fieldRef: IFieldsRefs | undefined = refs.find(({field}) => _.get(validations, `validations.${field}.error`))
      fieldRef && setFocusElement({...fieldRef as IFieldsRefs})
      return
    }
    if (!currentItem.id) {
      openFindItem()
      return
    }

    if (!data.quantity) {
      setFieldError('quantity',translate('REQUIRED_FIELD'))
      return
    }

    const _data = {
      quantity: toNumberFixed(data.quantity),
      itemId: Number(currentItem.id),
      normativeId: Number(selectedNormativeId),
      activeNormativeId: Number(data.activeNormativeId)
    } as any
    
    try {
      await insertItem(_data)
      handlerItemSelected({} as TItem)
      await openFindItem()
      await resetValidations(true)
    } catch (e) {
      processErrorGraphQL(e, validation)
    }
  }

  const handlerCloseFunction = useCallback(async () => {
    const {validations, refs} = await validation.validate()
    await validation.resetValidations()
    let fieldRef: IFieldsRefs | undefined = refs.find(({field}) => _.get(validations, `validations.${field}.error`))
    if (!fieldRef) {
      fieldRef = getFieldRef('quantity')
    }
    fieldRef && setFocusElement({...fieldRef})
  }, [setFocusElement, getFieldRef])

  const handlerCloseFindItem = React.useCallback(() => {
    closeBackgroundFindItem()
    setResetValidation({reset:true})
    handlerCloseFunction().then()
  }, [setResetValidation, closeBackgroundFindItem, handlerCloseFunction])

  const handlerSelectNormative = useCallback(() => {
    _focusElementAfter(FOCUS_ID.NORMATIVE.ITEM_FORM.ADD_BUTTON)
    setNormativePreview(!normativePreview)
  },[_focusElementAfter, setNormativePreview])
  
  const previewNormativeHandler = useCallback(() => {
    state.activeNormativeId && openDialogPreviewNormative({
      normativeId: state.activeNormativeId
    })
  },[state, openDialogPreviewNormative])

  return (
    <div className={'pt-4 px-2 pr-0 mt-1 d-flex align-items-center justify-content-between relative pr-3 border-bottom'} ref={setRef}>
      <div className={`hw-auto-item-search-box ${showFindItem.visible ? '' : ' hw-auto-item-search-box-hide'}`}>
        <AutoCompleteFindItem
                    processSelected={handlerItemSelected}
                    focus={focusSearch}
                    closeFun={handlerCloseFindItem}
        />
      </div>

      <ButtonShortcut
          icon={faBarcode}
          onClick={openFindItem}
          style={{position:'absolute', top:'3px', left:'5px'}}
          label={translate('WAREHOUSES_TAB_ITEM')}
          shortcut={KeyboardEventCodes.F5}
          classNames={'hw-shortcut-button primary sm hw-button-border-color'}
      />

      <div className={'d-flex align-items-center w-100 p-0'}>
        <div className={'d-flex justify-content-between align-items-center flex-2 relative pl-0'}>
          <div className={'flex-2 hw-invoice-insert-item-form-preview mt-1'} onClick={openFindItem}>
            <AutoCompleteResultRenderItem data={currentItem} />
          </div>
          <div className={'pl-3 hw-normative-item-select-input'}>
            {
              norms.length === 0 ? (
                <div className={'d-flex flex-column text-upper'}>
                  <Label label={'Normative'}/>
                  <div className={'d-flex flex-column justify-content-center align-items-center color-primary pb-4 font-smaller-1 flex-1'}>
                    <div>No normative</div>
                  </div>
                </div> 
              ) : 
                <div className={'relative'}>
                  <ConditionalRendering condition={!!normativePreview}>
                    <FontAwesomeIcon icon={faSearch} onClick={previewNormativeHandler} className={'hw-normative-preview-icon'}  />
                  </ConditionalRendering>
                  <SelectTextWithValidation
                    label={'Normative'}
                    helperText={''}
                    className={'font-smaller-1'}
                    options={norms}
                    fullWidth
                    onChange={handlerSelectNormative}
                    validation={{
                      useValidation:validation,
                      model:'activeNormativeId',
                      rule:{
                        required: required({message: translate('REQUIRED_FIELD')})
                      }
                    }}
                  />
                </div>

            }
          </div>
        </div>
      </div>

      <div className={'ml-3 hw-input-discount'}>
        <InputTextWithValidation
                validation={{
                  useValidation:validation,
                  model:'quantity',
                  format:{
                    rule:FORMAT_QUANTITY_STANDARD,
                    validationMessage:'Enter valid quantity'
                  }
                }}
                selectOnFocus={false}
                align={'align-right'}
                label={translate('LABEL_QTY')}
        />
      </div>
      <div className={'pl-2'}>
        <ButtonShortcut
                focusId={FOCUS_ID.NORMATIVE.ITEM_FORM.ADD_BUTTON}
                icon={faTable}
                onClick={handlerInsertItem}
                label={translate('SMALL_BUTTON_ADD')}
                classNames={'hw-shortcut-button primary sm hw-button-border-color'}
        />
      </div>    
    </div>
  )

}

export default NormativeItemForm