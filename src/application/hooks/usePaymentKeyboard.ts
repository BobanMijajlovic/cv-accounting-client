import React, {useState}   from 'react'
import _                   from 'lodash'
import {
  getTotalFinance,
  getTotalPayed
}                          from '../components/sale/util'
import {guid}              from '../utils/Utils'
import {useReceipt}        from '../../store/receipt/useReceipt'
import {easyDialogInfo}    from '../../components/EasyModel/EasyModal'
import {openDialogPayment} from '../components/sale/dialogs/PayingComponent'

interface IDisplayPaymentKeyboardState {
  processedKeyboardString : string
}

const defaultDisplayKeyboardState = {
  processedKeyboardString: '',
} as IDisplayPaymentKeyboardState

const usePaymentKeyboard = (initState ?: IDisplayPaymentKeyboardState) => {
  const [state, setState] : [IDisplayPaymentKeyboardState, (r : IDisplayPaymentKeyboardState) => void] = useState(initState ? initState : defaultDisplayKeyboardState)

  const {receipt, receiptAddPayment} = useReceipt()

  const _processKeyEvent = (key : string) => {
    let object = {}
    switch (key) {
      case 'delete':
        object = {processedKeyboardString: ''}
        break
      case 'backspace':
      case 'C':
        object = {processedKeyboardString: state.processedKeyboardString.substr(0, state.processedKeyboardString.length - 1)}
        break
      case '00':
        if (state.processedKeyboardString.indexOf('.') > -1) {
          const len = state.processedKeyboardString.length - state.processedKeyboardString.indexOf('.')
          if (len >= 2) {
            object = {processedKeyboardString: state.processedKeyboardString}
            break
          }
        }
        object = {processedKeyboardString: `${state.processedKeyboardString}${key}`}
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
          case 'CARD':
          case 'f3': type =  1
            break
          case 'CHEQUE':
          case 'f4': type =  2
            break
          default: 
            type = 0
            break
        }
        receiptAddPayment({
          id: guid(),
          type,
          value:_value
        })
        object = defaultDisplayKeyboardState
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
    line1: state.processedKeyboardString
  }), [state])

  return {
    displaysKeyboardActivity,
    resetKeyboardState,
    _processKeyEvent
  }
}

export default usePaymentKeyboard
