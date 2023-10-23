import React, { useMemo }                         from 'react'
import {
  StyleSheet,
  Text,
  View
}                                                 from '@react-pdf/renderer'
import {
  TCalculation,
  TExpenseItem
}                                                 from '../../../../graphql/type_logic/types'
import { formatPrice }                            from '../../../utils/Utils'
import TaxesRecapitulation                        from './footer/TaxesRecapitulation'
import {
  IPdfTableProps,
  resizeColumns,
  Table
}                                                 from '../../../../components/Pdf/Pdf'
import { RenderCalculationAdditionalExpenseName } from './_common/RenderColumns'
import { RenderVatDataTHead }                     from './_common/VatRender'
import { RenderAdditionalExpenseVatData }         from '../../invoice/_common/RenderAdditionalExpenseTableColumns'
import _                                          from 'lodash'
import DueDatePart                                from './footer/DueDatePart';

const styles = StyleSheet.create({
  root : {
    padding : 10,
    paddingBottom : 20,
    flexDirection : 'row',
    justifyContent : 'space-between',
    flex : 1,
  },
  taxPart : {
    width : '45%',
    display : 'flex'
  },
  summaryPart : {
    width : '35%'
  },
  additionalExpense : {
    paddingTop : 7
  },
  additionalExpenseTitle : {
    fontSize : 7,
    borderBottom: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#eee',
    paddingHorizontal: 2,
    marginHorizontal: 2,
    paddingBottom: 2
  }
})

const Footer = ({calculation} : {calculation : TCalculation}) => {
  const additionalExpense = (calculation as any).expense.filter((x : any) => (x.customer && x.invoiceNumber))
  const expenses = useMemo(() => additionalExpense && additionalExpense.length !== 0 ? additionalExpense.map((x : any, index : number) => {
    const items = x.items as TExpenseItem[]
    const financeMP = items.length !== 0  ? Number(items[0].financeMP) : x.financeMP
    const taxPercent = items.length !== 0 ? items[0].taxPercent : x.financeTax
    const financeVP = _.round(_.divide(_.multiply(financeMP, 100), _.add(100, Number(taxPercent))), 2)
    const taxFinance = _.round(_.subtract(financeMP, financeVP), 2)
    const taxId = items.length !== 0 ? items[0].taxId : ''
    return {
      id : new Date().getTime() + index,
      item : {
        customer : _.get(x,'customer'),
        invoiceNumber: x.invoiceNumber
      },
      financeVP,
      taxPercent,
      taxFinance,
      taxId,
      tax : {
        taxPercent : taxPercent,
        taxFinance : taxFinance
      },
      financeMP : financeMP
    }
  }) : [], [additionalExpense])
  
  const expenseTableData : IPdfTableProps = {
    columns : [
      {
        label : '#',
        format : (value : any, index? : number) => `${ ((Number(index) || 0) + 1).toString() }.`,
        minSize : 2,
      },
      {
        label : 'Name',
        field : 'item.invoiceNumber',
        alignment : 'left',
        minSize : 115,
        format : (value : any) => `${ value.item.invoiceNumber }`,
        render : RenderCalculationAdditionalExpenseName,
        renderProps : {
          field : 'item'
        }
      },
      {
        label : 'Base Finance',
        field : 'financeVP',
        alignment : 'right',
        minSize : 15,
        sizeType : 3,
        format : (value : any) => formatPrice(value.financeVP),
      },
      {
        label : 'Tax finance',
        field : 'tax',
        alignment : 'right',
        minSize : 15,
        sizeType : 3,
        format : (value : any) => formatPrice(''),
        renderHeader : RenderVatDataTHead,
        renderHeaderProps : {
          field : 'tax'
        },
        render : RenderAdditionalExpenseVatData,
        renderProps : {
          field : 'tax'
        },
        style : {
          padding : 0
        }
      },
      {
        label : 'Finance',
        field : 'financeMP',
        alignment : 'right',
        minSize : 15,
        sizeType : 3,
        format : (value : any) => formatPrice(value.financeMP),
      }
    ],
    data : expenses,
    summarize : {fields : ['financeVP', 'tax', 'financeMP']},
    noHeader : true
  }

  resizeColumns(expenseTableData)
  
  const vats = useMemo(() => {
    if (!calculation.vats || !expenses) {
      return []
    }
    const vats =  (calculation.vats as any).reduce( ( acc : any, x : any,_index: number ) => {
      const index = acc.findIndex( ( y : any ) => Number( y.taxId ) === Number( x.taxId ) )
      if ( index === -1 ) {
        return [...acc, {
          id : new Date().getTime() + _index,
          taxId : x.taxId,
          taxPercent : x.taxPercent,
          financeVP : _.round( _.subtract( Number( x.financeMP ), Number( x.taxFinance ) ), 2 ),
          taxFinance : x.taxFinance,
          financeMP : x.financeMP
        }]
      }
      const vat = acc[index]
      const financeVP = _.round( _.subtract( Number( x.financeMP ), Number( x.taxFinance ) ), 2 )
      vat.financeVP = _.round( _.add( Number( vat.financeVP ), Number( financeVP ) ), 2 )
      vat.taxFinance = _.round( _.add( Number( vat.taxFinance ), x.taxFinance ), 2 )
      vat.financeMP = _.round( _.add( Number( vat.financeMP ), Number( x.financeMP ) ), 2 )
      acc.splice( index, 1, {
        ...vat
      } )
      return acc
    },[])
    const data = expenses && expenses.length !== 0 ? [...vats,...expenses] : vats
    return data.reduce((acc : any, x : any) => {
      const index = acc.findIndex((y : any) => Number(y.taxId) === Number(x.taxId))
      if (index === -1) {
        return [...acc, {
          id: Number(x.id),
          taxId : x.taxId,
          taxPercent : x.taxPercent,
          financeVP : _.round(x.financeVP,2),
          taxFinance : _.round(x.taxFinance,2),
          financeMP : _.round(x.financeMP,2)
        }]
      }
      const vat = acc[index]
      vat.financeVP = _.round(_.add(Number(vat.financeVP), Number(x.financeVP)), 2)
      vat.taxFinance = _.round(_.add(Number(vat.taxFinance), x.taxFinance), 2)
      vat.financeMP = _.round(_.add(Number(vat.financeMP), Number(x.financeMP)), 2)
      acc.splice(index, 1, {
        ...vat
      })
      return acc
    }, [])
  },[calculation.vats,expenses])
  
  return (
    <View>
      { additionalExpense.length !== 0 &&
        <View style={ styles.additionalExpense }>
          <View style={ styles.additionalExpenseTitle }>
            <Text>Additional Expenses</Text>
          </View>
          <Table tableData={ expenseTableData }/>
        </View>
      }

      <View style={ styles.root }>
        <View style={ styles.taxPart }>
          <TaxesRecapitulation vats={vats}/>
        </View>
        <View style={ styles.summaryPart }>
          <DueDatePart calculation={ calculation }/>
          {/* <SummaryPart data={tableData} expense={invoice.expense}/>*/ }
        </View>
      </View>
      {/* <View style={styles.dueDatesExpenses}>
          <DueDatePart dueDate={calculation?.dueDate}/>
          <AdditionalExpensePart additionalExpenses={additionalExpense}/>
           <TaxesRecapitulation items={calculation?.items}/>
        </View>*/}
    </View>
  )
}

export default Footer

