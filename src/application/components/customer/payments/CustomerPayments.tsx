import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo
}                                            from 'react'
import {
  useCustomer,
  useCustomerDashboard
}                                            from '../../../../store/customer/useCustomer'
import * as _                                from 'lodash'
import { get as _get }                       from 'lodash'
import { InputTextDatePicker }               from '../../../../components/basic/withState'
import { faPrint }                           from '@fortawesome/free-solid-svg-icons'
import { KeyboardEventCodes }                from '../../../../components/hooks/useExternalKeybaord'
import { SpinnerLoadingCenter }              from '../../../../components/Spinner/SpinnerLoading'
import { useBankTransactionsQuery }          from '../../../../graphql/graphql'
import { queryVariablesForCustomerPayments } from '../../../../graphql/variablesQ'
import { usePagination }                     from '../../../../components/Pagination/usePagination'
import Table                                 from '../../../../components/Table/Table'
import {
  CONSTANT_MODEL,
  CUSTOMER_TAB_PAYMENTS_TABLE_NAME
}                                            from '../../../constants'
import { bankTransactionTableHeader }        from '../../bank-transaction/MainView'
import { TCustomer }                         from '../../../../graphql/type_logic/types'
import {
  IPdfTableProps,
  resizeColumns
}                                            from '../../../../components/Pdf/Pdf'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                           from '../../../../components/EasyModel/EasyModal'
import { CenteredDialog }                   from '../../../../components/Dialog/DialogBasic'
import {
  formatDateShort,
  formatPrice
}                                           from '../../../utils/Utils'
import CustomerPaymentsPdf                  from './pdf/CustomerPaymentsPdf'
import { useAppBar }                        from '../../../hooks/useAppBar'
import { openDialogPreviewBankTransaction } from '../../bank-transaction/preview/Preview'

const CustomerPayments = () => {
  const { payments } = useCustomer()
  const { data } = useCustomerDashboard()
  const customerId = React.useMemo( () => _get( data, 'selected.id' ), [data] )

  const { paymentsDateFrom : dateFrom, paymentsDateTo : dateTo } = payments
  const { data : pagData, setBackendPaginationData, handlerEvent : handlerEventPagination } = usePagination()
  const { perPage : pagPerPage, page : pagPage, numItems : pagNumItems } = pagData
  const { setButtonsForPage, clearButtonsForPage } = useAppBar()
  const { IN, OUT } = CONSTANT_MODEL.TAX_FINANCE_FLAG
  const customer = useMemo( () => _get( data, 'selected', {} ), [data] )

  const queryVariablesBankTransactions = React.useMemo( () => {
    const endDate = new Date()
    const startDate = endDate.setDate( endDate.getDate() - 7 )

    const offset = ( ( pagPage || 1 ) - 1 ) * ( pagPerPage || 20 )
    return queryVariablesForCustomerPayments( offset, pagPerPage || 20, customerId, {
      dateFrom : dateFrom ? dateFrom : startDate,
      dateTo : dateTo ? dateTo : new Date()
    } as any )
  }, [pagPerPage, pagPage, dateTo, dateFrom, customerId] )

  const { data : bankTransaction, loading } = useBankTransactionsQuery( {
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'no-cache',
    variables : queryVariablesBankTransactions,
    onCompleted : ( data : any ) => {
      if ( !data || !data.data || !data.data.items ) {
        return
      }
      const { page, count } = data.data
      setBackendPaginationData( page || 1, count )
    }
  } )

  const paginationData = React.useMemo( () => {
    return {
      perPage : pagPerPage || 20,
      page : pagPage || 1,
      totalItems : pagNumItems || 0
    }
  }, [pagPerPage, pagPage, pagNumItems] )

  const tableData = React.useMemo( () => !bankTransaction || !bankTransaction.data.items || bankTransaction.data.items.length === 0 ? [] :
    bankTransaction.data.items.map( ( item : any, index : number ) => {
      return {
        ...item,
        position : index + 1,
        inFinance : item.flag === IN ? item.finance : 0,
        outFinance : item.flag === OUT ? item.finance : 0
      }
    } )
  , [bankTransaction, IN, OUT] )

  const printFunc = useCallback( () => {
    const _payments = {
      dateFrom : dateFrom ? dateFrom : new Date().setDate( new Date().getDate() - 7 ),
      dateTo : dateTo ? dateTo : new Date()
    }
    openDialogPrintCustomerPayments( { customer : customer as TCustomer, payments : _payments } )
  }, [customer, dateFrom, dateTo] )

  useEffect( () => {
    const id = setButtonsForPage( [
      {
        label : 'Print',
        icon : faPrint,
        shortcut : KeyboardEventCodes.F10,
        onClick : printFunc
      }
    ] )
    return () => clearButtonsForPage( id )
  }, [setButtonsForPage, clearButtonsForPage, printFunc] )

  const tableHeader = useMemo( () => bankTransactionTableHeader.filter( x => x.field !== 'act' ), [bankTransactionTableHeader] )

  const handlerDataEventClick = ( event : any, id : any, action : any, param : any ) => {
    if ( action === 'table-cell-edit' && id ) {
      const transaction =  bankTransaction && bankTransaction?.data.items.find(x => x.id === id)
      if (transaction) {
        openDialogPreviewBankTransaction({bankHeaderTransactionId: `${transaction.bankHeaderTransactionId}`})
      }
      return
    }
  }

  return (
    <div className={ 'd-flex flex-column align-items-center letter-spacing w-100 h-100 px-2' }>
      { loading ? <SpinnerLoadingCenter/> : null }
      <CustomerPaymentsFilter numItems={ tableData.length }/>
      <div className={ 'pt-3 m-0 overflow-hidden w-100 h-100' }>
        <Table
                    tableName={ CUSTOMER_TAB_PAYMENTS_TABLE_NAME }
                    header={ tableHeader }
                    handlerEventPagination={ handlerEventPagination }
                    data={ tableData }
                    separator={ 'cell' }
                    handlerEventDataClick={ handlerDataEventClick }
                    paginationData={ paginationData }
                    scrollable
                    additionalData={ tableData }
        />
      </div>
    </div>
  )

}

