import {FontAwesomeIcon}     from '@fortawesome/react-fontawesome'
import {
  faAlignJustify,
  faCheck
}                            from '@fortawesome/free-solid-svg-icons'
import React, {useEffect}    from 'react'
import {useWarehousesQuery}  from '../../graphql/graphql'
import {useWarehouseTabs}    from '../../store/warehouse/useWarehouse'
import {get as _get}         from 'lodash'
import {faCircle}            from '@fortawesome/free-regular-svg-icons'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                            from '../hooks/useOptimizeEventClick'
import ConditionalRendering  from '../Util/ConditionalRender'
import {useActiveBackground} from '../../store/active-background/useActiveBackground'

const ACTION_CLICK_OPEN_TAB_WAREHOUSE = 'open-tab-warehouse-894389843298439'
const ACTION_CLICK_CLOSE_TAB_WAREHOUSE = 'close-tab-warehouse-989899899'

const TabsMenuWarehouse = () => {

  const {data} = useWarehousesQuery()
  const {warehouses, addWarehouseTab, removeWarehouse} = useWarehouseTabs()

  const {openCloseActiveBackground, isOpen, style} = useActiveBackground()

  const options = React.useMemo(() => {
    if (!data || !_get(data, 'data.count', 0)) {
      return []
    }
    return data.data.items.map(x => {
      return {
        warehouseId: x.id,
        warehouse: x.name,
        selected: warehouses.findIndex(w => w.warehouseId === x.id) !== -1
      }
    })
  }, [data, warehouses])

  useEffect(() => {
    if (warehouses.length === 0 && _get(data, 'data.count', 0) > 0) {
      addWarehouseTab(_get(data, 'data.items[0].id'))
    }
  }, [warehouses, data, addWarehouseTab])

  const {onClickHandler} = useOptimizeEventClick({
    eventHandler (data : IUseOptimizeEventData) {
      switch (data.action) {
        case ACTION_CLICK_OPEN_TAB_WAREHOUSE:
          (() => {
            const warehouseId = options[Number(data.id)].warehouseId
            const index = warehouses.findIndex(x => x.warehouseId === warehouseId)
            if (index !== -1) {
              return
            }
            addWarehouseTab(warehouseId)
          })()
          return
        case ACTION_CLICK_CLOSE_TAB_WAREHOUSE:
          (() => {
            if (warehouses.length < 2) {
              return
            }
            const warehouseId = options[Number(data.id)].warehouseId
            removeWarehouse(warehouseId)
          })()
          return
      }
    }
  })

  return (
    <div className={'relative'} onClick={onClickHandler} style={style}>
      <div onClick={() => openCloseActiveBackground(!isOpen)} className={'cursor-pointer mx-2'}>
        <FontAwesomeIcon icon={faAlignJustify}/>
      </div>
      <div
                className={'absolute-left-center box-shadow-opened gradient-white-normal text-shadow-white mr-1 no-wrap'}
                mouse-click-controlled-area={'tabs-menu-warehouse'}

      >
        <ConditionalRendering condition={!!isOpen}>
          {
            options.map((x, index) => {
              return (
                <div key={x.warehouseId}
                                     data-action-id={index}
                                     data-action={!x.selected ? ACTION_CLICK_OPEN_TAB_WAREHOUSE : ACTION_CLICK_CLOSE_TAB_WAREHOUSE}
                                     className={`z-index-1000 border-bottom d-flex justify-content-between gradient-white-normal cursor-pointer px-2 pt-1 align-items-center${x.selected ? ' opacity-5' : ''}`}>
                  <div className={'pr-2 font-smaller-4 pt-1'}>
                    {!x.selected ?
                      <FontAwesomeIcon icon={faCircle}/> :
                      <FontAwesomeIcon icon={faCheck}/>
                    }
                  </div>
                  <div>&nbsp;</div>
                  <div className={'font-smaller-5'}>{x.warehouse}</div>
                </div>
              )
            })
          }
        </ConditionalRendering>
      </div>
    </div>
  )
}

export default TabsMenuWarehouse
