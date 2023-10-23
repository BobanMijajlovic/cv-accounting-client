import React, { useEffect }          from 'react'
import {
  faFileInvoiceDollar,
  faPercentage
}                                    from '@fortawesome/free-solid-svg-icons'
import { get as _get }               from 'lodash'
import { IAdditionalExpense }        from '../../../../calculation/modal/DocumentHeaderForm'
import {
  TExpenseItem,
  TInvoiceFooter,
  TProformaInvoice
}                                    from '../../../../../../graphql/type_logic/types'
import {
  IFieldsRefs,
  useValidation
}                                    from '../../../../../../validation'
import { InvoiceType }               from '../../../../../../graphql/graphql'
import { useProformaInvoiceForm }    from '../../../../../../store/proforma-invoice/useProformaInvoice'
import {
  formatPrice,
  toNumberFixed
}                                    from '../../../../../utils/Utils'
import { openDialogInvoiceExpenses } from '../../../../invoice/form/footer/ExpensesForm'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                                    from '../../../../../../components/hooks/useOptimizeEventClick'
import { CONSTANT_CALCULATION }      from '../../../../../constants'
import { processErrorGraphQL }       from '../../../../../../apollo'
import ValidationGlobalError         from '../../../../../../components/Error/ValidationGlobalError'
import InputTextWithValidation       from '../../../../../../components/withValidation/InputTextWithValidation'
import InvoiceExpenses               from '../../../../invoice/form/footer/InvoiceExpenses'
import DialogButtonsSaveUpdate       from '../../../../_common/DialogButtonsSaveUpdate'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                    from '../../../../../../components/EasyModel/EasyModal'
import { CenteredDialog }            from '../../../../../../components/Dialog/DialogBasic'
import TextAreaWithValidation        from '../../../../../../components/withValidation/TextAreaWithValidation'

export interface IProformaInvoiceFooterFormState {
  additionalExpenses? : IAdditionalExpense[]
  discount? : string
}

interface IInvoiceFooterFormProps {
  successFunction : ( invoice : InvoiceType ) => Promise<any>
  cancelFunction? : () => void
  proformaInvoiceId : string
}

