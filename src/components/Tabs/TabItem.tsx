import React                from 'react'
import {FontAwesomeIcon}    from '@fortawesome/react-fontawesome'
import {IconProp}           from '@fortawesome/fontawesome-svg-core'
import {TABS_ACTIONS}       from './TabsHeader'
import {faTimesCircle}      from '@fortawesome/free-regular-svg-icons'
import ConditionalRendering from '../Util/ConditionalRender'

export interface ITabItemProps {
  closeIcon ?: boolean
  tabIcon ?: IconProp
  tabName : string
  active ?: boolean
  index : number
}

const TabItem = ({tabIcon, tabName, active, index, closeIcon} : ITabItemProps) => {

  const classRoot = React.useMemo(() => {
    return `d-flex flex-column justify-content-center align-items-center hw-tab-item-root${active ? ' active' : ''}`
  }, [active])

  return (
    <div className={'relative'}>
      <ConditionalRendering condition={!!closeIcon}>
        <div className={'absolute opacity-7 p-2 font-smaller-2 button-effect'} style={{top: '-6px', zIndex: '12'} as any}
                     data-action={TABS_ACTIONS.TABS_ACTION_CLOSE_TAB}
                     data-action-id={index}
        >
          <FontAwesomeIcon icon={faTimesCircle}/>
        </div>
      </ConditionalRendering>
      <div className={classRoot}
                 data-action={TABS_ACTIONS.TABS_ACTION_CHANGE_TAB}
                 data-action-id={index}
                 style={{zIndex: '11'} as any}
      >
        {tabIcon ? <div><FontAwesomeIcon icon={tabIcon}/></div> : <></>}
        <div>{tabName}</div>
      </div>
    </div>
  )
}

export default TabItem
