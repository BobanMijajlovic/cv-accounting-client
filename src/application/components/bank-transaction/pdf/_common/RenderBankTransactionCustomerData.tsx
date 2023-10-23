import {
  StyleSheet,
  Text,
  View
}            from '@react-pdf/renderer'
import React from 'react'

export const RenderBankTransactionCustomerData = ({data, value, index, styles: _styles = {}} : any) => {
  const styles = StyleSheet.create({
    root: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingLeft: 2,
      paddingRight: 2
    },
    name: {
      flexShrink: 1,
      textAlign: 'left',
      fontSize: 7,
      marginBottom: 2,
    },
    account: {
      flexShrink: 1,
      flexWrap: 'wrap',
      alignItems: 'flex-end',
      flexDirection: 'row',
      fontSize: 6
    }
  })

  return (
    <View style={styles.root}>
      <View style={styles.name}>
        <Text style={{textOverflow: 'ellipsis', maxLines: 1}}>{value.shortName}</Text>
      </View>
      <View style={styles.account}>
        <Text style={{textAlign: 'left'}}>{value.account}</Text>
      </View>
    </View>
  )
}