import React            from 'react'
import {
  StyleSheet,
  Text,
  View
}                       from '@react-pdf/renderer'
import {formatDateLong} from '../../../../utils/Utils'
import CustomerPart     from '../../../invoice/pdf/Header/CustomerPart'

const styles = StyleSheet.create({
  root: {
    margin: '5px',
    flexDirection: 'row'
  },
  title: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '5px 10px',
    fontSize: 9,
    flex: 1,
  },
  headerPart: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '50%',
  },
  customerPart: {
    flex: 2,
    textAlign: 'center',
    padding: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#dddddd'
  },
  invoiceNumber: {
    padding: 5,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
const Header = ({data} : { data : any }) => {
  const {receiptNumber, createdAt, customer} = data
  return (
    <View style={styles.root}>
      <View style={styles.headerPart}>
        <View style={styles.customerPart}><CustomerPart data={customer as any}/></View>
        <View style={styles.invoiceNumber}><Text >Receipt num. &nbsp; {receiptNumber}</Text></View>
      </View>
      <View style={styles.title}>
        <ComponentRender label={'Date'} value={formatDateLong(createdAt)}/>
      </View>
    </View>
  )
}

export default Header

const _styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    flex: 1
  },
  value: {
    flex: 1,
    textAlign: 'center'
  }
})

const ComponentRender = ({label,value} : {label : string,value : string}) => {
  return (
    <View style={_styles.root}>
      <Text style={_styles.label}>{label}</Text>
      <Text style={_styles.value}>{value}</Text>
    </View>
  )
}
