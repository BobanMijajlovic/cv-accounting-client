import React, { useEffect } from 'react'
import { ITabDefinition }   from './Tabs'

export interface ITabsContentProps {
  tabs: ITabDefinition[]
  state: number
}

const TabsContent = ({ tabs, state }: ITabsContentProps) => {

  return (
    <>
      {tabs.map((x: any, index: number) => {
        const active = x.id ? Number(x.id) === state : index === state
        if (!active) {
          return <div key={index}></div>
        }
        const Component = x.tabContent
        return (
          <div className={`hw-tab-content-item flex-fill${active ? ' active' : ''}`} key={index}>
            <Component {...x.tabContentProps}/>
          </div>
        )
      })}
    </>
  )
}

export default TabsContent
