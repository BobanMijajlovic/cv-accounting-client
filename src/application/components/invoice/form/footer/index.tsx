import React           from 'react'
import { formatPrice } from '../../../../utils/Utils'
import {
  getInvoiceExpenseFinanceMP,
  getInvoiceExpenseFinanceTax,
  getInvoiceFinanceMP,
  getInvoiceFinanceTax
}                      from '../../util'
import { TInvoice }    from '../../../../../graphql/type_logic/types'
import _               from 'lodash'

const Footer = ({invoice} : {invoice : TInvoice}) => {

  const items = React.useMemo(() => invoice.items && (invoice as any).items.length !== 0 ? invoice.items : [] as any,[invoice])
  const expenses =   React.useMemo(() => invoice.expense && (invoice as any).expense.length !== 0 ? invoice.expense : [] as any,[invoice])
    
  const financeExpenseMP = React.useMemo(() => getInvoiceExpenseFinanceMP(expenses),[expenses])
  const financeExpenseTax = React.useMemo(() => getInvoiceExpenseFinanceTax(expenses),[expenses])
  const financeExpenseVP = React.useMemo(() => _.round(_.subtract(financeExpenseMP,financeExpenseTax),2) ,[financeExpenseMP,financeExpenseTax])
  const financeTax = React.useMemo(() => getInvoiceFinanceTax(items),[items])
  const financeMP = React.useMemo(() => getInvoiceFinanceMP(items),[items])
 
  const finaleFinanceTax = React.useMemo(() => _.round(_.add(financeTax,financeExpenseTax),2),[financeTax,financeExpenseTax])
  const finalFinanceMP = React.useMemo(() => _.round(_.add(financeMP,financeExpenseMP),2),[expenses])

  return (
    <div className={'d-flex flex-column'} style={{minWidth: '300px'}}>
      <FinancePartRow label={'TOTAL FINANCE'} value={formatPrice(financeMP)}/>
      {
        expenses && expenses.length !== 0 ? 
          <>
            <FinancePartRow label={'EXP. FINANCE'} value={formatPrice(financeExpenseMP)}/>
            <FinancePartRow label={'TAX'} value={formatPrice(finaleFinanceTax)}/>
            <FinancePartRow label={'FINAL FINANCE'} value={formatPrice(finalFinanceMP)}/>
          </>
          : null
      }
    </div>
  )
}

export default Footer

export const FinancePartRow = ({label, value} : { label : string, value : string }) => {
  return (
    <div className={'d-flex justify-content-between border-bottom '}>
      <div className={'opacity-4 font-smaller-4'}> {label}</div>
      <div className={'font-smaller-1 font-weight-600'}>{value}</div>
    </div>
  )
}