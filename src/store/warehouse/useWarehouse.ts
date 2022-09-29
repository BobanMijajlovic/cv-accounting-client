import React, {
  useCallback,
  useEffect
}                      from 'react'
import {
  TCustomer,
  TWarehouse,
  TWarehouseItemInfo
}                      from '../../graphql/type_logic/types'
import {
  useUpdateWarehouseMutation,
  useWarehouseItemInfoQuery,
  useWarehouseQuery
} from '../../graphql/graphql'
import {
  useDispatch,
  useSelector
}                      from 'react-redux'
import {
  addWarehouseTabToArray,
  removeWarehouseFromArray,
  setFieldWarehouseDashboard
}                      from './action'
import { IReduxStore } from '../index'
import { get as _get } from 'lodash'
import ApolloAsyncCall from '../../graphql/ApolloAsyncCallClass'

export const useWarehouse = (warehouseId : string, init ?: boolean) => {

  const dispatch = useDispatch()
  const [mutationUpdateWarehouse] = useUpdateWarehouseMutation()

  const {warehouses} = useSelector((state : IReduxStore) => state.warehouse)

  const data = React.useMemo(() => {
    return warehouses.find(x => x.warehouseId === warehouseId)
  }, [warehouses, warehouseId])

  const selectedItemId = React.useMemo(() => {
    return _get(data, 'selectedItemId')
  }, [data])

  useWarehouseItemInfoQuery({
    onCompleted: (data) => {
      data && data.warehouseItemInfo && setSelectedItem(data.warehouseItemInfo as any)
    },
    variables: {
      id: Number(selectedItemId)
    },
    skip: !init || !selectedItemId
  })

  const {refetch: refetchWarehouse} = useWarehouseQuery({
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      data && data.warehouse && setWarehouse(data.warehouse)
    },
    variables: {
      id: Number(warehouseId)
    },
    skip: !init
  })
  
  const updateWarehouseData = (warehouse: TWarehouse) => {
    mutationUpdateWarehouse({
      variables: {
        id: Number(warehouseId),
        data: warehouse
      }
    }).then(v => {
      refetchWarehouse().then(w => w && w.data && w.data.warehouse && setWarehouse(w.data.warehouse))
    })
  }

  const setWarehouse = useCallback((warehouse : TWarehouse) => {
    dispatch(setFieldWarehouseDashboard(warehouseId as string, 'warehouse', warehouse))
  }, [dispatch, warehouseId])

  const setSelectedItem = useCallback((item : TWarehouseItemInfo) => {
    dispatch(setFieldWarehouseDashboard(warehouseId as string, 'item', item))
  },[dispatch])

  const setSelectedCustomer = useCallback((customer : TCustomer) => {
    dispatch(setFieldWarehouseDashboard(warehouseId as string, 'customer', customer))
  }, [dispatch, warehouseId])

  const setDateFrom = (dateFrom : string | Date) => {
    dispatch(setFieldWarehouseDashboard(warehouseId as string, 'dateFrom', dateFrom))
  }

  const setDateTo = (dateTo : string | Date) => {
    dispatch(setFieldWarehouseDashboard(warehouseId as string, 'dateTo', dateTo))
  }

  const setSelectedItemId = useCallback((itemId : string) => {
    dispatch(setFieldWarehouseDashboard(warehouseId as string, 'selectedItemId', itemId))
  }, [dispatch, warehouseId])

  const setFinanceDateTo = useCallback((dateTo : string | Date) => {
    dispatch(setFieldWarehouseDashboard(warehouseId as string, 'financeDateTo', dateTo))
  }, [dispatch, warehouseId])

  const setFinanceDateFrom = useCallback((dateTo : string | Date) => {
    dispatch(setFieldWarehouseDashboard(warehouseId as string, 'financeDateFrom', dateTo))
  }, [dispatch, warehouseId])

  return {
    data,
    setWarehouse,
    setSelectedItem,
    setSelectedCustomer,
    setDateFrom,
    setDateTo,
    setSelectedItemId,
    setFinanceDateTo,
    setFinanceDateFrom,
    updateWarehouseData
  }
}

export const useWarehouseTabs = () => {
  const dispatch = useDispatch()
  const {warehouses} = useSelector((state : IReduxStore) => state.warehouse)

  const addWarehouseTab = useCallback((id : string) => {
    dispatch(addWarehouseTabToArray(id))
    ApolloAsyncCall.warehouse(Number(id)).then((data) => {
      dispatch(setFieldWarehouseDashboard(id as string, 'warehouse', (data as any).data.warehouse))
    })
  }, [dispatch])

  const removeWarehouse = useCallback((id : string) => {
    dispatch(removeWarehouseFromArray(id))
  }, [dispatch])

  return {
    warehouses,
    addWarehouseTab,
    removeWarehouse
  }

}
