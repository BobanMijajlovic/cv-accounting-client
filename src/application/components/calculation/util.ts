import {
  IDueDateRecord,
  IHeaderDocumentState,
  IInvoiceExpense,
  IInvoiceTax
}                           from './modal/DocumentHeaderForm'
import {
  formatPrice,
  toNumberFixed
}                           from '../../utils/Utils'
import _                    from 'lodash'
import {
  TCalculation,
  TExpense,
  TExpenseItem
}                           from '../../../graphql/type_logic/types'
import {
  DISCOUNT_SURCHARGE,
  DISCOUNT_SURCHARGE_TYPE
}                           from '../../constants'
import {IDiscountSurcharge} from './views/InstanceView/items/DiscountForm'

/** HEADER FORM */
export const getCalculationFinance = (data : IHeaderDocumentState) => {
  return toNumberFixed(data.totalFinanceMP)
}
export const getCalculationFinanceAfterDiscount = (data : IHeaderDocumentState) => {
  let value = getCalculationFinance(data)
  if (data.invoiceDiscount) {
    value = _.divide(_.multiply(value, _.subtract(100, toNumberFixed(data.invoiceDiscount))), 100)
  }
  return _.round(value, 2)
}

export const getCalculationFinanceAfterDiscountExpenses = (data : IHeaderDocumentState) => {
  const expense = _.round((data.invoiceExpenses || []).reduce((acc, i : IInvoiceExpense) => {
    const fin = toNumberFixed(i.financeMP)
    return _.add(acc, fin)
  }, 0), 2)
  return _.round(_.add(getCalculationFinance(data), expense), 2)
}

export const getTotalAddedTaxPerInvoice = (data : IHeaderDocumentState) => {
  return _.round((data.invoiceTaxes || []).reduce((acc : number, v : IInvoiceTax) => _.add(acc, Number(v.finance)), 0), 2)
}

export const getTotalAddedDueDates = (data : IHeaderDocumentState) => {
  return _.round((data.dueDates || []).reduce((acc : number, v : IDueDateRecord) => _.add(acc, Number(v.finance)), 0), 2)
}

export const getCalculationInternalExpenseFinance = (calculation : TCalculation) => {
  return (calculation as any).expense ? (calculation as any).expense.reduce((acc : number, expense : TExpense) => {
    if (expense.invoiceNumber) {
      return acc
    }
    const itemsFinance = _.round((expense as any).items.reduce((acc : number, i : TExpenseItem) => {
      const fin = toNumberFixed(i.financeMP as number)
      return _.add(acc, fin)
    }, 0), 2)
    return _.round(_.add(acc, itemsFinance), 2)
  }, 0) : 0
}

export const getCalculationAllExpenseFinance = (calculation : TCalculation) => {
  return (calculation as any).expense ? (calculation as any).expense.reduce((acc : number, expense : TExpense) => {
    const itemsFinance = _.round((expense as any).items.reduce((acc : number, i : TExpenseItem) => {
      const fin = toNumberFixed(i.financeMP as number)
      return _.add(acc, fin)
    }, 0), 2)
    return _.round(_.add(acc, itemsFinance), 2)
  }, 0) : 0
}

export const calculationDiscount = (finance : number | string, discount : IDiscountSurcharge) => {
  const _finance = _.toNumber(finance)
  let value = 0
  if (discount.type === DISCOUNT_SURCHARGE_TYPE.PERCENT) {
    value = _.round(_.divide(_.multiply(_finance, _.toNumber(discount.value)), 100), 2)
  } else {
    value = _.toNumber(discount.value)
  }
  return value
}

export const getDiscountObject = (discountValue : number | undefined | null, discountPercent : number | undefined | null) : IDiscountSurcharge => {
  if (discountValue) {
    return {
      node: DISCOUNT_SURCHARGE.DISCOUNT,
      type: DISCOUNT_SURCHARGE_TYPE.FINANCE,
      value: `${_.toNumber(discountValue)}`
    }
  }
  return {
    node: DISCOUNT_SURCHARGE.DISCOUNT,
    type: DISCOUNT_SURCHARGE_TYPE.PERCENT,
    value: `${_.toNumber(discountPercent)}`
  }
}

export const calculateFinances = (noVat : boolean, finance : number, taxValue : number) => {
  if (noVat) {
    const taxFinance = _.round(_.divide(_.multiply(toNumberFixed(finance), toNumberFixed(taxValue)), 100), 2)
    return formatPrice(_.round(_.add(toNumberFixed(finance), taxFinance), 2))
  } else {
    const taxFinance = _.round(_.divide(toNumberFixed(finance), _.divide(_.add(100, Number(taxValue)), Number(taxValue))), 2)
    return formatPrice(_.round(_.subtract(toNumberFixed(finance), taxFinance), 2))
  }
}

