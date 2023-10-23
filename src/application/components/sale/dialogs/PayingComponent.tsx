import React, { useEffect }         from 'react'
import { faPrint }                  from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon }          from '@fortawesome/react-fontawesome'
import KeyboardPayment              from '../../keyboard/KeyboardPayment'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider,
  easyDialogError,
  easyDialogInfo
}                                   from '../../../../components/EasyModel/EasyModal'
import {
  CenteredDialog,
  DialogComponentQuestions
}                                   from '../../../../components/Dialog/DialogBasic'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                                   from '../../../../components/hooks/useOptimizeEventClick'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                   from '../../../../components/hooks/useExternalKeybaord'
import { CONSTANT_SALE }            from '../../../constants'
import { useReceipt }               from '../../../../store/receipt/useReceipt'
import {
  getPaymentTotalByType,
  getTotalFinance,
  getTotalPayed
}                                   from '../util'
import {
  formatPrice,
  toNumberFixed
}                                   from '../../../utils/Utils'
import { useInsertReceiptMutation } from '../../../../graphql/graphql'
import { parseGQError }             from '../../../../graphql/utils'
import _                            from 'lodash'
import usePaymentKeyboard           from '../../../hooks/usePaymentKeyboard'
import {
  FORMAT_CURRENCY_STANDARD,
  useValidation
}                                   from '../../../../validation'
import InputTextWithValidation      from '../../../../components/withValidation/InputTextWithValidation'

interface IPayingModel {
  value: string
}

