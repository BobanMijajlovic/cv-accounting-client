import React, {
  useEffect,
  useState
}                                   from 'react'
import {
  FORMAT_CURRENCY_STANDARD,
  FORMAT_QUANTITY_STANDARD,
  IFieldsRefs,
  required,
  useValidation
}                                   from '../../../../../../validation'
import {
  TCalculation,
  TItem
}                                   from '../../../../../../graphql/type_logic/types'
import { useBackground }            from '../../../../../hooks/useBackgroundPanel'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                   from '../../../../../../components/hooks/useExternalKeybaord'
import { openDialogAddSupplierSku } from './SupplierItemForm'
import { openDialogItemForm }       from '../../../../items/form/ItemForm'
import ButtonShortcut               from '../../../../../../components/Button/ButtonShortcut'
import {
  faBarcode,
  faDollarSign,
  faEdit,
  faPercentage,
  faTable
}                                   from '@fortawesome/free-solid-svg-icons'
import ConditionalRendering         from '../../../../../../components/Util/ConditionalRender'
import InputTextWithValidation      from '../../../../../../components/withValidation/InputTextWithValidation'
import { AutoCompleteFindItem }     from '../../../../autocomplete/AutoCompleteFindItem'
import AutoCompleteResultRenderItem from '../../../../items/autocomplete/AutoCompleteResultRenderItem'
import { useCalculationForm }       from '../../../../../hooks/useCalculation'
import ItemsFormSettings            from './ItemFormSettings'
import { CONSTANT_CALCULATION }     from '../../../../../constants'
import * as _                       from 'lodash'
import { toNumberFixed }            from '../../../../../utils/Utils'
import { useUpdateItemMutation }    from '../../../../../../graphql/graphql'
import { processErrorGraphQL }      from '../../../../../../apollo'

export interface ICalculationInsertItemModel {
  priceNoVat ?: string
  priceWithVat ?: string
  financeVP : string
  financeMP ?: string
  quantity : string
  discountPercent ?: string
  discountValue ?: string
}

const {FINANCE_WITH_VAT, PRICE_WITH_VAT, PRICE_NO_VAT} = CONSTANT_CALCULATION.TYPES.ITEM_FORM

