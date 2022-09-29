import React              from 'react'
import {
  StyleSheet,
  Text,
  View
}                         from '@react-pdf/renderer'
import {
  TClient,
  TCustomer
} from '../../../../../graphql/type_logic/types'
import {getAddressData}   from '../../../../hooks/useCustomer'
import {CONSTANT_ADDRESS} from '../../../../constants'

interface IClientAccountPartProps {
  data :  TClient
}

const SupplierOwnerPart = ({data} : IClientAccountPartProps) => {
  const styles = StyleSheet.create({
    columnContent: {
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },
    supplierNameRoot: {
      flexDirection: 'row',
      justifyContent: 'flex-start'
    },
    supplierTitle: {
      fontSize: 6,
      color: '#888'
    },
    supplierName: {
      flex: 2
    }
  })

  const address = data && (data as any).addresses && (data as any).addresses.length !== 0 ? getAddressData((data as any).addresses,CONSTANT_ADDRESS.TYPES.HOME) : void(0)

  return (
    <>
      <View style={styles.columnContent}>
        <View style={styles.supplierNameRoot}>
          <Text style={styles.supplierName}>{`${data.shortName} ${address ? address.city : ''}`}</Text>
        </View>
      </View>
    </>
  )
}

export default SupplierOwnerPart
