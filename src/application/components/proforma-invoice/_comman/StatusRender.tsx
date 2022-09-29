import React, { useMemo }            from 'react'
import { CONSTANT_PROFORMA_INVOICE } from '../../../constants'
import {
  faBan,
  faCheckDouble,
  faFileAlt,
  faFolderOpen
}                                    from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon }           from '@fortawesome/react-fontawesome'
import { get as _get }               from 'lodash'

const StatusRender = ( { value, model, index } : { value : number, model : any, index : number } ) => {
  const { OPENED, SAVED, CANCELED } = CONSTANT_PROFORMA_INVOICE.STATUS
  const isFinished = useMemo( () => _get( model, 'invoice.id' ), [model] )

  let icon : any
  let color : string = ''
  switch ( value ) {
    case OPENED:
      icon = faFolderOpen
      color = 'color-danger'
      break
    case CANCELED:
      icon = faBan
      color = 'color-gray'
      break
    case SAVED:
      icon = faFileAlt
      color = 'color-primary'
      break
  }
  if ( isFinished ) {
    icon = faCheckDouble
    color = 'color-success'
  }
  return (
    <div className={ 'text-center' }>
      <FontAwesomeIcon icon={ icon } className={ color }/>
    </div>
  )
}
export default StatusRender