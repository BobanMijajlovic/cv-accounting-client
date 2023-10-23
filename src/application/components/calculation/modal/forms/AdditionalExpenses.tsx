import React, {
  useCallback,
  useEffect,
  useState
}                                    from 'react'
import {
  FORMAT_CURRENCY_STANDARD,
  IFieldsRefs,
  required,
  useValidation
}                                    from '../../../../../validation'
import { Paper }                     from '../../../../../components/Paper'
import InputTextWithValidation       from '../../../../../components/withValidation/InputTextWithValidation'
import DialogButtonsSaveUpdate       from '../../../_common/DialogButtonsSaveUpdate'
import {
  faHandHoldingUsd,
  faUserTie
}                                    from '@fortawesome/free-solid-svg-icons'
import CustomerViewShort             from '../../../customer/views/CustomerViewShort'
import { TCustomer }                 from '../../../../../graphql/type_logic/types'
import ButtonShortcut                from '../../../../../components/Button/ButtonShortcut'
import DatePickerWithValidation      from '../../../../../components/withValidation/DatePickerWithValidation'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                    from '../../../../../components/EasyModel/EasyModal'
import { CenteredDialog }            from '../../../../../components/Dialog/DialogBasic'
import InvoiceTaxForm                from '../document-header/InvoiceTax/InvoiceTaxForm'
import InvoiceTaxView                from '../document-header/InvoiceTax/View'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                                    from '../../../../../components/hooks/useOptimizeEventClick'
import { CONSTANT_CALCULATION }      from '../../../../constants'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                    from '../../../../../components/hooks/useExternalKeybaord'
import * as _                        from 'lodash'
import { openDialogAddEditCustomer } from '../../../customer/modal/CustomerSearch'
import {
  IAdditionalExpense,
  IInvoiceTax
}                                    from '../DocumentHeaderForm'
import CheckBox                      from '../../../../../components/CheckBox/CheckBox'
import ConditionalRendering          from '../../../../../components/Util/ConditionalRender'
import { FOCUS_ID }                  from '../../../../constants/FocusElementIDs'

interface ICalculationExpensesAddEditRenderProps {
  successFunction : ( cost : IAdditionalExpense ) => void
  closeDialog? : () => void
  additionalExpense? : IAdditionalExpense[]
}

interface IAdditionalExpenseError {
  customer? : boolean | string
  items? : boolean | string
}

