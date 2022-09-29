import React from 'react'
import {
  StyleSheet,
  Text,
  View
}            from '@react-pdf/renderer'

export const RenderTableCustomerColumn = ({data, value, index, styles: _styles = {}} : any) => {
  const styles = StyleSheet.create({
    root: {
      flexDirection: 'column',
      justifyContent: 'center',
      flex:1,
      paddingLeft: 2,
      paddingRight: 2
    },
    number: {
      flexShrink: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems:'center',
      fontSize: 5,
      marginBottom: 2,
    },
    supplier: {
      flexShrink: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems:'center',
      fontSize: 6,
    }
  })

  const customer = React.useMemo(() => value.customer ,[value])

  return (
    <View style={styles.root}>
      <View style={styles.number}>
        <Text style={{textAlign: 'left', maxLines: 1, border: 0, width: '48%'}}>{value.number}</Text>
        <Text style={{textAlign: 'right', maxLines: 1, border: 0, width: '48%'}}> {customer.taxNumber}</Text>
      </View>
      <View style={styles.supplier}>
        <Text style={{textAlign: 'left', maxLines: 1, border: 0, width: '100%'}}>{customer.shortName ? customer.shortName.trim() : customer.fullName.trim()}</Text>
      </View>
    </View>
  )
}
