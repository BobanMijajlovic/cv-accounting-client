import React                       from 'react'
import WarehouseTabs               from './WarehouseTabs'
import WarehouseEmptyView          from './views/WarehouseEmptyView'
import {
  useInsertWarehouseMutation,
  useWarehousesQuery
}                                  from '../../../graphql/graphql'
import { TWarehouse }              from '../../../graphql/type_logic/types'
import { openDialogWarehouseForm } from './form/Warehouse'
import { SpinnerLoadingCenter }    from '../../../components/Spinner/SpinnerLoading'

const Warehouse = () => {
  const {data, loading, refetch} = useWarehousesQuery()
  const warehouses = React.useMemo(() => !data || !data.data || !data.data.items || data.data.items.length === 0 ? [] : data.data.items, [data])

  const [mutationInsertWarehouse] = useInsertWarehouseMutation()
  const addNewWarehouse = () => {
    const submitFun = async (warehouse: TWarehouse) => {
      await mutationInsertWarehouse({
        variables: {
          data: warehouse
        }
      })
      refetch().then()
    }
    openDialogWarehouseForm({submitFun})
  }

  if (loading) {
    return <SpinnerLoadingCenter/>
  }

  return (
    <>
      {warehouses && warehouses.length === 0 ?
        <div className={'d-flex justify-content-center align-items-center w-100 h-100'}>
          <WarehouseEmptyView addNew={addNewWarehouse}/>
        </div>
        :
        <div className={'d-flex align-items-center  p-3'}>
          <WarehouseTabs/>
        </div>
      }
    </>
  )
}
export default Warehouse
