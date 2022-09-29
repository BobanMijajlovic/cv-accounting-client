import React, { useMemo }                 from 'react'
import TaxPart                            from './footer/TaxPart'
import {
  IPdfTableProps,
  resizeColumns,
  Table
}                                         from '../../../../components/Pdf/Pdf'
import {
  StyleSheet,
  Text,
  View
}                                         from '@react-pdf/renderer'
import _                                  from 'lodash'
import {
  TExpenseItem,
  TInvoice,
  TProformaInvoice
}                                         from '../../../../graphql/type_logic/types'
import DueDatePart                        from './footer/DueDatePart'
import { RenderCalculationItemData }      from '../../calculation/pdf/_common/RenderColumns'
import {
  formatPrice,
  guid
} from '../../../utils/Utils'
import { RenderVatDataTHead }             from '../../calculation/pdf/_common/VatRender'
import { RenderAdditionalExpenseVatData } from '../_common/RenderAdditionalExpenseTableColumns'

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

const Footer = ({tableData, invoice} : { tableData : IPdfTableProps, invoice : TInvoice | TProformaInvoice  }) => {

  const expenses = useMemo(() => invoice && invoice.expense && (invoice.expense as any).length !== 0 ? (invoice.expense as any).map((x : any, index : number) => {
    const items = x.items as TExpenseItem[]
    const financeMP = Number(items[0].financeMP)
    const taxPercent = items[0].taxPercent
    const financeVP = _.round(_.divide(_.multiply(financeMP, 100), _.add(100, Number(taxPercent))), 2)
    const taxFinance = _.round(_.subtract(financeMP, financeVP), 2)
    const taxId = items[0].taxId
    return {
      id : new Date().getTime() + index,
      item : {
        shortName : items[0].description || '',
        uom : '2'
      },
      financeFinalVP:financeVP,
      taxPercent,
      taxFinance,
      taxId,
      tax : {
        taxPercent : taxPercent,
        taxFinance : taxFinance
      },
      financeMP : financeMP
    }
  }) : [], [invoice])

  const _data = React.useMemo(() => {
    if (!tableData.data || !expenses) {
      return []
    }

    const data = expenses && expenses.length !== 0 ? [...tableData.data,...expenses] : tableData.data
    const arr = data.reduce((acc : any, x : any) => {
      const index = acc.findIndex((y : any) => Number(y.taxId) === Number(x.taxId))
      if (index === -1) {
        return [...acc, {
          id: Number(x.id),
          taxId : x.taxId,
          taxPercent : x.taxPercent,
          financeVP : _.round(x.financeFinalVP,2),
          taxFinance : _.round(x.taxFinance,2),
          financeMP : _.round(x.financeMP,2)
        }]
      }
      const vat = acc[index]
      vat.financeVP = _.round(_.add(Number(vat.financeVP), Number(x.financeFinalVP)), 2)
      vat.taxFinance = _.round(_.add(Number(vat.taxFinance), x.taxFinance), 2)
      vat.financeMP = _.round(_.add(Number(vat.financeMP), Number(x.financeMP)), 2)
      acc.splice(index, 1, {
        ...vat
      })
      return acc
    }, [])

    return arr
  }, [tableData.data,expenses])

  const expenseTableData : IPdfTableProps = {
    columns : [
      {
        label : '#',
        format : (value : any, index? : number) => `${ ((Number(index) || 0) + 1).toString() }.`,
        minSize : 2,
      },
      {
        label : 'Name',
        field : 'item.shortName',
        alignment : 'left',
        minSize : 115,
        format : (value : any) => `${ value.item.shortName }`,
        render : RenderCalculationItemData,
        renderProps : {
          field : 'item'
        }
      },
      {
        label : 'Base Finance',
        field : 'financeFinalVP',
        alignment : 'right',
        minSize : 15,
        sizeType : 3,
        format : (value : any) => formatPrice(value.financeFinalVP),
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

  return (
    <View>
      { expenses.length !== 0 &&
      <View style={ styles.additionalExpense }>
        <View style={ styles.additionalExpenseTitle }>
          <Text>Additional Expenses</Text>
        </View>
        <Table tableData={ expenseTableData }/>
      </View>
      }
      <View style={ styles.root }>
        <View style={ styles.taxPart }>
          <TaxPart data={ _data }/>
        </View>
        <View style={ styles.summaryPart }>
          <DueDatePart dueDate={ (invoice as TInvoice).dueDates }/>
          {/* <SummaryPart data={tableData} expense={invoice.expense}/>*/ }
        </View>
      </View>
    
    </View>
  )
}

export default Footer

export const FooterCell = ({label, value} : { label : string, value : string | string[] }) => {
  const styles = StyleSheet.create({
    root : {
      padding : 2
    }
  })
  return (
    <View style={ styles.root }>
      <View><Text>{ label } </Text></View>
      <View>
        {
          typeof value === 'string' ?  <Text>{value}</Text> : value.map((x:any,key:number) => {
            return (<View key={key}><Text>{x}</Text></View>)
          })
        }
      </View>
    </View>
  )
}