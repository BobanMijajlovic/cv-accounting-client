import React                  from 'react'
import {CONSTANT_CALCULATION} from '../../../constants'
import {FontAwesomeIcon}      from '@fortawesome/react-fontawesome'
import {
  faBookOpen,

  faCheckDouble,
  faFolderOpen,
  faSave
} from '@fortawesome/free-solid-svg-icons'

const StatusRender = ({value} : { value : number }) => {
  const {OPENED,SAVED,BOOKED,VALIDATE} = CONSTANT_CALCULATION.STATUS
  let icon : any
  let color : string = ''
  switch (value) {
    case OPENED:
      icon = faFolderOpen
      color = 'color-danger'
      break
    case VALIDATE:
      icon = faCheckDouble
      color = 'color-success'
      break
    case SAVED:
      icon = faSave
      color = 'color-secondary'
      break
    case BOOKED:
      icon = faBookOpen
      color = 'color-primary'
      break
  }
  return (
    <div className={'text-center'}>
      <FontAwesomeIcon icon={icon} className={color}/>
    </div>
  )
}
export default StatusRender