import {
  TDueDates,
  TExpenseItem,
  TInvoice,
  TExpense,
  TInvoiceItem,
  TReturnInvoice
}        from '../../../graphql/type_logic/types'
import _ from 'lodash'

export const getInvoiceFinanceAfterDiscountVP = ( items : TInvoiceItem[] ) => {
  return items ? items.reduce( ( acc : number, x : TInvoiceItem ) => _.round( _.add( acc, _.toNumber( x.financeFinalVP ) ), 2 ), 0 ) : 0
}

export const getInvoiceFinanceVP = ( items : TInvoiceItem[] ) => {
  return items ? items.reduce( ( acc : number, x : TInvoiceItem ) => _.round( _.add( acc, _.toNumber( x.financeVP ) ), 2 ), 0 ) : 0
}

export const getInvoiceFinanceTax = ( items : TInvoiceItem[] ) => {
  return items ? items.reduce( ( acc : number, x : TInvoiceItem ) => _.round( _.add( acc, _.toNumber( x.taxFinance ) ), 2 ), 0 ) : 0
}

export const getInvoiceFinanceMP = ( items : TInvoiceItem[] ) => {
  return items ? items.reduce( ( acc : number, x : TInvoiceItem ) => _.round( _.add( acc, _.add( Number( x.financeFinalVP ), Number( x.taxFinance ) ) ), 2 ), 0 ) : 0
}

export const getInvoiceDiscountFinance = ( items : TInvoiceItem[] ) => {
  return items ? items.reduce( ( acc : number, x : TInvoiceItem ) => _.round( _.add( acc, _.subtract( _.toNumber( x.financeVP ), _.toNumber( x.financeFinalVP ) ) ), 2 ), 0 ) : 0
}

export const getInvoiceExpenseFinanceMP = ( expenses : TExpense[] ) => {
  return ( expenses || [] ).reduce( ( acc : number, expense : any ) => _.round( _.add( acc, expense.financeMP ), 2 ), 0 )
}

export const getInvoiceFinanceAfterExpense = ( invoice : TInvoice | TReturnInvoice ) => {
  return _.round( _.add( getInvoiceFinanceMP( invoice.items as any ), getInvoiceExpenseFinanceMP( invoice.expense as any ) ), 2 )
}

export const getInvoiceExpenseFinanceTax = ( expenses : TExpense[] ) => {
  return ( expenses || [] ).reduce( ( acc : number, expense : TExpense ) => _.round( _.add( acc, Number( expense.financeTax ) ), 2 ), 0 )
}

export const getInvoiceTotalAddedDueDates = ( dueDates : TDueDates[] ) => {
  if (dueDates.length === 0) {
    return 0
  }
  return _.round( ( dueDates || [] ).reduce( ( acc : number, v : TDueDates ) => _.add( acc, Number( v.finance ) ), 0 ), 2 )
}

export const getInvoiceFooterAdditionalExpenseFinance = ( expenses : TExpense[] ) => {
  return expenses && expenses.length !== 0 ? expenses.reduce( ( acc : number, expense : TExpense ) => {
    return _.round( _.add( acc, ( expense as any ).items.reduce( ( acc : number, x : TExpenseItem ) => _.round( _.add( acc, x.financeMP as number ), 2 ), 0 ) ), 2 )
  }, 0 ) : 0
}
