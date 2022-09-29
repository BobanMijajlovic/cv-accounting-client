import {
  useDispatch,
  useSelector
}                                          from 'react-redux'
import { IReduxStore }                     from '../index'
import { useCallback }                     from 'react'
import { TCustomer }                                from '../../graphql/type_logic/types'
import { setFieldFinanceTransferDocumentDashboard } from './action'

export const useFinanceTransferDocument = () => {
  const dispatch = useDispatch()
  const { financeTransferDocumentFilter } = useSelector( ( state : IReduxStore ) => state.financeTransferDocument )

  const setSelectedCustomer = useCallback( ( customer : TCustomer ) => {
    dispatch( setFieldFinanceTransferDocumentDashboard( 'customer', customer ) )
  }, [dispatch] )

  const setDateFrom = useCallback( ( dateFrom : string | Date ) => {
    dispatch( setFieldFinanceTransferDocumentDashboard( 'dateFrom', dateFrom ) )
  }, [dispatch] )

  const setDateTo = useCallback( ( dateTo : string | Date ) => {
    dispatch( setFieldFinanceTransferDocumentDashboard( 'dateTo', dateTo ) )
  }, [dispatch] )

  const setStatus = useCallback( ( status : string ) => {
    dispatch( setFieldFinanceTransferDocumentDashboard( 'status', status ) )
  }, [dispatch] )

  const setFlag = useCallback( ( flag : string ) => {
    dispatch( setFieldFinanceTransferDocumentDashboard( 'flag', flag ) )
  }, [dispatch] )

  return {
    financeTransferDocumentFilter : financeTransferDocumentFilter,
    setSelectedCustomer,
    setDateFrom,
    setDateTo,
    setStatus,
    setFlag
  }
}