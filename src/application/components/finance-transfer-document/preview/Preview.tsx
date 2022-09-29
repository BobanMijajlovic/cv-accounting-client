import React, { useMemo }                           from 'react'
import _                                            from 'lodash'
import { SpinnerLoadingCenter }                     from '../../../../components/Spinner/SpinnerLoading'
import { useFinanceTransferDocumentQuery }          from '../../../../graphql/graphql'
import {
  TDueDates,
  TFinanceTransferDocument
}                                                   from '../../../../graphql/type_logic/types'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                                   from '../../../../components/hooks/useExternalKeybaord'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                                   from '../../../../components/EasyModel/EasyModal'
import { CenteredDialog }                           from '../../../../components/Dialog/DialogBasic'
import CustomerViewShort                            from '../../customer/views/CustomerViewShort'
import ComponentRender                              from '../../../../components/Util/ComponentRender'
import {
  formatDateLong,
  formatPrice
}                                                   from '../../../utils/Utils'
import Table                                        from '../../../../components/Table/Table'
import {
  ADVANCE_INVOICE_PREVIEW_ITEMS_TABLE_NAME,
  CONSTANT_MODEL
} from '../../../constants'
import { NumberCellColumnSmall }                    from '../../../../components/Table/render/CellRender'
import TaxFinanceRender                             from '../../calculation/_common/TaxFinanceRender'
import { useTranslationFunction }                   from '../../../../components/Translation/useTranslation'
import { FontAwesomeIcon }                          from '@fortawesome/react-fontawesome'
import { faStickyNote }                             from '@fortawesome/free-solid-svg-icons'

export const financeTransferDocumentTableHeader = [
  {
    label : '#',
    field : 'position',
    cell : {
      classes : ['hw-table-cell-center'],
      render : NumberCellColumnSmall
    }
  },
  {
    label : 'ITEM_PRICE_LABEL_ITEM_NAME',
    field : 'itemDescription',
    cell : {
      classes : ['text-left'],
      style : {
        width : 350
      }
    },
    style : {
      width : 350
    }
  },
  {
    label : 'INVOICE_ITEMS_TABLE_TH_BASE_FINANCE',
    field : 'totalFinanceVP',
    cell : {
      classes : ['text-right'],
      format : ( value : string ) => {
        return formatPrice( value )
      }
    }
  },
  {
    label : 'INVOICE_ITEMS_TABLE_TH_TAX',
    field : 'totalFinanceTax',
    cell : {
      classes : ['text-right'],
      render : TaxFinanceRender
    }
  },
  {
    label : 'INVOICE_ITEMS_TABLE_TH_FINANCE',
    field : 'totalFinanceMP',
    cell : {
      classes : ['text-right'],
      format : ( value : string ) => {
        return formatPrice( value )
      }
    }
  }
]

