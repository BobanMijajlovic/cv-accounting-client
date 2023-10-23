import {
  StyleSheet,
  Text,
  View
}            from '@react-pdf/renderer'
import React from 'react'

const styles = StyleSheet.create( {
  root : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center',
    paddingTop : 20
  },
  signatureRoot : {
    flexDirection : 'row',
    justifyContent : 'space-around',
    flex : 1
  },
  signatureOneRoot : {
    width : 150,
    flexDirection : 'column'
  },
  signatureLabel : {
    textAlign : 'center',
    fontSize : 8,
    paddingBottom : 25,
    borderBottom : 1
  },
  dateViewRoot : {
    width : 150,
    flexDirection : 'column',
    justifyContent : 'flex-end'
  },
  dateLabel : {
    textAlign : 'center'
  },
  dateValue : {
    textAlign : 'center',
    borderBottom : 1
  }
} )

const Footer = () => {
  return (
    <View style={ styles.root }>
      <View style={ styles.signatureRoot }>
        <OneSignature label={ 'Took over:' }/>
        <OneSignature label={ 'Received:' }/>
      </View>
    </View>
  )
}

export default Footer

const OneSignature = ( { label, value } : { label : string, value? : string } ) => {
  return (
    <View style={ styles.signatureOneRoot }>
      <View style={ styles.signatureLabel }><Text>{ label }</Text></View>
      <View><Text>{ value ? value : ' ' }</Text></View>
    </View>
  )
}
