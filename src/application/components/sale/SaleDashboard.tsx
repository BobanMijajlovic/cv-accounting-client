import React, { useEffect }       from 'react'
import SaleTable                  from './table/SaleTable'
import ShowSummary                from './ShowSummary'
import Keyboard                   from '../keyboard/Keyboard'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                                 from '../../../components/hooks/useOptimizeEventClick'
import useSellingKeyboard         from '../../hooks/useSellingKeyboard'
import { CONSTANT_SALE }          from '../../constants'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                 from '../../../components/EasyModel/EasyModal'
import { openDialogRemoveItem }   from './dialogs/RemoveReceiptItem'
import {
  CenteredDialog,
  DialogComponentQuestions
}                                 from '../../../components/Dialog/DialogBasic'
import { openDialogEditPrice }    from './dialogs/ChangePriceComponent'
import { openDialogEditQuantity } from './dialogs/ChangeQuantityComponent'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                 from '../../../components/hooks/useExternalKeybaord'
import { useReceipt }             from '../../../store/receipt/useReceipt'
import { faTicketAlt }            from '@fortawesome/free-solid-svg-icons'
import { useAppBar }              from '../../hooks/useAppBar'
import { openDialogCashReceipt }  from '../cash-account/CashReceiptForm'

const SaleDashboard = () => {
  const {displaysKeyboardActivity, _processKeyEvent} = useSellingKeyboard()
  const {SALE_KEYBOARD_KEY_EVENT,SALE_REMOVE_ITEM,SALE_EDIT_PRICE,SALE_EDIT_QUANTITY,SALE_CLEAR_RECEIPT} = CONSTANT_SALE.EVENTS
  const {receipt,receiptClear} = useReceipt()
  const {setButtonsForPage, clearButtonsForPage} = useAppBar()

  const handlerClearReceipt = () => {
    if (receipt.items.length > 1) {
      openDialogClearReceipt()
      return
    }
    receiptClear()
  }

  useEffect(() => {
    const id = setButtonsForPage([
      {
        label: 'Cash Recip.',
        icon: faTicketAlt,
        onClick: () => openDialogCashReceipt()
      }
    ])
    return () => clearButtonsForPage(id)
  }, [setButtonsForPage, clearButtonsForPage])
  
  const {onClickHandler} = useOptimizeEventClick({
    eventHandler (data : IUseOptimizeEventData) {
     
      if (data.action === SALE_KEYBOARD_KEY_EVENT) {
        _processKeyEvent(data.id as string)
      }

      if (data.action === SALE_REMOVE_ITEM) {
        data.id && openDialogRemoveItem(data.id)
      }
      
      if (data.action === SALE_EDIT_PRICE) {
        data.id && openDialogEditPrice(data.id)
      }

      if (data.action === SALE_EDIT_QUANTITY) {
        data.id && openDialogEditQuantity(data.id)
      }
      if (data.action === SALE_CLEAR_RECEIPT) {
        handlerClearReceipt()
      }
    }
  })

  const { setRef } = useExternalKeyboard((event : KeyboardEvent) => {
    event.preventDefault()
    switch (event.key) {
      case KeyboardEventCodes.F2: 
        handlerClearReceipt()
        break
      default:
        _processKeyEvent(event.key.toLowerCase())
        break
    }
  },true,[],'sale-dashboard')
  
  return (
    <>
      <div className={'d-flex flex-fill h-100 pt-2 pb-1 '} onClick={onClickHandler} data-action-root >
        <div className={'col-md-9 pr-0'}>
          <SaleTable/>
        </div>
        <div className={'col-md-3 px-0'} ref={setRef}>
          <ShowSummary {...displaysKeyboardActivity}/>
          <Keyboard onClick={onClickHandler}/>
        </div>
      </div>

    </>
  )
}

export default SaleDashboard

export const openDialogClearReceipt = () => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {

    const Component = () => {
      const {receiptClear} = useReceipt()
      const messages : string[] = React.useMemo(() => [
        'Are you sure, you want to cancel receipt?'
      ], [])

      const handlerConfirm = () => {
        receiptClear()
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
    openDialog(<DialogModalRootComponent name={'dialog-receipt-clear-9845615318415645'} closeFn={closeDialog}>
      <CenteredDialog
              title={'Cancel receipt'}
              closeAction={closeDialog}
              Component={Component}
      />
    </DialogModalRootComponent>)
  })
}

