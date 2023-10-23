import React, { useEffect }             from 'react'
import DatePickerWithValidation         from '../../../../../components/withValidation/DatePickerWithValidation'
import {
  FORMAT_CURRENCY_STANDARD,
  IFieldsRefs,
  required,
  useValidation
}                                       from '../../../../../validation'
import InputTextWithValidation          from '../../../../../components/withValidation/InputTextWithValidation'
import {
  formatPrice,
  toNumberFixed
}                                       from '../../../../utils/Utils'
import { IDueDateRecord }               from '../../../calculation/modal/DocumentHeaderForm'
import _, { get as _get }               from 'lodash'
import { getInvoiceTotalAddedDueDates } from '../../util'
import { useTranslationFunction }       from '../../../../../components/Translation/useTranslation'
import { Button }                       from '../../../../../components/Button'
import { useInvoiceForm }               from '../../../../../store/invoice/useInvoice'
import {
  TDueDates,
  TInvoice,
  TReturnInvoice
}                                       from '../../../../../graphql/type_logic/types'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                       from '../../../../../components/hooks/useExternalKeybaord'
import { useReturnInvoiceForm }         from '../../../../../store/return-invoice/useReturnInvoice'

interface IInvoiceDueDateFormProps {
  invoice : TInvoice | TReturnInvoice
  updateInvoice : (data: any)=> Promise<any>
}

const DueDateFormInline = ( { invoice, updateInvoice } : IInvoiceDueDateFormProps ) => {
  const { translate } = useTranslationFunction()
  const validation = useValidation<IDueDateRecord>()

  const { setFieldValue } = validation

  const totalToAdd = (() => {
    const financeMP = _.round(_.add( invoice.totalFinanceVP || 0, invoice.totalFinanceTax || 0 ),2)
    if (invoice?.dueDates && (invoice.dueDates as any).length === 0) {
      return financeMP 
    }
    return _.round( _.subtract(financeMP, getInvoiceTotalAddedDueDates( invoice.dueDates || [] ) ), 2 )
  })()

  useEffect( () => {
    setFieldValue( 'finance', `${ formatPrice( totalToAdd ) }`, false )
  }, [totalToAdd, setFieldValue] )

  const handlerOnAdd = async () => {
    const { error, data, refs, validations } = await validation.validate()
    if ( error ) {
      const fieldRef : IFieldsRefs | undefined = refs.find( ( { field } ) => _get( validations, `validations.${ field }.error` ) )
      fieldRef && fieldRef.ref.current.focus()
      return
    }

    if ( toNumberFixed( data.finance ) <= 0 ) {
      return
    }

    const dueDates = ( invoice.dueDates || [] ).map( ( x : TDueDates ) => ( {
      dueDate : new Date( x.date as string ).toISOString(),
      finance : toNumberFixed( x.finance as number )
    } ) )

    dueDates.push( {
      dueDate : new Date( data.date as string ).toISOString(),
      finance : toNumberFixed( data.finance as string )
    } )
        /* const index = dueDates.findIndex( x => compareTwoDates( x.dueDate, data.date ) )

         if ( index !== -1 ) {
         dueDates[index].finance = _.round( _.add( dueDates[index].finance, toNumberFixed( data.finance ) ), 2 )
         } else {
         dueDates.push( {
         dueDate : new Date( data.date as string ).toISOString(),
         finance : toNumberFixed( data.finance as string )
         } )
         }*/
    const _data = {
      footer : {
        dueDates
      }
    } as any
    await updateInvoice( _data )
  }

  const { setRef } = useExternalKeyboard( ( e : KeyboardEvent ) => {

    switch ( e.key ) {
      case KeyboardEventCodes.Enter:
        e.preventDefault()
        handlerOnAdd().then()
        break
    }
  }, true, [KeyboardEventCodes.Tab, KeyboardEventCodes.Enter], 'invoice-due-date-inline-form' )

  return (
    <div>
      <div className={ 'd-flex flex-column hw-invoice-due-date-form-root' } ref={ setRef }>
        <div className={ 'd-flex container align-items-center' }>
          <div className={ 'col-4' }>
            <DatePickerWithValidation
                            required
                            label={ translate( 'LABEL_DATE' ) }
                            format={ 'dd-MM-yyyy' }
                            lined
                            helperText={ translate( 'HELPER_TEXT_DATE' ) }
                            fullWidth
                            min-date={ new Date( invoice.date ) }
                            validation={ {
                              useValidation : validation,
                              model : 'date',
                              rule : {
                                required : required( { message : translate( 'REQUIRED_FIELD' ) } )
                              }
                            } }
            />
          </div>
          <div className={ 'col-1' }></div>
          <div className={ 'col-4' }>
            <InputTextWithValidation
                            required
                            align={ 'align-right' }
                            focusOnMount
                            selectOnFocus
                            label={ translate( 'DUE_DATE_VIEW_TH_FINANCE' ) }
                            lined
                            helperText={ translate( 'INVOICE_DUE_DATE_FORM_FINANCE_HELPER_TEXT' ) }
                            fullWidth
                            validation={ {
                              useValidation : validation,
                              model : 'finance',
                              rule : {
                                required : required( { message : translate( 'REQUIRED_FIELD' ) } )
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
          <div className={ 'col-1' }></div>
          <div className={ 'col-2' }>
            <Button
                            classNames={ 'hw-form-button-root sm' }
                            label={ 'ADD' }
                            onClick={ handlerOnAdd }
                            outline
                            fullWidth
                            color={ 'primary' }
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export const InvoiceDueDateFormInline = ( { invoiceId } : { invoiceId : string } ) => {

  const { invoice, updateInvoice } = useInvoiceForm( invoiceId )

  return <DueDateFormInline invoice={invoice} updateInvoice={updateInvoice}/>
}

export const ReturnInvoiceDueDateFormInline = ( { returnInvoiceId } : { returnInvoiceId : string } ) => {

  const { returnInvoice, updateReturnInvoice } = useReturnInvoiceForm( returnInvoiceId )

  return <DueDateFormInline invoice={ returnInvoice } updateInvoice={updateReturnInvoice} />
}