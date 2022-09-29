import { useCallback }         from 'react'
import {
  TAddress,
  TBankAccount,
  TContact,
  TCustomer
}                              from '../../graphql/type_logic/types'
import { useStateGlobalHooks } from './useStateGlobalHooks'

interface IUseCustomerState {
  selected? : TCustomer
}

const useCustomerHook = 'useCustomerHook-4830-84390'

export const useCustomer = () => {

  const [state, setState] : [IUseCustomerState, (r : IUseCustomerState) => void] = useStateGlobalHooks<IUseCustomerState>(useCustomerHook)

  const setSelected = useCallback((selected : TCustomer) => {
    setState({
      ...state,
      selected
    })
  }, [state, setState])

  return {
    data : state,
    setSelected
  }
}

export const getAddressData = (addresses : TAddress[], type : string = '0') => {
  const address = addresses.find(x => `${ x.type }` === type)
  if (!address) {
    return {
      address : '',
      zipCity : '',
      city : ''
    }
  }
  return {
    address : address.street,
    zipCity : `${ address.zipCode ? address.zipCode : '' } ${ address.city }${ address.state ? `, ${ address.state }` : '' }`,
    city : `${ address.city }`
  }
}

export type TFindContact = {
  type : string
  value : string
  description? : string
}

export const getContactData = (contacts : TContact[], type : string = '0') : TFindContact => {
  const contact : any = contacts.find(x => `${ x.type }` === type)
  if (!contact) {
    return {
      type : '',
      value : '',
      description : ''
    }
  }
  return {
    type : contact.type,
    value : contact.value,
    description : contact.description
  }
}

export const getBankData = (banks : TBankAccount[]) => {
  return banks.length !== 0 ? banks[0] : {}
}
