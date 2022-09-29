import React                         from 'react'
import {FontAwesomeIcon}             from '@fortawesome/react-fontawesome'
import {
  faBan,
  faFolderOpen,
  faSave
}                                    from '@fortawesome/free-solid-svg-icons'
import {CONSTANT_WAREHOUSE_TRANSFER} from '../../../../../constants'

const TransferStatusRender = ({value} : { value : number }) => {
  const { OPENED, SAVED, CANCELED } = CONSTANT_WAREHOUSE_TRANSFER.STATUS
  let icon : any
  let color : string = ''
  switch (value) {
    case OPENED:
      icon = faFolderOpen
      color = 'color-primary'
      break
    case SAVED:
      icon = faSave
      color = 'color-success'
      break
    case CANCELED:
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
export default TransferStatusRender