const FinanceTransferDocumentPreview = ( { closeDialog, financeTransferDocumentId } : { closeDialog? : () => void, financeTransferDocumentId : string } ) => {

  const { translate } = useTranslationFunction()
  const { data, loading } = useFinanceTransferDocumentQuery( {
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'network-only',
    variables : {
      id : Number( financeTransferDocumentId )
    },
    skip : !financeTransferDocumentId
  } )

  const financeTransferDocument = useMemo( () => !data || !data.financeTransferDocument ? {} as TFinanceTransferDocument : data.financeTransferDocument, [data] )

  const { setRef } = useExternalKeyboard( ( e : KeyboardEvent ) => {
    switch ( e.key ) {
      case KeyboardEventCodes.Esc:
        closeDialog && closeDialog()
        break
    }
  }, true, [KeyboardEventCodes.Esc], 'finance-transfer-document-preview-dialog' )

  const tableData = useMemo( () => {
    if (!financeTransferDocument || !financeTransferDocument.tax) {
      return [] 
    }
    const tax = financeTransferDocument.tax as any
    const totalFinanceMP = _.round(tax.reduce( ( acc : number, x : any ) => _.add( acc, x.financeMP ), 0 ), 2 ) || 0
    const totalFinanceTax = _.round(tax.reduce( ( acc : number, x : any ) => _.add( acc, x.taxFinance ), 0 ), 2 ) || 0
    const totalFinanceVP = _.round( _.subtract( totalFinanceMP, totalFinanceTax ), 2 )
    return [
      {
        ...financeTransferDocument,
        position : 0,
        taxId: tax[0].taxId,
        taxPercent: tax[0].taxPercent,
        totalFinanceMP,
        totalFinanceTax,
        totalFinanceVP
      }
    ]
  }, [financeTransferDocument] )
    
  const dueDate = useMemo(() => financeTransferDocument.dueDates && financeTransferDocument.dueDates.length !== 0 ? financeTransferDocument.dueDates[0] : {} as TDueDates,[financeTransferDocument.dueDates])
  const title = useMemo(() => financeTransferDocument.documentType === CONSTANT_MODEL.FINANCE_TRANSFER_DOCUMENT_TYPE.ADVANCE ? 'ADVANCE INVOICE' : 'FINANCE TRANSFER DOCUMENT',[financeTransferDocument])

  const tableHeader = React.useMemo( () => {
    if ( !financeTransferDocumentTableHeader ) {
      return []
    }
    return financeTransferDocumentTableHeader.map( ( x : any ) => {
      return {
        ...x,
        label : x.label && x.label !== '#' ? translate( x.label ) : x.label
      }
    } )
  }, [financeTransferDocumentTableHeader] )

  return (
    <>
      { loading ? <SpinnerLoadingCenter/> : null }
      <div className={ 'hw-advance-invoice-preview-root relative d-flex flex-column font-smaller-2' } ref={ setRef }>
        <div className={ 'd-flex flex-row align-items-start justify-content-between px-2 mt-2 mb-3 relative border-bottom-double' }>
          <div className={ 'hw-calculation-client-preview flex-1' }>
            <CustomerViewShort customer={ financeTransferDocument.customer as any }/>
          </div>
          <div className={ 'd-flex flex-row px-2 pb-4 justify-content-between flex-1' }>
            <ComponentRender label={ `${title} #` } value={ financeTransferDocument.number } labelClass={ 'text-upper opacity-6 font-weight-normal' } classNames={ 'pr-4' }/>
            <ComponentRender label={ 'DATE ' } value={ financeTransferDocument.date } format={ formatDateLong } labelClass={ 'text-upper opacity-6 font-weight-normal' } classNames={ 'pr-4' }/>
            <ComponentRender label={ 'DUE DATE' } value={ dueDate.date } format={ formatDateLong } labelClass={ 'text-upper opacity-6 font-weight-normal' } classNames={ 'pr-4' }/>
          </div>
        </div>
        <div className={ 'w-100 calculation-items-table-root mb-2 flex-2' }>
          <Table
                        modelFields={ ['taxPercent', 'taxId'] }
                        header={ tableHeader }
                        separator={ 'cell' }
                        data={ tableData }
                        tableName={ ADVANCE_INVOICE_PREVIEW_ITEMS_TABLE_NAME }
          />
        </div>
        <div className={ 'd-flex flex-column mt-3 justify-content-start text-left' }>
          <div className={ 'd-flex color-primary font-smaller-3 mb-2 w-100 pb-1 border-bottom-double' }>
            <div className={ 'pr-2' }><FontAwesomeIcon icon={ faStickyNote }/></div>
            <div className={ 'text-upper font-bold' }>NOTES</div>
          </div>
          {
            financeTransferDocument.notes && financeTransferDocument.notes.map( ( x, index ) => {
              return <div key={ index } className={ '' }>{ x.note }</div>
            } )
          }
        </div>
      </div>

    </>
  )
}

export const openDialogPreviewFinanceTransferDocument = ( { financeTransferDocumentId, documentType  } : { financeTransferDocumentId : string, documentType: number } ) => {
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    openDialog( <DialogModalRootComponent name={ 'dialog-advance-invoice-preview-8707452010410' } closeFn={ closeDialog }>
      <CenteredDialog
                title={ documentType === CONSTANT_MODEL.FINANCE_TRANSFER_DOCUMENT_TYPE.ADVANCE ? 'advance invoice preview' : 'Finance transfer document preview' }
                closeAction={ closeDialog }
                Component={ FinanceTransferDocumentPreview }
                componentRenderProps={ {
                  closeDialog : closeDialog,
                  financeTransferDocumentId
                } }
      />
    </DialogModalRootComponent> )
  } )
}