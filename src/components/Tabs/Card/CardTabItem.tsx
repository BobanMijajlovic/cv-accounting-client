import React             from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {TABS_ACTIONS}    from '../TabsHeader'
import {ITabItemProps}   from '../TabItem'
import {faTimesCircle}   from '@fortawesome/free-solid-svg-icons'

export interface ICardTabItemProps extends ITabItemProps {
  notRemovable ?: boolean
  id ?: string
}

const CardTabItem = ({tabIcon, tabName, active, notRemovable, id} : ICardTabItemProps) => {

  const classRoot = React.useMemo(() => {
    return `d-flex flex-column justify-content-center align-items-center hw-card-tab-item-root${active ? ' active' : ''}`
  }, [active])

  return (
    <div className={classRoot}
             data-action={TABS_ACTIONS.TABS_ACTION_CHANGE_TAB}
             data-action-id={id}
    >
      {tabIcon ? <div><FontAwesomeIcon icon={tabIcon}/></div> : <></>}
      <div>{tabName}</div>
      {!notRemovable ?
        <FontAwesomeIcon
                    className={'remove-tab-icon'}
                    icon={faTimesCircle}
                    data-action={TABS_ACTIONS.TABS_ACTION_CLOSE_TAB}
                    data-action-id={id}
        /> : <></>}
    </div>
  )
}

export default CardTabItem