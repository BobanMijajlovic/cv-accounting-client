import React                           from 'react'
import {SpinnerLoadingCenter}          from '../../../../components/Spinner/SpinnerLoading'
import {useBankHeaderTransactionQuery} from '../../../../graphql/graphql'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                      from '../../../../components/hooks/useExternalKeybaord'
import HeaderPreview                   from './Header'
import Body                            from './Body'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                      from '../../../../components/EasyModel/EasyModal'
import {CenteredDialog}                from '../../../../components/Dialog/DialogBasic'

interface IBankHeaderTransactionProps {
  closeDialog ?: () => void
  bankHeaderTransactionId : string
}

const Preview = ({closeDialog, bankHeaderTransactionId} : IBankHeaderTransactionProps) => {

  const {data, loading} = useBankHeaderTransactionQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: {
      id: Number(bankHeaderTransactionId)
    },
    skip: !bankHeaderTransactionId
  })

  const bankTransaction = React.useMemo(() => !data || !data.bankHeaderTransaction ? {} as any : data.bankHeaderTransaction, [data])

  const {setRef} = useExternalKeyboard((e : KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.Esc:
        closeDialog && closeDialog()
        break
    }
  }, true, [KeyboardEventCodes.Esc], 'bank-transaction-preview-dialog')

  return (
    <>
      {loading ? <SpinnerLoadingCenter/> : null}
      <div className={'hw-bank-transaction-preview-root relative d-flex flex-column p-2 font-smaller-2'} ref={setRef}>
        {
          bankTransaction || bankTransaction.bankTransactions ?
            (
              <>
                <div className={'mb-4 border-bottom border-light-0 pt-1'}>
                  <HeaderPreview bankHeaderTransaction={bankTransaction}/>
                </div>
                {
                  bankTransaction.bankTransactions ?
                    <Body bankTransactions={bankTransaction.bankTransactions}/>
                    : <></>

                }
              </>
            ) : (<div>Bank transaction not exists in system. Try again.</div>)
        }
      </div>
    </>
  )
}

export default Preview

export const openDialogPreviewBankTransaction = ({bankHeaderTransactionId} : { bankHeaderTransactionId : string }) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    openDialog(<DialogModalRootComponent name={'dialog-bank-transaction-preview-97897978'} closeFn={closeDialog}>
      <CenteredDialog
                title={'Bank transaction preview'}
                closeAction={closeDialog}
                Component={Preview}
                scrollable
                componentRenderProps={{
                  closeDialog: closeDialog,
                  bankHeaderTransactionId
                }}
      />
    </DialogModalRootComponent>)
  })
}