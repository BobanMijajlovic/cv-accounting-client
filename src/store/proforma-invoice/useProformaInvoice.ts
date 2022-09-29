import {
  useDispatch,
  useSelector
}                           from 'react-redux'
import {IReduxStore}        from '../index'
import React, {useCallback} from 'react'
import {
  addProformaInvoiceTab,
  removeProformaInvoiceTab,
  setFieldProformaInvoiceDashboard
}                           from '../proforma-invoice/action'
import {
  TCustomer,
  TInvoiceItem,
  TInvoiceItemDiscount,
  TProformaInvoice
}                           from '../../graphql/type_logic/types'
import {
  useCloneProformaInvoiceMutation,
  useDeleteInvoiceItemMutation,
  useGenerateInvoiceMutation,
  useInsertUpdateInvoiceItemMutation,
  useProformaInvoiceQuery,
  useUpdateProformaInvoiceMutation
} from '../../graphql/graphql'
import {toNumberFixed}      from '../../application/utils/Utils'
import {processError}       from '../../graphql/utils'
import {easyDialogError}    from '../../components/EasyModel/EasyModal'
import {
  CONSTANT_INVOICE,
  CONSTANT_PROFORMA_INVOICE
}                           from '../../application/constants'

export const useProformaInvoiceForm = (proformaInvoiceId : string, init ?: boolean) => {
  const [mutationUpdateInvoice] = useUpdateProformaInvoiceMutation()
  const [mutationInsertUpdateInvoiceItem] = useInsertUpdateInvoiceItemMutation()
  const [mutationDeleteInvoiceItem] = useDeleteInvoiceItemMutation()
  const [mutationCloneProformaInvoice] = useCloneProformaInvoiceMutation()
  const [mutationGenerateInvoice] = useGenerateInvoiceMutation()
  const {data, loading, refetch: refetchInvoice} = useProformaInvoiceQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: {
      id: Number(proformaInvoiceId)
    },
    skip: !init && !proformaInvoiceId
  })
  const proformaInvoice = React.useMemo(() => !data || !data.proformaInvoice ? {} as TProformaInvoice : data.proformaInvoice as TProformaInvoice, [data])

  const updateProformaInvoice = async (data : any) => {
    await mutationUpdateInvoice({
      variables: {
        id: Number(proformaInvoiceId),
        data: data
      }
    })
    refetchInvoice().then()
  }

  const proformaInvoiceAddItem = async (item : TInvoiceItem) => {
    await mutationInsertUpdateInvoiceItem({
      variables: {
        id: 0,
        additionalData: {
          proformaInvoiceId: Number(proformaInvoiceId)
        },
        data: {
          ...item as any
        }
      }
    })
    await refetchInvoice().then()
  }

  const proformaInvoiceUpdateItem = async (value : number | string, field : string, model : any) => {
    await mutationInsertUpdateInvoiceItem({
      variables: {
        id: Number(model.id),
        additionalData: {
          proformaInvoiceId: Number(proformaInvoiceId)
        },
        data: {
          itemId: Number(model.item.id),
          [field]: toNumberFixed(value)
        }
      }
    })
    await refetchInvoice().then()
  }

  const proformaInvoiceItemUpdateDiscount = async (value : TInvoiceItemDiscount, field : string, model : any, useDiscountDefault ?: boolean) => {
    mutationInsertUpdateInvoiceItem({
      variables: {
        id: Number(model.id),
        additionalData: {
          proformaInvoiceId: Number(proformaInvoiceId)
        },
        data: {
          itemId: Number(model.item.id),
          useDiscountDefault: Number(useDiscountDefault),
          [field]: value
        }
      }
    }).catch((e) => {
      const s = processError(e, {} as any)
      if (s) {
        easyDialogError(s)
      }
    })
    await refetchInvoice().then()
  }

  const saveProformaInvoice = async () => {
    await updateProformaInvoice({
      status: CONSTANT_PROFORMA_INVOICE.STATUS.SAVED
    })

  }

  const editProformaInvoice =  () => {
    return mutationCloneProformaInvoice({
      variables: {
        id: Number(proformaInvoiceId)
      }
    })
  }

  const finishProformaInvoice = async () => {
    return mutationGenerateInvoice({
      variables: {
        id: Number(proformaInvoiceId)
      }
    })
  }

  const cancelProformaInvoice = async () => {
    await updateProformaInvoice({
      status: CONSTANT_INVOICE.STATUS.CANCELED
    })
  }

  const proformaInvoiceDeleteItem = async (id : string) => {
    await mutationDeleteInvoiceItem({
      variables: {
        id: Number(id),
        additionalData: {
          proformaInvoiceId: Number(proformaInvoiceId)
        },
      }
    })
    await refetchInvoice().then()
  }

  return {
    proformaInvoice,
    invoiceLoading: loading,
    finishProformaInvoice,
    updateProformaInvoice,
    proformaInvoiceAddItem,
    proformaInvoiceDeleteItem,
    proformaInvoiceUpdateItem,
    proformaInvoiceItemUpdateDiscount,
    saveProformaInvoice,
    cancelProformaInvoice,
    editProformaInvoice
  }
}

export const useProformaInvoice = () => {
  const dispatch = useDispatch()
  const {proformaInvoice} = useSelector((state : IReduxStore) => state.proformaInvoice)

  const setSelectedCustomer = useCallback((customer : TCustomer) => {
    dispatch(setFieldProformaInvoiceDashboard('customer', customer))
  }, [dispatch])

  const setDateFrom = useCallback((dateFrom : string | Date) => {
    dispatch(setFieldProformaInvoiceDashboard('dateFrom', dateFrom))
  }, [dispatch])

  const setDateTo = useCallback((dateTo : string | Date) => {
    dispatch(setFieldProformaInvoiceDashboard('dateTo', dateTo))
  }, [dispatch])

  return {
    proformaInvoice,
    setSelectedCustomer,
    setDateFrom,
    setDateTo
  }
}

export const useProformaInvoiceTabs = () => {
  const dispatch = useDispatch()
  const {proformaInvoiceTabs, activeTab} = useSelector((state : IReduxStore) => state.proformaInvoice)

  const addTab = useCallback((id : string) => {
    dispatch(addProformaInvoiceTab(id))
  }, [dispatch])

  const removeTab = useCallback((id : string) => {
    dispatch(removeProformaInvoiceTab(id))
  }, [dispatch])

  return {
    data:proformaInvoiceTabs,
    addTab,
    removeTab,
    activeTab,
  }
}