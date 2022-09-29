import {
  StyleSheet,
  Text,
  View
}            from '@react-pdf/renderer'
import React from 'react'

export const RenderBankTransactionOwesClaimsData = ({data, value, index, styles: _styles = {}} : any) => {
  const styles = StyleSheet.create({
    root: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between',
      paddingLeft: 2,
      paddingRight: 2
    },
    claimsRoot: {
      width: '48%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      textAlign: 'right',
      fontSize: 7,
      paddingLeft: 2,
      paddingRight: 2 
    },
    owes: {
      width: '48%',
      justifyContent: 'center',
      textAlign: 'right',
      fontSize: 7
    }
  })

  return (
    <View style={styles.root}>
      <View style={styles.claimsRoot}>
        <Text>{value.claims}</Text>
        <Text> Exp:{value.expenses}</Text>
      </View>
      <View style={styles.owes}>
        <Text>{value.owes}</Text>
      </View>
    </View>
  )
}