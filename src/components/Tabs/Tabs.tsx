import React, {
  useEffect,
  useRef,
  useState
}                                   from 'react'
import { IconProp }                 from '@fortawesome/fontawesome-svg-core'
import TabsHeader, { TABS_ACTIONS } from './TabsHeader'
import TabsContent                  from './TabsContent'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                                   from '../hooks/useOptimizeEventClick'

export interface ITabDefinition {
  id?: string
  tabName: string,
  tabIcon?: IconProp
  closeIcon?: boolean,
  tabContent: any
  tabContentProps?: any
}

export interface IActiveTabTrigger {
  activeTab: number;
  triggerChange: number
}

export interface ITabState {
  active: number,
  onCloseTab?: (index: string)=> void
}

export interface ITabsProps {
  tabs: ITabDefinition[]
  stateTab: ITabState
  scrollable?: boolean
  closeAction?: (index: number)=> void,
  TabsControl?: React.ComponentType<any>
  classNames?: string,
  triggerChange?: number,
  vertical ?: boolean
}

const Tabs = ({ tabs, stateTab, TabsControl, closeAction, classNames, triggerChange, vertical }: ITabsProps) => {

  const [activeTab, setActiveTab]: [number, (r: number)=> void] = useState(stateTab.active)
  const refTab = useRef(null)

  useEffect(() => {
    if (!refTab || !refTab.current) {
      return
    }
    refTab && refTab.current && (refTab.current as any).focus()
  }, [refTab])

  const { active } = stateTab

  useEffect(() => {
    setActiveTab(active)
  }, [active, triggerChange])

  const { onClickHandler } = useOptimizeEventClick({
    eventHandler (data: IUseOptimizeEventData) {
      if (data.action === TABS_ACTIONS.TABS_ACTION_CHANGE_TAB) {
        setActiveTab(+(data.id as string))
        return
      }

      if (data.action === TABS_ACTIONS.TABS_ACTION_CLOSE_TAB) {
        closeAction && closeAction(Number(data.id))
      }
    }
  })

  useEffect(() => {
    if (tabs.length > 0 && activeTab >= tabs.length) {
      setActiveTab(tabs.length - 1)
    }
  }, [tabs, setActiveTab, activeTab])

  return (
    <div className={`d-flex flex-column align-items-center w-100 hw-tabs-root${vertical ? ' vertical' : ''}${classNames ? ` ${classNames}` : ''}`} ref={refTab}>
      <div className={'d-flex w-100 hw-tab-header-root'} onClick={onClickHandler} data-action-root>
        {TabsControl && <TabsControl/>}
        <TabsHeader tabs={tabs} state={activeTab}/>
      </div>

      <div className={'w-100 py-2 tab-content overflow-overlay d-flex flex-column flex-2'}>
        <TabsContent tabs={tabs} state={activeTab}/>
      </div>
    </div>
  )
}

export default Tabs

