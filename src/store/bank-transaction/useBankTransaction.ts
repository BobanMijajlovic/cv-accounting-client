import {
  useCallback,
  useMemo
}                                        from 'react'
import {
  useDispatch,
  useSelector
}                                        from 'react-redux'
import { IReduxStore }                   from '../index'
import { TCustomer }           from '../../graphql/type_logic/types'
import {
  addBankTransactionTab,
  removeBankTransactionTab,
  selectBankTransactionItem,
  setFieldBankTransactionDashboard
}                              from './action'
import {
  BankTransactionItemType,
  useBankHeaderTransactionQuery,
  useDeleteBankTransactionMutation,
  useInsertBankTransactionsMutation,
  useUpdateBankHeaderTransactionsMutation,
  useUpdateBankTransactionMutation
}                              from '../../graphql/graphql'
import { processErrorGraphQL } from '../../apollo'
import { CONSTANT_MODEL }      from '../../application/constants'

export const useBankTransactionForm = (bankHeaderTransactionId?: string) => {
  
  const [mutationInsertItem] = useInsertBankTransactionsMutation()
  const [mutationDeleteItem] = useDeleteBankTransactionMutation()
  const [mutationUpdateItem] = useUpdateBankTransactionMutation()
  const [mutationUpdateBankTransaction] = useUpdateBankHeaderTransactionsMutation()

  const dispatch = useDispatch()
  const { selectedBankTransactionItemId } = useSelector((state : IReduxStore) => state.bankTransaction)

  const { data, loading, refetch: refetchBankTransaction } = useBankHeaderTransactionQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: {
      id: Number(bankHeaderTransactionId)
    },
    skip: !Number(bankHeaderTransactionId)
  })
  
  const bankTransaction = useMemo(() => !data || !data.bankHeaderTransaction ? void(0) : data.bankHeaderTransaction, [data])
  
  const insertBankTransactionItem = (data: BankTransactionItemType[]) => {
    mutationInsertItem({
      variables: {
        data,
        bankHeaderTransactionId: Number(bankHeaderTransactionId)
      }
    })
      .then(() => {
        refetchBankTransaction().then()
      })
      .catch(e => {
        processErrorGraphQL(e, {})
      })
  }
  
  const updateBankTransactionItem = (data: BankTransactionItemType, id?: number) => {
    mutationUpdateItem({
      variables: {
        data,
        id: id ? id : Number(selectedBankTransactionItemId)
      }
    })
      .then(() => {
        refetchBankTransaction().then()
      })
      .catch(e => {
        processErrorGraphQL(e, {})
      })
  }

  const deleteBankTransactionItem = (id: string) => {
    mutationDeleteItem({
      variables: {
        id: Number(id)
      }
    })
      .then(() => {
        if (selectedBankTransactionItemId === id) {
          setSelectBankTransactionItem(void(0))
        }
        refetchBankTransaction().then()
      })
      .catch(e => {
        processErrorGraphQL(e, {})
      })
  }

  const setSelectBankTransactionItem = useCallback((id : string|undefined) => {
    dispatch(selectBankTransactionItem(id))
  }, [dispatch])
  
  const finishBankTransaction = () => {
    return mutationUpdateBankTransaction({
      variables: {
        id: Number(bankHeaderTransactionId),
        data: {
          status: CONSTANT_MODEL.BANK_TRANSACTION_STATUS.ACTIVE
        }
      }
    })
  }
  
  return {
    bankTransaction,
    selectedBankTransactionItemId,
    bankTransactionLoading: loading,
    refetchBankTransaction,
    insertBankTransactionItem,
    deleteBankTransactionItem,
    updateBankTransactionItem,
    setSelectBankTransactionItem,
    finishBankTransaction
  }
}

export const useBankTransaction = () => {
  const dispatch = useDispatch()
  const { bankTransaction } = useSelector((state : IReduxStore) => state.bankTransaction)

  const setSelectedCustomer = useCallback((customer : TCustomer) => {
    dispatch(setFieldBankTransactionDashboard('customer', customer))
  }, [dispatch])

  const setSelectedBankAccount = useCallback((bankAccountId : string) => {
    dispatch(setFieldBankTransactionDashboard('bankAccountId', bankAccountId))
  }, [dispatch])

  const setDateFrom = (dateFrom : string | Date) => {
    dispatch(setFieldBankTransactionDashboard('dateFrom', dateFrom))
  }

  const setDateTo = (dateTo : string | Date) => {
    dispatch(setFieldBankTransactionDashboard('dateTo', dateTo))
  }
  
  return {
    bankTransaction,
    setSelectedCustomer,
    setSelectedBankAccount,
    setDateFrom,
    setDateTo
  }
}

export const useBankTransactionTabs = () => {
  const dispatch = useDispatch()
  const { bankTransactionTabs, activeTab } = useSelector((state: IReduxStore) => state.bankTransaction)

  const addTab = useCallback((id: string) => {
    dispatch(addBankTransactionTab(id))
  }, [dispatch])

  const removeTab = useCallback((id: string) => {
    dispatch(removeBankTransactionTab(id))
  }, [dispatch])

  return {
    data: bankTransactionTabs,
    addTab,
    removeTab,
    activeTab,
  }
}