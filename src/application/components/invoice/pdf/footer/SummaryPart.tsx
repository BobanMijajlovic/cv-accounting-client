import React               from 'react'
import {
  StyleSheet,
  Text,
  View
}                          from '@react-pdf/renderer'
import { formatPrice }     from '../../../../utils/Utils'
import { IPdfTableProps }  from '../../../../../components/Pdf/Pdf'
import {
  getInvoiceDiscountFinance,
  getInvoiceExpenseFinanceTax,
  getInvoiceFinanceAfterDiscountVP,
  getInvoiceFinanceMP,
  getInvoiceFinanceTax,
  getInvoiceFinanceVP,
  getInvoiceFooterAdditionalExpenseFinance
}                          from '../../util'
import { TExpense } from '../../../../../graphql/type_logic/types'
import _                   from 'lodash'

const styles = StyleSheet.create({
  root:{
    padding:5,
  },
  title:{
    fontWeight:'bold',
    padding:'0px 5px 5px 5px',
    borderBottom:1,
    borderBottomStyle:'solid',
    borderBottomColor:'#dddddd'
  },
  row:{
    padding:2,
    flexDirection:'row',
    justifyContent:'space-between',
    flexWrap:'wrap',
    fontWeight:900
  },
  cell:{
    padding:'0px 4px',
    flex:1,
    textAlign:'right'
  },
  total:{
    borderTop:1,
    borderTopStyle:'dotted',
    borderTopColor:'#dddddd',
    marginTop:2,
  },
  expense:{
    borderBottom:1,
    borderBottomStyle:'dotted',
    borderBottomColor:'#dddddd',
    padding: '5px 5px 2px',
    fontWeight: 'bold'
  }
})

const SummaryPart = ({data, expense}: { data: IPdfTableProps, expense?: TExpense[] }) => {
  const financeVP = getInvoiceFinanceVP(data.data)
  const taxFinance = getInvoiceFinanceTax(data.data)
  const financeMP = getInvoiceFinanceMP(data.data)
  const totalDiscount = getInvoiceDiscountFinance(data.data)
  const financeFinalVP = getInvoiceFinanceAfterDiscountVP(data.data)
  const expenseMP = getInvoiceFooterAdditionalExpenseFinance(expense || [])
  const expenseTax = getInvoiceExpenseFinanceTax(expense || [])
  const finAfterExpVP = _.round(_.add(financeFinalVP,_.subtract(expenseMP,expenseTax)), 2)
  const taxAfterExp =  _.round(_.add(taxFinance, expenseTax), 2)
  const finFinalMP = _.round(_.add(finAfterExpVP,taxAfterExp),2)
  return (
    <View style={styles.root}>
      <View style={styles.title}><Text>Recapitulation finance</Text></View>
      <SummaryRow label={'Finance no tax'} value={formatPrice(financeVP)}/>
      <SummaryRow label={'Discount'} value={formatPrice(totalDiscount)}/>
      <SummaryRow label={'Finance'} value={formatPrice(financeFinalVP)}/>
      <SummaryRow label={'Finance tax'} value={formatPrice(taxFinance)}/>
      <View style={styles.total}>
        <SummaryRow label={'Finance total'} value={formatPrice(financeMP)}/>
      </View>
      <View style={styles.expense}>
        <Text>Expense</Text>
      </View>
      <SummaryRow label={'Fin with Exp'} value={formatPrice(finAfterExpVP)}/>
      <SummaryRow label={'Tax with Exp'} value={formatPrice(taxAfterExp)}/>
      <SummaryRow label={'Final total'} value={formatPrice(finFinalMP)}/>
    </View>
  )
}

export default SummaryPart

const SummaryRow = ({label, value}: { label: string, value: string }) => {
  return (
    <View style={styles.row}>
      <View style={{...styles.cell, textAlign:'left'}}>
        <Text>{label}</Text>
      </View>
      <View style={styles.cell}>
        <Text>{value}</Text>
      </View>
    </View>
  )
}
