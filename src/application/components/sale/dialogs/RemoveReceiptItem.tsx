import React            from 'react'
import ButtonsForm      from '../../../../components/Button/ButtonsForm'
import {useReceipt}     from '../../../../store/receipt/useReceipt'
import {
  formatPrice,
  formatQuantity
}                       from '../../../utils/Utils'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                       from '../../../../components/EasyModel/EasyModal'
import {CenteredDialog} from '../../../../components/Dialog/DialogBasic'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                       from '../../../../components/hooks/useExternalKeybaord'

interface IRemoveReceiptItemProps {
  closeDialog : () => void
  id : string
}

const RemoveReceiptItem = ({closeDialog, id} : IRemoveReceiptItemProps) => {

  const {receipt, receiptRemoveItem} = useReceipt()

  const item : any = React.useMemo(() => receipt.items.find((i) => i.id === id), [receipt, id])

  const handlerSubmit = () => {
    receiptRemoveItem(id)
    closeDialog()
  }
  
  const { setRef } = useExternalKeyboard((event : KeyboardEvent) => {
    switch (event.key) {
      case KeyboardEventCodes.F12:
        handlerSubmit()
        break
      case KeyboardEventCodes.Esc: 
        closeDialog()
        break
    }
  },true,[],'sale-remove-receipt-item-dialog')

  const RenderItemInfo = (label : string, value : string,classNames ?: string) => {
    return (
      <div className={`d-flex flex-row justify-content-start border-bottom text-left${classNames ? ` ${classNames}` : ''}`}>
        <div className={'w-50'}>{label}</div>
        <div className={'w-50  text-right'}>{value}</div>
      </div>
    )
  }

  return (
    <div className={'d-flex flex-column text-upper text-shadow-white'} ref={setRef}>
      <div className={'p-3'}>Are you sure, you want to delete this item?</div>
      <div className={'d-flex flex-column px-5 py-1 font-smaller-1 justify-content-center'}>
        {RenderItemInfo('Description', item.item.shortName,'font-smaller-3')}
        {RenderItemInfo('Barcode', item.item.barCode)}
        {RenderItemInfo('Code', item.item.code)}
        {RenderItemInfo('Price', formatPrice(item.price))}
        {RenderItemInfo('Quantity', formatQuantity(item.quantity))}
      </div>
      <div className={'p-3'}>
        <ButtonsForm
                    buttonsCancel={{
                      label: 'CANCEL',
                      action: closeDialog
                    }}
                    buttonSubmit={{
                      label: 'DELETE',
                      action: handlerSubmit
                    }}
        />
      </div>
    </div>
  )
}

export default RemoveReceiptItem

export const openDialogRemoveItem = (id : string) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      const ComponentToRender = () => {
        return (
          <RemoveReceiptItem
                        id={id}
                        closeDialog={closeDialog}
          />
        )
      }
      return (
        <DialogModalRootComponent name={'dialog-receipt-remove-item-010123105455041'} closeFn={closeDialog}>
          <CenteredDialog
                        title={'Delete item'}
                        closeAction={closeDialog}
                        Component={ComponentToRender}
          />
        </DialogModalRootComponent>
      )
    }
    openDialog(<Component/>)
  })
}
