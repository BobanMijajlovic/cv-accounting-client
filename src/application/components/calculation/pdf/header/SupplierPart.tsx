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

interface ISupplierOwnerPartProps {
  data : TCustomer | TClient
  receiver ?: boolean
}

const SupplierOwnerPart = ({data,receiver} : ISupplierOwnerPartProps) => {
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

  const address = data && (data as any).addresses && (data as any).addresses.length !== 0 ? getAddressData((data as any).addresses,CONSTANT_ADDRESS.TYPES.SHOP) : void(0)
  
  return (
    <>
      <View style={styles.columnContent}>
        <View style={styles.supplierNameRoot}>
          <Text style={styles.supplierTitle}>{!receiver ? 'Supplier :' : 'Receiver :'}</Text>
          <Text style={styles.supplierName}>{data.shortName}</Text>
        </View>
        <Text>{address ? `${address.address}, ${address.zipCity}` : ''}</Text>
        <Text>Tax ID: &nbsp; {data.taxNumber}</Text>
        <Text>UC Num #: &nbsp; {data.uniqueCompanyNumber}</Text>
      </View>
    </>
  )
}

export default SupplierOwnerPart
