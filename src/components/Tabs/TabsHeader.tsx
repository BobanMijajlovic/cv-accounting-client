import React              from 'react'
import { ITabDefinition } from './Tabs'
import TabItem            from './TabItem'

export interface ITabsHeaderProps {
  tabs: ITabDefinition[]
  state: number
}

export enum TABS_ACTIONS {
  TABS_ACTION_CHANGE_TAB = 'tabs-change',
  TABS_ACTION_CLOSE_TAB = 'tab-close'
}

export interface ICardTabsHeaderProps extends ITabsHeaderProps {
  card?: boolean
}

const TabsHeader = ({ tabs, state }: ICardTabsHeaderProps) => {

  const style = {
    left: state * 160,
    width: 160
  }
  return (
    <div className={'d-flex flex-row align-items-center relative border-bottom w-100'}>
      {
        tabs.map((tab, index) => {
          return (
            <TabItem
              key={index}
              active={index === state}
              tabName={tab.tabName}
              tabIcon={tab.tabIcon}
              closeIcon={tab.closeIcon && tabs.length > 1}
              index={index}
            />
          )
        })
      }
      <span style={style} className={'hw-tab-indicator'}></span>
    </div>
  )
}

export default TabsHeader
