import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo
}                                         from 'react'
import {
  useCustomer,
  useCustomerDashboard
}                                         from '../../../../store/customer/useCustomer'
import {
  get as _get,
  isArray as _isArray
}                                         from 'lodash'
import { InputTextDatePicker }            from '../../../../components/basic/withState'
import {
  formatDateLong,
  formatDateShort,
  formatPrice
}                                         from '../../../utils/Utils'
import Table                              from '../../../../components/Table/Table'
import { SpinnerLoadingCenter }           from '../../../../components/Spinner/SpinnerLoading'
import {
  TCustomer,
  TDueDates
}                                         from '../../../../graphql/type_logic/types'
import {
  IPdfTableProps,
  resizeColumns
}                                         from '../../../../components/Pdf/Pdf'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                         from '../../../../components/EasyModel/EasyModal'
import { CenteredDialog }                 from '../../../../components/Dialog/DialogBasic'
import { RenderCustomerCardDueDates }     from './pdf/RenderColumn'
import CustomerCardPdf                    from './pdf/CustomerCardPdf'
import { faPrint }                        from '@fortawesome/free-solid-svg-icons'
import { KeyboardEventCodes }             from '../../../../components/hooks/useExternalKeybaord'
import { useAppBar }                      from '../../../hooks/useAppBar'
import { CustomerCardDocumentRender }     from './_common/TableColumnRender'
import { openDialogPreviewCalculation }   from '../../calculation/views/InstanceView/Form'
import { openDialogPreviewInvoice }       from '../../invoice/preview/Preview'
import { openDialogPreviewReturnInvoice } from '../../return-invoice/preview/Preview'
import { useDueDatesQuery }               from '../../../../graphql/graphql'
import { queryVariablesDueDates }         from '../../../../graphql/variablesQ'
import { CONSTANT_MODEL }                 from '../../../constants'

const DueDateRender = ( { value } : { value : any } ) => {
  const isDueDateArray = React.useMemo( () => _isArray( value ), [value] )
  return (
    <div className={ 'text-center' }>
      {
        isDueDateArray ?
          <div
                        className={ 'color-primary text-upper' }
                        data-action={ '' }
          >
                        MULTI
          </div>
          :
          <>{ formatDateLong( value ) }</>
      }
    </div>
  )
}

const CardTableHeader = [
  {
    field : 'date',
    label : 'Date',
    cell : {
      classes : ['hw-table-cell-center'],
      format : ( value : string ) => {
        return formatDateLong( value )
      },
      style : {
        maxWidth : 150
      }
    }
  },
  {
    label : 'Document',
    field : 'document',
    cell : {
      classes : ['hw-table-cell-center'],
      render : CustomerCardDocumentRender,
      style : {
        maxWidth : 150
      }
    }
  },
  {
    field : 'owes',
    label : 'Owes',
    cell : {
      classes : ['hw-table-cell-right'],
      format : ( value : string ) => {
        return formatPrice( value )
      }
    }
  },
  {
    field : 'claims',
    label : 'Claims',
    cell : {
      classes : ['hw-table-cell-right'],
      format : ( value : string ) => {
        return formatPrice( value )
      }
    }
  },
  {
    field : 'dueDates',
    label : 'Due date',
    cell : {
      classes : ['hw-table-cell-center'],
      render : DueDateRender
    }
  }
]

const summarize = {
  fields : ['owes', 'claims']
}

