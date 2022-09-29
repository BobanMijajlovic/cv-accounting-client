import React, {
  useEffect,
  useState
}                                            from 'react'
import {
  NOT_FOUND_TRANSLATION,
  useTranslationFunction
}                                            from '../../../../../components/Translation/useTranslation'
import {
  useReturnInvoice,
  useReturnInvoiceTabs
}                                            from '../../../../../store/return-invoice/useReturnInvoice'
import { usePagination }                     from '../../../../../components/Pagination/usePagination'
import { useAppBar }                         from '../../../../hooks/useAppBar'
import {
  faFileInvoice,
  faInfoCircle
}                                            from '@fortawesome/free-solid-svg-icons'
import { KeyboardEventCodes }                from '../../../../../components/hooks/useExternalKeybaord'
import DivExternalKeyboardRoot               from '../../../../../components/hooks/DivParentExternalKeybardRoot'
import { FontAwesomeIcon }                   from '@fortawesome/react-fontawesome'
import ReturnInvoiceFilter                   from './Filter'
import { queryVariablesForInvoices }         from '../../../../../graphql/variablesQ'
import {
  useInsertReturnInvoiceMutation,
  useReturnInvoicesQuery,
  useUpdateReturnInvoiceMutation
}                                            from '../../../../../graphql/graphql'
import _                                     from 'lodash'
import {
  formatDateLong,
  formatPrice
}                                            from '../../../../utils/Utils'
import StatusRender, { FlagRender }          from '../../../invoice/_common/StatusRender'
import InvoiceTableActionCell                from '../../../invoice/_common/InvoiceTableActionCell'
import { TableHeaderRenderManageColumns }    from '../../../../../components/Table/render/HeaderRender'
import Table                                 from '../../../../../components/Table/Table'
import {
  CONSTANT_INVOICE,
  RETURN_INVOICE_MAIN_VIEW_TABLE
}                                            from '../../../../constants'
import { openDialogReturnInvoiceHeaderForm } from '../InstanceView/header/Form'
import { openDialogPreviewReturnInvoice }    from '../../preview/Preview'
import { openDialogReturnInvoicePrint }      from '../../pdf/Pdf'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                            from '../../../../../components/EasyModel/EasyModal'
import {
  CenteredDialog,
  DialogComponentQuestions
}                                            from '../../../../../components/Dialog/DialogBasic'
import { processErrorGraphQL }               from '../../../../../apollo'
import { SpinnerLoadingCenter }              from '../../../../../components/Spinner/SpinnerLoading'

export const invoiceMainViewHeader = [
  {
    label : '#',
    field : 'position',
    cell : {
      classes : ['hw-table-cell-center']
    }
  },
  {
    field : 'date',
    label : 'Date',
    cell : {
      classes : ['hw-table-cell-center'],
      format : ( value : string ) => {
        return formatDateLong( value )
      },
      style : {
        maxWidth : 70
      }
    }
  },
  {
    label : 'Invoice number',
    field : 'number',
    cell : {
      classes : ['hw-table-cell-center'],
      style : {
        maxWidth : 125
      }
    }
  },
  {
    field : 'customer',
    label : 'Customer',
    cell : {
      classes : ['hw-table-cell-center'],
      style : {
        minWidth : 350
      },
      format : ( value : any ) => value?.shortName?.length > 0 ? value?.shortName : value?.fullName
    }
  },
  {
    field : 'totalFinanceVP',
    label : 'finance vp',
    cell : {
      classes : ['hw-table-cell-right'],
      format : ( value : string ) => {
        return formatPrice( value )
      }
    }
  },
  {
    field : 'totalFinanceTax',
    label : 'tax finance',
    cell : {
      classes : ['hw-table-cell-right'],
      format : ( value : string ) => {
        return formatPrice( value )
      }
    }
  },
  {
    field : 'totalFinanceMP',
    label : 'finance mp',
    cell : {
      classes : ['hw-table-cell-right'],
      format : ( value : string ) => {
        return formatPrice( value )
      }
    }
  },
  {
    label : 'status',
    field : 'status',
    cell : {
      classes : ['hw-table-cell-center'],
      render : StatusRender
    }
  },
  {
    field : 'act',
    notHide : true,
    notResize : true,
    cell : {
      classes : ['hw-table-cell-center'],
      style : {
        width : '90px'
      },
      render : InvoiceTableActionCell
    },
    width : '50px',
    render : TableHeaderRenderManageColumns
  }
]

