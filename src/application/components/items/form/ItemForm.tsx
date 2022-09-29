import React, {
  useEffect,
  useMemo
}                                 from 'react'
import {
  FORMAT_CURRENCY_STANDARD,
  IFieldsRefs,
  minLength,
  required,
  useValidation
}                                 from '../../../../validation'
import {
  TCustomer,
  TItem
}                                 from '../../../../graphql/type_logic/types'
import InputTextWithValidation    from '../../../../components/withValidation/InputTextWithValidation'
import SelectTextWithValidation   from '../../../../components/withValidation/SelectTextWithValidation'
import EmptyTag                   from '../../../../components/Util/EmptyTag'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                 from '../../../../components/EasyModel/EasyModal'
import DialogButtonsSaveUpdate    from '../../_common/DialogButtonsSaveUpdate'
import { faPlusCircle }           from '@fortawesome/free-solid-svg-icons'
import { CenteredDialog }         from '../../../../components/Dialog/DialogBasic'
import {
  formatPrice,
  toNumberFixed
}                                 from '../../../utils/Utils'
import * as _                     from 'lodash'
import { processErrorGraphQL }    from '../../../../apollo'
import { useTranslationFunction } from '../../../../components/Translation/useTranslation'
import { useVats }                from '../../../../store/vats/useVats'
import {
  LocalStorage,
  STORAGE_APPLICATION_SETTINGS
}                                 from '../../../utils/LocalStorage'
import { CONSTANT_UNITS }         from '../../../constants'

interface IItemFormProps {
  cancelFun: ()=> void
  submitFun: (item: TItem, callback?: ()=> void, errorFn ?: (e:any)=> void)=> Promise<any> | void
  item?: TItem
  supplier?: TCustomer
}

