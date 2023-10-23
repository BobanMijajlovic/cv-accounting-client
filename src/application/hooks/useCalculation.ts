import {
  useCalculationQuery,
  useDeleteCalculationItemMutation,
  useInsertUpdateCalculationItemMutation,
  useUpdateCalculationMutation
}                             from '../../graphql/graphql'
import {
  TCalculationItem,
  TCustomer,
  TWarehouse
}                             from '../../graphql/type_logic/types'
import React, {useCallback}   from 'react'
import {
  useDispatch,
  useSelector
}                             from 'react-redux'
import {IReduxStore}          from '../../store'
import {
  addCalculationTab,
  removeCalculationTab,
  setActiveTabAction,
  setFieldCalculationDashboard
}                             from '../../store/calculation/action'
import {CONSTANT_CALCULATION} from '../constants'
import {toNumberFixed}        from '../utils/Utils'
import {processErrorGraphQL}  from '../../apollo'

export const useCalculationForm = (calculationId : string, init ?: boolean) => {
  const [mutationUpdateCalculation] = useUpdateCalculationMutation()
  const [mutationDeleteCalculationItem] = useDeleteCalculationItemMutation()
  const [mutationInsertUpdateCalculationItem] = useInsertUpdateCalculationItemMutation()

  const {data, loading, refetch: refetchCaclculation} = useCalculationQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: {
      id: Number(calculationId)
    },
    skip: !calculationId || !init
  })
  const calculation = React.useMemo(() => !data || !data.calculation ? {} : data.calculation, [data])

  const updateCalculation = (data : any) => {
    mutationUpdateCalculation({
      variables: {
        id: Number(calculationId),
        data: data
      }
    })
      .then(() => {
        refetchCaclculation().then()
      })
      .catch(e => {
        processErrorGraphQL(e)
      })
    
  }
  const calculationSetSupplier = async (customer : TCustomer) => {
    if (!calculationId) {
      return
    }
    await updateCalculation({
      supplier: Number(customer.id)
    })
  }

  const calculationSetWarehouse = async (warehouse : TWarehouse) => {
    if (!calculationId) {
      return
    }
    await updateCalculation({
      warehouseId: Number(warehouse.id)
    })

  }

  const calculationAddItem = async (item : TCalculationItem) => {
    await mutationInsertUpdateCalculationItem({
      variables: {
        id: 0,
        calcId: Number(calculationId),
        data: {
          ...item as any
        }
      }
    })
    await refetchCaclculation()
  }

  const calculationItemUpdate =  (value : number | string, field : string, model : any) => {
    mutationInsertUpdateCalculationItem({
      variables: {
        id: Number(model.id),
        calcId: Number(calculationId),
        data: {
          posNumber: Number(model.posNumber),
          itemId: Number(model.item.id),
          [field]: toNumberFixed(value)
        }
      }
    })
      .then()
      .catch(e => {
        processErrorGraphQL(e)
      })
    refetchCaclculation().then()
  }

  const calculationItemDelete =  (id : string) => {
    if (!id) {
      return
    }
    mutationDeleteCalculationItem({
      variables: {
        id: Number(id),
        calcId: Number(calculationId)
      }
    })
      .then()
      .catch(e => {
        processErrorGraphQL(e)
      })
    refetchCaclculation().then()
  }

  const changeItemFormSettings = async (type : number) => {
    if (!type) {
      return
    }
    await updateCalculation({
      itemInputType: type
    })
  }

  const bookCalculation = async () => {
    await  mutationUpdateCalculation({
      variables: {
        id: Number(calculationId),
        data:{
          status: CONSTANT_CALCULATION.STATUS.BOOKED
        }
      }
    })
      .then()
      .catch(e => {
        processErrorGraphQL(e)
      })
  }

  const saveCalculation = async () => {
    await updateCalculation({
      status: CONSTANT_CALCULATION.STATUS.SAVED
    })
  }

  const editCalculation = async () => {
    await updateCalculation({
      status: CONSTANT_CALCULATION.STATUS.OPENED
    })
  }

  const validCalculation = async () => {
    await updateCalculation({
      status: CONSTANT_CALCULATION.STATUS.VALIDATE
    })
  }

  const recalculateCalculation = async () => {
    await updateCalculation({
      status: CONSTANT_CALCULATION.STATUS.RECALCULATE
    })
  }

  return {
    calculation,
    calculationLoading: loading,
    calculationSetSupplier,
    calculationSetWarehouse,
    calculationAddItem,
    calculationItemDelete,
    calculationItemUpdate,
    changeItemFormSettings,
    bookCalculation,
    validCalculation,
    saveCalculation,
    editCalculation,
    recalculateCalculation,
    refetchCaclculation
  }
}

export const useCalculation = () => {
  const dispatch = useDispatch()
  const {calculation} = useSelector((state : IReduxStore) => state.calculation)

  const setSelectedCustomer = useCallback((customer : TCustomer) => {
    dispatch(setFieldCalculationDashboard('supplier', customer))
  }, [dispatch])

  const setDateFrom = (dateFrom : string | Date) => {
    dispatch(setFieldCalculationDashboard('dateFrom', dateFrom))
  }

  const setDateTo = (dateTo : string | Date) => {
    dispatch(setFieldCalculationDashboard('dateTo', dateTo))
  }

  const setStatus = (status : string) => {
    dispatch(setFieldCalculationDashboard('status', status))
  }

  return {
    calculation,
    setSelectedCustomer,
    setDateFrom,
    setDateTo,
    setStatus
  }
}

export const useCalculationTabs = () => {
  const dispatch = useDispatch()
  const {calculationTabs, activeTab} = useSelector((state : IReduxStore) => state.calculation)

  const addTab = useCallback((id : string) => {
    dispatch(addCalculationTab(id))
  }, [dispatch])

  const removeTab = useCallback((id : string) => {
    dispatch(removeCalculationTab(id))
  }, [dispatch])

  const setActiveTab = useCallback((id : number) => {
    dispatch(setActiveTabAction(id))
  }, [dispatch])

  return {
    data: calculationTabs,
    addTab,
    removeTab,
    setActiveTab,
    activeTab,
  }
}

