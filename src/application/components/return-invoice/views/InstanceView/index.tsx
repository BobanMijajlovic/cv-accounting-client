import React, {
  useEffect,
  useMemo,
  useState
}                                            from 'react'
import DivExternalKeyboardRoot               from '../../../../../components/hooks/DivParentExternalKeybardRoot'
import {
  useReturnInvoiceForm,
  useReturnInvoiceTabs
}                                            from '../../../../../store/return-invoice/useReturnInvoice'
import ReturnInvoiceHeader                   from './header/Header'
import InsertForm                            from './items/InsertForm'
import { ReturnInvoiceSummaryTable }         from '../../../invoice/form/Summary'
import ItemsTable                            from './items/Table'
import {
  faBook,
  faCalendarAlt,
  faFileInvoice,
  faHandHoldingUsd,
  faPrint,
  faSearch
}                                            from '@fortawesome/free-solid-svg-icons'
import { KeyboardEventCodes }                from '../../../../../components/hooks/useExternalKeybaord'
import { TReturnInvoice }                    from '../../../../../graphql/type_logic/types'
import { openDialogReturnInvoiceFooterForm } from './footer/FooterForm'
import { openDialogReturnInvoiceHeaderForm } from './header/Form'
import { openReturnInvoiceDueDateDialog }    from './footer/DueDateDialog'
import { useAppBar }                         from '../../../../hooks/useAppBar'
import { useTranslationFunction }            from '../../../../../components/Translation/useTranslation'
import { openDialogPreviewReturnInvoice }    from '../../preview/Preview'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider,
  easyDialogError
}                                            from '../../../../../components/EasyModel/EasyModal'
import {
  getInvoiceFinanceMP,
  getInvoiceFooterAdditionalExpenseFinance,
  getInvoiceTotalAddedDueDates
}                                            from '../../../invoice/util'
import _                                     from 'lodash'
import { toNumberFixed }                     from '../../../../utils/Utils'
import {
  CenteredDialog,
  DialogComponentQuestions
}                                            from '../../../../../components/Dialog/DialogBasic'
import { openDialogReturnInvoicePrint }      from '../../pdf/Pdf'

