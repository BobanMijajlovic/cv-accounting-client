import {useCallback}                        from 'react'
import {
  useDispatch,
  useSelector
}                                           from 'react-redux'
import {IReduxStore}                        from '../index'
import {TWarehouse}                         from '../../graphql/type_logic/types'
import {setFieldWarehouseTransferDashboard} from './action'

export const useWarehouseTransfer = () => {
  const dispatch = useDispatch()
  const { transfer } = useSelector((state : IReduxStore) => state.warehouseTransfer)

  const  setToWarehouse = useCallback((warehouse : TWarehouse) => {
    dispatch(setFieldWarehouseTransferDashboard('toWarehouse', warehouse))
  }, [dispatch])

  const setFromDate = useCallback((dateFrom : string | Date) => {
    dispatch(setFieldWarehouseTransferDashboard('dateFrom', dateFrom))
  }, [dispatch])

  const setToDate = useCallback((dateTo : string | Date) => {
    dispatch(setFieldWarehouseTransferDashboard('dateTo', dateTo))
  }, [dispatch])

  const setStatus = useCallback((status : string) => {
    dispatch(setFieldWarehouseTransferDashboard('status', status))
  }, [dispatch])

  return {
    transfer,
    setToWarehouse,
    setFromDate,
    setToDate,
    setStatus
  }
}