import React from 'react'
import {
  StyleSheet,
  Text,
  View
}            from '@react-pdf/renderer'

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#929292',
    borderBottomStyle: 'solid',
    marginBottom: 10
  }
})
const SummaryHeader = ({warehouse} : { warehouse : any }) => {
  const _address = warehouse?.addresses?.[0]
  const address = _address ? `${_address.street || ''} ${_address.zipCode || ''}  ${_address.city || ''}` : ''
  return (
    <View style={styles.root}>
      <View><Text>{warehouse?.name}</Text></View>
      <View><Text>{warehouse?.description}</Text></View>
      <View><Text>{address}</Text></View>
    </View>
  )
}

export default SummaryHeader
