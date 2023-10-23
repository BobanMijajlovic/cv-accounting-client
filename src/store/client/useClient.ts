import React, {
  useCallback,
  useMemo
}                              from 'react'
import { useDispatch }         from 'react-redux'
import {
  useGetClientLogoUrlQuery,
  useGetLoggedClientQuery,
  useUpdateAddressMutation,
  useUpdateBankAccountMutation,
  useUpdateClientMutation,
  useUpdateContactMutation,
  useUploadLogoMutation
}                              from '../../graphql/graphql'
import {
  TAddress,
  TBankAccount,
  TClient,
  TContact
}                              from '../../graphql/type_logic/types'
import { fetchClient }         from './action'
import {
  get as _get,
  omit as _omit
}                              from 'lodash'
import { processErrorGraphQL } from '../../apollo'

export const _fetchClient = (init ?: boolean) => {
  const dispatch = useDispatch()
  useGetLoggedClientQuery({
    notifyOnNetworkStatusChange:true,
    fetchPolicy:'cache-and-network',
    skip:!init
  })

  const setClient = useCallback((client: TClient) => {
    dispatch(fetchClient(client))
  }, [dispatch])
}

export const useClient = () => {

  const {data, refetch} = useGetLoggedClientQuery({
    notifyOnNetworkStatusChange:true,
    fetchPolicy:'cache-and-network',
  })

  const {data:dataLogo, refetch:refetchLogo} = useGetClientLogoUrlQuery({
    notifyOnNetworkStatusChange:true,
    fetchPolicy:'cache-and-network',
  })

  const client = useMemo(() => data && data.client ? data.client : {} as TClient, [data])

  const [_uploadLogo] = useUploadLogoMutation()
  const [mutationUpdateClient] = useUpdateClientMutation()
  const [mutationUpdateAddress] = useUpdateAddressMutation()
  const [mutationUpdateContact] = useUpdateContactMutation()
  const [mutationUpdateCustomerBank] = useUpdateBankAccountMutation()

  const banks = React.useMemo(() => !client.banks ? [] as TBankAccount[] : client.banks as TBankAccount[], [client])
  const addresses = React.useMemo(() => !client.addresses ? [] as TAddress[] : client.addresses as TAddress[], [client])
  const contacts = React.useMemo(() => !client.contacts ? [] as TContact[] : client.contacts as TContact[], [client])
  const imgLogo = React.useMemo(() => dataLogo ? `${(process.env as any).REACT_APP_LOGO_PATH}/${dataLogo.data}` : undefined, [dataLogo])

  const updateClient = (data: any) => {
    mutationUpdateClient({
      variables:{
        id:Number(_get(client, 'id')),
        data
      }
    })
      .then(() => {
        refetch().then()
      })
      .catch(e => {
        processErrorGraphQL(e, {})
      })
  }

  const updateContact = (contact: TContact) => {
    mutationUpdateContact({
      variables:{
        id:Number(_get(contact, 'id')),
        data:_omit(contact, 'id')
      }
    })
      .then(() => {
        refetch().then()
      })
      .catch(e => {
        processErrorGraphQL(e, {})
      })
  }

  const updateAddress = (address: TAddress) => {
    mutationUpdateAddress({
      variables:{
        id:Number(_get(address, 'id')),
        data:_omit(address, 'id')
      }
    })
      .then(() => {
        refetch().then()
      })
      .catch(e => {
        processErrorGraphQL(e, {})
      })
  }

  const updateBankAccount = (banks: TBankAccount) => {
    mutationUpdateCustomerBank({
      variables:{
        id:Number(_get(banks, 'id')),
        data:_omit(banks, 'id')
      }
    })
      .then(() => {
        refetch().then()
      })
      .catch(e => {
        processErrorGraphQL(e, {})
      })
  }

  const updateClientDetails = (customer: TClient) => {
    updateClient(customer)
  }

  const insertNewAddress = (address: TAddress) => {
    updateClient({addresses:[address]})
  }

  const insertNewContact = (contact: TContact) => {
    updateClient({contacts:[contact]})
  }

  const insertNewBank = (bank: TBankAccount) => {
    updateClient({banks:[bank]})
  }

  const uploadLogo = (data: any) => {
    return _uploadLogo(data).then(() => {
      refetchLogo().then()
    })
      .catch(e => {
        processErrorGraphQL(e, {})
      })
  }

  return {
    data:client as TClient,
    imgLogo,
    banks,
    addresses,
    contacts,
    updateClientDetails,
    insertNewAddress,
    insertNewContact,
    insertNewBank,
    updateContact,
    updateBankAccount,
    updateAddress,
    uploadLogo
  }

}