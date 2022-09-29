import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useState
}                                 from 'react'
import {
  DISCOUNT_SURCHARGE,
  DISCOUNT_SURCHARGE_TYPE
}                                 from '../../../../../constants'
import {
  FORMAT_CURRENCY_STANDARD,
  IFieldsRefs,
  required,
  useValidation
}                                 from '../../../../../../validation'
import { Paper }                  from '../../../../../../components/Paper'
import {
  formatPrice,
  toNumberFixed
}                                 from '../../../../../utils/Utils'
import { get as _get }            from 'lodash'
import SelectTextWithValidation   from '../../../../../../components/withValidation/SelectTextWithValidation'
import InputTextWithValidation    from '../../../../../../components/withValidation/InputTextWithValidation'
import DialogButtonsSaveUpdate    from '../../../../_common/DialogButtonsSaveUpdate'
import {
  faDollarSign,
  faPercentage
}                                 from '@fortawesome/free-solid-svg-icons'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                 from '../../../../../../components/EasyModel/EasyModal'
import { CenteredDialog }         from '../../../../../../components/Dialog/DialogBasic'
import CheckBoxWithValidation     from '../../../../../../components/withValidation/CheckBoxWithValidation'
import { useTranslationFunction } from '../../../../../../components/Translation/useTranslation'

export interface IDiscountSurcharge {
  node : DISCOUNT_SURCHARGE,
  type : DISCOUNT_SURCHARGE_TYPE,
  value : string
}

export interface IDiscountRecord {
  discount : IDiscountSurcharge
  description : string
  useDiscountDefault? : boolean
}

interface ICalculationDiscountAddEditRenderProps {
  closeDialog : () => void,
  item? : any
  handlerSuccess : ( discount : IDiscountSurcharge, model : any, useDiscountDefault ? : boolean ) => Promise<any>
  description? : boolean
}

const styleNoVisible = {
  display : 'none'
} as any

