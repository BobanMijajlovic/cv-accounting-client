import React, {
  useEffect,
  useState
}                                              from 'react'
import {
  faBook,
  faFileInvoice,
  faHandHoldingUsd,
  faPencilAlt,
  faPrint,
  faSave,
  faSearch
} from '@fortawesome/free-solid-svg-icons'
import {
  useProformaInvoiceForm,
  useProformaInvoiceTabs
}                                              from '../../../../../store/proforma-invoice/useProformaInvoice'
import { useAppBar }                           from '../../../../hooks/useAppBar'
import { TProformaInvoice }                    from '../../../../../graphql/type_logic/types'
import { KeyboardEventCodes }                  from '../../../../../components/hooks/useExternalKeybaord'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider,
  easyDialogError
}                                              from '../../../../../components/EasyModel/EasyModal'
import {
  CenteredDialog,
  DialogComponentQuestions
}                                              from '../../../../../components/Dialog/DialogBasic'
import { SpinnerLoadingCenter }                from '../../../../../components/Spinner/SpinnerLoading'
import {
  CONSTANT_PROFORMA_INVOICE,
  DISCOUNT_SURCHARGE,
  DISCOUNT_SURCHARGE_TYPE
}                                              from '../../../../constants'
import InsertForm                              from './items/InsertForm'
import Footer                                  from './footer'
import ItemsTable                              from './items/Table'
import { openDialogProformaInvoiceHeaderForm } from './header/Form'
import { openDialogProformaInvoiceFooterForm } from './footer/FooterForm'
import ProformaInvoiceHeader                   from './header/Header'
import { openDialogPreviewProformaInvoice }    from '../../preview/Preview'
import { processErrorGraphQL }                 from '../../../../../apollo'
import { openDialogFinishInvoice }             from './footer/GenerateInvoiceForm'
import DivExternalKeyboardRoot                 from '../../../../../components/hooks/DivParentExternalKeybardRoot'
import { openDialogProformaInvoicePrint }      from '../../pdf/Pdf'
import { ProformaInvoiceSummaryTable }         from '../../../invoice/form/Summary'

interface IProformaInvoiceFormProps {
  proformaInvoiceId : string
}