const ItemForm = ({item, supplier, cancelFun, submitFun}: IItemFormProps) => {

  const {translate} = useTranslationFunction()
  const validation = useValidation<TItem>()

  const {setFieldValue} = validation
  const settings = LocalStorage.getData(STORAGE_APPLICATION_SETTINGS)

  const unitsOptions = useMemo(() => settings && settings.units ? settings.units.map((x:string) => {
    const label = Object.keys(CONSTANT_UNITS).find(key => (CONSTANT_UNITS as any)[key] === Number(x))
    return {
      label: `${label}`,
      value: `${x}`
    }
  }) : [],[settings])

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
      ['uom', 'barCode', 'code', 'shortName', 'fullName', 'taxId'].forEach((s: string) => _.get(item, s) ? setFieldValue(s, _.get(item, s).toString(), false) : null)
    }
  }, [item, setFieldValue])

  const {data} = useVats()

  const vatsOptions = React.useMemo(() => {
    let vatData: any = []
    if (data) {
      vatData = data.map((vat: any) => {
        const vatValue = vat.values[0]
        return {
          label: `${vat.short} ${formatPrice(vatValue.value)} %`,
          value: `${vat.id}`
        }
      })
    }
    return [
      {
        label: 'Tax %',
        value: ''
      },
      ...vatData
    ]
  }, [data])

  const insertItem = async (item: TItem, callBack ?: ()=> void,errorFn ?: any) => {
    return submitFun(item,callBack,errorFn)
  }

  const handlerOnSubmit = async () => {
    const {error, data, validations, refs} = await validation.validate()
    if (error) {
      const fieldRef: IFieldsRefs | undefined = refs.find(({field}) => _.get(validations, `validations.${field}.error`))
      fieldRef && fieldRef.ref.current.focus()
      return
    }
    try {
      const obj = Object.assign({}, {
        ...data,
        vp: toNumberFixed(data.vp as any),
        mp: toNumberFixed(data.mp as any),
        code: Number(data.code),
        taxId: Number(data.taxId),
        uom: Number(data.uom)
      }, (supplier && supplier.id) ? {
        itemSuppliers: [{
          supplierId: supplier.id,
          barCode: data.barCode,
          code: data.code
        }]
      } : {}) as TItem
      const errorFn = (e:any) => {
        processErrorGraphQL(e,validation)
      }
      await insertItem(obj, cancelFun,errorFn)
     
    } catch (e) {
      /** process the error */
      processErrorGraphQL(e, validation)
    }
  }

  return (
    <>
      <div className={'hw-items-form-root shadow-lg py-4'}>
        <div className={'container'}>
          <div className={'col-md-6'}>
            <InputTextWithValidation
              required
              disabled={item}
              align={'align-center'}
              label={translate('BARCODE')}
              helperText={translate('HELPER_TEXT_ENTER_BARCODE')}
              validation={{
                useValidation: validation,
                model: 'barCode',
                rule: {
                  required: required({message: translate('REQUIRED_FIELD')}),
                  minLength: minLength({min: 6, message: translate('VALIDATION_MESSAGE_MIN_LENGTH')})
                },
                format: {
                  rule: {
                    format: '################',
                    mask: ' ',
                    validSize: 6
                  },
                  validationMessage: translate('ITEM_FORM_VALIDATION_FORMAT_BARCODE')
                }
              }}
              focusOnMount={!item}
              selectOnFocus
            />
          </div>
          <div className={'col-md-6'}>
            <InputTextWithValidation
              align={'align-center'}
              label={translate('CODE')}
              helperText={translate('HELPER_TEXT_ENTER_CODE')}
              validation={{
                useValidation: validation,
                model: 'code',
                format: {
                  rule: {
                    format: '########',
                    mask: ' ',
                    validSize: 1
                  },
                  validationMessage: 'Code is not valid'
                }
              }}
              focusOnMount={item}
              selectOnFocus={true}
            />
          </div>
          <div className={'col-md-12'}>
            <InputTextWithValidation
              label={translate('LABEL_FULL_NAME')}
              selectOnFocus
              helperText={translate('HELPER_TEXT_FULL_NAME')}
              maxLength={64}
              validation={{
                useValidation: validation,
                model: 'fullName',
              }}
            />
          </div>
          <div className={'col-md-6'}>
            <InputTextWithValidation
              required
              selectOnFocus
              label={translate('LABEL_SHORT_NAME')}
              helperText={translate('HELPER_TEXT_SHORT_NAME')}
              maxLength={32}
              validation={{
                useValidation: validation,
                model: 'shortName',
                rule: {
                  required: required({message: translate('REQUIRED_FIELD')})
                }
              }}
            />
          </div>
          <div className={'col-md-6'}>
            <SelectTextWithValidation
              required
              label={translate('LABEL_TAX')}
              helperText={translate('HELPER_TEXT_CHOOSE_TAX')}
              options={vatsOptions}
              validation={{
                useValidation: validation,
                model: 'taxId',
                rule: {
                  required: required({message: translate('REQUIRED_FIELD')})
                }
              }}
            />
          </div>
          <div className={'col-md-4'}>
            <InputTextWithValidation
              align={'align-right'}
              selectOnFocus
              label={translate('ITEMS_WHOLESALE_PRICE')}
              helperText={translate('HELPER_TEXT_WHOLESALE_PRICE')}
              validation={{
                useValidation: validation,
                model: 'vp',
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
          <div className={'col-md-4'}>
            <InputTextWithValidation
              align={'align-right'}
              selectOnFocus
              label={translate('ITEMS_RETAIL_PRICE')}
              helperText={translate('HELPER_TEXT_RETAIL_PRICE')}
              validation={{
                useValidation: validation,
                model: 'mp',
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
          <div className={'col-md-4'}>
            <SelectTextWithValidation
              required
              label={translate('LABEL_UNIT_OF_MEASURE')}
              helperText={translate('HELPER_TEXT_UNIT_OF_MEASURE')}
              options={unitsOptions}
              validation={{
                useValidation: validation,
                model: 'uom',
                rule: {
                  required,
                }
              }}
            />
          </div>

          {
            supplier ?
              (
                <div className={'container p-0'}>

                  <div
                    className={'col-md-12 d-flex flex-column justify-content-start font-smaller-2 text-left my-2 color-primary'}>
                    <div className={'px-1 font-bold text-upper'}><EmptyTag model={supplier}
                                                                           field={'shortName'}
                                                                           placeholder={translate('ITEM_LABEL_SUPPLIER_NAME')}/>
                    </div>
                    <small className={'px-1'}><EmptyTag model={supplier} field={'fullName'}
                                                        placeholder={translate('ITEM_LABEL_SUPPLIER_FULL_NAME')}/>
                    </small>
                    <div className={'d-flex flex-column justify-content-between p-1'}>
                      <div className={'d-flex flex-row align-items-center'}>
                        <sub className={'opacity-4'}>{translate('ITEM_LABEL_SUPPLIER_TAX_ID')}&nbsp;:</sub>
                        <div className={'px-1'}><EmptyTag model={supplier} field={'taxNumber'}
                                                          placeholder={'#########'}/>
                        </div>
                      </div>
                      <div className={'d-flex flex-row align-items-center'}>
                        <sub className={'opacity-4'}>{translate('ITEM_LABEL_SUPPLIER_NUM')}&nbsp;:</sub>
                        <div className={'px-1'}><EmptyTag model={supplier}
                                                          field={'uniqueCompanyNumber'}
                                                          placeholder={'#########'}/>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={'col-md-6'}>
                    <InputTextWithValidation
                      selectOnFocus
                      label={'Supplier Barcode'}
                      helperText={'enter supplier barcode'}
                      validation={{
                        useValidation: validation,
                        model: 'itemSupplier.barCode',
                      }}
                    />
                  </div>

                  <div className={'col-md-6'}>
                    <InputTextWithValidation
                      selectOnFocus
                      label={translate('ITEM_LABEL_SUPPLIER_CODE')}
                      helperText={translate('HELPER_TEXT_ENTER_CODE')}
                      validation={{
                        useValidation: validation,
                        model: 'itemSupplier.code',
                      }}
                    />
                  </div>

                </div>
              ) : null
          }

          <DialogButtonsSaveUpdate
            cancelFun={cancelFun}
            submitFun={handlerOnSubmit}
            update={!!item}
            icon={faPlusCircle}
          />

        </div>
      </div>
    </>
  )
}

export default ItemForm

export interface IOpenDialogItem {
  item?: TItem,
  submitFun: (item: TItem)=> void | Promise<any>
  closeFun?: ()=> void
}

export const openDialogItemForm = ({item, submitFun, closeFun}: IOpenDialogItem) => {

  EasyDialogApolloProvider((closeDialog: ()=> any, openDialog: (data: any)=> any) => {
    const handlerCloseFunction = () => {
      closeFun && closeFun()
      closeDialog()
    }

    const Component = () => {
      const ComponentToRender = () => {
        return (
          <ItemForm
            cancelFun={handlerCloseFunction}
            submitFun={submitFun}
            item={item}
          />
        )
      }
      return (
        <DialogModalRootComponent name={'dialog-item-form-8437295732987438279372'} closeFn={handlerCloseFunction}>
          <CenteredDialog
            title={item ? 'Edit item' : 'Define new item'}
            closeAction={handlerCloseFunction}
            Component={ComponentToRender}
          />
        </DialogModalRootComponent>
      )
    }
    openDialog(<Component/>)
  })
}

