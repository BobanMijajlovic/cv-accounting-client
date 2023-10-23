import React, {useEffect}      from 'react'
import {
  FORMAT_CURRENCY_STANDARD,
  IFieldsRefs,
  required,
  useValidation
}                              from '../../../../validation'
import {TItem}                 from '../../../../graphql/type_logic/types'
import InputTextWithValidation from '../../../../components/withValidation/InputTextWithValidation'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                              from '../../../../components/EasyModel/EasyModal'
import DialogButtonsSaveUpdate from '../../_common/DialogButtonsSaveUpdate'
import {
  faPencilAlt,
  faPlusCircle
}                                 from '@fortawesome/free-solid-svg-icons'
import {CenteredDialog}           from '../../../../components/Dialog/DialogBasic'
import {
  formatPrice,
  toNumberFixed
}                                 from '../../../utils/Utils'
import * as _                     from 'lodash'
import EmptyTag                   from '../../../../components/Util/EmptyTag'
import {VatCustomRender}          from '../../_common/VatRender'
import {CONSTANT_WAREHOUSE}       from '../../../constants'
import {processErrorGraphQL}      from '../../../../apollo'
import { useTranslationFunction } from '../../../../components/Translation/useTranslation'

interface IItemPriceTaxFormProps {
  cancelFun : () => void
  submitFun : (item : TItem) => void
  item ?: TItem
  warehouseType ?: number
}

const ItemPriceTaxForm = ({item, cancelFun, submitFun, warehouseType} : IItemPriceTaxFormProps) => {
  const {translate} = useTranslationFunction()
  const validation = useValidation<TItem>()

  const {setFieldValue} = validation
  const {WHOLESALE, RETAIL} = CONSTANT_WAREHOUSE.TYPES

  useEffect(() => {
    if (!item) {
      setFieldValue('vp', '1.00', false)
      setFieldValue('mp', '1.00', false)
    } else {
      if (item.vp) {
        setFieldValue('vp', formatPrice(item.vp as any), false)
      }
      if (item.mp) {
        setFieldValue('mp', formatPrice(item.mp as any), false)
      }
      ['taxId'].forEach((s : string) => _.get(item, s) ? setFieldValue(s, _.get(item, s).toString(), false) : null)
    }
  }, [item, setFieldValue])

  const handlerOnSubmit = async () => {
    const {error, data, validations, refs} = await validation.validate()
    if (error) {
      const fieldRef : IFieldsRefs | undefined = refs.find(({field}) => _.get(validations, `validations.${field}.error`))
      fieldRef && fieldRef.ref.current.focus()
      return
    }
    try {
      const obj = Object.assign({}, {
        id: Number((item as any).id),
        vp: toNumberFixed(data.vp as any),
        mp: toNumberFixed(data.mp as any),
        taxId: Number(data.taxId),
      }) as any
      await submitFun(obj)
      cancelFun()
    } catch (e) {
            /** process the error */
      processErrorGraphQL(e, validation)
    }
  }

  return (
    <>
      <div className={'hw-price-tax-form-root shadow-lg py-4'}>
        <div className={'container'}>
          <div className={'d-flex flex-row justify-content-between align-items-start pb-2 font-smaller-2 w-100'}>
            <div className={'flex-1'}><EmptyTag model={item} field={'shortName'} placeholder={translate('ITEM_PRICE_LABEL_ITEM_NAME')}/></div>
            <div className={'d-flex justify-content-end align-items-center flex-1'}>
              <div className={'pr-2'}><VatCustomRender value={Number(item?.taxId)}/></div>
              <div><EmptyTag model={item} field={'barCode'} placeholder={translate('BARCODE')}/></div>
            </div>
          </div>
          <div className={'col-md-6'}>
            <InputTextWithValidation
                            required
                            align={'align-right'}
                            selectOnFocus
                            label={translate('ITEMS_WHOLESALE_PRICE')}
                            helperText={translate('HELPER_TEXT_WHOLESALE_PRICE')}
                            disabled={warehouseType !== WHOLESALE}
                            focusOnMount={warehouseType === WHOLESALE}
                            validation={{
                              useValidation: validation,
                              model: 'vp',
                              rule: {
                                required
                              },
                              format: {
                                rule: {
                                  ...FORMAT_CURRENCY_STANDARD,
                                  ...{
                                    decimalPlace: 2
                                  }
                                }
                              }
                            }}
            />
          </div>
          <div className={'col-md-6'}>
            <InputTextWithValidation
                            required
                            align={'align-right'}
                            selectOnFocus
                            label={translate('ITEMS_RETAIL_PRICE')}
                            helperText={translate('HELPER_TEXT_RETAIL_PRICE')}
                            disabled={warehouseType !== RETAIL}
                            focusOnMount={warehouseType === RETAIL}
                            validation={{
                              useValidation: validation,
                              model: 'mp',
                              rule: {
                                required
                              },
                              format: {
                                rule: {
                                  ...FORMAT_CURRENCY_STANDARD,
                                  ...{
                                    decimalPlace: 2
                                  }
                                }
                              }
                            }}
            />
          </div>

          <DialogButtonsSaveUpdate
                        cancelFun={cancelFun}
                        submitFun={handlerOnSubmit}
                        update={!!item}
                        icon={item ? faPencilAlt : faPlusCircle}
          />

        </div>
      </div>
    </>
  )
}

export default ItemPriceTaxForm

export interface IOpenDialogItemPriceChange {
  item ?: TItem,
  submitFun : (item : TItem) => void | Promise<any>
  closeFun ?: () => void
  warehouseType ?: number
}

export const openDialogItemPriceTaxForm = ({item, submitFun, closeFun, warehouseType} : IOpenDialogItemPriceChange) => {

  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {

    const handlerCloseFunction = () => {
      closeFun && closeFun()
      closeDialog()
    }
    const Component = () => {
      const ComponentToRender = () => {
        return (
          <ItemPriceTaxForm
                        cancelFun={handlerCloseFunction}
                        submitFun={submitFun}
                        item={item}
                        warehouseType={warehouseType}
          />
        )
      }
      return (
        <DialogModalRootComponent name={'dialog-item-price-form-4024040404040450'} closeFn={closeDialog}>
          <CenteredDialog
                        title={'Edit item prices'}
                        closeAction={closeDialog}
                        Component={ComponentToRender}
          />
        </DialogModalRootComponent>
      )
    }
    openDialog(<Component/>)
  })
}