const PayingComponent = ({closeDialog}: { closeDialog: () => void }) => {
  const [mutationFinishReceipt] = useInsertReceiptMutation()
  const {displaysKeyboardActivity, _processKeyEvent, resetKeyboardState} = usePaymentKeyboard()
  const {SALE_REMOVE_PAYMENT, SALE_KEYBOARD_KEY_EVENT} = CONSTANT_SALE.EVENTS
  const {receipt, receiptRemovePayment, receiptClear} = useReceipt()
  const {items, payments} = receipt

  const validation = useValidation<IPayingModel>()
  const {setFieldValue} = validation

  useEffect(() => {
    setFieldValue('value', `${displaysKeyboardActivity.line1.length !== 0 ? displaysKeyboardActivity.line1 : '0'}`, false)
  }, [displaysKeyboardActivity, setFieldValue])

  const {setRef} = useExternalKeyboard((event: KeyboardEvent) => {
    switch (event.key) {
      case KeyboardEventCodes.F10:
        handlerPrintReceipt()
        return
      case KeyboardEventCodes.F12:
      case KeyboardEventCodes.F6:
        return
      case KeyboardEventCodes.Esc:
        closeDialog()
        return
      default:
        _processKeyEvent(event.key.toLowerCase())
        return
    }
  }, true, [], 'sale_payment_dialog')

  const {onClickHandler} = useOptimizeEventClick({
    eventHandler (data: IUseOptimizeEventData) {
      if (data.action === SALE_KEYBOARD_KEY_EVENT) {
        _processKeyEvent(data.id as string)
      }
      if (data.action === SALE_REMOVE_PAYMENT) {
        data.id && receiptRemovePayment(Number(data.id))
      }
    }
  })

  const total = React.useMemo(() => getTotalFinance(items), [items])
  const payed = React.useMemo(() => getTotalPayed(payments), [payments])
  const {subTotal, change} = React.useMemo(() => {
    const val = _.round(_.subtract(total, payed), 2)
    return {
      subTotal: val > 0 ? val : 0,
      change: val < 0 ? val : 0
    }
  }, [total, payed])

  const {cash, card, cheque} = React.useMemo(() => getPaymentTotalByType(payments), [payments])

  const handlerPrintReceipt = () => {
    if (receipt.payments.length === 0 || subTotal > 0) {
      easyDialogInfo('You must pay receipt value before print receipt!')
      return
    }
    const data = {
      items: receipt.items.map(item => {
        return {
          itemId: Number(item.item.id),
          quantity: toNumberFixed(item.quantity),
          price: toNumberFixed(item.price)
        }
      }),
      payments: receipt.payments.map(p => {
        return {
          type: p.type,
          value: toNumberFixed(p.value)
        }
      })
    } as any

    const handlerConfirm = async () => {
      await mutationFinishReceipt({
        variables: {
          data
        }
      })
        .then((v) => {
          if (v && v.data) {
            receiptClear()
            resetKeyboardState()
            closeDialog()
          }
        })
        .catch((e) => {
          const s = parseGQError(e)
          easyDialogError(s)
          return
        })
    }
    openDialogFinishReceipt({actionConfirm: handlerConfirm})
  }

  return (
    <div
            className={'d-flex flex-fill flex-row col-md-12 mt-2 fontSize-24 border fontWeight-300 mb-2 hw-sale-paying-dialog-root'}
            onClick={onClickHandler}
            data-action-root
            ref={setRef}
    >

      <div className={'d-flex flex-column col-md-6 p-2 pr-4 mb-4'}>
        <div className={'d-flex flex-column font-bigger-4 mb-2 font-weight-600'}>
          <div>{formatPrice(total)}</div>
          <div>TOTAL FOR PAYING</div>
        </div>
        <div style={{borderBottom: '1px solid grey', fontWeight: 400}}
                     className={'d-flex  justify-content-between  '}>
          <div>PAYED</div>
          <div>{formatPrice(payed)}</div>
        </div>
        <div style={{borderBottom: '1px solid grey', fontWeight: 400}}
                     className={'d-flex  justify-content-between mt-2 '}>
          <div>SUBTOTAL</div>
          <div>{formatPrice(subTotal)}</div>
        </div>

        <div style={{borderBottom: '1px solid grey', fontWeight: 400}}
                     className={'d-flex  justify-content-between mt-2 '}>
          <div>CHANGE</div>
          <div>{formatPrice(change)}</div>
        </div>

        <div className={'d-flex  justify-content-between mt-4 font-bigger-6 pb-2'}>
          <div className={'font-weight-300 font-bigger-2'}
                         data-action={SALE_REMOVE_PAYMENT}
                         data-action-id={CONSTANT_SALE.PAYMENTS_TYPES.CASH}
          >
            <small
                            className={'mr-2 align-self-center color-danger  font-weight-600 cursor-pointer opacity-6'}>X</small>
                        CASH
          </div>
          <div>{formatPrice(cash)}</div>
        </div>
        <div className={'d-flex justify-content-between font-bigger-6 pb-2'}>
          <div className={'font-weight-300 font-bigger-2'}
                         data-action={SALE_REMOVE_PAYMENT}
                         data-action-id={CONSTANT_SALE.PAYMENTS_TYPES.CARD}
          >
            <small className={'mr-2 align-self-center color-danger  font-weight-600 cursor-pointer opacity-6'}>X</small>
                        CARD
          </div>
          <div>{formatPrice(card)}</div>
        </div>
        <div className={'d-flex justify-content-between font-bigger-6 pb-2'}>
          <div
                        className={'font-weight-300 font-bigger-2'}
                        data-action={SALE_REMOVE_PAYMENT}
                        data-action-id={CONSTANT_SALE.PAYMENTS_TYPES.CHEQUE}
          >
            <small className={'mr-2 align-self-center color-danger  font-weight-600  opacity-6'}>X</small>
                        CHEQUE
          </div>
          <div>{formatPrice(cheque)}</div>
        </div>
      </div>

      <div className={'d-flex col-md-6 flex-column ml-0'}>
        <div className={'d-flex justify-content-end align-self-end border-bottom color-primary font-weight-600 mx-2 round-md pt-2 pl-4 pr-1 mr-3 w-50'}>
          <InputTextWithValidation
                        required
                        label={''}
                        useLabel={false}
                        helperText={''}
                        classNames={'lined-version font-bigger-6'}
                        fullWidth
                        focusOnMount
                        selectOnFocus
                        align={'align-right'}
                        validation={{
                          useValidation: validation,
                          model: 'value',
                          format: {
                            rule: FORMAT_CURRENCY_STANDARD,
                            validationMessage: 'Enter valid value'
                          }
                        }}
          />
        </div>
        <KeyboardPayment onClick={onClickHandler} disablePaymentsButtons={subTotal === 0 && change <= 0}/>

        <div
                    className={'d-flex justify-content-center align-items-center font-bigger-6 mx-1 mr-2 mb-3 key-print-receipt color-primary color-header-gradient relative ml-4'}
                    onClick={handlerPrintReceipt}
        >
          <small className={'absolute-left-down font-smaller-5 text-upper m-1'}> PRINT RECEIPT</small>
          <small className={'absolute-right-top font-smaller-5 text-upper m-1'}> F10</small>
          <FontAwesomeIcon icon={faPrint}/>
        </div>
      </div>

    </div>
  )
}

export default PayingComponent

export const openDialogPayment = () => {
  EasyDialogApolloProvider((closeDialog: () => any, openDialog: (data: any) => any) => {

    const Component = () => {
      const ComponentToRender = () => {
        return (
          <PayingComponent
                        closeDialog={closeDialog}
          />
        )
      }
      return (
        <DialogModalRootComponent name={'dialog-receipt-payments-445531515asd45a44'} closeFn={closeDialog}>
          <CenteredDialog
                        title={'Process payment'}
                        closeAction={closeDialog}
                        Component={ComponentToRender}

          />
        </DialogModalRootComponent>
      )
    }
    openDialog(<Component/>)
  })
}

export const openDialogFinishReceipt = ({actionConfirm}: { actionConfirm: () => void }) => {
  EasyDialogApolloProvider((closeDialog: () => any, openDialog: (data: any) => any) => {
    const Component = () => {
      const messages: string[] = React.useMemo(() => [
        'Are you sure you want to finish receipt? '
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
    openDialog(<DialogModalRootComponent name={'dialog-finish-receipt-2040770704707'} closeFn={closeDialog}>
      <CenteredDialog
                title={'FINISH RECEIPT'}
                closeAction={closeDialog}
                Component={Component}
      />
    </DialogModalRootComponent>)
  })
}

