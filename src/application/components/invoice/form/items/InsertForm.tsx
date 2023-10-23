import React, {
  useCallback,
  useEffect,
  useState
}                                   from 'react'
import {
  FORMAT_CURRENCY_STANDARD,
  FORMAT_QUANTITY_STANDARD,
  IFieldsRefs,
  required,
  useValidation
}                                   from '../../../../../validation'
import { TItem }                    from '../../../../../graphql/type_logic/types'
import { useBackground }            from '../../../../hooks/useBackgroundPanel'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                   from '../../../../../components/hooks/useExternalKeybaord'
import { openDialogItemForm }       from '../../../items/form/ItemForm'
import ButtonShortcut               from '../../../../../components/Button/ButtonShortcut'
import {
  faBarcode,
  faEdit,
  faPercentage,
  faTable
}                                   from '@fortawesome/free-solid-svg-icons'
import ConditionalRendering         from '../../../../../components/Util/ConditionalRender'
import InputTextWithValidation      from '../../../../../components/withValidation/InputTextWithValidation'
import { AutoCompleteFindItem }     from '../../../autocomplete/AutoCompleteFindItem'
import AutoCompleteResultRenderItem from '../../../items/autocomplete/AutoCompleteResultRenderItem'
import SelectTextWithValidation     from '../../../../../components/withValidation/SelectTextWithValidation'
import {
  useUpdateItemMutation,
  useWarehouseItemsInfoQuery,
  useWarehousesQuery
}                                   from '../../../../../graphql/graphql'
import { useInvoiceForm }           from '../../../../../store/invoice/useInvoice'
import {
  formatQuantity,
  toNumberFixed
}                                 from '../../../../utils/Utils'
import _                          from 'lodash'
import {
  CONSTANT_INVOICE,
  CONSTANT_WAREHOUSE
}                                 from '../../../../constants'
import CheckBox                   from '../../../../../components/CheckBox/CheckBox'
import { processErrorGraphQL }    from '../../../../../apollo'
import Label                      from '../../../../../components/basic/Label'
import { _focusElementAfter }     from '../../../../../components/EasyModel/EasyModal'
import { FOCUS_ID }               from '../../../../constants/FocusElementIDs'
import { useTranslationFunction } from '../../../../../components/Translation/useTranslation'

export interface IInvoiceInsertItemModel {
  sellingPrice: string
  quantity: string
  discount?: string
  warehouseId: string
}

