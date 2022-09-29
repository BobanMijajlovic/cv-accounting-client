import {
  useDispatch,
  useSelector
}                              from 'react-redux'
import { IReduxStore }         from '../index'
import React, { useCallback }  from 'react'
import {
  TCustomer,
  TInvoice,
  TInvoiceItem,
  TInvoiceItemDiscount
}                              from '../../graphql/type_logic/types'
import {
  addInvoiceTab,
  removeInvoiceTab,
  setFieldInvoiceDashboard
}                              from './action'
import {
  useDeleteInvoiceItemMutation,
  useInsertUpdateInvoiceItemMutation,
  useInvoiceQuery,
  useUpdateInvoiceMutation
}                              from '../../graphql/graphql'
import { CONSTANT_INVOICE }    from '../../application/constants'
import { toNumberFixed }       from '../../application/utils/Utils'
import { processErrorGraphQL } from '../../apollo'

export const useInvoiceForm = (invoiceId: string, init?: boolean) => {
  const [mutationUpdateInvoice] = useUpdateInvoiceMutation()
  const [mutationInsertUpdateInvoiceItem] = useInsertUpdateInvoiceItemMutation()
  const [mutationDeleteInvoiceItem] = useDeleteInvoiceItemMutation()
  const { data, loading, refetch: refetchInvoice } = useInvoiceQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: {
      id: Number(invoiceId)
    },
    skip: !Number(invoiceId)
  })

  const invoice = React.useMemo(() => !data || !data.invoice ? {} as TInvoice : data.invoice as TInvoice, [data])

  const updateInvoice = async (data: any) => {
    mutationUpdateInvoice({
      variables: {
        id: Number(invoiceId),
        data: data
      }
    }).then(() => {
      refetchInvoice().then()
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
          invoiceId: Number(invoiceId)
        },
        data: {
          ...item as any
        }
      }
    })
      .then(() => {
        refetchInvoice().then()
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
          invoiceId: Number(invoiceId)
        },
        data: {
          itemId: Number(model.item.id),
          [field]: toNumberFixed(value)
        }
      }
    })
      .then(() => {
        refetchInvoice().then()
      })
      .catch(e => {
        processErrorGraphQL(e, {})
      })
  }

  const invoiceItemUpdateDiscount = (value: TInvoiceItemDiscount, field: string, model: any, useDiscountDefault?: boolean) => {
    mutationInsertUpdateInvoiceItem({
      variables: {
        id: Number(model.id),
        additionalData: {
          invoiceId: Number(invoiceId)
        },
        data: {
          itemId: Number(model.item.id),
          useDiscountDefault: Number(useDiscountDefault),
          [field]: value
        }
      }
    })
      .then(() => {
        refetchInvoice().then()
      })
      .catch(e => {
        processErrorGraphQL(e, {})
      })
  }

  const saveInvoice = async () => {
    await mutationUpdateInvoice({
      variables: {
        id: Number(invoiceId),
        data: {
          status: CONSTANT_INVOICE.STATUS.SAVED
        }
      }
    })
  }

  const invoiceDeleteItem = (id: string) => {
    mutationDeleteInvoiceItem({
      variables: {
        id: Number(id),
        additionalData: {
          invoiceId: Number(invoiceId)
        },
      }
    })
      .then(() => {
        refetchInvoice().then()
      })
      .catch(e => {
        processErrorGraphQL(e, {})
      })
  }

  return {
    invoice,
    invoiceLoading: loading,
    refetchInvoice,
    updateInvoice,
    invoiceAddItem,
    invoiceDeleteItem,
    invoiceUpdateItem,
    invoiceItemUpdateDiscount,
    saveInvoice
  }
}

export const useInvoice = () => {
  const dispatch = useDispatch()
  const { invoice } = useSelector((state: IReduxStore) => state.invoice)

  const setSelectedCustomer = useCallback((customer: TCustomer) => {
    dispatch(setFieldInvoiceDashboard('customer', customer))
  }, [dispatch])

  const setDateFrom = useCallback((dateFrom: string | Date) => {
    dispatch(setFieldInvoiceDashboard('dateFrom', dateFrom))
  }, [dispatch])

  const setDateTo = useCallback((dateTo: string | Date) => {
    dispatch(setFieldInvoiceDashboard('dateTo', dateTo))
  }, [dispatch])

  const setStatus = useCallback((status: string) => {
    dispatch(setFieldInvoiceDashboard('status', status))
  }, [dispatch])

  return {
    invoice,
    setSelectedCustomer,
    setDateFrom,
    setDateTo,
    setStatus
  }
}

export const useInvoiceTabs = () => {
  const dispatch = useDispatch()
  const { invoiceTabs, activeTab } = useSelector((state: IReduxStore) => state.invoice)

  const addTab = useCallback((id: string) => {
    dispatch(addInvoiceTab(id))
  }, [dispatch])

  const removeTab = useCallback((id: string) => {
    dispatch(removeInvoiceTab(id))
  }, [dispatch])

  return {
    data: invoiceTabs,
    addTab,
    removeTab,
    activeTab,
  }
}

