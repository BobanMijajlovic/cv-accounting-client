import {
  useDispatch,
  useSelector
}                                  from 'react-redux'
import { IReduxStore }             from '../index'
import {
  useCallback,
  useMemo
} from 'react'
import {
  addProductionOrderTab,
  removeProductionOrderTab,
  setFieldProductionOrderDashboard
}                              from './action'
import {
  TItem,
  TProductionOrder
}                              from '../../graphql/type_logic/types'
import {
  useDeleteProductionOrderItemMutation,
  useInsertProductionOrderItemMutation,
  useProductionOrderQuery,
  useUpdateProductionOrderItemMutation,
  useUpdateProductionOrderMutation
}                              from '../../graphql/graphql'
import { processErrorGraphQL } from '../../apollo'
import { toNumberFixed }       from '../../application/utils/Utils'
import {
  CONSTANT_INVOICE,
  CONSTANT_MODEL
} from '../../application/constants'

export const useProductionOrderForm = (productionOrderId : string) => {
  
  const [mutationUpdateProductionOrder] = useUpdateProductionOrderMutation()
  const [mutationInsertProductionItem] = useInsertProductionOrderItemMutation()
  const [mutationUpdateProductionItem] = useUpdateProductionOrderItemMutation()
  const [mutationDeleteProductionItem] = useDeleteProductionOrderItemMutation()
  
  const { data, loading, refetch: refetchProductionOrder} = useProductionOrderQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: {
      id: Number(productionOrderId)
    },
    skip: !Number(productionOrderId)
  })
  
  const productionOrder = useMemo(() => !data || !data.productionOrder ? {} as TProductionOrder : data.productionOrder, [data])
  
  const updateProductionOrder = (productionOrd: TProductionOrder) => {
    return mutationUpdateProductionOrder({
      variables: {
        id: Number(productionOrderId),
        data: productionOrd
      }
    })
      .then(() => {
        refetchProductionOrder().then()
      })
      .catch(e => {
        processErrorGraphQL(e,{})
      })
  }

  const insertProductionOrderItem = (data: any) => {
    return mutationInsertProductionItem({
      variables: {
        data: {
          ...data,
          productionOrderId: Number(productionOrderId)
        }
      }
    })
      .then(() => {
        refetchProductionOrder().then()
      })
      .catch(e => {
        processErrorGraphQL(e,{})
      })
    
  }

  const updateProductionItem  = (value: number | string, field: string, model: any) => {
    return mutationUpdateProductionItem({
      variables: {
        id: Number(model.id),
        data: {
          [field]: toNumberFixed(value)
        }
      }
    }).then(() => {
      refetchProductionOrder().then()
    })
      .catch(e => {
        processErrorGraphQL(e,{})
      })
  }
  
  const deleteProductionItem = (id: number) => {
    mutationDeleteProductionItem({
      variables: {
        id: Number(id),
      }
    })
      .then(() => {
        refetchProductionOrder().then()
      })
      .catch(e => {
        processErrorGraphQL(e, {})
      })
  }

  const finishProductionOrder = async () => {
    return mutationUpdateProductionOrder({
      variables: {
        id: Number(productionOrderId),
        data: {
          status: CONSTANT_MODEL.PRODUCTION_ORDER.FINISHED
        }
      }
    })
  }
  
  return {
    productionOrder,
    productionOrderLoading: loading,
    refetchProductionOrder,
    updateProductionOrder,
    insertProductionOrderItem,
    updateProductionItem,
    deleteProductionItem,
    finishProductionOrder
  }
  
}

export const useProductionOrder = () => {
  const dispatch = useDispatch()
  const { productionOrder } = useSelector((state: IReduxStore) => state.productionOrder)

  const setItem = useCallback((item: TItem) => {
    dispatch(setFieldProductionOrderDashboard('item', item))
  },[dispatch])
  
  const setDateFrom = useCallback((dateFrom: string | Date) => {
    dispatch(setFieldProductionOrderDashboard('dateFrom', dateFrom))
  }, [dispatch])

  const setDateTo = useCallback((dateTo: string | Date) => {
    dispatch(setFieldProductionOrderDashboard('dateTo', dateTo))
  }, [dispatch])

  const setStatus = useCallback((status: string) => {
    dispatch(setFieldProductionOrderDashboard('status', status))
  }, [dispatch])

  return {
    productionOrder,
    setItem,
    setDateFrom,
    setDateTo,
    setStatus
  }
}

export const useProductionOrderTabs = () => {
  const dispatch = useDispatch()
  const {  activeTab, productionOrderTabs } = useSelector((state: IReduxStore) => state.productionOrder)
    
  const addTab = useCallback((id: string) => {
    dispatch(addProductionOrderTab(id))
  },[dispatch])
    
  const removeTab =  useCallback((id: string) => {
    dispatch(removeProductionOrderTab(id))
  },[dispatch])
    
  return {
    data: productionOrderTabs,
    activeTab, 
    addTab,
    removeTab
  }

}