import React, {useState}    from 'react'
import {
  formatQuantity,
  guid,
  toNumberFixed
} from '../utils/Utils'
import {useReceipt}         from '../../store/receipt/useReceipt'
import {openDialogFindItem} from '../components/sale/dialogs/FindItem'
import {easyDialogInfo}     from '../../components/EasyModel/EasyModal'
import {openDialogPayment}  from '../components/sale/dialogs/PayingComponent'
import {
  getTotalFinance,
  getTotalPayed
}                           from '../components/sale/util'
import _                    from 'lodash'

export interface IDisplayKeyboardState {
  processedKeyboardString : string
  quantity : string
}

const defaultDisplayKeyboardState = {
  processedKeyboardString: '',
  quantity: '1.00'
} as IDisplayKeyboardState

const useSellingKeyboard = ( ) => {
  const [state, setState] : [IDisplayKeyboardState, (r : IDisplayKeyboardState) => void] = useState(defaultDisplayKeyboardState)

  const {receipt, receiptAddItem, receiptAddPayment} = useReceipt()

  const _processKeyEvent = (key : string) => {
    let object = {}
    let value = 1
    switch (key) {
      case 'plu':
      case 'enter':
        if (state.processedKeyboardString.trim().length === 0 || +state.quantity <= 0) {
          return
        }
        receiptAddItem(state.processedKeyboardString, state.quantity)
        object = defaultDisplayKeyboardState
        break
      case 'X':
      case 'x' :
      case '*':
        value = +state.processedKeyboardString
        if (value <= 0) {
          value = 1
        }
        object = {
          quantity: value,
          processedKeyboardString: ''
        }
        break
      case '.' :
        object = (() => {
          const str = state.processedKeyboardString.replace(/\./, '')
          if (str.length === 0) {
            return '0.'
          }
          return {processedKeyboardString: `${str}${key}`}
        })()
        break
      case 'payment':
      case 'f10':
        if (receipt.items.length === 0) {
          easyDialogInfo('Nothing to pay.')
          return
        }
        openDialogPayment()
        object = {processedKeyboardString: state.processedKeyboardString}
        break
      case 'delete':
      case 'backspace':
      case 'C':
        object = {processedKeyboardString: state.processedKeyboardString.substr(0, state.processedKeyboardString.length - 1)}
        break
      case 'search':
      case 'f6':
        openDialogFindItem({
          quantity: toNumberFixed(state.quantity),
          resetKeyboardState
        })
        object = {
          processedKeyboardString: state.processedKeyboardString,
          quantity: state.quantity
        }
        break
      case 'CASH':
      case 'CARD':
      case 'CHEQUE':
      case 'f2':
      case 'f3':
      case 'f4':  
        let _value = state.processedKeyboardString
        const subtotal = _.round(_.subtract(getTotalFinance(receipt.items),getTotalPayed(receipt.payments)),2)
        if (_value === '' || Number(_value) === 0) {
          _value = `${_.round(subtotal, 2)}`
        }
        if (+_value <= 0 && (subtotal > 0 || subtotal <= 0)) {
          return
        }
        let type = 0
        switch (key) {
          case 'CARD' || 'f3': type =  1;break
          case 'CHEQUE' || 'f4': type =  2;break
          default: type = 0;break
        }
        receiptAddPayment({
          id: guid(),
          type,
          value:_value
        })
        object = defaultDisplayKeyboardState
        break
      default:  /** key from 0-9 */
        if (!/^[0-9]*$/.test(key)) {
          return
        }
        if (state.processedKeyboardString.indexOf('.') > -1) {
          const len = state.processedKeyboardString.length - state.processedKeyboardString.indexOf('.')
          if (len > 3) {
            object = {processedKeyboardString: state.processedKeyboardString}
            break
          }
        }
        object = {processedKeyboardString: `${state.processedKeyboardString}${key}`}
        break
    }
    setState({
      ...state,
      ...object
    })
  }

  const resetKeyboardState = () => {
    setState({
      ...state,
      ...defaultDisplayKeyboardState
    })
  }

  const displaysKeyboardActivity = React.useMemo(() => ({
    line1: `x ${formatQuantity(state.quantity)}`,
    line2: state.processedKeyboardString
  }), [state])

  return {
    displaysKeyboardActivity,
    resetKeyboardState,
    _processKeyEvent
  }
}

export default useSellingKeyboard
