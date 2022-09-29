import React, { useState }         from 'react'
import { useProformaInvoiceQuery } from '../../../../graphql/graphql'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                  from '../../../../components/EasyModel/EasyModal'
import { SpinnerLoadingCenter }    from '../../../../components/Spinner/SpinnerLoading'
import { CenteredDialog }          from '../../../../components/Dialog/DialogBasic'
import {
  DISCOUNT_SURCHARGE,
  DISCOUNT_SURCHARGE_TYPE
}                                  from '../../../constants'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                  from '../../../../components/hooks/useExternalKeybaord'
import ProformaInvoiceHeader       from '../views/InstanceView/header/Header'
import Body                        from './Body'

interface IInvoicePreviewProps {
  closeDialog ?: () => void
  proformaInvoiceId : string
  actionConfirm ?: () => void
}

const PreviewProformaInvoice = ({actionConfirm, closeDialog, proformaInvoiceId} : IInvoicePreviewProps) => {

  const [headerState, setHeaderState] : [boolean, (r : boolean) => void] = useState(true as boolean)

  const {data,loading} = useProformaInvoiceQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: {
      id: Number(proformaInvoiceId)
    },
    skip: !proformaInvoiceId
  })
  const proformaInvoice = React.useMemo(() => !data || !data.proformaInvoice ? {} as any : data.proformaInvoice ,[data])
  const discountDefault = React.useMemo(() =>  proformaInvoice.discountDefault ? {
    type: DISCOUNT_SURCHARGE_TYPE.PERCENT,
    node: DISCOUNT_SURCHARGE.DISCOUNT,
    value: (proformaInvoice as any).discountDefault
  } : void(0),[proformaInvoice])

  const handlerOpenCloseHeader = () => {
    setHeaderState(!headerState)
  }

  const { setRef } = useExternalKeyboard((e : KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.Esc: closeDialog && closeDialog();break
    }
  }, true, [KeyboardEventCodes.Esc],'invoice-preview-dialog')

  return (
    <>
      {loading ? <SpinnerLoadingCenter /> : null}
      <div className={'hw-invoice-preview-root relative d-flex flex-column font-smaller-2'} ref={setRef}>
        {
          proformaInvoice || proformaInvoice.items ?
            (
              <>
                <div className={'mb-2 border-bottom border-light-0 pt-1'}>
                  <ProformaInvoiceHeader isPreview proformaInvoiceId={proformaInvoiceId} state={headerState} handlerOpenCloseHeader={handlerOpenCloseHeader}/>
                </div>
                {
                  proformaInvoice ?
                    <Body proformaInvoice={proformaInvoice} headerState={headerState} discountDefault={discountDefault}/>
                    : <></>
                }
              </>
            )
            : (<div>Invoice not exists in system. Try again.</div>)
        }
      </div>
    </>
  )
}

export default PreviewProformaInvoice

export interface IDialogPreviewProformaInvoice {
  proformaInvoiceId : string
  actionConfirm ?: () => void
}

export const openDialogPreviewProformaInvoice = (props : IDialogPreviewProformaInvoice ) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    openDialog(<DialogModalRootComponent name={'dialog-proforma-invoice-preview-7934150169345'} closeFn={closeDialog}>
      <CenteredDialog
                title={'Proforma Invoice preview'}
                closeAction={closeDialog}
                Component={PreviewProformaInvoice}
                componentRenderProps={{
                  closeDialog: closeDialog,
                  ...props
                }}
      />
    </DialogModalRootComponent>)
  })
}
