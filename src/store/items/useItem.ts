import {
  useDispatch,
  useSelector
}                                from 'react-redux'
import { IReduxStore }           from '../index'
import {
  useCallback,
  useMemo
}                                from 'react'
import {
  TItem,
  TItemSupplier
}                                from '../../graphql/type_logic/types'
import { setFieldItemDashboard } from './action'
import {
  useInsertItemMutation,
  useItemQuery,
  useUpdateItemMutation,
  useUpdateItemSupplierMutation,
  useWarehouseItemsQuery
} from '../../graphql/graphql'
import { processErrorGraphQL }   from '../../apollo'
import {
  get as _get,
  omit as _omit
}                                from 'lodash'

export const useItemDashboard = () => {
  const dispatch = useDispatch()
  const {selectedId,searchState} = useSelector((state:IReduxStore) => state.item)

  const [mutationInsertItem, {loading: insertLoading}] = useInsertItemMutation()
  const [mutationUpdateItem, {loading: updateLoading}] = useUpdateItemMutation()
  const [mutationUpdateItemSupplier] = useUpdateItemSupplierMutation()

  const {refetch: refetchSelectedItem, data} = useItemQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy:'cache-and-network',
    variables: {
      id: Number(selectedId)
    },
    skip: !selectedId
  })
  
  const selected = useMemo(() =>  data && data.item ? data.item : {} as any,[data])

  const setSelectedId = useCallback((id: string) => {
    dispatch(setFieldItemDashboard('selectedId',id))
  },[dispatch])
    
  const setSearchState = useCallback((value: string) => {
    dispatch(setFieldItemDashboard('searchState',value))
  },[dispatch])
  
  const updateItemSupplier = (id: string,data: TItemSupplier) => {
    mutationUpdateItemSupplier({
      variables: {
        id: Number(id),
        data: data
      }
    })
      .then(() => {
        refetchSelectedItem().then()
      })
      .catch(e => {
        processErrorGraphQL(e,{})
      })
  }
  
  const insertNewItem = (item: TItem, callback ?: () => void, errorFn ?: (e:any)=> void) => {
    mutationInsertItem({
      variables: {
        data: item
      }
    })
      .then((v) => {
        if (v && v.data && v.data.item) {
          setSelectedId(v.data.item.id)
          refetchSelectedItem().then()
          callback && callback()
        }
      })
      .catch(e => {
        errorFn ? errorFn(e) : processErrorGraphQL(e,{})
      })
  }
  
  const updateItem =  (item : TItem, callback ?: () => void, errorFn ?: (e:any)=> void) => {
    mutationUpdateItem({
      variables:{
        id:Number(_get(selected, 'id')),
        data:item
      }
    })
      .then(() => {
        refetchSelectedItem().then()
        callback && callback()
      })
      .catch(e => {
        errorFn ? errorFn(e) : processErrorGraphQL(e,{})
      })
  }
  
  const insertSupplierCode = (item: TItemSupplier) => {
    mutationUpdateItem({
      variables: {
        id:Number(_get(selected, 'id')),
        data: {
          itemSuppliers: [{
            ...item
          }]
        }
      }
    })
      .then(() => {
        refetchSelectedItem().then()
      })
      .catch(e => {
        processErrorGraphQL(e,{})
      })
  }
  
  const updateSupplierCode = async (item: TItemSupplier) => {
    await updateItemSupplier(`${item.id}`,_omit(item, ['id']))
  }
  
  const deleteSupplierCode = async (id: string, data: TItemSupplier) => {
    await updateItemSupplier(id,data)
  }
    
  return {
    loading: insertLoading || updateLoading,
    selected,
    selectedId,
    searchState,
    setSelectedId,
    setSearchState,
    insertNewItem,
    insertSupplierCode,
    updateItem,
    updateSupplierCode,
    deleteSupplierCode
  }
}