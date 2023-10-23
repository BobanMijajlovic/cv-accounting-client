import React, {
  useCallback,
  useEffect,
  useState
}                                        from 'react'
import {
  TCalculation,
  TCustomer,
  TExpense
}                                        from '../../../../graphql/type_logic/types'
import {
  _focusElementAfter,
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                        from '../../../../components/EasyModel/EasyModal'
import { CenteredDialog }                from '../../../../components/Dialog/DialogBasic'
import DialogButtonsSaveUpdate           from '../../_common/DialogButtonsSaveUpdate'
import { faFileInvoice }                 from '@fortawesome/free-solid-svg-icons'
import {
  IFieldsRefs,
  useValidation
}                                        from '../../../../validation'
import SupplierInvoiceWarehousePart      from './document-header/SupplierInvoiceWarehousePart'
import InvoiceFinanceExpense             from './document-header/InvoiceFinanceTax'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                                        from '../../../../components/hooks/useOptimizeEventClick'
import { CONSTANT_CALCULATION }          from '../../../constants'
import DueDatesPart                      from './document-header/DueDatesPart'
import InvoiceExpenses                   from './document-header/InvoiceExpenses'
import { openDialogCalculationExpenses } from '../views/InstanceView/header/Header'
import { openDialogDueDate }             from '../views/InstanceView/Form'
import AdditionalExpensesPart            from './document-header/AdditionalExpensesPart'
import { openDialogAdditionalExpenses }  from './forms/AdditionalExpenses'
import { useCalculationQuery }           from '../../../../graphql/graphql'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                        from '../../../../components/hooks/useExternalKeybaord'
import InvoiceTaxes                      from './document-header/InvoiceTaxes'
import { openDialogInvoiceTaxForm }      from './document-header/InvoiceTax/InvoiceTaxForm'
import ValidationGlobalError             from '../../../../components/Error/ValidationGlobalError'
import {
  calculateFinances,
  getCalculationFinanceAfterDiscount
}                                        from '../util'
import { openDialogAddEditCustomer }     from '../../customer/modal/CustomerSearch'
import _                                 from 'lodash'
import {
  formatPrice,
  toNumberFixed
}                                        from '../../../utils/Utils'
import { processErrorGraphQL }           from '../../../../apollo'
import { isSameDay }                     from 'date-fns'
import { useTranslationFunction }        from '../../../../components/Translation/useTranslation'

export interface IInvoiceExpense {
  financeMP : string
  financeVP? : string
  tax : string
  description? : string
}

export interface IDueDateRecord {
  date : string
  dueDate? : string,
  description? : string
  finance : string
}

export interface IAdditionalExpense {
  customer : TCustomer
  invoiceNumber : string
  invoiceDate : string
  dueDate : string
  financeMP : string
  financeTax : string
  items? : IInvoiceTax[]
}

export interface IInvoiceTax {
  taxId : string
  finance : number
  financeMP : number
}

export interface IHeaderDocumentState {
  supplier : TCustomer
  warehouseId : string
  invoiceNumber : string
  number : string
  invoiceDate : string
  date : string
  totalFinanceMP : string
  financeTax : string
  invoiceDiscount? : string
  invoiceTaxes : IInvoiceTax[]
  invoiceExpenses? : IInvoiceExpense[]
  dueDates? : IDueDateRecord[]
  additionalExpenses? : IAdditionalExpense[]
}

export interface IHeaderDocumentProps {
  successFunction : ( calculation : TCalculation ) => Promise<any>
  cancelFunction : () => void
  calculationId? : string
  fieldFocus? : string
  focusId? : string
}

interface IErrorsHeaderDocuments {
  supplier? : boolean | string
  invoiceTaxes? : boolean | string
}

const DocumentHeaderForm = ( { successFunction, cancelFunction, calculationId, fieldFocus, focusId } : IHeaderDocumentProps ) => {
  const validation = useValidation<IHeaderDocumentState>( {
    initialData : {
      number : `${ _.random( 1, 1000000 ) }-${ _.random( 1, 1000000 ) }`
    }
  } )
  const { translate } = useTranslationFunction()
  const { setFieldValue, getFieldRef, addArrayData, removeArrayData, refFields, state, errorGlobal } = validation
  const { dueDates, invoiceExpenses, invoiceTaxes, additionalExpenses } = state
  const [focusElement, setFocusElement] : [ IFieldsRefs, ( r : IFieldsRefs ) => void ] = useState( {} as IFieldsRefs )

  const { data } = useCalculationQuery( {
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'network-only',
    variables : {
      id : Number( calculationId )
    },
    skip : !calculationId
  } )
  const calculation = React.useMemo( () => !data || !data.calculation ? void( 0 ) : data.calculation, [data] )

  useEffect( () => {
    if ( !calculation ) {
      return
    }
    if ( _.get( calculation, 'vats' ) ) {
      const vats = ( calculation as any ).vats.map( ( vat : any ) => {
        return {
          taxId : `${ vat.tax.id }`,
          finance : vat.taxFinance,
          financeMP : vat.financeMP
        }
      } )
      setFieldValue( 'invoiceTaxes', vats as any, false )
    }
    if ( _.get( calculation, 'dueDate' ) ) {
      const dueDates = ( calculation as any ).dueDate.map( ( dueDate : any ) => {
        return {
          date : `${ dueDate.date }`,
          description : dueDate.description,
          finance : `${ dueDate.finance }`
        }
      } )
      setFieldValue( 'dueDates', dueDates as any, false )
    }

    if ( calculation?.discount && calculation?.discount.length !== 0 ) {
      const discount = ( calculation as any ).discount[0]
      setFieldValue( 'invoiceDiscount', formatPrice( `${ ( discount.percent ) }` ), false )
    }

    if ( _.get( calculation, 'supplier' ) ) {
      setFieldValue( 'supplier', _.get( calculation, 'supplier' ) as any, false )
    }

    if ( _.get( calculation, 'expense' ) ) {
      const arrInvExpense : any = [] as any
      const arrExtraExpense : any = [] as any
      ( calculation as any ).expense.map( ( expense : TExpense, key : number ) => {
        if ( expense.customer && expense.invoiceNumber ) {
          arrExtraExpense.push( {
            ...expense,
            items : ( expense as any ).items.map( ( item : any ) => {
              return {
                financeMP : `${ item.financeMP }`,
                financeVP : `${ calculateFinances( false, item.financeMP, item.taxPercent ) }`,
                taxId : `${ item.taxId }`,
                description : item.description
              }
            } )
          } )
        } else {
          ( expense as any ).items.map( ( item : any ) => {
            arrInvExpense.push( {
              financeMP : `${ item.financeMP }`,
              financeVP : `${ calculateFinances( false, item.financeMP, item.taxPercent ) }`,
              tax : `${ item.taxId }`,
              description : item.description
            } )
          } )
        }
      } )
      setFieldValue( 'invoiceExpenses', arrInvExpense as any, false )
      setFieldValue( 'additionalExpenses', arrExtraExpense as any, false )
    }

    if ( _.get( calculation, 'date' ) || _.get( calculation, 'invoiceDate' ) ) {
      setFieldValue( 'date', _.get( calculation, 'date' ), false )
      setFieldValue( 'invoiceDate', _.get( calculation, 'invoiceDate' ), false )
    }

    if ( calculation.totalFinanceMP ) {
      setFieldValue( 'totalFinanceMP', `${ formatPrice( calculation.totalFinanceMP ) }`, false )
    }

    if ( calculation.financeTax ) {
      setFieldValue( 'financeTax', `${ formatPrice( calculation.financeTax ) }`, false )
    }

    ['number', 'invoiceNumber', 'warehouseId'].forEach( ( s : string ) => _.get( calculation, s ) ? validation.setFieldValue( s, _.get( calculation, s ).toString(), true ) : null )
    handlerSetFocus( 'invoiceNumber' )
  }, [calculation, setFieldValue] )

  useEffect( () => {
    if ( focusElement.ref && focusElement.ref.current ) {
      focusElement.ref.current.focus()
    }
  }, [focusElement] )

  useEffect( () => {
    setError( {} )
    if ( !state.totalFinanceMP || !state.invoiceTaxes || state.invoiceTaxes.length === 0 ) {
      return
    }
    const invoiceTaxesFinance = _.round( state.invoiceTaxes.reduce( ( acc : number, x : any ) => _.add( acc, toNumberFixed( x.financeMP ) ), 0 ), 2 )
    if ( toNumberFixed( state.totalFinanceMP ) !== invoiceTaxesFinance ) {
      setError( {
        invoiceTaxes : 'Finance MP is not valid with finance of taxes!'
      } )
      return
    }
  }, [state] )

  const handlerSetFocus = React.useCallback( ( field : string ) => {
    const refData = getFieldRef( field )
    if ( refData && refData.ref ) {
      setFocusElement( refData )
    }
  }, [getFieldRef, setFocusElement] )

  useEffect( () => {
    if ( !fieldFocus || fieldFocus === 'customer' || focusId || focusElement ) {
      return
    }
    setTimeout( handlerSetFocus( fieldFocus ), 250 )
    return
  }, [fieldFocus, handlerSetFocus, focusId, focusElement] )

  useEffect( () => {
    if ( !focusId || fieldFocus ) {
      return
    }
    _focusElementAfter( focusId )
    return
  }, [focusId, _focusElementAfter, fieldFocus] )

  const [stateError, setError] : [ IErrorsHeaderDocuments, ( r : IErrorsHeaderDocuments ) => void ] = useState( {} as IErrorsHeaderDocuments )

  const addInvoiceExpense = async ( invoiceExpense : IInvoiceExpense ) => {
    await addArrayData( 'invoiceExpenses', invoiceExpense )
  }

  const addDueDate = async ( dueDate : IDueDateRecord ) => {
    setError( {} )
    if ( state?.dueDates && state?.dueDates.length > 0 ) {
      const dueDates = state.dueDates
      const index = state.dueDates.findIndex( d => isSameDay( new Date( dueDate.date as string ), new Date( d.date as string ) ) )
      if ( index !== -1 ) {
        dueDates[index].finance = `${ _.round( _.add( toNumberFixed( state.dueDates[index].finance ), toNumberFixed( dueDate.finance as any ) ), 2 ) }`
        await setFieldValue( 'dueDates', dueDates as any, false )
        return
      }
    }
    await addArrayData( 'dueDates', dueDate )
  }
  const addExtraExpense = async ( extraExpense : IAdditionalExpense ) => {
    await addArrayData( 'additionalExpenses', extraExpense )
  }

  const { onClickHandler } = useOptimizeEventClick( {
    eventHandler ( data : IUseOptimizeEventData ) {
      if ( data.action === CONSTANT_CALCULATION.EVENTS.HEADER.INVOICE_EXPENSE_REMOVE ) {
        removeArrayData( 'invoiceExpenses' as string, Number( data.id ) )
        return
      }

      if ( data.action === CONSTANT_CALCULATION.EVENTS.HEADER.DUE_DATES_REMOVE ) {
        removeArrayData( 'dueDates', Number( data.id ) )
        return
      }

      if ( data.action === CONSTANT_CALCULATION.EVENTS.HEADER.EXTRA_EXPENSE_REMOVE ) {
        removeArrayData( 'additionalExpenses', Number( data.id ) )
        return
      }

      if ( data.action === CONSTANT_CALCULATION.EVENTS.HEADER.INVOICE_TAX_REMOVE ) {
        validation.resetValidations()
        removeArrayData( 'invoiceTaxes', Number( data.id ) )
        return
      }
    }
  } )

  const handlerAddInvoiceTax = async ( invoiceTax : IInvoiceTax ) => {
    setError( {} )
    await validation.addArrayData( 'invoiceTaxes', invoiceTax )
  }

  const addNewInvoiceExpense = () => {
    openDialogCalculationExpenses( addInvoiceExpense, state )
  }

  const addNewDueDate = () => {
    openDialogDueDate( {
      handlerSuccess : addDueDate,
      state
    } )
  }

  const addNewAdditionalExpense = () => {
    openDialogAdditionalExpenses( addExtraExpense, additionalExpenses )
  }

  const addNewInvoiceTax = () => {
    openDialogInvoiceTaxForm( handlerAddInvoiceTax, state )
  }

  const setSupplier = useCallback( ( supplier : TCustomer ) => {
    setError( {} )
    setFieldValue( 'supplier', supplier as any, true )
    handlerSetFocus( 'invoiceNumber' )
  }, [setFieldValue, handlerSetFocus] )

  const closeSupplierDialog = () => {
    setTimeout( () => handlerSetFocus( 'invoiceNumber' ), 150 )
  }

  const handlerFindSupplier = () => {
    openDialogAddEditCustomer( setSupplier, closeSupplierDialog, undefined, true )
  }

  useEffect( () => {
    if ( refFields && refFields.length !== 0 && !calculationId && !state.supplier && ( !fieldFocus || !focusId ) ) {
      setTimeout( () => handlerFindSupplier(), 200 )
      return
    }
  }, [refFields, state.supplier, calculationId, fieldFocus, focusId] )

  const { setRef } = useExternalKeyboard( ( e : KeyboardEvent ) => {
    switch ( e.key ) {
      case KeyboardEventCodes.F2:
        handlerFindSupplier()
        return
      case KeyboardEventCodes.F3:
        addNewInvoiceTax()
        return
      case KeyboardEventCodes.F4:
        addNewInvoiceExpense()
        return
      case KeyboardEventCodes.F5:
        addNewDueDate()
        return
      case KeyboardEventCodes.F6:
        addNewAdditionalExpense()
        return
    }
  }, true, [KeyboardEventCodes.F2, KeyboardEventCodes.F3, KeyboardEventCodes.F4, KeyboardEventCodes.F5, KeyboardEventCodes.F6], 'document calculation header' )

  const handlerSubmit = async () => {
    const { error, data, validations, refs } = await validation.validate()

    setError( {
      supplier : !data.supplier ? translate( 'CALCULATION_HEADER_INVOICE_SUPPLIER_ERROR_MESSAGE' ) : void( 0 )
    } )

    if ( error ) {
      const fieldRef : IFieldsRefs | undefined = refs.find( ( { field } ) => _.get( validations, `validations.${ field }.error` ) )
      fieldRef && fieldRef.ref.current.focus()
      return
    }

    if ( !data.supplier ) {
      handlerFindSupplier()
      return
    }
    
    if (data.invoiceTaxes && data.invoiceTaxes.length !== 0) {
      const invoiceTaxesFinance = _.round( state.invoiceTaxes.reduce( ( acc : number, x : any ) => _.add( acc, toNumberFixed( x.financeMP ) ), 0 ), 2 )
      if ( toNumberFixed( state.totalFinanceMP ) !== invoiceTaxesFinance ) {
        setError( {
          invoiceTaxes : 'Finance MP is not valid with finance of taxes!'
        } )
        return
      }
    }

    if ( !data?.dueDates?.[0] ) {
      data.dueDates = [{
        date : data.date,
        finance : getCalculationFinanceAfterDiscount( state ).toString()
      }]
    }

    const additionalExpenses = data.additionalExpenses && data.additionalExpenses.length !== 0 ? data.additionalExpenses.map( expense => {
      return {
        invoiceNumber : expense.invoiceNumber,
        invoiceDate : new Date( expense.invoiceDate ).toISOString(),
        dueDate : new Date( expense.dueDate ).toISOString(),
        customerId : Number( expense.customer.id ),
        financeMP : Number( expense.financeMP ),
        financeTax : Number( expense.financeTax ),
        items : expense.items && expense.items.map( ( item ) => {
          return {
            taxId : Number( item.taxId ),
            financeMP : toNumberFixed( item.finance )
          }
        } )
      }
    } ) : void( 0 )

    const invoiceExpense = data.invoiceExpenses && data.invoiceExpenses.length !== 0 ? {
      items : data.invoiceExpenses.map( item => {
        return {
          taxId : Number( item.tax ),
          financeMP : toNumberFixed( item.financeMP ),
          description : item.description
        }
      } )
    } : void( 0 )

    const _data = {
      header : {
        ..._.omit( data, ['supplier', 'invoiceExpenses', 'additionalExpenses', 'dueDates', 'invoiceDiscount', 'invoiceTaxes'] ),
        totalFinanceMP : toNumberFixed( data.totalFinanceMP ),
        financeTax : toNumberFixed( data.financeTax ),
        invoiceDate : new Date( data.invoiceDate ).toISOString(),
        date : new Date( data.date ).toISOString(),
        supplierId : Number( ( data.supplier as any ).id ),
        warehouseId : Number( data.warehouseId ),
        vats : data.invoiceTaxes ? data.invoiceTaxes.map( tax => {
          return {
            taxId : Number( tax.taxId ),
            taxFinance : toNumberFixed( tax.finance ),
            financeMP : toNumberFixed( tax.financeMP )
          }
        } ) : [],
        expense : invoiceExpense,
        dueDate : data.dueDates.map( d => ( {
          ...d,
          finance : toNumberFixed( d.finance )
        } ) ),
        discount : data.invoiceDiscount ? [
          {
            percent : toNumberFixed( data.invoiceDiscount ),
            description : 'whole invoice discount'
          }
        ] : void( 0 ),
        additionalExpense : additionalExpenses
      }
    } as any

    successFunction( _data )
      .then( v => {
        cancelFunction()
      } )
      .catch( ( e ) => {
        processErrorGraphQL( e, validation )
      } )
  }

  return (
    <>
      <div
                data-action-root
                onClick={ onClickHandler }
                className={ 'container relative hw-calculation-document-header-form-root  shadow-lg p-3' }
                ref={ setRef }
      >
        <div className={ 'd-flex justify-content-between w-100 pb-2' }>
          <div className={ 'font-smaller-3 color-primary text-upper' }>
            { translate( 'CALCULATION_HEADER_NUMBER_LABEL' ) } : &nbsp; { validation.state.number }
          </div>
          { errorGlobal ? <ValidationGlobalError error={ errorGlobal }/> : null }
        </div>
        <SupplierInvoiceWarehousePart validation={ validation } setSupplier={ handlerFindSupplier } error={ stateError.supplier }/>
        <div className={ 'd-flex justify-content-between w-100' }>
          <InvoiceFinanceExpense validation={ validation }/>
          <InvoiceTaxes state={ state } invoiceTaxes={ invoiceTaxes } addNew={ addNewInvoiceTax } error={ stateError.invoiceTaxes }/>
        </div>
        <div className={ 'd-flex justify-content-between w-100' }>
          <div className={ 'w-50 pr-2' }>
            <DueDatesPart dueDates={ dueDates } state={ state } addNew={ addNewDueDate }/>
          </div>
          <div className={ 'w-50 pl-2' }>
            <InvoiceExpenses invoiceExpenses={ invoiceExpenses } addNew={ addNewInvoiceExpense }/>
          </div>
        </div>
        <AdditionalExpensesPart additionalExpenses={ additionalExpenses } addNew={ addNewAdditionalExpense }/>
        <DialogButtonsSaveUpdate
                    cancelFun={ cancelFunction }
                    submitFun={ handlerSubmit }
                    icon={ faFileInvoice }
                    update={ !!calculationId }
        />

      </div>
    </>
  )
}

export default DocumentHeaderForm

export interface IDialogCalculationHeaderForm {
  handlerSuccess : ( calculation : TCalculation ) => Promise<any>,
  calculationId? : string
  fieldFocus? : string
  focusId? : string
}

export const openDialogCalculationHeaderForm = ( { handlerSuccess, calculationId, fieldFocus, focusId } : IDialogCalculationHeaderForm ) => {
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    openDialog( <DialogModalRootComponent name={ 'dialog-calculation-header-form-9416272159041' } closeFn={ closeDialog }>
      <CenteredDialog
                title={ 'CALCULATION_HEADER_DIALOG_TITLE' }
                closeAction={ closeDialog }
                Component={ DocumentHeaderForm }
                componentRenderProps={ {
                  successFunction : handlerSuccess,
                  calculationId,
                  cancelFunction : closeDialog,
                  fieldFocus,
                  focusId
                } }
      />
    </DialogModalRootComponent> )
  } )
}

