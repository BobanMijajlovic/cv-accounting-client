import React                  from 'react'
import {useActiveBackground}  from '../../../../../../store/active-background/useActiveBackground'
import {FontAwesomeIcon}      from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faCogs
}                             from '@fortawesome/free-solid-svg-icons'
import ConditionalRendering   from '../../../../../../components/Util/ConditionalRender'
import {faCircle}             from '@fortawesome/free-regular-svg-icons'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                             from '../../../../../../components/hooks/useOptimizeEventClick'
import {CONSTANT_CALCULATION} from '../../../../../constants'

interface IItemsFormSettingsProps {
  type : number
  changeType : (type : number) => void
}

const ItemsFormSettings = ({type,changeType} : IItemsFormSettingsProps) => {

  const {openCloseActiveBackground, isOpen, style} = useActiveBackground()

  const {ITEM_FORM_SETTINGS: itemFormSettings} = CONSTANT_CALCULATION.TYPES_SELECT

  const {onClickHandler} = useOptimizeEventClick({
    eventHandler (data : IUseOptimizeEventData) {
      switch (data.action) {
        case CONSTANT_CALCULATION.EVENTS.ITEMS.ACTION_CHANGE_ITEM_FORM_TYPE:
          (() => {
            const id = Number(data.id)
            changeType(id)
            openCloseActiveBackground(false)
          })()
          return
      }
    }
  })

  const options = React.useMemo(() => itemFormSettings.map(x => {
    return {
      ...x,
      selected: type === x.value
    }
  }),[type,itemFormSettings])

  return (
    <div className={'relative'} onClick={onClickHandler} style={style}>
      <div onClick={() => openCloseActiveBackground(!isOpen)} className={'cursor-pointer mx-2'}>
        <FontAwesomeIcon icon={faCogs}/>
      </div>
      <div
         className={'absolute-right-center box-shadow-opened gradient-white-normal text-shadow-white mr-1 no-wrap'}
         mouse-click-controlled-area={'settings-calculation-items-form'}

      >
        <ConditionalRendering condition={!!isOpen}>
          {
            options.map((x, index) => {
              return (
                <div key={x.value}
                                     data-action-id={x.value}
                                     data-action={CONSTANT_CALCULATION.EVENTS.ITEMS.ACTION_CHANGE_ITEM_FORM_TYPE}
                                     className={`z-index-1000 border-bottom d-flex justify-content-between gradient-white-normal cursor-pointer px-2 pt-1 align-items-center${x.selected ? ' opacity-5' : ''}`}>
                  <div className={'pr-2 font-smaller-4 pt-1'}>
                    {!x.selected ?
                      <FontAwesomeIcon icon={faCircle}/> :
                      <FontAwesomeIcon icon={faCheck}/>
                    }
                  </div>
                  <div>&nbsp;</div>
                  <div className={'font-smaller-5'}>{x.label}</div>
                </div>
              )
            })
          }
        </ConditionalRendering>
      </div>
    </div>
  )

}

export default ItemsFormSettings
