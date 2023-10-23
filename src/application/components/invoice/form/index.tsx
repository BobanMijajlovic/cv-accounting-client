import React, {
  useEffect,
  useMemo,
  useState
}                                      from 'react'
import InvoiceHeader                   from './header/Header'
import InsertForm                      from './items/InsertForm'
import ItemsTable                      from './items/Table'
import { useAppBar }                   from '../../../hooks/useAppBar'
import {
  faBook,
  faCalendarAlt,
  faFileInvoice,
  faHandHoldingUsd,
  faPrint,
  faSearch
}                                      from '@fortawesome/free-solid-svg-icons'
import { KeyboardEventCodes }          from '../../../../components/hooks/useExternalKeybaord'
import { openDialogInvoiceHeaderForm } from './header/Form'
import { TInvoice }                    from '../../../../graphql/type_logic/types'
import {
  useInvoiceForm,
  useInvoiceTabs
}                                      from '../../../../store/invoice/useInvoice'
import { SpinnerLoadingCenter }        from '../../../../components/Spinner/SpinnerLoading'
import { openDialogInvoiceFooterForm } from './footer/FooterForm'
import { openDialogPreviewInvoice }    from '../preview/Preview'
import {
  DISCOUNT_SURCHARGE,
  DISCOUNT_SURCHARGE_TYPE
}                                      from '../../../constants'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider,
  easyDialogError
}                                      from '../../../../components/EasyModel/EasyModal'
import {
  CenteredDialog,
  DialogComponentQuestions
}                                      from '../../../../components/Dialog/DialogBasic'
import { openInvoiceDueDateDialog }    from './footer/DueDateDialog'
import { openDialogInvoicePrint }      from '../pdf/Pdf'
import {
  getInvoiceFinanceMP,
  getInvoiceFooterAdditionalExpenseFinance,
  getInvoiceTotalAddedDueDates
}                                      from '../util'
import _                               from 'lodash'
import { toNumberFixed }               from '../../../utils/Utils'
import DivExternalKeyboardRoot         from '../../../../components/hooks/DivParentExternalKeybardRoot'
import { useTranslationFunction }      from '../../../../components/Translation/useTranslation'
import { InvoiceSummaryTable }         from './Summary'

interface IInvoiceFormProps {
  invoiceId : string
}

