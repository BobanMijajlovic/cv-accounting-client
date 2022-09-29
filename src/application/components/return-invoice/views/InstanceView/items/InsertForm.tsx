import React, {
  useCallback,
  useEffect,
  useState
}                                   from 'react'
import {
  faBarcode,
  faEdit,
  faTable
}                                   from '@fortawesome/free-solid-svg-icons'
import _                            from 'lodash'
import { useTranslationFunction }   from '../../../../../../components/Translation/useTranslation'
import {
  FORMAT_CURRENCY_STANDARD,
  FORMAT_QUANTITY_STANDARD,
  IFieldsRefs,
  required,
  useValidation
}                                   from '../../../../../../validation'
import { useReturnInvoiceForm }     from '../../../../../../store/return-invoice/useReturnInvoice'
import {
  useUpdateItemMutation,
  useWarehousesQuery
}                                   from '../../../../../../graphql/graphql'
import { TItem }                    from '../../../../../../graphql/type_logic/types'
import { CONSTANT_WAREHOUSE }       from '../../../../../constants'
import { useBackground }            from '../../../../../hooks/useBackgroundPanel'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                   from '../../../../../../components/hooks/useExternalKeybaord'
import { toNumberFixed }            from '../../../../../utils/Utils'
import { processErrorGraphQL }      from '../../../../../../apollo'
import { openDialogItemForm }       from '../../../../items/form/ItemForm'
import { _focusElementAfter }       from '../../../../../../components/EasyModel/EasyModal'
import { FOCUS_ID }                 from '../../../../../constants/FocusElementIDs'
import { AutoCompleteFindItem }     from '../../../../autocomplete/AutoCompleteFindItem'
import ButtonShortcut               from '../../../../../../components/Button/ButtonShortcut'
import AutoCompleteResultRenderItem from '../../../../items/autocomplete/AutoCompleteResultRenderItem'
import ConditionalRendering         from '../../../../../../components/Util/ConditionalRender'
import InputTextWithValidation      from '../../../../../../components/withValidation/InputTextWithValidation'
import Label                        from '../../../../../../components/basic/Label'
import SelectTextWithValidation     from '../../../../../../components/withValidation/SelectTextWithValidation'

export interface IReturnInvoiceInsertItemModel {
  sellingPrice: string
  quantity: string
  warehouseId: string
}