const ProformaInvoiceForm = ( { proformaInvoiceId } : IProformaInvoiceFormProps ) => {
  const { removeTab, addTab } = useProformaInvoiceTabs()
  const { setButtonsForPage, clearButtonsForPage } = useAppBar()
  const [headerState, setHeaderState] : [ boolean, ( r : boolean ) => void ] = useState( true as boolean )

  const { proformaInvoice, invoiceLoading, updateProformaInvoice, saveProformaInvoice, editProformaInvoice, finishProformaInvoice, proformaInvoiceDeleteItem, proformaInvoiceItemUpdateDiscount, proformaInvoiceUpdateItem, cancelProformaInvoice } = useProformaInvoiceForm( proformaInvoiceId, true )

  const handlerUpdateInvoiceHeader = async ( invoice : TProformaInvoice ) => {
    await updateProformaInvoice( invoice )
  }

  const handlerOpenCloseHeader = () => {
    setHeaderState( !headerState )
  }

  const handlerFinishProformaInvoice = () => {
    if ( proformaInvoice.items && ( proformaInvoice.items as any ).length === 0 ) {
      easyDialogError( 'Proforma invoice items not add. To finish proforma invoice, first you need to add some items.' )
      return
    }
    finishProformaInvoice()
      .then( async ( v ) => {
        if ( v && v.data && v.data.proformaInvoice ) {
          await removeTab( v.data.proformaInvoice.id )
        }
      } )
      .catch( e => {
        processErrorGraphQL( e )
      } )
  }

  const handlerSaveProformaInvoice = () => {
    saveProformaInvoice()
      .then()
      .catch( e => {
        processErrorGraphQL( e )
      } )
  }

  const handlerEditProformaInvoice = () => {
    editProformaInvoice()
      .then( async ( v : any ) => {
        await removeTab( proformaInvoiceId )
        if ( v && v.data && v.data.proformaInvoice ) {
          await addTab( v.data.proformaInvoice.id )
        }
      } )
      .catch( e => {
        processErrorGraphQL( e )
      } )
  }

  const saveEditButton = React.useMemo( () => {
    if ( ( proformaInvoice as any ).invoiceId || ( proformaInvoice as any ).status === CONSTANT_PROFORMA_INVOICE.STATUS.CANCELED ) {
      return []
    }
    if ( ( proformaInvoice as any ).status === CONSTANT_PROFORMA_INVOICE.STATUS.OPENED ) {
      return [
        {
          label : 'save',
          icon : faSave,
          color : 'primary',
          shortcut : KeyboardEventCodes.F11,
          onClick : () => openDialogSaveProformaInvoice( {
            actionConfirm : handlerSaveProformaInvoice
          } )
        }
      ]
    }
    return [
      {
        label : 'edit',
        color : 'success',
        icon : faPencilAlt,
        shortcut : KeyboardEventCodes.F11,
        onClick : () => handlerEditProformaInvoice()
      }
    ]
  }, [( proformaInvoice as any ).status] )

  const headerPreviewButtons = React.useMemo( () => {
    let arr : any = []

    if ( ( proformaInvoice as any ).status === CONSTANT_PROFORMA_INVOICE.STATUS.OPENED ) {
      arr = [...arr,
        {
          label : 'Header',
          icon : faFileInvoice,
          shortcut : KeyboardEventCodes.F4,
          onClick : () => openDialogProformaInvoiceHeaderForm( {
            handlerSuccess : handlerUpdateInvoiceHeader,
            proformaInvoiceId
          } )
        },
        {
          label : 'Footer',
          icon : faHandHoldingUsd,
          shortcut : KeyboardEventCodes.F7,
          onClick : () => openDialogProformaInvoiceFooterForm( {
            handlerSuccess : handlerUpdateInvoiceHeader,
            proformaInvoiceId
          } )
        }] as any
    }
    return [...arr, {
      label : 'Preview',
      icon : faSearch,
      shortcut : KeyboardEventCodes.F8,
      onClick : () => openDialogPreviewProformaInvoice( {
        proformaInvoiceId
      } )
    }, {
      label : 'Print',
      icon : faPrint,
      shortcut : KeyboardEventCodes.F9,
      classNames : 'mr-5',
      onClick : () => openDialogProformaInvoicePrint( { proformaInvoiceId : proformaInvoiceId } )
    }]
  }, [( proformaInvoice as any ).status] )

  useEffect( () => {
    const id = setButtonsForPage( [
      ...headerPreviewButtons as any,
      ...saveEditButton as any,

      {
        label : 'finish',
        color : 'success',
        icon : faBook,
        shortcut : KeyboardEventCodes.F12,
        onClick : () => openDialogFinishInvoice( {
          actionConfirm : handlerFinishProformaInvoice
        } )
      }
    ] )
    return () => clearButtonsForPage( id )
  }, [setButtonsForPage, clearButtonsForPage, proformaInvoice] )

  const defaultDiscount = React.useMemo( () => proformaInvoice.discountDefault ? {
    type : DISCOUNT_SURCHARGE_TYPE.PERCENT,
    node : DISCOUNT_SURCHARGE.DISCOUNT,
    value : ( proformaInvoice as any ).discountDefault
  } : void( 0 ), [proformaInvoice] )
  return (
    <DivExternalKeyboardRoot className={ 'd-flex flex-column justify-content-between p-3 calculation-form-root relative w-100 overflow-y' }>
      { invoiceLoading ? <SpinnerLoadingCenter/> : <></> }
      <div className={ 'd-flex flex-column calculation-form-root-div flex-1' }>
        <div className={ 'border-bottom border-light-0 pt-1' }>
          <ProformaInvoiceHeader proformaInvoiceId={ proformaInvoiceId } state={ headerState } handlerOpenCloseHeader={ handlerOpenCloseHeader }/>
        </div>
        {
          ( ( proformaInvoice as any ).status === CONSTANT_PROFORMA_INVOICE.STATUS.OPENED ) ?
            <div className={ 'd-flex justify-content-between align-items-center pb-2 background-grey py-1 px-2 mb-2' }>
              <InsertForm proformaInvoiceId={ proformaInvoiceId }/>
              <ProformaInvoiceSummaryTable proformaInvoiceId={ proformaInvoiceId }/>
            </div> : <> &nbsp;</>
        }
        <div className={ 'mb-1 d-flex flex-column flex-2' }>
          <ItemsTable proformaInvoice={ proformaInvoice } defaultDiscount={ defaultDiscount } headerState={ headerState } deleteItem={ proformaInvoiceDeleteItem } updateDiscount={ proformaInvoiceItemUpdateDiscount } updateItem={ proformaInvoiceUpdateItem }/>
        </div>
      </div>

    </DivExternalKeyboardRoot>
  )
}

export default ProformaInvoiceForm

export const openDialogSaveProformaInvoice = ( { actionConfirm } : { actionConfirm : () => void } ) => {
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    const Component = () => {
      const messages : string[] = React.useMemo( () => [
        'Are you sure you want to save proforma invoice? '
      ], [] )

      const handlerConfirm = async () => {
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
    openDialog( <DialogModalRootComponent name={ 'dialog-proforma-invoice-save-0465142062490156' } closeFn={ closeDialog }>
      <CenteredDialog
                title={ 'SAVE PROFORMA INVOICE' }
                closeAction={ closeDialog }
                Component={ Component }
      />
    </DialogModalRootComponent> )
  } )
}

/*
 export const openDialogFinishProformaInvoice = ({actionConfirm} : { actionConfirm : () => void }) => {
 EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
 const Component = () => {
 const messages : string[] = React.useMemo(() => [
 'Are you sure you want to finish proforma invoice? '
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
 openDialog(<DialogModalRootComponent name={'dialog-proforma-invoice-finish-0465142062490156'} closeFn={closeDialog}>
 <CenteredDialog
 title={'FINISH PROFORMA INVOICE'}
 closeAction={closeDialog}
 Component={Component}
 />
 </DialogModalRootComponent>)
 })
 }*/

