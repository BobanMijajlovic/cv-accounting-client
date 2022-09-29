import {
  IReceiptItem,
  IReceiptPayment
}                      from '../../../store/receipt/type'
import {
  CONSTANT_SALE,
  DISCOUNT_SURCHARGE_TYPE
}                      from '../../constants'
import _               from 'lodash'
import {toNumberFixed} from '../../utils/Utils'

export const getReceiptItemFinance = (item : IReceiptItem) => {
  return _.round(_.multiply(toNumberFixed(item.price),toNumberFixed(item.quantity)), 2)
}

export const getItemFinanceAfterDiscount = (item : IReceiptItem) => {
  let finance = getReceiptItemFinance(item)
  if (item.discount) {
    if (item.discount.type === DISCOUNT_SURCHARGE_TYPE.PERCENT) {
      finance = _.divide(_.multiply(finance, _.subtract(100, toNumberFixed(item.discount.value))), 100)
    } else {
      finance = _.subtract(finance, toNumberFixed(item.discount.value))
    }
  }
  return _.round(finance,2)
}

export const getTotalFinance = (items : IReceiptItem[]) => {
  return items.reduce((acc : number,item : IReceiptItem) => _.round(_.add(acc,getReceiptItemFinance(item)),2),0)
}

/** PAYMENTS FORM */

export const getTotalPayed = (payments : IReceiptPayment[]) => {
  return payments.reduce((acc : number,payment : IReceiptPayment) => _.round(_.add(acc,toNumberFixed(payment.value)),2),0)
}
const getPaymentByType = (payments : IReceiptPayment[],type : number) => {
  return payments.reduce((acc : number,payment : IReceiptPayment) => payment.type === type ? _.round(_.add(acc,toNumberFixed(payment.value)),2) : acc,0)
}

export const getPaymentTotalByType = (payments : IReceiptPayment[]) => {
  const {CASH,CARD,CHEQUE} = CONSTANT_SALE.PAYMENTS_TYPES
  return {
    cash: getPaymentByType(payments,CASH),
    card: getPaymentByType(payments,CARD),
    cheque: getPaymentByType(payments,CHEQUE)
  }
}

