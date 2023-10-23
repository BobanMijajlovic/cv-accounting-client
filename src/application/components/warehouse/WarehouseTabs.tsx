import React                  from 'react'
import Tabs, {ITabDefinition} from '../../../components/Tabs/Tabs'
import WarehouseDashboard     from './WarehouseDashboard'
import {useWarehouseTabs}     from '../../../store/warehouse/useWarehouse'
import TabsMenuWarehouse      from '../../../components/Tabs/TabsMenuWarehouse'

const WarehouseTabs = () => {

  const {warehouses, removeWarehouse} = useWarehouseTabs()

  const tabs : ITabDefinition[] = React.useMemo(() => {
    return warehouses.map(w => {
      return {
        tabName: !w.warehouse ? '' : (w.warehouse.name as string).length < 15 ? w.warehouse.name : w.warehouse.name?.substring(0, 15),
        closeIcon: true,
        tabContent: WarehouseDashboard,
        tabContentProps: {
          warehouseId: w.warehouseId
        }
      } as ITabDefinition
    })
  }, [warehouses])

  const closeAction = React.useCallback((index : number) => {
    if (warehouses.length < 2) {
      return
    }
    const data = tabs[index]
    removeWarehouse(data.tabContentProps.warehouseId)
  }, [warehouses, removeWarehouse, tabs])

  return (
    <>
      <Tabs
              tabs={tabs}
              stateTab={{active: 0}}
              closeAction={closeAction}
              TabsControl={TabsMenuWarehouse}
      />
    </>
  )
}
export default WarehouseTabs
