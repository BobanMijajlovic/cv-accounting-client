import React              from 'react'
import {
  StyleSheet,
  Text,
  View
}                         from '@react-pdf/renderer'
import {
  TClient,
  TCustomer
}                         from '../../../../../graphql/type_logic/types'
import {
  getAddressData,
  getBankData,
  getContactData,
  TFindContact
} from '../../../../hooks/useCustomer'
import {
  CONSTANT_ADDRESS,
  CONSTANT_CONTACT
} from '../../../../constants'

interface IClientDataProps {
  data : TCustomer | TClient
}

const ClientData = ({data} : IClientDataProps) => {
  const styles = StyleSheet.create({
    columnContent: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      textAlign: 'left'
    },
    supplierNameRoot: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      fontWeight: 900
    },
  })

  const address = data && (data as any).addresses && (data as any).addresses.length !== 0 ? getAddressData((data as any).addresses,CONSTANT_ADDRESS.TYPES.HEADQUARTERS) : void(0)
  const contact = data && (data as any).contacts && (data as any).contacts.length !== 0  ? {
    email: getContactData((data as any).contacts,CONSTANT_CONTACT.TYPES.EMAIL),
    phone: getContactData((data as any).contacts,CONSTANT_CONTACT.TYPES.PHONE),
    mobile: getContactData((data as any).contacts,CONSTANT_CONTACT.TYPES.MOBILE)
  } :  {
    email:{
      type: CONSTANT_CONTACT.TYPES.EMAIL,
      value: ''
    },
    phone:{
      type: CONSTANT_CONTACT.TYPES.PHONE,
      value: ''
    },
    mobile:{
      type: CONSTANT_CONTACT.TYPES.MOBILE,
      value: ''
    }
  }
  const bank = data && (data as any).banks && (data as any).banks.length !== 0  ? getBankData((data as any).banks) : void(0)
  return (
    <>
      <View style={styles.columnContent}>
        <ControlRender label={'Name:'} value={data.shortName} />
        <ControlRender label={'Address:'} value={address ? `${address.address}, ${address.zipCity}` : ''} />
        <ControlRender label={'Phone:'} value={contact.phone.value.length !== 0 ? contact.phone.value : contact.mobile.value} />
        <ControlRender label={'Email:'} value={contact.email.value} />
        <ControlRender label={'Tax ID:'} value={data.taxNumber} />
        <ControlRender label={'UC Num #:'} value={data.uniqueCompanyNumber} />
        <ControlRender label={'Bank:'} value={bank ? bank.account : ''} />
      </View>
    </>
  )
}

export default ClientData

const ControlRender = ({label,value}: {label: string,value: any}) => {
  const controlStyles = StyleSheet.create({
    root: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%'
    },
    label: {
      width: 50,
      textAlign: 'right'
    },
    value: {
      textAlign: 'left',
      paddingLeft: 5,
      flex: 1
    }
  })
  return (
    <View style={controlStyles.root}>
      <View style={controlStyles.label}>
        <Text>{label}</Text>
      </View> 
      <View style={controlStyles.value}>
        <Text>{value}</Text>
      </View>
    </View>
  )
}