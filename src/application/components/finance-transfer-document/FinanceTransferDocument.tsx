import React, {
  useEffect,
  useMemo,
  useState
}                                                     from 'react'
import {
  useFinanceTransferDocumentsQuery,
  useInsertFinanceTransferDocumentMutation,
  useUpdateFinanceTransferDocumentMutation
}                                                     from '../../../graphql/graphql'
import {
  NOT_FOUND_TRANSLATION,
  useTranslationFunction
}                                                     from '../../../components/Translation/useTranslation'
import { useFinanceTransferDocument }                 from '../../../store/finance-transfer-document/useFinanceTransferDocument'
import { usePagination }                              from '../../../components/Pagination/usePagination'
import { useAppBar }                                  from '../../hooks/useAppBar'
import { queryVariablesForFinanceTransferDocuments }  from '../../../graphql/variablesQ'
import _                                              from 'lodash'
import { processErrorGraphQL }                        from '../../../apollo'
import {
  faFileInvoice,
  faInfoCircle
}                                                     from '@fortawesome/free-solid-svg-icons'
import { KeyboardEventCodes }                         from '../../../components/hooks/useExternalKeybaord'
import { invoiceMainViewHeader }                      from '../return-invoice/views/MainView/MainView'
import { SpinnerLoadingCenter }                       from '../../../components/Spinner/SpinnerLoading'
import DivExternalKeyboardRoot                        from '../../../components/hooks/DivParentExternalKeybardRoot'
import { FontAwesomeIcon }                            from '@fortawesome/react-fontawesome'
import Table                                          from '../../../components/Table/Table'
import {
  CONSTANT_FINANCE_TRANSFER_DOCUMENT,
  CONSTANT_MODEL,
  FINANCE_TRANSFER_DOCUMENT_MAIN_VIEW_TABLE
}                                                     from '../../constants'
import FinanceTransferDocumentTableActionCell         from './_common/FinanceTransferDocumentTableActionCell'
import FinanceTransferDocumentFilter                  from './main/Filter'
import { openDialogFinanceTransferDocumentPdf }       from './pdf/Pdf'
import { openDialogPreviewFinanceTransferDocument }   from './preview/Preview'
import { openDialogDefineNewFinanceTransferDocument } from './form/FinanceTransferDocumentForm'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                                     from '../../../components/EasyModel/EasyModal'
import {
  CenteredDialog,
  DialogComponentQuestions
}                                                     from '../../../components/Dialog/DialogBasic'
import { FlagRender }                                 from '../invoice/_common/StatusRender'

interface IFinanceTransferDocumentProps {
  documentType? : number
}

