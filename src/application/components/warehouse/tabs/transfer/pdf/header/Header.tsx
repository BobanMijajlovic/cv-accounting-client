import React            from 'react'
import {
  StyleSheet,
  Text,
  View
}                       from '@react-pdf/renderer'
import {
  TWarehouse,
  TWorkOrder
}                       from '../../../../../../../graphql/type_logic/types'
import {formatDateLong} from '../../../../../../utils/Utils'
import WarehousePart    from './WarehousePart'

const styles = StyleSheet.create({
  root: {
    margin: '5px 0px'
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5
  },
  headerPart: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  warehouseTitle: {
    fontSize: 6,
    color: '#929292',
    paddingBottom: 5
  }
})

const Header = ({data} : { data : TWorkOrder }) => {
  const {fromWarehouse, toWarehouse, transferDate} = data
  return (
    <View style={styles.root}>
      <View style={styles.headerPart}>
        <View>
          <View><Text style={styles.warehouseTitle}>From Warehouse</Text></View>
          <WarehousePart warehouse={fromWarehouse as TWarehouse}/>
        </View>
        <View>
          <View><Text style={styles.warehouseTitle}>To Warehouse</Text></View>
          <WarehousePart warehouse={toWarehouse as TWarehouse}/>
        </View>
        <View style={styles.title}>
          <Text>Transfer date : &nbsp; {formatDateLong(transferDate)} &nbsp;</Text>
        </View>
      </View>
    </View>
  )
}

export default Header