import React               from 'react'
import { CONSTANT_MODEL }  from '../../../constants'
import {
  faBan,
  faCheckDouble,
  faFolderOpen,
  faHammer
}                          from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StatusRender = ({value} : { value : number }) => {
  const { OPENED, IN_PROGRESS, FINISHED, DELETED } = CONSTANT_MODEL.PRODUCTION_ORDER
  let icon : any
  let color : string = ''
  switch (value) {
    case OPENED:
      icon = faFolderOpen
      color = 'color-primary'
      break
    case IN_PROGRESS:
      icon = faHammer
      color = 'color-primary'
      break
    case FINISHED:
      icon = faCheckDouble
      color = 'color-success'
      break
    case DELETED:
      icon = faBan
      color = 'color-danger'
      break

  }
  return (
    <div className={'text-center'}>
      <FontAwesomeIcon icon={icon} className={color}/>
    </div>
  )
}
export default StatusRender
