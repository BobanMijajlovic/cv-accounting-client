import React, {useState} from 'react'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                        from '../../hooks/useOptimizeEventClick'
import {ITabsProps}      from '../Tabs'
import {TABS_ACTIONS}    from '../TabsHeader'
import TabsContent       from '../TabsContent'
import CardTabsHeader    from './CardTabsHeader'

export interface ICardTabsProps extends ITabsProps {
  onChange ?: (id : string) => void
  onCloseTab ?: (id : string) => void
}

const CardTabs = ({tabs, stateTab, scrollable, onChange, onCloseTab} : ICardTabsProps) => {

  const [state, setState] : [number, (r : number) => void] = useState(stateTab.active)

  const {onClickHandler} = useOptimizeEventClick({
    eventHandler (data : IUseOptimizeEventData) {
      if (data.action === TABS_ACTIONS.TABS_ACTION_CHANGE_TAB) {
        setState(+(data.id as string))
        onChange && onChange(data.id as string)
        return
      }

      if (data.action === TABS_ACTIONS.TABS_ACTION_CLOSE_TAB) {
        onCloseTab && onCloseTab(data.id as string)
        return
      }
    }
  })

  return (
    <div className={'d-flex flex-column align-items-center w-100 hw-tabs-root'}>
      <div className={'d-flex px-2 pb-2 w-100'} onClick={onClickHandler} data-action-root>
        <CardTabsHeader tabs={tabs} state={state}/>
      </div>
      <div className={'w-100 tab-content overflow-overlay'}>
        <TabsContent tabs={tabs} state={state}/>
      </div>
    </div>
  )
}

CardTabs.defaulProps = {
  card: true
}

export default CardTabs