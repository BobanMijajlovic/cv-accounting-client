import React                  from 'react'
import {useWorkOrderQuery}    from '../../../../../../graphql/graphql'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                             from '../../../../../../components/hooks/useExternalKeybaord'
import {SpinnerLoadingCenter} from '../../../../../../components/Spinner/SpinnerLoading'
import PreviewTransferHeader  from './Header'
import PreviewTransferItems   from './Body'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                             from '../../../../../../components/EasyModel/EasyModal'
import {CenteredDialog}       from '../../../../../../components/Dialog/DialogBasic'
import {IDialogPreviewInvoice} from '../../../../invoice/preview/Preview'

interface ITransferPreviewProps {
  closeDialog ?: () => void
  workOrderId : string
}

const Preview = ({workOrderId, closeDialog} : ITransferPreviewProps) => {

  const {data, loading} = useWorkOrderQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: {
      id: Number(workOrderId)
    },
    skip: !Number(workOrderId)
  })
  const workOrder = React.useMemo(() => !data || !data.workOrder ? {} as any : data.workOrder, [data])

  const {setRef} = useExternalKeyboard((e : KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.Esc:
        closeDialog && closeDialog()
        break
    }
  }, true, [KeyboardEventCodes.Esc], 'invoice-preview-dialog')

  return (
    <>
      {loading ? <SpinnerLoadingCenter/> : null}
      <div className={'hw-warehouse-transfer-preview-root relative d-flex flex-column font-smaller-2'} ref={setRef}>
        {
          workOrder || workOrder.workOrderItems ?
            (
              <>
                <div className={'mb-2 border-bottom border-light-0 pt-1'}>
                  <PreviewTransferHeader workOrder={workOrder}/>
                </div>
                {
                  workOrder ?
                    <PreviewTransferItems workOrder={workOrder}/>
                    : <></>
                }
              </>
            )
            : (<div>Work order not exists in system. Try again.</div>)
        }
      </div>
    </>
  )
}
export default Preview

export const openDialogPreviewTransfer = ({workOrderId} : { workOrderId : string } ) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    openDialog(<DialogModalRootComponent name={'dialog-transfer-preview-0215124512051'} closeFn={closeDialog}>
      <CenteredDialog
          title={'Transfer preview'}
          closeAction={closeDialog}
          Component={Preview}
          componentRenderProps={{
            closeDialog: closeDialog,
            workOrderId
          }}
      />
    </DialogModalRootComponent>)
  })
}
