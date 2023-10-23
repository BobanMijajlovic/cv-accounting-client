import React        from 'react'
import {
  StyleSheet,
  Text,
  View
}                   from '@react-pdf/renderer'
import {TWarehouse} from '../../../../../../../graphql/type_logic/types'

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 5
  }
})

const WarehousePart = ({warehouse} : { warehouse : TWarehouse }) => {
  return (
    <View style={styles.root}>
      <View><Text style={{fontWeight: 'bold',paddingBottom: 3}}>{warehouse?.name}</Text></View>
      <View><Text style={{fontSize: 5}}> {warehouse?.description}</Text></View>
    </View>
  )
}

export default WarehousePart
