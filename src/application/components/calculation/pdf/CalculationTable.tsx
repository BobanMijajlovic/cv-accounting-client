import React                  from 'react'
import {
  HEADER,
  IPdfTableProps,
  TABLE,
  TBODY,
  TRD
}                             from '../../../../components/Pdf/Pdf'
import {View,StyleSheet,Text} from '@react-pdf/renderer'
import {formatPrice}          from '../../../utils/Utils'
import * as _ from 'lodash'

const CalculationTable = ({tableData} : { tableData : IPdfTableProps }) => {

  const {data = [], columns} = tableData

  return (
    <TABLE>
      <HEADER columns={columns}/>
      <TBODY>
        {
          data.map((x : any, key : number) => {
            return <TRD data={x} columns={columns} key={key} index={key}/>
          })
        }
      </TBODY>
    </TABLE>
  )
}

export default CalculationTable

const CalculationSummaryCell = ({label, value} : { label : string, value : string }) => {

  const styles = StyleSheet.create({
    root: {
      flex: 1,
      alignItems: 'flex-end'
    },
    label: {
      fontSize: 7,
      color: '#888',
      paddingBottom: 3
    },
    value: {
      fontSize: 8,
    }
  })

  return (
    <View style={styles.root}>
      <View style={styles.label}><Text>{label}</Text></View>
      <View style={styles.value}><Text>{value}</Text></View>
    </View>
  )
}

export const CalculationTableSummary = ({data} : {data : any}) => {
  const styles = StyleSheet.create({
    root: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 10,
    },
    cellTitle: {
      flex: 1,
      textTransform: 'uppercase',
      textAlign: 'right',
      paddingRight:10,
      fontSize: 8,
      color: '#555',
    },
    values: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 2,
    }
  })

  const financeTax = _.round(data.data.reduce((acc : number,x : any) => _.add(acc,_.round(_.subtract(Number(x.financeFinalMP),Number(x.financeFinalVP)),2)),0),2)
  const totalFinanceVP = _.round(data.data.reduce((acc : number,x : any) => _.add(acc,Number(x.financeFinalVP)),0),2)
  const totalFinanceMP = _.round( _.add(totalFinanceVP,financeTax),2)
  const totalPriceDiff = _.round(data.data.reduce((acc : number,x : any) => _.add(acc,Number(x.priceDifference.finance)),0),2)
  const totalFinanceInvoice = _.round(data.data.reduce((acc : number,x : any) => _.add(acc,Number(x.invoice.financeNoVat)),0),2)
  const totalExpense = _.round(data.data.reduce((acc : number,x : any) => _.add(acc,Number(x.expensesFinanceInternalMP)),0),2)
  return (
    <View style={styles.root}>
      <View style={styles.cellTitle}><Text>TOTAL :</Text></View>
      <View style={styles.values}>
        <CalculationSummaryCell label={'Inv. Finance'} value={formatPrice(totalFinanceInvoice)}/>
        <CalculationSummaryCell label={'Expense'} value={formatPrice(totalExpense)}/>
        <CalculationSummaryCell label={'Price difference'} value={formatPrice(totalPriceDiff)}/>
        <CalculationSummaryCell label={'Base fin. exp'} value={formatPrice(totalFinanceVP)}/>
        <CalculationSummaryCell label={'Tax Exp'}value={formatPrice(financeTax)}/>
        <CalculationSummaryCell label={'Finance Exp'} value={formatPrice(totalFinanceMP)}/>
      </View>
    </View>    
  )
}

