import React              from 'react'
import CardTabItem        from './CardTabItem'
import {ITabsHeaderProps} from '../TabsHeader'

export interface ICardTabsHeaderProps extends ITabsHeaderProps {
  card ?: boolean
}

const CardTabsHeader = ({tabs, state} : ICardTabsHeaderProps) => {
  const style : any = {
    width: 120
  }
  return (
    <>
      {
        tabs.length !== 0 ?
          ( <div className={'d-flex flex-row align-items-center relative border-bottom w-100 hw-card-tabs-header'}>
            {
              tabs.map((tab, index) => {
                style.left = Number(tab.id) === 1 ? 0 : index * 130
                return (
                  <CardTabItem
                            key={index}
                            active={Number(tab.id) === state}
                            tabName={tab.tabName}
                            tabIcon={tab.tabIcon}
                            index={index}
                            notRemovable={index === 0}
                            id={tab.id}
                  />
                )
              })                    
            }
            <span style={style} className={'hw-tab-indicator'}></span>
          </div> )
          : <></>
      }
    </>
  )
}

export default CardTabsHeader
