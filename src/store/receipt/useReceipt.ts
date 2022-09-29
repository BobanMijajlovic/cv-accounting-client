import {
  useDispatch,
  useSelector
}                          from 'react-redux'
import { IReduxStore }     from '../index'
import {
  useCallback,
  useEffect
}                          from 'react'
import {
  addItem,
  addPayment,
  clearReceipt,
  removeItem,
  removePayment,
  setFieldReceiptItem
}                          from './action'
import {
  IReceiptItem,
  IReceiptPayment
}                          from './type'
import ApolloAsyncCall     from '../../graphql/ApolloAsyncCallClass'
import {
  guid,
  toNumberFixed
}                          from '../../application/utils/Utils'
import { easyDialogError } from '../../components/EasyModel/EasyModal'
import {
  LocalStorage,
  STORAGE_CURRENT_RECEIPT
}                          from '../../application/utils/LocalStorage'

export const _getCurrentReceipt = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const receipt = LocalStorage.getData(STORAGE_CURRENT_RECEIPT)
    if (!receipt) {
      return
    }
    receipt.items.map((x : any) => dispatch((addItem(x))))
    receipt.payments.map((x : any) => dispatch((addPayment(x))))
  }, [dispatch])
}

export const useReceipt = () => {
  const dispatch = useDispatch()
  const {items, payments} = useSelector((state : IReduxStore) => state.receipt)

  useEffect(() => {
    LocalStorage.saveData({
      items,
      payments
    }, STORAGE_CURRENT_RECEIPT)
  }, [items, payments])

  const receiptAddItemById = useCallback(async (id : string,quantity : number = 1) => {
    const data : any = await ApolloAsyncCall.getItemById(id)
    if (data?.id) {
      const _data = {
        id: guid(),
        item: data,
        quantity: toNumberFixed(quantity),
        price: data.mp
      } as IReceiptItem
      dispatch(addItem(_data))
    } else {
      easyDialogError('Item not found in system.')
    }
  }, [dispatch])

  const receiptAddItem = useCallback(async (value : string, quantity : string) => {
    value = value.trim()
    const data : any = await ApolloAsyncCall.findItemForSale(value)
    if (data && data.length !== 0) {
      const _data = {
        id: guid(),
        item: data[0],
        quantity: toNumberFixed(quantity),
        price: data[0].mp
      } as IReceiptItem
      dispatch(addItem(_data))
    } else {
      easyDialogError(`Item with barcode or code ${value} not exists in system.`)
    }
  }, [dispatch])

  const receiptRemoveItem = useCallback((id : string) => {
    dispatch(removeItem(id))
  }, [dispatch])

  const receiptEditItem = useCallback((id : string, field : string, value : any) => {
    dispatch(setFieldReceiptItem(id, field, value))
  }, [dispatch])

  const receiptRemovePayment = useCallback((type : number) => {
    dispatch(removePayment(type))
  }, [dispatch])

  const receiptAddPayment = useCallback((payment : IReceiptPayment) => {
    dispatch(addPayment(payment))
  }, [dispatch])

  const receiptClear = useCallback(() => {
    dispatch(clearReceipt())
  }, [dispatch])

  return {
    receipt: {
      items,
      payments
    },
    receiptAddItemById,
    receiptAddItem,
    receiptRemoveItem,
    receiptAddPayment,
    receiptRemovePayment,
    receiptEditItem,
    receiptClear
  }
}
