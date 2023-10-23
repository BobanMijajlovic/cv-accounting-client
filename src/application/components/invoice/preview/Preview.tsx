import React, { useState }      from 'react'
import { useInvoiceQuery }      from '../../../../graphql/graphql'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                               from '../../../../components/EasyModel/EasyModal'
import { SpinnerLoadingCenter } from '../../../../components/Spinner/SpinnerLoading'
import InvoiceHeader            from '../form/header/Header'
import Body                     from './Body'
import { CenteredDialog }       from '../../../../components/Dialog/DialogBasic'
import {
  DISCOUNT_SURCHARGE,
  DISCOUNT_SURCHARGE_TYPE
}                               from '../../../constants'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                               from '../../../../components/hooks/useExternalKeybaord'

interface IInvoicePreviewProps {
  closeDialog?: ()=> void
  invoiceId: string
  actionConfirm?: ()=> void
}

const Preview = ({ actionConfirm, closeDialog, invoiceId }: IInvoicePreviewProps) => {

  const [headerState, setHeaderState]: [boolean, (r: boolean)=> void] = useState(true as boolean)

  const { data, loading } = useInvoiceQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: {
      id: Number(invoiceId)
    },
    skip: !invoiceId
  })
  const invoice = React.useMemo(() => !data || !data.invoice ? {} as any : data.invoice, [data])
  const discountDefault = React.useMemo(() => invoice.discountDefault ? {
    type: DISCOUNT_SURCHARGE_TYPE.PERCENT,
    node: DISCOUNT_SURCHARGE.DISCOUNT,
    value: (invoice as any).discountDefault
  } : void(0), [invoice])

  const handlerOnSave = async () => {
    actionConfirm && await actionConfirm()
    closeDialog && closeDialog()
  }

  const handlerOpenCloseHeader = () => {
    setHeaderState(!headerState)
  }

  const { setRef } = useExternalKeyboard((e: KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.Esc:
        closeDialog && closeDialog()
        break
    }
  }, true, [KeyboardEventCodes.Esc], 'invoice-preview-dialog')

  return (
    <>
      {loading ? <SpinnerLoadingCenter/> : null}
      <div className={'hw-invoice-preview-root relative d-flex flex-column font-smaller-2'} ref={setRef}>
        {
          invoice || invoice.items ?
            (
              <>
                <div className={'mb-2 border-bottom border-light-0 pt-1'}>
                  <InvoiceHeader isPreview invoice={invoice} state={headerState} handlerOpenCloseHeader={handlerOpenCloseHeader}/>
                </div>
                {
                  invoice ?
                    <Body invoice={invoice} headerState={headerState} discountDefault={discountDefault}/>
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

export default Preview

export interface IDialogPreviewInvoice {
  invoiceId: string
  actionConfirm?: ()=> void
}

export const openDialogPreviewInvoice = (props: IDialogPreviewInvoice) => {
  EasyDialogApolloProvider((closeDialog: ()=> any, openDialog: (data: any)=> any) => {
    openDialog(<DialogModalRootComponent name={'dialog-invoice-preview-7934150169345'} closeFn={closeDialog}>
      <CenteredDialog
        title={'INVOICE_PREVIEW_DIALOG_TITLE'}
        closeAction={closeDialog}
        Component={Preview}
        componentRenderProps={{
          closeDialog: closeDialog,
          ...props
        }}
      />
    </DialogModalRootComponent>)
  })
}
