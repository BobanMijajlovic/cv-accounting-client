import React            from 'react'
import TaxPart          from './TaxPart'
import {
  StyleSheet,
  Text,
  View
}                       from '@react-pdf/renderer'
import SummaryPart      from './SummaryPart'
import _                from 'lodash'
import {IPdfTableProps} from '../../../../../components/Pdf/Pdf'

const styles = StyleSheet.create({
  root :{
    padding: 10,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  taxPart: {
    width: '35%'
  },
  summaryPart: {
    width: '35%'
  },
})

const Footer = ({tableData} : {tableData : IPdfTableProps}) => {

  const _data = React.useMemo(() => {
    if (!tableData.data) {
      return []
    }
    const arr = tableData.data.reduce((acc : any,x : any) => {
      const index = acc.findIndex((y : any) => Number(y.taxId) === Number(x.taxId))
      if (index === -1) {
        return [...acc, {
          taxId: x.taxId,
          taxPercent: x.taxPercent,
          financeVP: x.financeFinalVP,
          taxFinance: x.taxFinance,
          financeMP: x.financeMP
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

    return [
      ...arr,
      {
        summary: true,
        financeVP: arr.reduce((acc : number,x : any) => _.round(_.add(acc,x.financeVP),2) ,0),
        taxFinance: arr.reduce((acc : number,x : any) => _.round(_.add(acc,x.taxFinance),2) ,0),
        financeMP:  arr.reduce((acc : number,x : any) => _.round(_.add(acc,x.financeMP),2) ,0),
      }
    ]
  },[tableData.data])

  return (
    <View>
      <View style={styles.root}>
        <View style={styles.taxPart}>
          <TaxPart data={_data} />
        </View>
        <View style={styles.summaryPart}>
          <SummaryPart data={tableData}/>
        </View>
      </View>
      <View>
        <FooterCell label={'Payment method :'} value={'Gotovinski'}/>
        <FooterCell label={'Note of the tax exemption :'} value={'________________'}/>
      </View>
    </View>
  )
}

export default Footer

const FooterCell = ({label,value} : {label : string,value : string}) => {
  const styles = StyleSheet.create({
    root: {
      padding: 2
    }
  })
  return (
    <View style={styles.root}>
      <Text>{label} {value}</Text>
    </View>
  )
}