import React, { useMemo }     from 'react'
import {
  StyleSheet,
  Text,
  View
}                             from '@react-pdf/renderer'
import { TWarehouse }         from '../../../../../graphql/type_logic/types'
import { CONSTANT_WAREHOUSE } from '../../../../constants'

const WarehouseBalanceSpec = ({label, value, style} : { label : string, value : string, style ?: any }) => {
  const styles = StyleSheet.create({
    root: {
      flex: 1,
      maxLines: 1,
      alignItems: 'flex-start',
    },
    label: {
      fontSize: 5,
      paddingBottom: 2
    },
    value: {
      fontSize: 5
    }
  })

  return (
    <View style={styles.root}>
      <View style={styles.label}><Text>{label}</Text></View>
      <View style={styles.value}><Text>{value}</Text></View>
    </View>
  )
}

const WarehouseSpec = ({warehouse} : { warehouse : TWarehouse }) => {
 // const balance = React.useMemo(() => _.round(_.subtract(toNumberFixed(warehouse.financeTotalOwes as number), toNumberFixed(warehouse.financeTotalClaims as number)), 2), [warehouse])
  const warehouseFlag =  useMemo(() => warehouse.flag === CONSTANT_WAREHOUSE.TYPES.WHOLESALE ? 'WHOLESALE' : 'RETAIL' ,[warehouse.flag])
  const styles = StyleSheet.create({
    root: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingLeft: 2,
      paddingRight: 2
    },
    name: {
      flexShrink: 1,
      textAlign: 'right',
      fontSize: 6,
      marginBottom: 2,
    },
    codes: {
      flex: 2,
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      flexDirection: 'row',
      fontSize: 5,
    }
  })
  return (
    <View style={styles.root}>
      <View style={styles.name}><Text style={{textOverflow: 'ellipsis', maxLines: 1,}}>{warehouse.name}</Text></View>
      <View style={styles.name}><Text style={{textOverflow: 'ellipsis', maxLines: 1,}}>{warehouseFlag}</Text></View>
      {/* <view style={styles.codes}>
        <WarehouseBalanceSpec label={'Owes'} value={formatPrice(warehouse.financeTotalOwes as number)} />
        <WarehouseBalanceSpec label={'Claims'} value={formatPrice(warehouse.financeTotalClaims as number)} />
        <WarehouseBalanceSpec label={'Balance'} value={formatPrice(balance)} />
      </view>*/}
    </View>
  )
}

export default WarehouseSpec