export default CustomerPayments

const CustomerPaymentsFilter = ( { numItems } : { numItems? : number } ) => {
  const { payments, setPaymentsDateFrom, setPaymentsDateTo } = useCustomer()

  const changeDateFrom = useCallback( ( event : ChangeEvent<HTMLInputElement> ) => {
    if ( !_.get( event, 'target.closed' ) ) {
      return
    }
    setPaymentsDateFrom( _.get( event, 'target.date' ) )
  }, [setPaymentsDateFrom] )

  const changeDateTo = useCallback( ( event : ChangeEvent<HTMLInputElement> ) => {
    if ( !_.get( event, 'target.closed' ) ) {
      return
    }
    setPaymentsDateTo( _.get( event, 'target.date' ) )
  }, [setPaymentsDateTo] )

  const startSearchingDay = React.useMemo( () => {
    const date = new Date()
    date.setDate( date.getDate() - 7 )
    return date
  }, [] )

  return (
    <div className={ 'd-flex justify-content-between align-items-center warehouse-item-table-dates-part relative w-100' }>
      <div className={ '' }>
        { numItems ? <div className={ 'opacity-7 bold m-1' }># { numItems }</div> : <div className={ 'm-1' }>&nbsp;</div> }
      </div>
      <div className={ 'd-flex justify-content-between warehouse-item-table-dates-part' }>
        <div>
          <InputTextDatePicker
                        date={ startSearchingDay }
                        align={ 'align-center' }
                        format={ 'dd/MM/yyyy' }
                        helperText={ 'date from' }
                        classNames={ 'lined-version' }
                        value={ _.get( payments, 'paymentsDateFrom', '' ) }
                        onChange={ changeDateFrom }
                        useLabel={ false }
                        label={ '' }
          />
        </div>
        <div className={ 'mx-4' }>
          <InputTextDatePicker
                        format={ 'dd/MM/yyyy' }
                        align={ 'align-center' }
                        helperText={ 'date to' }
                        classNames={ 'lined-version ' }
                        value={ _.get( payments, 'paymentsDateTo', '' ) }
                        onChange={ changeDateTo }
                        useLabel={ false }
                        label={ '' }
                        position={ 'right' }
          />
        </div>

      </div>
      <div>
      </div>
    </div>
  )
}

export const openDialogPrintCustomerPayments = ( { customer, payments } : { customer : TCustomer, payments : any } ) => {
  const tableData : IPdfTableProps = {
    columns : [
      {
        label : 'Date',
        format : ( value : any ) => formatDateShort( `${ value.dateProcessed }` )
      },
      {
        label : 'Account',
        format : ( value : any ) => value.bankAccount.account
      },
      {
        label : 'Fin. owes',
        alignment : 'right',
        sizeType : 1,
        format : ( value : any ) => formatPrice( value.financeOwes )
      },
      {
        label : 'Fin. claims',
        alignment : 'right',
        sizeType : 1,
        format : ( value : any ) => formatPrice( value.financeClaims )
      }
    ]
  }

  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( component : any ) => any ) => {
    const Component = () => {

      const customerId = useMemo( () => _get( customer, 'id', '' ), [customer] )

      const queryVariablesBankTransactions = React.useMemo( () => {
        return queryVariablesForCustomerPayments( 0, 100000, customerId, {
          ...payments
        } as any )
      }, [payments, customerId] )

      const { data : bankTransaction, loading } = useBankTransactionsQuery( {
        notifyOnNetworkStatusChange : true,
        fetchPolicy : 'no-cache',
        variables : queryVariablesBankTransactions
      } )
      const items = bankTransaction?.data?.items || []

      if ( loading ) {
        return <SpinnerLoadingCenter/>
      }

      const _tableData = {
        ...tableData,
        data : items
      }

      resizeColumns( _tableData )

      return (
        <>
          <CenteredDialog
                        title={ 'Customer Payments PDF' }
                        closeAction={ closeDialog }
                        Component={ CustomerPaymentsPdf }
                        componentRenderProps={ {
                          tableData : _tableData,
                          customer,
                          payments,
                          cancelFunction : closeDialog
                        } }
          />
        </>
      )
    }
    openDialog( <DialogModalRootComponent name={ 'dialog-customer-payments-pdf-1321241055015041505151' } closeFn={ closeDialog }>
      <Component/>
    </DialogModalRootComponent> )
  } )
}