const ProformaInvoiceFooterForm = ( { cancelFunction, successFunction, proformaInvoiceId } : IInvoiceFooterFormProps ) => {

  const validation = useValidation<TInvoiceFooter>()

  const { errorGlobal, state, setFieldValue, addArrayData, removeArrayData, resetValidations, getFieldRef } = validation
  const { additionalExpense, discountFooter } = state
  const { proformaInvoice } = useProformaInvoiceForm( proformaInvoiceId )

  useEffect( () => {
    if ( !proformaInvoice ) {
      return
    }
    if ( proformaInvoice?.expense && ( proformaInvoice.expense as any ).length !== 0 ) {
      setFieldValue( 'additionalExpense', proformaInvoice?.expense as any, false )
    }
    if ( proformaInvoice?.discount && ( proformaInvoice.discount as any ).length !== 0 ) {
      setFieldValue( 'discountFooter', `${ formatPrice( ( proformaInvoice.discount as any )[0].percent as any ) }`, false )
    }
    if ( proformaInvoice?.notes && ( proformaInvoice.notes as any ).length !== 0 ) {
      setFieldValue( 'note', ( proformaInvoice.notes as any )[0].note, false )
    }
  }, [proformaInvoice, setFieldValue] )


  const addExtraExpense = async ( additionalExpense : TExpenseItem ) => {
    await validation.resetValidations()
    await addArrayData( 'additionalExpense', { items : [additionalExpense] } )
  }

  const addNewInvoiceExpenses = () => {
    openDialogInvoiceExpenses( addExtraExpense )
  }

  const { onClickHandler } = useOptimizeEventClick( {
    eventHandler ( data : IUseOptimizeEventData ) {

      if ( data.action === CONSTANT_CALCULATION.EVENTS.HEADER.INVOICE_EXPENSE_REMOVE ) {
        resetValidations()
        removeArrayData( 'additionalExpense', Number( data.id ) )
        return
      }

      if ( data.action === 'validation-error-clear' ) {
        resetValidations()
        return
      }
    }
  } )

  const handlerSubmit = async () => {
    const { error, data, validations, refs } = await validation.validate()

    if ( error || errorGlobal ) {
      const fieldRef : IFieldsRefs | undefined = refs.find( ( { field } ) => _get( validations, `validations.${ field }.error` ) )
      fieldRef && fieldRef.ref.current.focus()
      return
    }

    const _data = {
      footer : {
        additionalExpense : data.additionalExpense && data.additionalExpense.length !== 0 ? data.additionalExpense.map( ( expense ) => {
          return {
            items : expense.items.map( item => {
              return {
                taxId : Number( item.taxId ),
                financeMP : toNumberFixed( item.financeMP ),
                description : item.description
              }
            } )
          }
        } ) : [],
        discount : data.discountFooter ? [
          {
            percent : toNumberFixed( data.discountFooter as any ),
            description : 'whole invoice discount'
          }
        ] : [
          {
            percent : 0,
            description : 'whole invoice discount'
          }
        ],
        notes : data.note ? [{
          note : data.note
        }] : []
      }
    } as any

    successFunction( _data ).then( () => {
      cancelFunction && cancelFunction()
    } )
      .catch( ( e ) => {
                                    /** process the error **/
        processErrorGraphQL( e, validation )
      } )
  }

  const handleCancelFunction = () => {
    cancelFunction && cancelFunction()
  }

  return (
    <div data-action-root onClick={ onClickHandler } className={ 'container relative hw-invoice-footer-form-root  shadow-lg px-3 pt-4 pb-3' }>
      { errorGlobal ? <ValidationGlobalError error={ errorGlobal } classNames={ 'font-smaller-3' }/> : null }
      <div className={ 'd-flex justify-content-between align-items-center w-100 pt-2' }>
        <div className={ 'hw-invoice-header-form-discount-div' }>
          <InputTextWithValidation
                        required
                        label={ 'Discount' }
                        helperText={ '' }
                        classNames={ 'lined-version' }
                        fullWidth
                        focusOnMount
                        selectOnFocus
                        iconAction={ {
                          icon : faPercentage
                        } }
                        align={ 'align-right' }
                        validation={ {
                          useValidation : validation,
                          model : 'discountFooter',
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
        <div className={ 'flex-2 pl-5 ml-3' }>
          <InvoiceExpenses invoiceExpenses={ additionalExpense as any } addNew={ addNewInvoiceExpenses }/>
        </div>
      </div>
      <div className={ 'w-100' }>
        <TextAreaWithValidation
                    label={ 'Note' }
                    helperText={ '' }
                    fullWidth
                    validation={ {
                      useValidation : validation,
                      model : 'note'
                    } }
        />
      </div>
      <DialogButtonsSaveUpdate
                cancelFun={ handleCancelFunction }
                submitFun={ handlerSubmit }
                icon={ faFileInvoiceDollar }
                update={ !!( proformaInvoice as any ).dueDates }
      />
    </div>
  )
}

export default ProformaInvoiceFooterForm

interface IOpenDialogDueDateProps {
  handlerSuccess : ( invoice : TProformaInvoice ) => void,
  proformaInvoiceId : string
}

export const openDialogProformaInvoiceFooterForm = ( { handlerSuccess, proformaInvoiceId } : IOpenDialogDueDateProps ) => {
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    openDialog( <DialogModalRootComponent name={ 'dialog-proforma-invoice-footer-form-407070707041704' } closeFn={ closeDialog }>
      <CenteredDialog
                title={ 'Discount & Expenses' }
                closeAction={ closeDialog }
                Component={ ProformaInvoiceFooterForm }
                componentRenderProps={ {
                  cancelFunction : closeDialog,
                  successFunction : handlerSuccess,
                  proformaInvoiceId
                } }
      />
    </DialogModalRootComponent> )
  } )
}
