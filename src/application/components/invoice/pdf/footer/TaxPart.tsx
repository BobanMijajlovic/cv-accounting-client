import React           from 'react'
import {
  StyleSheet,
  Text,
  View
}                      from '@react-pdf/renderer'
import { formatPrice } from '../../../../utils/Utils'
import {
  IPdfTableProps,
  resizeColumns,
  Table
}                      from '../../../../../components/Pdf/Pdf'

const styles = StyleSheet.create({
  root: {
    padding: 5
  },
  title: {
    fontWeight: 'bold',
    padding: '0px 5px 5px 5px',
    borderBottom: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#dddddd'
  },
})

const TaxPart = ({data} : {data : any}) => {

  const tableData : IPdfTableProps = {
    columns : [
      {
        label : 'Tax %',
        field : 'taxPercent',
        alignment : 'left',
        format : (value : any) => `${formatPrice(value.taxPercent)}`,
      },
      {
        label : 'Base Finance',
        field : 'financeVP',
        alignment : 'right',
        sizeType : 3,
        format : (value : any) => formatPrice(value.financeVP),
      },
      {
        label : 'Tax finance',
        field : 'taxFinance',
        alignment : 'right',
        sizeType : 3,
        format : (value : any) => formatPrice(value.taxFinance),
      },
      {
        label : 'Finance',
        field : 'financeMP',
        alignment : 'right',
        sizeType : 3,
        format : (value : any) => formatPrice(value.financeMP),
      }
    ],
    data : data,
    summarize : {fields : ['financeVP', 'taxFinance', 'financeMP']}
  }

  resizeColumns(tableData)
  
  return (
    <View style={styles.root}>
      <Table tableData={tableData} />
    </View>
  )
}

export default TaxPart

const TaxTableRow = ({data} : {data : any}) => {
  const style = React.useMemo(() => data.summary ? {...styles.tableRow,...styles.borderTopDoted} : styles.tableRow,[data])
  return (
    <View style={style}>
      <TaxTableCell value={data.summary ? '' : formatPrice(data.taxPercent)} />
      <TaxTableCell value={formatPrice(data.financeVP)} />
      <TaxTableCell value={formatPrice(data.taxFinance)} />
      <TaxTableCell value={formatPrice(data.financeMP)} />
    </View>
  )
}

const TaxTableCell = ({value} : {value : string}) => {
  return (
    <View style={styles.tableCell}>
      <Text>{value}</Text>
    </View>
  )
}