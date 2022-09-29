import React              from 'react'
import {
  StyleSheet,
  Text,
  View
}                         from '@react-pdf/renderer'
import {TCustomer}        from '../../../../../graphql/type_logic/types'
import {getAddressData}   from '../../../../hooks/useCustomer'
import {CONSTANT_ADDRESS} from '../../../../constants'

const CustomerPart = ({data} : { data : TCustomer }) => {
  const styles = StyleSheet.create({
    columnContent: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      width: '100%',
    },
    supplierNameRoot: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flex:1
    },
    supplierTitle: {
      fontSize: 5,
      color: '#888'
    },
    supplierName: {
      flex: 2,
      fontSize: 10,
      fontWeight: 300
    },
    supplierTaxUCRoot: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      flex:1
    },
    supplierTaxUC: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '50%',
      textAlign:'left'
    },
    tinUCText: {
      width: 60,
      textAlign:'right'
    }
  })

  const address = data && (data as any).addresses && (data as any).addresses.length !== 0 ? getAddressData((data as any).addresses,CONSTANT_ADDRESS.TYPES.HEADQUARTERS) : void(0)

  return (
    <>
      <View style={styles.columnContent}>
        <View style={styles.supplierNameRoot}>
          <Text style={styles.supplierName}>{data.shortName && data.shortName.length !== 0 ? data.shortName : data.fullName}</Text>
        </View>
        <View>
          <Text>{address ? `${address.address}, ${address.zipCity}` : ''}</Text>
        </View>
        <View style={styles.supplierTaxUCRoot}>
          <View style={styles.supplierTaxUC}>
            <Text style={styles.tinUCText}>Tax ID : &nbsp;</Text>
            <Text>{data.taxNumber}</Text>
          </View>
          <View style={styles.supplierTaxUC}>
            <Text style={styles.tinUCText}>UC Num # : &nbsp;</Text>
            <Text >{data.uniqueCompanyNumber}</Text>
          </View>
        </View>
      </View>
    </>
  )
}

export default CustomerPart
