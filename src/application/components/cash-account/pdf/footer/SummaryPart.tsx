import React            from 'react'
import {
  StyleSheet,
  Text,
  View
}                       from '@react-pdf/renderer'
import {formatPrice}    from '../../../../utils/Utils'
import _                from 'lodash'
import {IPdfTableProps} from "../../../../../components/Pdf/Pdf";

const styles = StyleSheet.create({
  root: {
    padding: 5,
  },
  title: {
    fontWeight: 'bold',
    padding: '0px 5px 5px 5px',
    borderBottom: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#dddddd'
  },
  row: {
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    fontWeight: 900
  },
  cell: {
    padding: '0px 4px',
    flex: 1,
    textAlign: 'right'
  },
  total: {
    borderTop: 1,
    borderTopStyle: 'dotted',
    borderTopColor: '#dddddd',
    marginTop: 2,
  }
})

const SummaryPart = ({data} : { data : IPdfTableProps }) => {
  const financeVP = _.round(data.data.reduce((acc : number, x : any) => _.add(acc,x.financeVP) ,0),2)
  const taxFinance =  _.round(data.data.reduce((acc : number, x : any) => _.add(acc,x.taxFinance) ,0),2)
  const financeMP = _.round(data.data.reduce((acc : number, x : any) => _.add(acc,x.financeMP) ,0),2)
  const totalDiscount =  _.round(data.data.reduce((acc : number, x : any) => _.add(acc,_.subtract(x.financeVP,x.financeFinalVP)),0),2)
  const financeFinalVP = _.round(data.data.reduce((acc : number, x : any) => _.add(acc,x.financeFinalVP) ,0),2)
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
    </View>
  )
}

export default SummaryPart

const SummaryRow = ({label, value} : { label : string, value : string }) => {
  return (
    <View style={styles.row}>
      <View style={{...styles.cell, textAlign: 'left'}}>
        <Text>{label}</Text>
      </View>
      <View style={styles.cell}>
        <Text>{value}</Text>
      </View>
    </View>
  )
}
