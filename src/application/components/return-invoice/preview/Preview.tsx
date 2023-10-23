import React, { useState }       from 'react'
import { useReturnInvoiceQuery } from '../../../../graphql/graphql'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                from '../../../../components/EasyModel/EasyModal'
import { SpinnerLoadingCenter }  from '../../../../components/Spinner/SpinnerLoading'
import { CenteredDialog }        from '../../../../components/Dialog/DialogBasic'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                from '../../../../components/hooks/useExternalKeybaord'
import ReturnInvoiceHeader       from '../views/InstanceView/header/Header'
import Body                      from './Body'

interface IReturnInvoicePreviewProps {
  closeDialog? : () => void
  returnInvoiceId : string
}

const Preview = ( {  closeDialog, returnInvoiceId } : IReturnInvoicePreviewProps ) => {

  const [headerState, setHeaderState] : [ boolean, ( r : boolean ) => void ] = useState( true as boolean )

  const { data, loading } = useReturnInvoiceQuery( {
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'network-only',
    variables : {
      id : Number( returnInvoiceId )
    },
    skip : !returnInvoiceId
  } )
  const returnInvoice = React.useMemo( () => !data || !data.returnInvoice ? {} as any : data.returnInvoice, [data] )

  const handlerOpenCloseHeader = () => {
    setHeaderState( !headerState )
  }

  const { setRef } = useExternalKeyboard( ( e : KeyboardEvent ) => {
    switch ( e.key ) {
      case KeyboardEventCodes.Esc:
        closeDialog && closeDialog()
        break
    }
  }, true, [KeyboardEventCodes.Esc], 'invoice-preview-dialog' )

  return (
    <>
      { loading ? <SpinnerLoadingCenter/> : null }
      <div className={ 'hw-invoice-preview-root relative d-flex flex-column font-smaller-2' } ref={ setRef }>
        {
          returnInvoice || returnInvoice.items ?
            (
              <>
                <div className={ 'mb-2 border-bottom border-light-0 pt-1' }>
                  <ReturnInvoiceHeader isPreview returnInvoice={ returnInvoice } state={ headerState } handlerOpenCloseHeader={ handlerOpenCloseHeader }/>
                </div>
                {
                  returnInvoice ?
                    <Body returnInvoice={ returnInvoice } headerState={ headerState }/>
                    : <></>
                }
              </>
            )
            : ( <div>Return Invoice not exists in system. Try again.</div> )
        }
      </div>
    </>
  )
}

export default Preview

export interface IDialogPreviewReturnInvoice {
  returnInvoiceId : string
}

export const openDialogPreviewReturnInvoice = ( props : IDialogPreviewReturnInvoice ) => {
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    openDialog( <DialogModalRootComponent name={ 'dialog-return-invoice-preview-707074510704210' } closeFn={ closeDialog }>
      <CenteredDialog
                title={ 'Return invoice preview' }
                closeAction={ closeDialog }
                Component={ Preview }
                componentRenderProps={ {
                  closeDialog : closeDialog,
                  ...props
                } }
      />
    </DialogModalRootComponent> )
  } )
}