const MainView = () => {
  const { translate } = useTranslationFunction()
  const [mutationInsertReturnInvoice] = useInsertReturnInvoiceMutation()
  const [mutationUpdateReturnInvoice] = useUpdateReturnInvoiceMutation()
  const { returnInvoice } = useReturnInvoice()
  const { dateFrom, dateTo, customer, status } = returnInvoice || {}
  const { data : pagData, setBackendPaginationData, handlerEvent : handlerEventPagination } = usePagination()
  const { perPage : pagPerPage, page : pagPage, numItems : pagNumItems } = pagData
  const [tableSettings, setTableSettings] = useState( {} )
  const { setButtonsForPage, clearButtonsForPage } = useAppBar()
  const { addTab } = useReturnInvoiceTabs()

  const queryVariablesReturnInvoices = React.useMemo( () => {
    const date = new Date()
    date.setDate( date.getDate() - 15 )
    const options = Object.assign( {
      dateFrom : dateFrom ? dateFrom : date,
      dateTo : dateTo ? dateTo : new Date(),
      status : status ? status : undefined
    }, customer ? { customerId : customer.id } : {} )

    const offset = ( ( pagPage || 1 ) - 1 ) * ( pagPerPage || 20 )
    return queryVariablesForInvoices( offset, pagPerPage || 20, options )
  }, [pagPerPage, pagPage, customer, dateFrom, dateTo, status] )

  const { data, loading, refetch : refetchReturnInvoices } = useReturnInvoicesQuery( {
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'network-only',
    variables : queryVariablesReturnInvoices,
    onCompleted : ( data ) => {
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

  const handlerCancelInvoice = (id: string) => {
    mutationUpdateReturnInvoice({
      variables: {
        id: Number(id),
        data: {
          status: CONSTANT_INVOICE.STATUS.CANCELED
        }
      }
    })
      .then(() => {
        refetchReturnInvoices().then()
      })
      .catch(e => {
        processErrorGraphQL(e, {})
      })
  }

  const tableData = React.useMemo( () => !data || !data.data.items || data.data.items.length === 0 ? [] :
    data.data.items.map( ( x : any, index : number ) => {
      return {
        ...x,
        position : index + 1,
        totalFinanceMP : _.round( _.add( Number( x.totalFinanceVP ), Number( x.totalFinanceTax ) ), 2 )
      }
    } )
  , [data] )

  const handlerCreateReturnInvoice = React.useCallback( async ( returnInvoice : any ) => {
    await mutationInsertReturnInvoice( {
      variables : {
        data : returnInvoice
      }
    } ).then( ( v ) => {
      if ( v.data && v.data.returnInvoice.id ) {
        addTab( v.data.returnInvoice.id )
      }
      refetchReturnInvoices().then()
    } )
  }, [addTab, mutationInsertReturnInvoice, refetchReturnInvoices] )

  useEffect( () => {
    const id = setButtonsForPage( [
      {
        label : 'NEW RET. INV.',
        icon : faFileInvoice,
        shortcut : KeyboardEventCodes.F4,
        onClick : () => openDialogReturnInvoiceHeaderForm( {
          handlerSuccess : handlerCreateReturnInvoice
        } )
      }
    ] )
    return () => clearButtonsForPage( id )
  }, [setButtonsForPage, clearButtonsForPage, translate] )

  const handlerDataEventClick = ( event : any, id : any, action : any, param : any ) => {
    if ( action === 'preview' ) {
      if ( !id ) {
        return
      }
      openDialogPreviewReturnInvoice( {
        returnInvoiceId : id
      } )
      return
    }
    if ( action === 'edit' ) {
      if ( !id ) {
        return
      }
      addTab( id as string )
      return
    }
    if ( action === 'print' ) {
      if ( !id ) {
        return
      }
      openDialogReturnInvoicePrint( { returnInvoiceId : id } )
      return
    }

    if ( action === 'cancel' ) {
      if ( !id ) {
        return
      }
      const actionConfirm = () => {
        handlerCancelInvoice(id)
      }
      openDialogCancelReturnInvoice({ actionConfirm })
      return
    }
  }

  const handlerTableSettingsChanged = React.useCallback( ( settings : any ) => {
    setTableSettings( { ...settings } )
  }, [setTableSettings] )

  const tableHeader = React.useMemo( () => {
    if ( !invoiceMainViewHeader ) {
      return []
    }
    return invoiceMainViewHeader.map( ( x : any ) => {
      const translated = x.label && x.label !== '#' && translate( x.label )
      return {
        ...x,
        label : translated && translated !== NOT_FOUND_TRANSLATION ? translated : x.label
      }
    } )
  }, [invoiceMainViewHeader] )

  return (
    <>
      {loading && <SpinnerLoadingCenter />}
      <DivExternalKeyboardRoot className={ 'd-flex flex-column flex-fill letter-spacing hw-find-item-root h-100 px-2' }>
        <div className={ 'd-flex flex-row align-items-center pb-1' }>
          <div className={ 'color-primary pt-1' }><FontAwesomeIcon className={ 'pr-2 font-smaller-5 ' } style={ { fontSize : 20 } } icon={ faInfoCircle }/></div>
          <div className={ 'color-primary font-smaller-5 text-upper' }>return invoices</div>
        </div>
        <ReturnInvoiceFilter/>
        <div className={ 'pt-3 m-0 hw-calculation-table-preview h-100' }>
          <Table
                        tableName={ RETURN_INVOICE_MAIN_VIEW_TABLE }
                        header={ tableHeader }
                        handlerEventPagination={ handlerEventPagination }
                        data={ tableData }
                        separator={ 'cell' }
                        handlerEventDataClick={ handlerDataEventClick }
                        handlerEventSettingsChanged={ handlerTableSettingsChanged }
                        paginationData={ paginationData }
                        scrollable
          />
        </div>
      </DivExternalKeyboardRoot>
    </>
  )
}

export default MainView

export const openDialogCancelReturnInvoice = ({ actionConfirm }: { actionConfirm: ()=> void }) => {
  EasyDialogApolloProvider((closeDialog: ()=> any, openDialog: (data: any)=> any) => {

    const Component = () => {

      const messages: string[] = React.useMemo(() => [
        'Are you sure you want to cancel return invoice? '
      ], [])

      const handlerConfirm = async () => {
        await actionConfirm()
        closeDialog()
      }

      return (
        <DialogComponentQuestions
              closeFun={closeDialog}
              confirmFun={handlerConfirm}
              messages={messages}
        />
      )
    }
    openDialog(<DialogModalRootComponent name={'dialog-return-invoice-cancel-789731532101'} closeFn={closeDialog}>
      <CenteredDialog
          title={'CANCEL RETURN INVOICE'}
          closeAction={closeDialog}
          Component={Component}
      />
    </DialogModalRootComponent>)
  })
}