const InsertForm = ({currentPosition, calculation} : { currentPosition : string | number, calculation : TCalculation }) => {

  const validation = useValidation<ICalculationInsertItemModel>()

  const {resetValidations, getFieldRef, validate, setFieldValue, setFieldError} = validation

  const [mutationUpdateItem] = useUpdateItemMutation()

  const {calculationAddItem, changeItemFormSettings} = useCalculationForm(calculation.id as string)

  const [currentItem, setCurrentItem] : [TItem, (r : TItem) => void] = useState({} as TItem)

  const [showFindItem, setShowFindItem] = useState({visible: false})

  const [resetValidation, setResetValidation] = useState({reset: false})

  const [focusElement, setFocusElement] : [IFieldsRefs, (r : IFieldsRefs) => void] = useState({} as IFieldsRefs)

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
    setShowFindItem({visible: false})
  }, [setShowFindItem])

  const {closeBackground: closeBackgroundFindItem, openBackground: openBackgroundFindItem} = useBackground(_closeFindItem)

  const openFindItem = () => {
    if (showFindItem?.visible) {
      return
    }
    openBackgroundFindItem()
    setShowFindItem({visible: true})
    setShowFindItem({visible: true})
    setFocusSearch({value: ''})
    setResetValidation({reset: true})
  }

  const handlerSetFocus = (field : string) => {
    const refData = getFieldRef(field)
    if (refData && refData.ref) {
      setFocusElement(refData)
    }
  }

  const handlerCloseFunction = async () => {
    const {validations, refs} = await validation.validate()
    await validation.resetValidations()
    let fieldRef : IFieldsRefs | undefined = refs.find(({field}) => _.get(validations, `validations.${field}.error`))
    if (!fieldRef) {
      fieldRef = refs.find(x => x.field === 'discount')
    }
    fieldRef && fieldRef.ref && fieldRef.ref.current.focus()
  }

  const [focusSearch, setFocusSearch] = useState({value: ''})

  const handlerItemSelected = React.useCallback((item : TItem) => {
    setCurrentItem(item || {})
    if (item && item.id) {
      closeBackgroundFindItem()
      handlerSetFocus('quantity')
      setResetValidation({reset: true})
    }
  }, [setCurrentItem, handlerSetFocus, setFieldValue])

  const handlerCloseFindItem = React.useCallback(() => {
    closeBackgroundFindItem()
    setResetValidation({reset: true})
    handlerCloseFunction().then()
  }, [setResetValidation, closeBackgroundFindItem, handlerCloseFunction])

  const {setRef} = useExternalKeyboard((e : KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.F2:
        if (!(calculation as any).supplier || !currentItem.barCode) {
          return
        }
        openDialogAddSupplierSku({
          supplier: (calculation as any).supplier,
          item: currentItem,
          successFunction: handlerItemSelected
        })
        break
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
        handlerInsertItem()
        break
    }
  }, true, [KeyboardEventCodes.Tab, KeyboardEventCodes.F2, KeyboardEventCodes.F3, KeyboardEventCodes.F5, KeyboardEventCodes.Enter], 'calc-insert-form')

  const handlerInsertItem = async () => {
    const {data, validations, refs} = await validate()
    let stringField = 'financeVP'
    let error = false

    switch (calculation.itemInputType) {
      case FINANCE_WITH_VAT:
        stringField = 'financeMP'
        if (validations.validations.financeMP?.error) {
          error = true
        }
        break
      case PRICE_NO_VAT:
        stringField = 'priceNoVat'
        if (validations.validations.priceNoVat?.error) {
          error = true
        }
        break
      case PRICE_WITH_VAT:
        stringField = 'priceWithVat'
        if (validations.validations.priceWithVat?.error) {
          error = true
        }
        break
      default:
        if (validations.validations.financeVP.error) {
          error = true
        }
        break
    }

    if (toNumberFixed(_.get(data, stringField)) === 0) {
      setFieldError(stringField, 'Value is not valid')
      return
    }

    if (error) {
      const fieldRef = refs.find(x => x.field === stringField)
      fieldRef && fieldRef.ref.current.focus()
      return
    }

    if (!currentItem.id) {
      openFindItem()
      return
    }

    const _data = {
      posNumber: Number(currentPosition),
      [stringField]: toNumberFixed(`${_.get(data, stringField)}`),
      itemId: Number(currentItem.id),
      quantity: toNumberFixed(data.quantity)
    } as any
    if (data.discountPercent) {
      _data.discountPercent = toNumberFixed(data.discountPercent)
    }
    if (data.discountValue) {
      _data.discountValue = toNumberFixed(data.discountValue)
    }

    try {
      await calculationAddItem({..._data})
    } catch (e) {
      processErrorGraphQL(e)
      handlerItemSelected({} as TItem)
      await resetValidations(true)
      return
    }
    handlerItemSelected({} as TItem)
    openFindItem()
    await resetValidations(true)
  }

  const handlerClickAddItem = (e : any) => {
    if (!e.detail || e.detail !== 1) {
      return
    }
    handlerInsertItem()
  }

  const handlerSubmitEditItem = async (item : TItem) => {
    await mutationUpdateItem({
      variables: {
        id: Number(currentItem.id),
        data: item
      }
    }).then(v => {
      if ((v.data as any).item) {
        setCurrentItem((v.data as any).item)
      }
    })
  }

  const handlerEditItem = () => {
    if (!currentItem.id) {
      return
    }
    openDialogItemForm({
      item: currentItem,
      submitFun: handlerSubmitEditItem,
      closeFun: handlerCloseFunction
    })
  }

  const styleNoVisible = {
    position: 'absolute',
    top: '-10000px'
  } as any

  const isFinanceWithVatType = React.useMemo(() => {
    return (calculation.itemInputType) === FINANCE_WITH_VAT
  }, [calculation.itemInputType])

  const isPriceNoVatType = React.useMemo(() => {
    return (calculation.itemInputType) === PRICE_NO_VAT
  }, [calculation.itemInputType])

  const isPriceWithVatType = React.useMemo(() => {
    return (calculation.itemInputType) === PRICE_WITH_VAT
  }, [calculation.itemInputType])

  const isFinanceNoVatType = React.useMemo(() => {
    return !isFinanceWithVatType && !isPriceNoVatType && !isPriceWithVatType
  }, [calculation.itemInputType])

  return (
    <div className={'pt-2 px-2 pr-0 mt-1 relative hw-calculation-insert-item-form-root pr-3 d-flex justify-content-between align-items-center'} ref={setRef}>
      <div className={`hw-auto-item-search-box ${showFindItem.visible ? '' : ' hw-auto-item-search-box-hide'}`}>
        <AutoCompleteFindItem processSelected={handlerItemSelected} supplier={(calculation as any).supplier} closeFun={handlerCloseFindItem} focus={focusSearch}/>
      </div>
      <ButtonShortcut
          icon={faBarcode}
          onClick={openFindItem}
          label={'item'}
          shortcut={KeyboardEventCodes.F5}
          classNames={'hw-shortcut-button primary sm hw-button-border-color'}
      />
      <div className={'d-flex align-items-center w-100 p-0 pl-2'}>
        <div className={'col-6 relative pl-0  d-flex justify-content-between flex-1'}>
          <div
                        className={'hw-calculation-item-preview flex-1 mt-1'}
                        onClick={openFindItem}
          >
            <AutoCompleteResultRenderItem data={currentItem} customer={(calculation as any).supplier}/>
          </div>
          <ConditionalRendering condition={!!currentItem.id}>
            <ButtonShortcut
                            icon={faEdit}
                            onClick={handlerEditItem}
                            label={'edit'}
                            shortcut={KeyboardEventCodes.F3}
                            classNames={'hw-shortcut-button primary sm hw-button-border-color ml-1'}
            />
          </ConditionalRendering>
        </div>
        <div className={'ml-1 pl-2 col-1 hw-calculation-insert-item-form-quantity-root'}>
          <InputTextWithValidation
                        validation={{
                          useValidation: validation,
                          model: 'quantity',
                          rule: {
                            required
                          },
                          format: {
                            rule: FORMAT_QUANTITY_STANDARD,
                            validationMessage: 'Enter valid quantity'
                          }
                        }}
                        selectOnFocus={false}
                        align={'align-right'}
                        label={'Qty'}
          />
        </div>
        <div className={'pl-0 col-2 hw-calculation-insert-item-form-finance-price-root'}>
          <div style={isFinanceNoVatType ? {} : styleNoVisible}>
            <InputTextWithValidation
                            validation={{
                              useValidation: validation,
                              model: 'financeVP',
                              rule: {
                                required
                              },
                              format: {
                                rule: FORMAT_CURRENCY_STANDARD,
                                validationMessage: 'Enter valid finance'
                              }
                            }}
                            disabled={!isFinanceNoVatType}
                            selectOnFocus={false}
                            align={'align-right'}
                            label={'Finance no Vat'}
            />
          </div>
          <div style={isFinanceWithVatType ? {} : styleNoVisible}>
            <InputTextWithValidation
                            validation={{
                              useValidation: validation,
                              model: 'financeMP',
                              rule: {
                                required
                              },
                              format: {
                                rule: FORMAT_CURRENCY_STANDARD,
                                validationMessage: 'Enter valid finance'
                              }
                            }}
                            disabled={!isFinanceWithVatType}
                            selectOnFocus={false}
                            align={'align-right'}
                            label={'Finance with Vat'}
            />
          </div>
          <div style={isPriceNoVatType ? {} : styleNoVisible}>
            <InputTextWithValidation
                            validation={{
                              useValidation: validation,
                              model: 'priceNoVat',
                              rule: {
                                required
                              },
                              format: {
                                rule: FORMAT_CURRENCY_STANDARD,
                                validationMessage: 'Enter valid price'
                              }
                            }}
                            disabled={!isPriceNoVatType}
                            selectOnFocus={false}
                            align={'align-right'}
                            label={'Price no Vat'}
            />
          </div>
          <div style={isPriceWithVatType ? {} : styleNoVisible}>
            <InputTextWithValidation
                            validation={{
                              useValidation: validation,
                              model: 'priceWithVat',
                              rule: {
                                required
                              },
                              format: {
                                rule: FORMAT_CURRENCY_STANDARD,
                                validationMessage: 'Enter valid price'
                              }
                            }}
                            disabled={!isPriceWithVatType}
                            selectOnFocus={false}
                            align={'align-right'}
                            label={'Price no Vat'}
            />
          </div>
        </div>
        <ConditionalRendering condition={false}>
          <div className={'pl-0 d-flex justify-content-between align-items-center hw-calculation-insert-item-form-discount-root'}>
            <InputTextWithValidation
                            validation={{
                              useValidation: validation,
                              model: 'discountPercent',
                              format: {
                                rule: {
                                  format: 'CURRENCY',
                                  decimalChar: '.',
                                  decimalPlace: 2,
                                  maxValue: 99.99
                                },
                                validationMessage: 'Enter valid value'
                              }
                            }}
                            align={'align-right'}
                            label={'Discount'}
                            iconAction={{
                              icon: faPercentage
                            }}
                            classNames={'col-6 pl-0'}
            />
            <InputTextWithValidation
                            validation={{
                              useValidation: validation,
                              model: 'discountValue',
                              format: {
                                rule: FORMAT_CURRENCY_STANDARD,
                                validationMessage: 'Enter valid discount'
                              }
                            }}
                            align={'align-right'}
                            label={''}
                            iconAction={{
                              icon: faDollarSign
                            }}
                            classNames={'col-6 pl-0'}
            />
          </div>
        </ConditionalRendering>
        <div className={'pl-2'}>
          <ButtonShortcut
              icon={faTable}
              onClick={handlerClickAddItem}
              label={'add'}
              classNames={'hw-shortcut-button primary sm hw-button-border-color'}
          />
        </div>
        <div className={'color-primary pl-1'}>
          <ItemsFormSettings
              type={(calculation as any).itemInputType}
              changeType={changeItemFormSettings}
          />
        </div>
      </div>

    </div>
  )

}

export default InsertForm
