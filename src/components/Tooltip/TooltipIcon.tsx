import React, {useRef}   from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import {
  IToolTipProps,
  ToolTipOpen
}                 from './Tooltip'

interface ITooltipIconProps extends IToolTipProps {
  icon : IconProp
  classNames ?: string
}
const TooltipIcon = ({icon,classNames,...rest} : ITooltipIconProps) => {
    
  const rootRef = useRef()
    
  const handlerOpenTooltip = () => {
    ToolTipOpen({
      parent: rootRef.current,
      ...rest
    })
  }  
    
  return (
    <div className={'cursor-pointer relative'} ref={(ele) => rootRef.current = ele as any} >
      <FontAwesomeIcon icon={icon} className={`${classNames ? ` ${classNames}` : ''}`} onClick={handlerOpenTooltip}/>
    </div>
  )
}

export default TooltipIcon