const AdditionalExpensesForm = ( { successFunction, closeDialog, additionalExpense } : ICalculationExpensesAddEditRenderProps ) => {

  const validation = useValidation<IAdditionalExpense>( {
    initialData : {
      items : []
    }
  } )

  const [stateError, setError] : [ IAdditionalExpenseError, ( r : IAdditionalExpenseError ) => void ] = useState( {} as IAdditionalExpenseError )

  const { state, refFields, removeArrayData, addArrayData, setFieldValue, getFieldRef } = validation

  const setSupplier = useCallback( ( supplier : TCustomer ) => {
    setFieldValue( 'customer', supplier as any, true )
    const fieldRef = getFieldRef( 'invoiceNumber' )
    fieldRef && fieldRef.ref && fieldRef.ref.current.focus()
    setError( {} )
  }, [setError, getFieldRef, setFieldValue] )

  const handlerFindSupplier = () => {
    openDialogAddEditCustomer( setSupplier )
  }

  useEffect( () => {
    setFieldValue( 'items.taxId', '2', false )
  }, [setFieldValue] )

  useEffect( () => {
    if ( refFields && refFields.length !== 0 && !state.customer ) {
      setTimeout( () => handlerFindSupplier(), 200 )
      return
    }
  }, [refFields, state.customer] )

  const handlerCancelDialog = () => {
    closeDialog && closeDialog()
  }

  const { onClickHandler } = useOptimizeEventClick( {
    eventHandler ( data : IUseOptimizeEventData ) {
      if ( data.action === CONSTANT_CALCULATION.EVENTS.HEADER.EXTRA_EXPENSE_TAX_REMOVE ) {
        removeArrayData( 'items', Number( data.id ) )
        return
      }
    }
  } )

  useExternalKeyboard( ( e : KeyboardEvent ) => {
    switch ( e.key ) {
      case KeyboardEventCodes.F2:
        handlerFindSupplier()
        return
    }
  }, true, [KeyboardEventCodes.F2] )

  const handlerOnSubmit = async () => {
    const { error, data, refs, validations } = await validation.validate()
    if ( error ) {
      const fieldRef : IFieldsRefs | undefined = refs.find( ( { field } : any ) => _.get( validations, `validations.${ field }.error` ) )
      fieldRef && fieldRef.ref.current.focus()
      return
    }
    setError( {} )
    if ( !data.customer || _.isEmpty( data.customer ) ) {
      setError( {
        ...stateError,
        customer : 'Required field'
      } )
      return
    }
        /* if (!data.items || data.items.length === 0) {
         setError({
         ...stateError,
         items: 'Please insert tax for extra expense'
         })
         return
         }*/

    if ( additionalExpense && additionalExpense.length !== 0 ) {
      if ( additionalExpense.every( ( c : IAdditionalExpense ) => ( data.invoiceNumber === c.invoiceNumber && data.customer.id === c.customer.id &&
                data.items && data.items.every( ( x ) => c.items && c.items.find( y => `${ y.taxId }` === `${ x.taxId }` && y.finance === x.finance ) ) ) ) ) {
        setError( {
          items : 'Additional expense already exists'
        } )
        return
      }
    }

    successFunction( data )
    closeDialog && closeDialog()
  }

  const handlerAddExtraTax = async ( tax : IInvoiceTax ) => {
    setError( {} )
    await addArrayData( 'items', tax )
  }

  const { items } = validation.state

  return (
    <Paper className={ 'd-flex flex-column hw-paper' } header={ 'Extra expenses' }>
      <div className={ 'd-flex flex-column hw-extra-expenses-form' }>
        <div className={ 'container p-0' }>
          <div className={ 'd-flex justify-content-between col-7 color-primary pb-2' }>
            <CustomerViewShort customer={ state.customer as TCustomer } error={ stateError.customer } namePlaceholder={ 'SUPPLIER NAME' }/>
            <ButtonShortcut
                            icon={ faUserTie }
                            onClick={ handlerFindSupplier }
                            label={ 'supplier' }
                            classNames={ 'hw-shortcut-button primary sm hw-button-border-color' }
                            shortcut={ KeyboardEventCodes.F2 }
            />
          </div>
          <div className={ 'col-5 pb-2' }>
            <InputTextWithValidation
                            required
                            label={ 'Invoice Num#' }
                            helperText={ 'enter invoice #' }
                            classNames={ 'lined-version' }
                            fullWidth
                            align={ 'align-center' }
                            upperCase
                            maxLength={ 20 }
                            validation={ {
                              useValidation : validation,
                              model : 'invoiceNumber',
                              rule : {
                                required
                              }
                            } }
            />

          </div>

          <div className={ 'col-6 pb-2' }>
            <DatePickerWithValidation
                            format={ 'dd/MM/yyyy' }
                            helperText={ 'choose date of invoice' }
                            classNames={ 'lined-version' }
                            fullWidth
                            label={ 'Date of invoice' }
                            align={ 'align-center' }
                            validation={ {
                              useValidation : validation,
                              model : 'invoiceDate',
                              rule : {
                                required
                              }
                            } }
            />
          </div>

          <div className={ 'col-6 pb-2' }>
            <DatePickerWithValidation
                            format={ 'dd/MM/yyyy' }
                            helperText={ 'choose dude date' }
                            classNames={ 'lined-version' }
                            fullWidth
                            label={ 'Due Date' }
                            align={ 'align-center' }
                            validation={ {
                              useValidation : validation,
                              model : 'dueDate',
                              rule : {
                                required
                              }
                            } }
            />
          </div>

          <div className={ 'col-6 pb-2' }>
            <InputTextWithValidation
                            required
                            label={ 'Inv. Finance with Tax' }
                            helperText={ '' }
                            fullWidth
                            lined
                            selectOnFocus
                            align={ 'align-right' }
                            validation={ {
                              useValidation : validation,
                              model : 'financeMP',
                              rule : {
                                required
                              },
                              format : {
                                rule : {
                                  ...FORMAT_CURRENCY_STANDARD,
                                  ...{
                                    decimalPlace : 2
                                  }
                                }
                              }
                            } }
            />
          </div>

          <div className={ 'col-6 pb-2' }>
            <InputTextWithValidation
                            required
                            label={ 'Finance Tax' }
                            helperText={ '' }
                            fullWidth
                            lined
                            selectOnFocus
                            align={ 'align-right' }
                            validation={ {
                              useValidation : validation,
                              model : 'financeTax',
                              rule : {
                                required
                              },
                              format : {
                                rule : {
                                  ...FORMAT_CURRENCY_STANDARD,
                                  ...{
                                    decimalPlace : 2
                                  }
                                }
                              }
                            } }
            />
          </div>

          <div className={ 'w-100 pb-2 relative' } onClick={ onClickHandler } data-action-root>

            <AdditionalExpenseTaxes handlerAddExtraTax={ handlerAddExtraTax } taxes={ items }/>
          </div>
          <DialogButtonsSaveUpdate
                        cancelFun={ handlerCancelDialog }
                        submitFun={ handlerOnSubmit }
                        icon={ faHandHoldingUsd }
          />
        </div>
      </div>
    </Paper>
  )
}