const InsertForm = ({returnInvoiceId}: { returnInvoiceId: string }) => {

  const { translate } = useTranslationFunction()

  const validation = useValidation<IReturnInvoiceInsertItemModel>()

  const {state, resetValidations, getFieldRef, validate, setFieldValue} = validation

  const {invoiceAddItem, returnInvoice} = useReturnInvoiceForm(returnInvoiceId)

  const [mutationUpdateItem] = useUpdateItemMutation()

  const [currentItem, setCurrentItem]: [TItem, (r: TItem) => void] = useState({} as TItem)

  const [showFindItem, setShowFindItem] = useState({visible:false})

  const [resetValidation, setResetValidation] = useState({reset:false})

  const [focusElement, setFocusElement]: [IFieldsRefs, (r: IFieldsRefs) => void] = useState({} as IFieldsRefs)
  const [check, setCheck]: [boolean, (b: boolean) => void] = useState(true as boolean)

  const {data} = useWarehousesQuery()

  const warehousesOptions = React.useMemo(() => {
    let warehouses: any = []
    if (!currentItem || !currentItem.id) {
      return warehouses
    }
    if (data && data.data.items) {
      warehouses = data.data.items.map((warehouse: any) => {
        return {
          label:warehouse.name,
          description:warehouse.description,
          value: `${warehouse.id}`
        }
      })
    }
    return [
      ...warehouses
    ]
  }, [data, currentItem])

  useEffect(() => {
    if (!returnInvoice) {
      return
    }
    if (returnInvoice?.items && (returnInvoice as any).items.length !== 0) {
      const warehouseId = [...(returnInvoice as any).items].reverse()[0].warehouseId
      setFieldValue('warehouseId', `${warehouseId}` as any, true)
    } else {
      if (warehousesOptions && warehousesOptions.length !== 0) {
        setFieldValue('warehouseId', `${warehousesOptions[0].value}` as any, true)
      }
    }
  }, [returnInvoice, setFieldValue, warehousesOptions])

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

  useEffect(() => {
    if (!currentItem || !currentItem.id) {
      return
    }
    const price = returnInvoice.flag === CONSTANT_WAREHOUSE.TYPES.WHOLESALE ? currentItem.vp : currentItem.mp
    setFieldValue('sellingPrice', `${price}`, true)
  }, [currentItem, setFieldValue])

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
      handlerSetFocus('quantity')
    }
  }, [setCurrentItem, handlerSetFocus, closeBackgroundFindItem])

  const handlerSubmitEditItem = async (item: TItem) => {
    await mutationUpdateItem({
      variables:{
        id:Number(currentItem.id),
        data:item
      }
    }).then(v => {
      if ((v.data as any).item) {
        setCurrentItem((v.data as any).item)
      }
    })
  }

  const {setRef} = useExternalKeyboard((e: KeyboardEvent) => {

    switch (e.key) {
      case KeyboardEventCodes.F3:
        if (currentItem.id) {
          handlerEditItem()
        }
        return

      case KeyboardEventCodes.F5:
        openFindItem()
        return

      case KeyboardEventCodes.Enter:
        e.preventDefault()
        handlerInsertItem().then()
        break
    }
  }, true, [KeyboardEventCodes.Tab, KeyboardEventCodes.F2, KeyboardEventCodes.F3, KeyboardEventCodes.F5, KeyboardEventCodes.Enter], 'return-invoice-item-insert-form')

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
    if (!data.warehouseId) {
      return
    }
    try {
      await invoiceAddItem({
        price:toNumberFixed(data.sellingPrice),
        itemId:Number(currentItem.id),
        quantity:toNumberFixed(data.quantity),
        warehouseId:Number(data.warehouseId),
        useDiscountDefault: 0
      } as any)
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
      fieldRef = refs.find(x => x.field === 'discount')
      if (!fieldRef) {
        fieldRef = getFieldRef('quantity')
      }
    }
    fieldRef && setFocusElement({...fieldRef})
  }, [setFocusElement, getFieldRef])

  const handlerEditItem = () => {
    if (!currentItem.id) {
      return
    }
    openDialogItemForm({
      item:currentItem,
      submitFun:handlerSubmitEditItem,
      closeFun:handlerCloseFunction
    })
  }

  const handlerCloseFindItem = React.useCallback(() => {
    closeBackgroundFindItem()
    setResetValidation({reset:true})
    handlerCloseFunction().then()
  }, [setResetValidation, closeBackgroundFindItem, handlerCloseFunction])

  const handlerSelectWarehouse = useCallback(() => {
    _focusElementAfter(FOCUS_ID.RETURN_INVOICE.INSERT_FORM.ADD_BUTTON)
  },[_focusElementAfter])

  return (
    <div className={'pt-4 px-2 pr-0 mt-1 relative hw-invoice-insert-item-form-root pr-3'} ref={setRef}>
      <div className={`hw-auto-item-search-box ${showFindItem.visible ? '' : ' hw-auto-item-search-box-hide'}`}>
        <AutoCompleteFindItem
                    processSelected={handlerItemSelected}
                    supplier={returnInvoice?.customer}
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
        <div className={'flex-2 relative pl-0 pr-3'}>
          <div className={'hw-invoice-insert-item-form-preview mt-1'} onClick={openFindItem}>
            <AutoCompleteResultRenderItem data={currentItem} customer={returnInvoice?.customer}/>
          </div>
          <ConditionalRendering condition={!!currentItem.id}>
            <ButtonShortcut
                            icon={faEdit}
                            onClick={handlerEditItem}
                            style={{position:'absolute', top:'-30px', right:'5px'}}
                            label={'edit'}
                            shortcut={KeyboardEventCodes.F3}
                            classNames={'hw-shortcut-button primary sm hw-button-border-color'}
            />
          </ConditionalRendering>
        </div>
        <div className={'ml-3 hw-input-discount'}>
          <InputTextWithValidation
                        validation={{
                          useValidation:validation,
                          model:'quantity',
                          rule:{
                            required: required({message: translate('REQUIRED_FIELD')})
                          },
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
        <div className={'pl-2 hw-input-calendar-input'}>
          <InputTextWithValidation
                        validation={{
                          useValidation:validation,
                          model:'sellingPrice',
                          rule:{
                            required: required({message: translate('REQUIRED_FIELD')})
                          },
                          format:{
                            rule:FORMAT_CURRENCY_STANDARD,
                            validationMessage:'Enter valid price'
                          }
                        }}
                        selectOnFocus
                        align={'align-right'}
                        label={translate('LABEL_SELLING_PRICE')}
          />
        </div>
        <div className={'pl-2 hw-select-input'}>
          {
            warehousesOptions.length === 0 ? (
              <div className={'d-flex flex-column text-upper'}>
                <Label label={translate('LABEL_WAREHOUSE')}/>
                <div className={'d-flex flex-column justify-content-center align-items-center color-primary pb-4 font-smaller-1 flex-1'}>
                  <div>{ translate('LABEL_WAREHOUSE') }</div>
                  <div className={'opacity-8'}>{ translate('LABEL_QTY') } - ####.###</div>
                </div>
              </div>
            ) :  <SelectTextWithValidation
                                label={translate('LABEL_WAREHOUSE')}
                                helperText={''}
                                className={''}
                                options={warehousesOptions}
                                fullWidth
                                onChange={handlerSelectWarehouse}
                                validation={{
                                  useValidation:validation,
                                  model:'warehouseId',
                                  rule:{
                                    required: required({message: translate('REQUIRED_FIELD')})
                                  }
                                }}
            />
          }
        </div>
        <div className={'pl-2'}>
          <ButtonShortcut
                        focusId={FOCUS_ID.RETURN_INVOICE.INSERT_FORM.ADD_BUTTON}
                        icon={faTable}
                        onClick={handlerInsertItem}
                        label={translate('SMALL_BUTTON_ADD')}
                        classNames={'hw-shortcut-button primary sm hw-button-border-color'}
          />
        </div>
      </div>

    </div>
  )

}

export default InsertForm