const ReturnInvoiceForm = ( { returnInvoiceId } : { returnInvoiceId : string } ) => {

  const { translate } = useTranslationFunction()
  const { returnInvoice, updateReturnInvoice, saveReturnInvoice } = useReturnInvoiceForm( returnInvoiceId )
  const { removeTab } = useReturnInvoiceTabs()
  const [headerState, setHeaderState] : [ boolean, ( r : boolean ) => void ] = useState( true as boolean )
  const { setButtonsForPage, clearButtonsForPage } = useAppBar()

  const handlerOpenCloseHeader = () => {
    setHeaderState( !headerState )
  }

  const handlerUpdateInvoiceHeader = async ( invoice : TReturnInvoice ) => {
    await updateReturnInvoice( invoice )
  }

  const handlerFinishInvoice = async () => {
    await saveReturnInvoice()
      .then( ( v ) => {
        removeTab( returnInvoiceId )
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
        onClick : () => openDialogReturnInvoiceHeaderForm( {
          handlerSuccess : handlerUpdateInvoiceHeader,
          returnInvoiceId
        } )
      },
      {
        label : translate( 'LABEL_FOOTER' ),
        icon : faHandHoldingUsd,
        shortcut : KeyboardEventCodes.F7,
        onClick : () => openDialogReturnInvoiceFooterForm( {
          handlerSuccess : handlerUpdateInvoiceHeader,
          returnInvoiceId
        } )
      }
    ]

    if ( returnInvoice.items && ( returnInvoice.items as any ).length !== 0 ) {
      arr.push( {
        label : translate( 'DUE_DATE_VIEW_TH_DUE_DATE' ),
        icon : faCalendarAlt,
        shortcut : KeyboardEventCodes.F8,
        onClick : () => openReturnInvoiceDueDateDialog( {
          handlerSuccess : handlerUpdateInvoiceHeader,
          returnInvoiceId
        } )
      } )
    }
    return [
      ...arr,
      {
        label : translate( 'LABEL_PREVIEW' ),
        icon : faSearch,
        shortcut : KeyboardEventCodes.F9,
        onClick : () => openDialogPreviewReturnInvoice( {
          returnInvoiceId
        } )
      },
      {
        label : translate( 'SMALL_BUTTON_PRINT ' ),
        icon : faPrint,
        shortcut : KeyboardEventCodes.F10,
        onClick : () => openDialogReturnInvoicePrint( { returnInvoiceId } )
      },
      {
        label : translate( 'LABEL_FINISH' ),
        color : 'success',
        icon : faBook,
        classNames : 'ml-5',
        shortcut : KeyboardEventCodes.F12,
        onClick : () => openDialogSaveReturnInvoice( {
          actionConfirm : handlerFinishInvoice,
          returnInvoiceId
        } )
      }
    ]

  }, [returnInvoice.items, returnInvoiceId] )

  useEffect( () => {
    const id = setButtonsForPage( appBarButtons as any )
    return () => clearButtonsForPage( id )
  }, [setButtonsForPage, clearButtonsForPage, translate, returnInvoice] )

  return (
    <>
      <DivExternalKeyboardRoot className={ 'd-flex flex-column calculation-form-root-div flex-1' }>
        <div className={ 'border-bottom border-light-0 pt-1' }>
          <ReturnInvoiceHeader returnInvoice={ returnInvoice } state={ headerState } handlerOpenCloseHeader={ handlerOpenCloseHeader }/>
        </div>
        <div className={ 'd-flex justify-content-between align-items-center pb-2 background-grey py-1 px-2 mb-2' }>
          <InsertForm returnInvoiceId={ returnInvoiceId }/>
          <ReturnInvoiceSummaryTable returnInvoiceId={ returnInvoiceId }/>
        </div>
        <div className={ 'mb-1 d-flex flex-column flex-2' }>
          <ItemsTable returnInvoiceId={ returnInvoiceId }/>
        </div>
      </DivExternalKeyboardRoot>
    </>
  )
}

export default ReturnInvoiceForm

export const openDialogSaveReturnInvoice = ( { actionConfirm, returnInvoiceId } : { actionConfirm : () => void, returnInvoiceId : string } ) => {
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {

    const Component = () => {
      const { translate } = useTranslationFunction()
      const { returnInvoice, updateReturnInvoice } = useReturnInvoiceForm( returnInvoiceId )

      const messages : string[] = React.useMemo( () => [
        'Are you sure you want to finish return invoice? '
      ], [] )

      const handlerConfirm = async () => {
        const added = getInvoiceTotalAddedDueDates( returnInvoice.dueDates as any )
        const totalFinance = _.round( _.add( getInvoiceFinanceMP( returnInvoice.items as any ), getInvoiceFooterAdditionalExpenseFinance( returnInvoice.expense as any ) ), 2 )
        const diff = _.round( _.subtract( totalFinance, added ), 2 )
        if ( !returnInvoice?.dueDates?.[0] ) {
          await updateReturnInvoice( {
            footer : {
              dueDates : [{
                dueDate : `${ new Date().toISOString() }`,
                finance : toNumberFixed( totalFinance )
              }]
            }
          } as any )
        }
        if ( returnInvoice.dueDates && ( returnInvoice.dueDates as any ).length !== 0 ) {
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
    openDialog( <DialogModalRootComponent name={ 'dialog-return-invoice-save-01456098509840165' } closeFn={ closeDialog }>
      <CenteredDialog
                title={ 'SAVE RETURN INVOICE' }
                closeAction={ closeDialog }
                Component={ Component }
      />
    </DialogModalRootComponent> )
  } )
}