export default AdditionalExpensesForm

interface IAdditionalExpenseTaxesProps {
  taxes? : IInvoiceTax[]
  handlerAddExtraTax : ( tax : IInvoiceTax ) => void
}

const AdditionalExpenseTaxes = ( { taxes, handlerAddExtraTax } : IAdditionalExpenseTaxesProps ) => {
  const [check, setCheck] : [ boolean, ( b : boolean ) => void ] = useState( false as boolean )

  useEffect( () => {
    if ( !taxes ) {
      return
    }
    setCheck( taxes.length !== 0 )
  }, [taxes] )

  const handlerOnCheck = ( e : any ) => {
    setCheck( e.target.value )
  }

  return (
    <div className={ 'd-flex flex-column w-100 pb-3' }>
      <div className={ 'd-flex align-items-center justify-content-between p-1' }>
        <div className={ 'font-smaller-3 color-primary text-upper' }>
                    Extra Taxes
        </div>
        <CheckBox
                    label={ 'Add Tax Recapitulation' }
                    labelSize={ 1 }
                    labelColor={ 'grey' }
                    classNames={ 'font-smaller-4' }
                    value={ check }
                    onChange={ handlerOnCheck }
        />
      </div>
      <ConditionalRendering condition={ !!check }>
        <InvoiceTaxForm submitFun={ handlerAddExtraTax } invoiceTaxes={ taxes } additional/>
        <InvoiceTaxView invoiceTaxes={ taxes } extraAction/>
      </ConditionalRendering>
    </div>
  )

}

export const openDialogAdditionalExpenses = ( handlerSuccessFunction : ( extraExpense : IAdditionalExpense ) => void, additionalExpense ? : IAdditionalExpense[] ) => {
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    openDialog( <DialogModalRootComponent closeFn={ closeDialog } name={ 'calculation-additional-expenses-8794537285738' }>
      <CenteredDialog
                closeAction={ closeDialog }
                Component={ AdditionalExpensesForm }
                componentRenderProps={ {
                  closeDialog : closeDialog,
                  successFunction : handlerSuccessFunction,
                  additionalExpense
                } }
      />
    </DialogModalRootComponent> )
  }, FOCUS_ID.CALCULATION.DOCUMENT_FORM.ADDITIONAL_EXPENSE_BUTTON )
}

