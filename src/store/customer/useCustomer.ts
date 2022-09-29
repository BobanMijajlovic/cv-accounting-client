import {
  useDispatch,
  useSelector
}                                    from 'react-redux'
import { IReduxStore }               from '../index'
import {
  useCallback,
  useEffect
}                                    from 'react'
import {
  TAddress,
  TBankAccount,
  TContact,
  TCustomer
}                                    from '../../graphql/type_logic/types'
import { setFieldCustomerDashboard } from './action'
import {
  get as _get,
  omit as _omit
}                                    from 'lodash'
import {
  useCustomerQuery,
  useInsertCustomerMutation,
  useUpdateAddressMutation,
  useUpdateBankAccountMutation,
  useUpdateContactMutation,
  useUpdateCustomerMutation
}                                    from '../../graphql/graphql'
import { processErrorGraphQL }       from '../../apollo'

export const useCustomerDashboard = (init ?: boolean) => {

  const dispatch = useDispatch()
  const {selectedId, searchState} = useSelector((state: IReduxStore) => state.customer)

  const [mutationUpdateCustomer] = useUpdateCustomerMutation()
  const [mutationUpdateAddress] = useUpdateAddressMutation()
  const [mutationUpdateContact] = useUpdateContactMutation()
  const [mutationUpdateCustomerBank] = useUpdateBankAccountMutation()
  const [mutationInsertCustomer] = useInsertCustomerMutation()

  const {refetch, data} = useCustomerQuery({
    notifyOnNetworkStatusChange:true,
    fetchPolicy:'cache-and-network',
    variables:{
      id:Number(selectedId)
    },
    skip:!selectedId
  })

  useEffect(() => {
    init && setStateSearch('')
  }, [init])

  const setSelectedId = useCallback((selectedId: string) => {
    dispatch(setFieldCustomerDashboard('selectedId', selectedId))
  }, [dispatch])

  const setStateSearch = useCallback((selectedId: string) => {
    dispatch(setFieldCustomerDashboard('searchState', selectedId))
  }, [dispatch])

  const insertNewCustomer = async (customer: TCustomer) => {
    await mutationInsertCustomer({
      variables:{
        data:customer
      }
    })
  }

  const insertNewAddress = (address: TAddress) => {
    mutationUpdateCustomer({
      variables:{
        id:+_get(data, 'customer.id'),
        data:{addresses:[address]}
      }
    })
      .then(() => {
        refetch().then()
      })
      .catch(e => {
        processErrorGraphQL(e, {})
      })
  }

  const insertNewContact = (contact: TContact) => {
    mutationUpdateCustomer({
      variables:{
        id:+_get(data, 'customer.id'),
        data:{contacts:[contact]}
      }
    })
      .then(() => {
        refetch().then()
      })
      .catch(e => {
        processErrorGraphQL(e, {})
      })
  }

  const insertNewBank = (bank: TBankAccount) => {
    mutationUpdateCustomer({
      variables:{
        id:+_get(data, 'customer.id'),
        data:{banks:[bank]}
      }
    })
      .then(() => {
        refetch().then()
      })
      .catch(e => {
        processErrorGraphQL(e, {})
      })
  }

  const updateCustomerDetails = (customer: TCustomer) => {
    mutationUpdateCustomer({
      variables:{
        id:+_get(data, 'customer.id'),
        data:customer
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

  return {
    data:{
      selected:data?.customer
    },
    selectedId,
    searchState,
    setSelectedId,
    setStateSearch,
    insertNewCustomer,
    insertNewAddress,
    insertNewContact,
    insertNewBank,
    updateCustomerDetails,
    updateContact,
    updateAddress,
    updateBankAccount
  }

}

export const useCustomer = () => {

  const dispatch = useDispatch()
  const {cardDateFrom, cardDateTo, paymentsDateFrom, paymentsDateTo} = useSelector((state: IReduxStore) => state.customer)

  const setCardDateFrom = useCallback((dateFrom: string | Date) => {
    dispatch(setFieldCustomerDashboard('cardDateFrom', dateFrom))
  }, [dispatch])

  const setCardDateTo = useCallback((dateTo: string | Date) => {
    dispatch(setFieldCustomerDashboard('cardDateTo', dateTo))
  }, [dispatch])

  const setPaymentsDateFrom = useCallback((dateFrom: string | Date) => {
    dispatch(setFieldCustomerDashboard('paymentsDateFrom', dateFrom))
  }, [dispatch])

  const setPaymentsDateTo = useCallback((dateTo: string | Date) => {
    dispatch(setFieldCustomerDashboard('paymentsDateTo', dateTo))
  }, [dispatch])

  return {
    card:{
      cardDateFrom,
      cardDateTo
    },
    payments:{
      paymentsDateFrom,
      paymentsDateTo
    },
    setCardDateFrom,
    setCardDateTo,
    setPaymentsDateTo,
    setPaymentsDateFrom
  }
}