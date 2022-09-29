import {
  useDispatch,
  useSelector
}                          from 'react-redux'
import { IReduxStore }     from '../index'
import {
  useCallback,
  useMemo
} from 'react'
import {
  addReturnInvoiceTab,
  removeReturnInvoiceTab,
  setFieldReturnInvoiceDashboard
}                              from './action'
import {
  TCustomer,
  TInvoiceItem,
  TReturnInvoice
}                              from '../../graphql/type_logic/types'
import {
  useDeleteInvoiceItemMutation,
  useInsertUpdateInvoiceItemMutation,
  useReturnInvoiceQuery,
  useUpdateInvoiceMutation,
  useUpdateReturnInvoiceMutation
}                              from '../../graphql/graphql'
import { processErrorGraphQL } from '../../apollo'
import { toNumberFixed }       from '../../application/utils/Utils'
import { CONSTANT_INVOICE }    from '../../application/constants'

export const useReturnInvoiceForm = (returnInvoiceId: string, init?: boolean) => {

  const [mutationUpdateReturnInvoice] = useUpdateReturnInvoiceMutation()
  const [mutationInsertUpdateInvoiceItem] = useInsertUpdateInvoiceItemMutation()
  const [mutationDeleteInvoiceItem] = useDeleteInvoiceItemMutation()
  
  const { data, loading, refetch: refetchReturnInvoice } = useReturnInvoiceQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: {
      id: Number(returnInvoiceId)
    },
    skip: !Number(returnInvoiceId)
  })
  
  const returnInvoice = useMemo(() => !data || !data.returnInvoice ? {} as TReturnInvoice : data.returnInvoice as TReturnInvoice ,[data])

  const updateReturnInvoice = (data: any): Promise<any> => {
    return mutationUpdateReturnInvoice({
      variables: {
        id: Number(returnInvoiceId),
        data: data
      }
    }).then(() => {
      refetchReturnInvoice().then()
    })
      .catch(e => {
        processErrorGraphQL(e, {})
      })
  }

  const invoiceAddItem = (item: TInvoiceItem) => {
    mutationInsertUpdateInvoiceItem({
      variables: {
        id: 0,
        additionalData: {
          returnInvoiceId: Number(returnInvoiceId)
        },
        data: {
          ...item as any
        }
      }
    })
      .then(() => {
        refetchReturnInvoice().then()
      })
      .catch(e => {
        processErrorGraphQL(e, {})
      })
  }

  const invoiceUpdateItem = (value: number | string, field: string, model: any) => {
    mutationInsertUpdateInvoiceItem({
      variables: {
        id: Number(model.id),
        additionalData: {
          returnInvoiceId: Number(returnInvoiceId)
        },
        data: {
          itemId: Number(model.item.id),
          [field]: toNumberFixed(value)
        }
      }
    })
      .then(() => {
        refetchReturnInvoice().then()
      })
      .catch(e => {
        processErrorGraphQL(e, {})
      })
  }

  const invoiceDeleteItem = (id: string) => {
    mutationDeleteInvoiceItem({
      variables: {
        id: Number(id),
        additionalData: {
          returnInvoiceId: Number(returnInvoiceId)
        },
      }
    })
      .then(() => {
        refetchReturnInvoice().then()
      })
      .catch(e => {
        processErrorGraphQL(e, {})
      })
  }
  
  const saveReturnInvoice = () => {
    return  mutationUpdateReturnInvoice({
      variables: {
        id: Number(returnInvoiceId),
        data: {
          status: CONSTANT_INVOICE.STATUS.SAVED
        }
      }
    })
  }
  
  return {
    returnInvoice,
    returnInvoiceLoading: loading,
    invoiceAddItem,
    invoiceDeleteItem,
    invoiceUpdateItem,
    saveReturnInvoice,
    updateReturnInvoice
  }
}

export const useReturnInvoice = () => {
  const dispatch = useDispatch()
  const { returnInvoice } = useSelector( ( state : IReduxStore ) => state.returnInvoice )

  const setSelectedCustomer = useCallback( ( customer : TCustomer ) => {
    dispatch( setFieldReturnInvoiceDashboard( 'customer', customer ) )
  }, [dispatch] )

  const setDateFrom = useCallback( ( dateFrom : string | Date ) => {
    dispatch( setFieldReturnInvoiceDashboard( 'dateFrom', dateFrom ) )
  }, [dispatch] )

  const setDateTo = useCallback( ( dateTo : string | Date ) => {
    dispatch( setFieldReturnInvoiceDashboard( 'dateTo', dateTo ) )
  }, [dispatch] )

  const setStatus = useCallback( ( status : string ) => {
    dispatch( setFieldReturnInvoiceDashboard( 'status', status ) )
  }, [dispatch] )

  return {
    returnInvoice,
    setSelectedCustomer,
    setDateFrom,
    setDateTo,
    setStatus
  }
}

export const useReturnInvoiceTabs = () => {
  const dispatch = useDispatch()
  const { returnInvoiceTabs, activeTab } = useSelector( ( state : IReduxStore ) => state.returnInvoice )

  const addTab = useCallback( ( id : string ) => {
    dispatch( addReturnInvoiceTab( id ) )
  }, [dispatch] )

  const removeTab = useCallback( ( id : string ) => {
    dispatch( removeReturnInvoiceTab( id ) )
  }, [dispatch] )

  return {
    data : returnInvoiceTabs,
    addTab,
    removeTab,
    activeTab
  }
}

