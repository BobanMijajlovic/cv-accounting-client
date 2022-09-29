import React, { useMemo }   from 'react'
import {
  StyleSheet,
  Text,
  View
}                           from '@react-pdf/renderer'
import {
  TFinanceTransferDocument,
  TInvoice,
  TProformaInvoice
}                           from '../../../../../graphql/type_logic/types'
import { formatDateLong }   from '../../../../utils/Utils'
import { getAddressData }   from '../../../../hooks/useCustomer'
import { CONSTANT_ADDRESS } from '../../../../constants'

const styles = StyleSheet.create( {
  root : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center',
    paddingTop : 20
  },
  signatureRoot : {
    flexDirection : 'row',
    justifyContent : 'space-between',
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

const Signature = ( { invoice} : { invoice : TInvoice | TProformaInvoice | TFinanceTransferDocument } ) => {
  const clientAddress = getAddressData( ( invoice.client as any ).addresses, CONSTANT_ADDRESS.TYPES.HEADQUARTERS )
  const dateView = useMemo( () => `${ formatDateLong( invoice.date ) } , ${ clientAddress.city }`, [invoice] )
  return (
    <View style={ styles.root }>
      <View style={ styles.signatureRoot }>
        <DateView value={ dateView } label={ 'Date and city of document' }/>
        <OneSignature label={ 'Goods and invoice taken over:' }/>
        <OneSignature label={ 'Invoice issued:' }/>
      </View>
    </View>
  )
}

export default Signature

const OneSignature = ( { label, value } : { label : string, value? : string } ) => {
  return (
    <View style={ styles.signatureOneRoot }>
      <View style={ styles.signatureLabel }><Text>{ label }</Text></View>
      <View><Text>{ value ? value : ' ' }</Text></View>
    </View>
  )
}

const DateView = ( { label, value } : { label : string, value? : string } ) => {
  return (
    <View style={ styles.dateViewRoot }>
      <View style={ styles.dateValue }><Text>{ value }</Text></View>
      <View style={ styles.dateLabel }><Text>{ label }</Text></View>
    </View>

  )
}