const FinanceTransferDocument = ( {
  documentType = CONSTANT_MODEL.FINANCE_TRANSFER_DOCUMENT_TYPE.TRANSFER
} : IFinanceTransferDocumentProps ) => {

  const [mutationInsertFinanceTransferDocument] = useInsertFinanceTransferDocumentMutation()
  const [mutationUpdateFinanceTransferDocument] = useUpdateFinanceTransferDocumentMutation()
  const { translate } = useTranslationFunction()
  const { financeTransferDocumentFilter } = useFinanceTransferDocument()
  const { dateFrom, dateTo, customer, status, flag } = financeTransferDocumentFilter || {}
  const { data : pagData, setBackendPaginationData, handlerEvent : handlerEventPagination } = usePagination()
  const { perPage : pagPerPage, page : pagPage, numItems : pagNumItems } = pagData
  const [tableSettings, setTableSettings] = useState( {} )
  const { setButtonsForPage, clearButtonsForPage } = useAppBar()

  const isAdvanceInvoice = useMemo( () => documentType === CONSTANT_MODEL.FINANCE_TRANSFER_DOCUMENT_TYPE.ADVANCE, [documentType])

  const queryVariablesFinanceTransferDocuments = React.useMemo( () => {
    const date = new Date()
    date.setDate( date.getDate() - 15 )
    const options = Object.assign( {
      dateFrom : dateFrom ? dateFrom : date,
      dateTo : dateTo ? dateTo : new Date(),
      status : status ? status : undefined,
      flag: flag ? flag : undefined
    }, customer ? { customerId : customer.id } : {} )

    const offset = ( ( pagPage || 1 ) - 1 ) * ( pagPerPage || 20 )
    return queryVariablesForFinanceTransferDocuments( offset, pagPerPage || 20, documentType, options )
  }, [pagPerPage, pagPage, customer, dateFrom, dateTo, status, documentType, flag] )

  const { data, loading, refetch : refetchfinanceTransferDocuments } = useFinanceTransferDocumentsQuery( {
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'network-only',
    variables : queryVariablesFinanceTransferDocuments,
    onCompleted : ( data ) => {
      if ( !data || !data.data || !data.data.items ) {
        return
      }
      const { page, count } = data.data
      setBackendPaginationData( page || 1, count )
    },
    skip : !queryVariablesFinanceTransferDocuments
  } )

  const paginationData = React.useMemo( () => {
    return {
      perPage : pagPerPage || 20,
      page : pagPage || 1,
      totalItems : pagNumItems || 0
    }
  }, [pagPerPage, pagPage, pagNumItems] )

  const tableData = React.useMemo( () => !data || !data.data.items || data.data.items.length === 0 ? [] :
    data.data.items.map( ( x : any, index : number ) => {
      const financeMP = _.round( x.tax.reduce( ( acc : number, x : any ) => _.add( acc, x.financeMP ), 0 ), 2 )
      const taxFinance = _.round( x.tax.reduce( ( acc : number, x : any ) => _.add( acc, x.taxFinance ), 0 ), 2 )
      const financeVP = _.round( _.subtract( financeMP, taxFinance ), 2 )
      return {
        ...x,
        position : index + 1,
        totalFinanceMP : financeMP,
        totalFinanceTax : taxFinance,
        totalFinanceVP : financeVP

      }
    } )
  , [data] )

  const handlerInsertFinanceTransferDocument = React.useCallback( async ( financeTransferDocument : any ) => {
    await mutationInsertFinanceTransferDocument( {
      variables : {
        data : financeTransferDocument
      }
    } )
      .then( ( v ) => {
        refetchfinanceTransferDocuments().then()
      } )
      .catch( e => {
        processErrorGraphQL( e, {} )
      } )
  }, [mutationInsertFinanceTransferDocument, refetchfinanceTransferDocuments] )

  const handlerCancelFinanceTransferDocument = (id: string) => {
    mutationUpdateFinanceTransferDocument( {
      variables : {
        id : Number( id ),
        data : {
          status : CONSTANT_FINANCE_TRANSFER_DOCUMENT.STATUS.DELETED
        }
      }
    } )
      .then( () => {
        refetchfinanceTransferDocuments().then()
      } )
      .catch( e => {
        processErrorGraphQL( e, {} )
      } )
  }

  useEffect( () => {
    const id = setButtonsForPage( [
      {
        label : `NEW ${isAdvanceInvoice ? 'ADV. INV.' : 'FIN. TRAN.'}`,
        icon : faFileInvoice,
        shortcut : KeyboardEventCodes.F4,
        onClick : () => openDialogDefineNewFinanceTransferDocument( {
          handlerSuccess : handlerInsertFinanceTransferDocument,
          documentType
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
      openDialogPreviewFinanceTransferDocument( {
        financeTransferDocumentId : id,
        documentType
      } )
      return
    }
    if ( action === 'print' ) {
      if ( !id ) {
        return
      }
      openDialogFinanceTransferDocumentPdf( { financeTransferDocumentId : id } )
      return
    }

    if ( action === 'cancel' ) {
      if ( !id ) {
        return
      }
      const actionConfirm = () => {
        handlerCancelFinanceTransferDocument( id )
      }
      openDialogCancelFinanceTransferDocument( { actionConfirm, documentType } )
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
    const header = invoiceMainViewHeader.map( ( x : any ) => {
      const translated = x.label && x.label !== '#' && translate( x.label )
      const label = translated && translated !== NOT_FOUND_TRANSLATION ? translated : x.label
      if ( x.field === 'act' ) {
        return {
          ...x,
          label,
          cell : {
            ...x.cell,
            render : FinanceTransferDocumentTableActionCell
          }
        }
      }
      return {
        ...x,
        label
      }
    } )
    header.splice(header.length - 2,0,{
      label : 'in / out',
      field : 'flag',
      cell : {
        classes : ['hw-table-cell-center'],
        render : FlagRender
      }
    })
    header.join()
    return header
  }, [invoiceMainViewHeader] )

  const title = useMemo( () => isAdvanceInvoice ? 'advance invoices' : 'Finance transfer documents', [isAdvanceInvoice] )

  return (
    <>
      { loading && <SpinnerLoadingCenter/> }
      <DivExternalKeyboardRoot className={ 'd-flex flex-column flex-fill letter-spacing hw-find-item-root h-100 px-5' }>
        <div className={ 'd-flex flex-row align-items-center pb-1' }>
          <div className={ 'color-primary pt-1' }><FontAwesomeIcon className={ 'pr-2 font-smaller-5 ' } style={ { fontSize : 20 } } icon={ faInfoCircle }/></div>
          <div className={ 'color-primary font-smaller-5 text-upper' }>{ title }</div>
        </div>
        <FinanceTransferDocumentFilter/>
        <div className={ 'pt-3 m-0 hw-calculation-table-preview h-100' }>
          <Table
                        tableName={ FINANCE_TRANSFER_DOCUMENT_MAIN_VIEW_TABLE }
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

export default FinanceTransferDocument

export const AdvanceInvoiceDocument = () => {
  return <FinanceTransferDocument documentType={CONSTANT_MODEL.FINANCE_TRANSFER_DOCUMENT_TYPE.ADVANCE} />
}

export const openDialogCancelFinanceTransferDocument = ({ actionConfirm, documentType }: { actionConfirm: ()=> void, documentType: number}) => {
  EasyDialogApolloProvider((closeDialog: ()=> any, openDialog: (data: any)=> any) => {

    const Component = () => {
      const isAdvanceInvoice = useMemo( () => documentType === CONSTANT_MODEL.FINANCE_TRANSFER_DOCUMENT_TYPE.ADVANCE, [documentType])

      const messages: string[] = React.useMemo(() => [
        `Are you sure you want to cancel ${isAdvanceInvoice ? 'advance invoice' : 'finance transfer document'}? `
      ], [isAdvanceInvoice])

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
    openDialog(<DialogModalRootComponent name={'dialog-finance-transfer-document-cancel-789731532101'} closeFn={closeDialog}>
      <CenteredDialog
          title={documentType === CONSTANT_MODEL.FINANCE_TRANSFER_DOCUMENT_TYPE.ADVANCE ? 'CANCEL ADVANCE INVOICE' : 'CANCEL FINANCE TRANSFER DOCUMENT' }
          closeAction={closeDialog}
          Component={Component}
      />
    </DialogModalRootComponent>)
  })
}