const InvoiceForm = ( { invoiceId } : IInvoiceFormProps ) => {
  const { translate } = useTranslationFunction()
  const { removeTab } = useInvoiceTabs()
  const { setButtonsForPage, clearButtonsForPage } = useAppBar()
  const [headerState, setHeaderState] : [ boolean, ( r : boolean ) => void ] = useState( true as boolean )

  const { invoice, invoiceLoading, updateInvoice, invoiceDeleteItem, invoiceUpdateItem, invoiceItemUpdateDiscount, saveInvoice } = useInvoiceForm( invoiceId, true )

  const handlerUpdateInvoiceHeader = async ( invoice : TInvoice ) => {
    await updateInvoice( invoice )
  }

  const handlerOpenCloseHeader = () => {
    setHeaderState( !headerState )
  }

  const handlerFinishInvoice = async () => {
    await saveInvoice()
      .then( ( v ) => {
        removeTab( invoiceId )
      } )
      .catch( e => {
        console.log( e )
      } )
  }

  const appBarButtons = useMemo( () => {
    const arr = [
      {
        label : translate( 'LABEL_HEADER' ),
        icon : faFileInvoice,
        shortcut : KeyboardEventCodes.F4,
        onClick : () => openDialogInvoiceHeaderForm( {
          handlerSuccess : handlerUpdateInvoiceHeader,
          invoiceId
        } )
      },
      {
        label : translate( 'LABEL_FOOTER' ),
        icon : faHandHoldingUsd,
        shortcut : KeyboardEventCodes.F7,
        onClick : () => openDialogInvoiceFooterForm( {
          handlerSuccess : handlerUpdateInvoiceHeader,
          invoiceId
        } )
      }
    ]

    if ( invoice.items && ( invoice.items as any ).length !== 0 ) {
      arr.push( {
        label : translate( 'DUE_DATE_VIEW_TH_DUE_DATE' ),
        icon : faCalendarAlt,
        shortcut : KeyboardEventCodes.F8,
        onClick : () => openInvoiceDueDateDialog( {
          handlerSuccess : handlerUpdateInvoiceHeader,
          invoiceId
        } )
      } )
    }
    return [
      ...arr,
      {
        label : translate( 'LABEL_PREVIEW' ),
        icon : faSearch,
        shortcut : KeyboardEventCodes.F9,
        onClick : () => openDialogPreviewInvoice( {
          invoiceId
        } )
      },
      {
        label : translate( 'SMALL_BUTTON_PRINT ' ),
        icon : faPrint,
        shortcut : KeyboardEventCodes.F10,
        onClick : () => openDialogInvoicePrint( { invoiceId, tableSettings : {} } )
      },
      {
        label : translate( 'LABEL_FINISH' ),
        color : 'success',
        icon : faBook,
        classNames : 'ml-5',
        shortcut : KeyboardEventCodes.F12,
        onClick : () => openDialogSaveInvoice( {
          actionConfirm : handlerFinishInvoice,
          invoiceId
        } )
      }
    ]

  }, [invoice.items, invoiceId] )

  useEffect( () => {
    const id = setButtonsForPage( appBarButtons as any )
    return () => clearButtonsForPage( id )
  }, [setButtonsForPage, clearButtonsForPage, translate, invoice] )

  const defaultDiscount = React.useMemo( () => invoice.discountDefault ? {
    type : DISCOUNT_SURCHARGE_TYPE.PERCENT,
    node : DISCOUNT_SURCHARGE.DISCOUNT,
    value : ( invoice as any ).discountDefault
  } : void( 0 ), [invoice] )

  return (
    <>
      { invoiceLoading ? <SpinnerLoadingCenter/> : <></> }
      <DivExternalKeyboardRoot className={ 'd-flex flex-column calculation-form-root-div flex-1' }>
        <div className={ 'border-bottom border-light-0 pt-1' }>
          <InvoiceHeader invoice={ invoice } state={ headerState } handlerOpenCloseHeader={ handlerOpenCloseHeader }/>
        </div>
        <div className={ 'd-flex justify-content-between align-items-center pb-2 background-grey py-1 px-2 mb-2' }>
          <InsertForm invoiceId={ invoiceId }/>
          <InvoiceSummaryTable invoiceId={ invoiceId }/>
        </div>
        <div className={ 'mb-1 d-flex flex-column flex-2' }>
          <ItemsTable invoice={ invoice } defaultDiscount={ defaultDiscount } headerState={ headerState } deleteItem={ invoiceDeleteItem } updateDiscount={ invoiceItemUpdateDiscount } updateItem={ invoiceUpdateItem }/>
        </div>
      </DivExternalKeyboardRoot>
    </>
  )
}

export default InvoiceForm

export const openDialogSaveInvoice = ( { actionConfirm, invoiceId } : { actionConfirm : () => void, invoiceId : string } ) => {
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {

    const Component = () => {
      const { translate } = useTranslationFunction()
      const { invoice, updateInvoice } = useInvoiceForm( invoiceId )

      const messages : string[] = React.useMemo( () => [
        'Are you sure you want to finish invoice? '
      ], [] )

      const handlerConfirm = async () => {
        const added = getInvoiceTotalAddedDueDates( invoice.dueDates as any )
        const totalFinance = _.round( _.add( getInvoiceFinanceMP( invoice.items as any ), getInvoiceFooterAdditionalExpenseFinance( invoice.expense as any ) ), 2 )
        const diff = _.round( _.subtract( totalFinance, added ), 2 )
        if ( !invoice?.dueDates?.[0] ) {
          await updateInvoice( {
            footer : {
              dueDates : [{
                dueDate : `${ new Date().toISOString() }`,
                finance : toNumberFixed( totalFinance )
              }]
            }
          } as any )
        }
        if ( invoice.dueDates && ( invoice.dueDates as any ).length !== 0 ) {
          if ( diff !== 0 ) {
            easyDialogError( translate( 'INVOICE_SAVE_DIALOG_ERROR_MESSAGE' ) )
            return
          }
        }

        await actionConfirm()
        closeDialog()
      }

      return (
        <DialogComponentQuestions
                    closeFun={ closeDialog }
                    confirmFun={ handlerConfirm }
                    messages={ messages }
        />
      )
    }
    openDialog( <DialogModalRootComponent name={ 'dialog-invoice-save-789731532101' } closeFn={ closeDialog }>
      <CenteredDialog
                title={ 'INVOICE_SAVE_DIALOG_TITLE' }
                closeAction={ closeDialog }
                Component={ Component }
      />
    </DialogModalRootComponent> )
  } )
}
