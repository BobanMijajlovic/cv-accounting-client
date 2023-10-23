import React             from 'react'
import Label             from '../basic/Label'
import {IconProp}        from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import EmptyTag          from './EmptyTag'

export interface IComponentRenderActionProps {
  label : string
  handler ?: (data : any) => void
  icon ?: IconProp
}

export interface IComponentRenderProps {
  label : any
  value ?: string | null
  model ?: any
  field ?: string
  placeholder ?: string
  format ?: any
  action ?: IComponentRenderActionProps
  labelClass ?: string
  'justify-content' ?: 'center' | 'start' | 'end' | 'between' | 'around'
  classNames ?: string
  maxLength ?: number
  handlerClick ?: (field?:string)=> void
  title ?: string
}

const ComponentRender = ({label, value, model, field, placeholder, action, labelClass, 'justify-content': justifyContent, format,classNames,maxLength,handlerClick,title, ...rest} : IComponentRenderProps) => {
  if (format) {
    if (value) {
      value = format(value)
    }
  }
  
  const onClick = () => {
    handlerClick && handlerClick('discountDefault')
  }
  
  return (
    <div className={`d-flex flex-column${classNames ? ` ${classNames}` : ''}`} title={title} onClick={onClick} {...rest}>
      <div className={'font-weight-bold'}><Label classNames={`d-flex font-smaller-6 opacity-4${justifyContent ? ` justify-content-${justifyContent}` : ' justify-content-center'}${labelClass ? ` ${labelClass}` : ''}`} label={label}/></div>
      <div className={`d-flex  align-items-center${justifyContent ? ` justify-content-${justifyContent}` : ' justify-content-center'}`}>
        {model && field ? <EmptyTag model={model} field={field} maxLength={maxLength} placeholder={placeholder}/> : value}
        {action && (
          <div className={'font-smaller-3 cursor-pointer ml-3'} >
            {action.icon ? <FontAwesomeIcon icon={action.icon} className={'mr-1'}/> : ''}
            {action.label}
          </div>
        )
        }
      </div>
    </div>
  )
}
/* ComponentRender.defaultProps = {
  'justify-content': 'start'
}*/

export default ComponentRender