const CardTable = ( { customerId } : { customerId : string } ) => {
  const { card } = useCustomer()
  const { data } = useCustomerDashboard()
  const { cardDateFrom : dateFrom, cardDateTo : dateTo } = card

  const { setButtonsForPage, clearButtonsForPage } = useAppBar()
  
  const {IN,OUT} = CONSTANT_MODEL.TAX_FINANCE_FLAG

  const customer = useMemo( () => _get( data, 'selected', {} ), [data] )

  const variables = React.useMemo( () => {
    const startDate = new Date()
    startDate.setDate( startDate.getDate() - 7 )
    return queryVariablesDueDates( {
      customerId : Number( customerId ),
      dateFrom : dateFrom ? dateFrom : startDate,
      dateTo : dateTo ? dateTo : new Date()
    } )
  }, [customerId, dateFrom, dateTo] )

  const { data : _dueDates, loading } = useDueDatesQuery( {
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'no-cache',
    variables
  } )

  const dueDates = useMemo( () => _dueDates?.data?.items ? _dueDates.data.items as TDueDates[] : [] as TDueDates[], [_dueDates] )
  
  const tableData = useMemo( () => dueDates && dueDates.length !== 0 ? dueDates.map( ( x : any ) => {
    const doc = x.invoiceId ? 'invoice' : x.returnInvoiceId ? 'returnInvoice' : x.financeTransferDocumentId ? 'financeTransferDocument' : 'calculation'
    const document = _get(x,`${doc}.number`)
    return {
      ...x,
      id : document,
      document,
      owes: x.flag === IN ? x.finance : 0,
      claims: x.flag === OUT ? x.finance : 0,
      dueDates : x.dueDate || x.dueDates
    }
  } ) : [], [dueDates] )

  const printCard = useCallback( () => {
    const _card = {
      dateFrom : dateFrom ? dateFrom : new Date().setDate( new Date().getDate() - 7 ),
      dateTo : dateTo ? dateTo : new Date()
    }
    openDialogPrintCustomerCard( { data : tableData, customer : customer as TCustomer, card : _card } )
  }, [tableData, customer, dateFrom, dateTo] )

  useEffect( () => {
    const id = setButtonsForPage( [
      {
        label : 'Print',
        icon : faPrint,
        shortcut : KeyboardEventCodes.F10,
        onClick : printCard
      }
    ] )
    return () => clearButtonsForPage( id )
  }, [setButtonsForPage, clearButtonsForPage, printCard] )

  const handlerDataEventClick = ( event : any, id : any, action : any, param : any ) => {
    if ( action === 'action-show-document' && id && param ) {
      param === 'invoiceId' ? openDialogPreviewInvoice( { invoiceId : id } )
        : param === 'calculationId' ? openDialogPreviewCalculation( { calculationId : id } )
          : openDialogPreviewReturnInvoice( { returnInvoiceId : id } )
    }
  }

  return (
    <div className={ 'd-flex flex-column align-items-center letter-spacing w-100 h-100 px-2' }>
      { loading ? <SpinnerLoadingCenter/> : null }
      <CardTableFilter numItems={ tableData.length }/>
      <div className={ 'pt-3 m-0 overflow-hidden w-100 h-100' }>
        <Table
                    tableName={ 'customer-card-table-5121445145g115g1151g189' }
                    header={ CardTableHeader }
                    data={ tableData }
                    separator={ 'cell' }
                    handlerEventDataClick={ handlerDataEventClick }
                    scrollable
                    summarize={ summarize }
                    additionalData={ tableData }
        />
      </div>
    </div>
  )
}

export default CardTable

const CardTableFilter = ( { numItems } : { numItems? : number } ) => {

  const { card, setCardDateFrom, setCardDateTo } = useCustomer()

  const changeDateFrom = useCallback( ( event : ChangeEvent<HTMLInputElement> ) => {
    if ( !_get( event, 'target.closed' ) ) {
      return
    }
    setCardDateFrom( _get( event, 'target.date' ) )
  }, [setCardDateFrom] )

  const changeDateTo = useCallback( ( event : ChangeEvent<HTMLInputElement> ) => {
    if ( !_get( event, 'target.closed' ) ) {
      return
    }
    setCardDateTo( _get( event, 'target.date' ) )
  }, [setCardDateTo] )

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
                        value={ _get( card, 'cardDateFrom', '' ) }
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
                        value={ _get( card, 'cardDateTo', '' ) }
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

export const openDialogPrintCustomerCard = ( { data, customer, card } : { data : any, customer : TCustomer, card : any } ) => {
  const tableData : IPdfTableProps = {
    columns : [
      {
        label : 'date',
        format : ( value : any ) => formatDateShort( value.date ),
        sizeType : 2,
        size : 5
      },
      {
        label : 'document',
        minSize : 40,
        size : 40,
        format : ( value : any ) => value.document
      },
      {
        label : 'owes',
        alignmentHeader : 'right',
        alignment : 'right',
        sizeType : 1,
        minSize : 20,
        size : 20,
        format : ( value : any ) => formatPrice( value.owes as number )
      },
      {
        label : 'claims',
        alignmentHeader : 'right',
        alignment : 'right',
        sizeType : 1,
        minSize : 20,
        size : 20,
        format : ( value : any ) => formatPrice( value.claims as number )
      },
      {
        label : 'due dates',
        alignmentHeader : 'center',
        alignment : 'center',
        sizeType : 2,
        size : 5,
        format : ( value : any ) => `${ value.dueDates }`,
        render : RenderCustomerCardDueDates,
        renderProps : {
          field : 'dueDates'
        }
      }
    ],
    data
  }

  resizeColumns( tableData )

  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( component : any ) => any ) => {
    const Component = () => {
      return (
        <>
          <CenteredDialog
                        title={ 'Customer card PDF' }
                        closeAction={ closeDialog }
                        Component={ CustomerCardPdf }
                        componentRenderProps={ {
                          tableData,
                          customer,
                          card,
                          cancelFunction : closeDialog
                        } }
          />
        </>
      )
    }
    openDialog( <DialogModalRootComponent name={ 'dialog-customer-card-pdf-21312t1451242141' } closeFn={ closeDialog }>
      <Component/>
    </DialogModalRootComponent> )
  } )
}