const InsertForm = ({invoiceId}: { invoiceId: string }) => {

  const { translate } = useTranslationFunction()

  const validation = useValidation<IInvoiceInsertItemModel>()

  const {state, resetValidations, getFieldRef, validate, setFieldValue} = validation

  const {invoiceAddItem, invoice} = useInvoiceForm(invoiceId)

  const [mutationUpdateItem] = useUpdateItemMutation()

  const [currentItem, setCurrentItem]: [TItem, (r: TItem) => void] = useState({} as TItem)

  const [showFindItem, setShowFindItem] = useState({visible:false})

  const [resetValidation, setResetValidation] = useState({reset:false})

  const [focusElement, setFocusElement]: [IFieldsRefs, (r: IFieldsRefs) => void] = useState({} as IFieldsRefs)
  const [check, setCheck]: [boolean, (b: boolean) => void] = useState(true as boolean)

  const {data} = useWarehousesQuery()

  const {data:warehouseInfos} = useWarehouseItemsInfoQuery({
    variables:{
      filter:{
        $and:[{
          itemId:Number(currentItem.id)
        }]
      },
      include:[
        {
          model:'Warehouse'
        },
        {
          model:'WarehouseItem'
        }
      ]
    },
    skip:!currentItem || !currentItem.id
  })

  const warehousesOptions = React.useMemo(() => {
    let warehouses: any = []
    if (!currentItem || !currentItem.id) {
      return warehouses
    }
    if (warehouseInfos && warehouseInfos.data && warehouseInfos.data.items.length !== 0) {
      warehouses = warehouseInfos.data.items.map((warehouse: any) => {
        const qtyStack = _.get(warehouse, 'warehouseItem.quantityOnStack',0)
        const itemQty = invoice && invoice.items ? (invoice.items as any).reduce((acc:any,item:any) => {
          if (item.warehouseId === warehouse.warehouseId && item.itemId === warehouse.warehouseItem.itemId) {
            return _.add(acc,item.quantity)
          }
          return acc
        } ,0) : 0
        const qty = _.round(_.subtract(qtyStack,itemQty),2)
        return {
          label:_.get(warehouse, 'warehouse.name'),
          description:`qty - ${formatQuantity(qty)}`,
          value: `${warehouse.warehouseId}`
        }
      })
    } else {
      if (data && data.data.items) {
        warehouses = data.data.items.map((warehouse: any) => {
          return {
            label:warehouse.name,
            description:warehouse.description,
            value: `${warehouse.id}`
          }
        })
      }
    }
    return [
      ...warehouses
    ]
  }, [data, warehouseInfos, currentItem])

  useEffect(() => {
    if (!invoice) {
      return
    }
    if (invoice?.items && (invoice as any).items.length !== 0) {
      const warehouseId = [...(invoice as any).items].reverse()[0].warehouseId
      setFieldValue('warehouseId', `${warehouseId}` as any, true)
    } else {
      if (warehousesOptions && warehousesOptions.length !== 0) {
        setFieldValue('warehouseId', `${warehousesOptions[0].value}` as any, true)
      }
    }
  }, [invoice, setFieldValue, warehousesOptions])

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
    const price = invoice.flag === CONSTANT_WAREHOUSE.TYPES.WHOLESALE ? currentItem.vp : currentItem.mp
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
  }, true, [KeyboardEventCodes.Tab, KeyboardEventCodes.F2, KeyboardEventCodes.F3, KeyboardEventCodes.F5, KeyboardEventCodes.Enter], 'invoice-item-insert-form')

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
        useDiscountDefault:!check ? CONSTANT_INVOICE.TYPE.DEFAULT_DISCOUNT.NOT_ACTIVE : CONSTANT_INVOICE.TYPE.DEFAULT_DISCOUNT.ACTIVE,
        discount:data.discount ? {
          percent:toNumberFixed(data.discount as string)
        } : void(0)
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

  const handlerOnCheck = (e: any) => {
    setCheck(e.target.value)
  }

  const handlerCloseFindItem = React.useCallback(() => {
    closeBackgroundFindItem()
    setResetValidation({reset:true})
    handlerCloseFunction().then()
  }, [setResetValidation, closeBackgroundFindItem, handlerCloseFunction])

  const handlerSelectWarehouse = useCallback(() => {
    _focusElementAfter(FOCUS_ID.INVOICE.INSERT_FORM.ADD_BUTTON)
  },[_focusElementAfter])

  return (
    <div className={'pt-4 px-2 pr-0 mt-1 relative hw-invoice-insert-item-form-root pr-3'} ref={setRef}>
      <div className={`hw-auto-item-search-box ${showFindItem.visible ? '' : ' hw-auto-item-search-box-hide'}`}>
        <AutoCompleteFindItem
                    processSelected={handlerItemSelected}
                    supplier={invoice?.customer}
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

      <div className={'hw-invoice-insert-item-form-discount-check-box  text-upper'}>
        <CheckBox
                    label={translate('INVOICE_FORM_LABEL_USE_DEFAULT_DISCOUNT')}
                    labelSize={3}
                    labelColor={'grey'}
                    classNames={'font-smaller-4'}
                    value={check}
                    component-direction={'row-reverse'}
                    onChange={handlerOnCheck}
        />
      </div>

      <div className={'d-flex align-items-center w-100 p-0'}>
        <div className={'flex-2 relative pl-0 pr-3'}>
          <div className={'hw-invoice-insert-item-form-preview mt-1'} onClick={openFindItem}>
            <AutoCompleteResultRenderItem data={currentItem} customer={invoice?.customer}/>
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
        <div className={'pl-2 hw-input-discount'}>
          <InputTextWithValidation
                        validation={{
                          useValidation:validation,
                          model:'discount',
                          format:{
                            rule:{
                              ...FORMAT_CURRENCY_STANDARD,
                              maxValue:99.99
                            },
                            validationMessage:'Enter valid discount'
                          }
                        }}
                        iconAction={{
                          icon:faPercentage
                        }}
                        selectOnFocus={false}
                        align={'align-right'}
                        label={translate('LABEL_DISCOUNT')}
          />
        </div>
        <div className={'pl-2 hw-select-input'}>
          {
            warehousesOptions.length === 0 ? (
              <div className={'d-flex flex-column text-upper'}>
                <Label label={translate('LABEL_WAREHOUSE')}/>
                <div className={'d-flex flex-column justify-content-center align-items-center color-primary pb-4 font-smaller-1 flex-1'}>
                  <div>{ translate('LABEL_WAREHOUSE') }</div>
                  <div className={'opacity-8'}>{ translate('LABEL_QTY') } - ###.###</div>
                </div>
              </div>
            ) : warehousesOptions.length === 1 ?
              (
                <div className={'d-flex flex-column text-upper'}>
                  <Label label={translate('LABEL_WAREHOUSE')}/>
                  <div className={'d-flex flex-column justify-content-center align-items-center color-primary pb-4 font-smaller-1 flex-1'}>
                    <div>{warehousesOptions[0].label}</div>
                    <div className={'opacity-8'}>{warehousesOptions[0].description}</div>
                  </div>
                </div>
              ) :    <SelectTextWithValidation
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
              focusId={FOCUS_ID.INVOICE.INSERT_FORM.ADD_BUTTON}
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
