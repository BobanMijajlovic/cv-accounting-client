import React                       from 'react'
import { TWarehouse }              from '../../../graphql/type_logic/types'
import { openDialogWarehouseForm } from './form/Warehouse'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                                  from '../../../components/hooks/useOptimizeEventClick'
import { CONSTANT_WAREHOUSE }      from '../../constants'
import { useWarehouse }            from '../../../store/warehouse/useWarehouse'
import WarehouseInfo               from './tabs/oneArticle/WarehouseInfo'
import SearchViewWarehouse         from './SearchViewWarehouse'
import WarehouseItemsDashboard     from './tabs/articles/Dashboard'
import WarehouseSummaryDashboard   from './tabs/warehouse/Dashboard'
import Tabs                        from '../../../components/Tabs/Tabs'
import WarehouseTransferDashboard  from './tabs/transfer/Dashboard'

const WarehouseItem = ({warehouseId}: { warehouseId: string }) => {

  const {setSelectedItemId, updateWarehouseData} = useWarehouse(warehouseId, true)

  const editWarehouse = () => {
    const submitFun = async (warehouse: TWarehouse) => {
      await updateWarehouseData(warehouse)
    }
    openDialogWarehouseForm({
      warehouseId:warehouseId,
      submitFun:submitFun
    })
  }

  const {onClickHandler} = useOptimizeEventClick({
    eventHandler (data: IUseOptimizeEventData) {
      if (data.action === CONSTANT_WAREHOUSE.EVENTS.SELECTED_ONE) {
        return
      }

      if (data.action === CONSTANT_WAREHOUSE.EVENTS.SELECT_ITEM) {
        data.id && setSelectedItemId(data.id)
        return
      }
      if (data.action === CONSTANT_WAREHOUSE.EVENTS.EDIT) {
        editWarehouse()
        return
      }
    }
  })

  return (
    <div className={'d-flex w-100'} onClick={onClickHandler} data-action-root>
      <SearchViewWarehouse warehouseId={warehouseId}/>
      <div className={'d-flex flex-2 justify-content-start '}>
        <div className={'d-flex flex-row w-100 h-100 pt-2 pl-4'}>
          <WarehouseInfo warehouseId={warehouseId}/>
        </div>
      </div>
    </div>
  )
}

const WarehouseDashboard = ({warehouseId}: { warehouseId: string }) => {

  const tabs = React.useMemo(() => [
    {
      tabName:'Item',
      tabContent:WarehouseItem,
      tabContentProps:{
        warehouseId:warehouseId
      }
    },
    {
      tabName:'Items',
      tabContent:WarehouseItemsDashboard,
      tabContentProps:{
        warehouseId:warehouseId
      }
    },
    {
      tabName:'Warehouse',
      tabContent:WarehouseSummaryDashboard,
      tabContentProps:{
        warehouseId:warehouseId
      }
    },
    {
      tabName:'Transfer',
      tabContent:WarehouseTransferDashboard,
      tabContentProps:{
        warehouseId:warehouseId
      }
    }
  ], [warehouseId])

  return (
    <div className={'d-flex  flex-wrap w-100'}>
      <Tabs tabs={tabs} stateTab={{active:0}} classNames={'warehouse'}/>
    </div>
  )
}

export default WarehouseDashboard
