import React                  from 'react'
import {View,Text,StyleSheet} from '@react-pdf/renderer'
import {TCustomer}            from '../../../../../graphql/type_logic/types'

const CustomerSpec = ({customer} : {customer : TCustomer}) => {
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
    codes: {
      flexShrink: 1,
      alignItems: 'flex-end',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      fontSize: 6,
      textAlign:'left'
    },
    taxNumber :{
      paddingRight: 3
    }
  }) 
  return (
    <View style={styles.root}>
      <View style={styles.name}><Text style={{textOverflow: 'ellipsis', maxLines: 1,}}>{customer.shortName}</Text></View>
      <View style={styles.codes}>
        <View style={styles.taxNumber}><Text style={{maxLines: 1, border: 0}}>Tax ID:&nbsp;{customer.taxNumber}</Text></View>
        <View><Text style={{maxLines: 1, border: 0}}>Company Num#:&nbsp;{customer.uniqueCompanyNumber}</Text></View>
      </View>
    </View>
  )
}

export default CustomerSpec