const DiscountForm = ( { closeDialog, item, handlerSuccess } : ICalculationDiscountAddEditRenderProps ) => {

  const { translate } = useTranslationFunction()
  const validation = useValidation<IDiscountRecord>()
  const [focusElement, setFocusElement] : [ IFieldsRefs, ( r : IFieldsRefs ) => void ] = useState( {} as IFieldsRefs )
  const { setFieldValue, resetValidations, getFieldRef, state, refFields } = validation

  const handlerSetFocus = useCallback( ( field : string ) => {
    const refData = getFieldRef( field )
    if ( refData && refData.ref ) {
      setFocusElement( refData )
    }
  }, [getFieldRef, setFocusElement] )

  useEffect( () => {
    resetValidations()
    let stringField = 'valuePercent'
    if ( !item || ( item.discount && !item.discount.value ) ) {
      setFieldValue( 'discount.node', `${ DISCOUNT_SURCHARGE.DISCOUNT }`, false )
      setFieldValue( 'discount.type', `${ DISCOUNT_SURCHARGE_TYPE.PERCENT }`, false )
      setFieldValue( 'useDiscountDefault', !!item.useDiscountDefault as any, false )
      return
    }
    if ( item.discount.type === DISCOUNT_SURCHARGE_TYPE.FINANCE ) {
      stringField = 'valueFinance'
    }
    setFieldValue( 'useDiscountDefault', !!item.useDiscountDefault as any, false )
    setFieldValue( 'discount.node', `${ item.discount.node }`, false )
    setFieldValue( 'discount.type', `${ item.discount.type }`, false )
    setFieldValue( stringField, `${ formatPrice( item.discount.value ) }`, false )

  }, [item, setFieldValue, resetValidations] )

  useEffect( () => {
    let field = 'valuePercent'
    if ( !state.discount ) {
      return
    }
    if ( state.discount.type === DISCOUNT_SURCHARGE_TYPE.FINANCE ) {
      field = 'valueFinance'
    }
    handlerSetFocus( field )
  }, [state, handlerSetFocus] )

  useEffect( () => {
    if ( focusElement.ref && focusElement.ref.current ) {
      focusElement.ref.current.focus()
    }
  }, [focusElement] )

  const handlerCancelDialog = () => {
    closeDialog && closeDialog()
  }

  const handlerOnSubmit = async () => {
    const { data, validations, refs } = await validation.validate()
    let error = false
    let stringField : string = 'valuePercent'
    if ( +data.discount.type === +DISCOUNT_SURCHARGE_TYPE.FINANCE ) {
      stringField = 'valueFinance'
    }
    if ( ( validations as any ).validations[stringField].error ) {
      error = true
    }
    if ( error ) {
      const fieldRef = refs.find( x => x.field === stringField )
      fieldRef && fieldRef.ref.current.focus()
      return
    }
    const _data = {
      value : !!_get( data, stringField ) ? toNumberFixed( _get( data, stringField ) ) : void( 0 ),
      node : +data.discount.node,
      type : +data.discount.type
    } as any
    handlerSuccess( _data, item, data.useDiscountDefault ).then( () => {
      closeDialog()
    } )
  }

  const icon = React.useMemo( () => !state.discount ? faPercentage : ( +state.discount.type ) === DISCOUNT_SURCHARGE_TYPE.FINANCE ? faDollarSign : faPercentage, [state] )

  const handlerChangeDiscountType = useCallback( ( e : ChangeEvent<HTMLSelectElement> ) => {
    const val = e.target.value
    const field = `${ DISCOUNT_SURCHARGE_TYPE.PERCENT }` === val ? 'valuePercent' : 'valueFinance'
    setFieldValue( field, '', true )
    handlerSetFocus( field )
  }, [setFieldValue, handlerSetFocus] )

  return (
    <Paper className={ 'd-flex flex-column hw-paper' } header={ !item ? translate( 'DISCOUNT_FORM_HEADER_TITLE_INSERT' ) : translate( 'DISCOUNT_FORM_HEADER_TITLE_UPDATE' ) }>
      <div className={ 'd-flex flex-column hw-client-form-add-contact-form' }>
        <div className={ 'hw-invoice-discount-form-default-discount-check-box text-upper' }>
          <CheckBoxWithValidation
                        label={ translate( 'INVOICE_FORM_LABEL_USE_DEFAULT_DISCOUNT' ) }
                        labelSize={ 1 }
                        labelColor={ 'grey' }
                        classNames={ 'font-smaller-4' }
                        validation={ {
                          useValidation : validation,
                          model : 'useDiscountDefault'
                        } }
          />
        </div>
        <div className={ 'container' }>
          <div className={ 'col-4' }>
            <SelectTextWithValidation
                            label={ translate( 'DISCOUNT_FORM_DISCOUNT_SURCHARGE_LABEL' ) }
                            helperText={ translate( 'DISCOUNT_FORM_DISCOUNT_SURCHARGE_HELPER_TEXT' ) }
                            options={ [
                              {
                                label : translate( 'DISCOUNT_FORM_SELECT_OPTIONS_DISCOUNT' ),
                                value : `${ DISCOUNT_SURCHARGE.DISCOUNT }`
                              },
                              {
                                label : translate( 'LABEL_SURCHARGE' ),
                                value : `${ DISCOUNT_SURCHARGE.SURCHARGE }`
                              }
                            ] }
                            validation={ {
                              useValidation : validation,
                              model : 'discount.node',
                              rule : {
                                required
                              }
                            } }
            />
          </div>
          <div className={ 'col-4' }>
            <SelectTextWithValidation
                            label={ translate( 'DISCOUNT_FORM_TYPE_LABEL' ) }
                            helperText={ translate( 'DISCOUNT_FORM_TYPE_HELPER_TEXT' ) }
                            options={ [
                              {
                                label : translate( 'LABEL_FINANCE' ),
                                value : DISCOUNT_SURCHARGE_TYPE.FINANCE.toString()
                              },
                              {
                                label : translate( 'LABEL_PERCENT' ),
                                value : DISCOUNT_SURCHARGE_TYPE.PERCENT.toString()
                              }
                            ] }
                            onChange={ handlerChangeDiscountType }
                            validation={ {
                              useValidation : validation,
                              model : 'discount.type',
                              rule : {
                                required
                              }
                            } }
            />
          </div>

          <div className={ 'col-4' }>
            <div style={ state.discount && ( +state.discount.type ) !== DISCOUNT_SURCHARGE_TYPE.PERCENT ? styleNoVisible : {} }>
              <InputTextWithValidation
                                selectOnFocus
                                label={ translate( 'DISCOUNT_FORM_VALUE_LABEL' ) }
                                helperText={ translate( 'DISCOUNT_FORM_VALUE_HELPER_TEXT' ) }
                                align={ 'align-right' }
                                validation={ {
                                  useValidation : validation,
                                  model : 'valuePercent',
                                  rule : {},
                                  format : {
                                    rule : {
                                      format : 'CURRENCY',
                                      decimalChar : '.',
                                      decimalPlace : 2,
                                      maxValue : 99.99
                                    },
                                    validationMessage : 'Enter valid value'
                                  }
                                } }
              />
            </div>
            <div style={ state.discount && ( +state.discount.type ) !== DISCOUNT_SURCHARGE_TYPE.FINANCE ? styleNoVisible : {} }>
              <InputTextWithValidation
                                selectOnFocus
                                label={ translate( 'DISCOUNT_FORM_VALUE_LABEL' ) }
                                helperText={ translate( 'DISCOUNT_FORM_VALUE_HELPER_TEXT' ) }
                                align={ 'align-right' }
                                validation={ {
                                  useValidation : validation,
                                  model : 'valueFinance',
                                  rule : {},
                                  format : {
                                    rule : FORMAT_CURRENCY_STANDARD,
                                    validationMessage : 'Enter valid value'
                                  }
                                } }
              />
            </div>
          </div>

          <div className={ 'col-md-12 ' }>
            <InputTextWithValidation
                            label={ translate( 'LABEL_DESCRIPTION' ) }
                            fullWidth
                            validation={ {
                              useValidation : validation,
                              model : 'description'
                            } }
            />
          </div>

          <DialogButtonsSaveUpdate
                        cancelFun={ handlerCancelDialog }
                        submitFun={ handlerOnSubmit }
                        icon={ icon }
                        update={ !!item }
          />

        </div>
      </div>
    </Paper>
  )
}
DiscountForm.defaultProps = {
  description : true
}

export default DiscountForm

export const openDialogDiscountForm = ( { item, handlerSuccess, description } : { item : any, handlerSuccess? : ( discount : IDiscountSurcharge, model : any ) => Promise<any> | void, description? : boolean } ) => {
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    openDialog( <DialogModalRootComponent name={ 'dialog-calculation-discount-1231321312321312' } closeFn={ closeDialog }>
      <CenteredDialog
                closeAction={ closeDialog }
                Component={ DiscountForm }
                componentRenderProps={ {
                  closeDialog : closeDialog,
                  item,
                  handlerSuccess,
                  description
                } }
      />
    </DialogModalRootComponent> )
  } )
}
