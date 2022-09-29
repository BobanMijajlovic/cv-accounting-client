import React               from 'react'
import {
  CONSTANT_FINANCE_TRANSFER_DOCUMENT,
  CONSTANT_INVOICE
}                          from '../../../constants'
import {
  faBan,
  faCheckDouble,
  faFolderOpen,
  faLongArrowAltLeft,
  faLongArrowAltRight
}                          from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StatusRender = ({value} : { value : number }) => {
  const { OPENED, SAVED, CANCELED } = CONSTANT_INVOICE.STATUS
  let icon : any
  let color : string = ''
  switch (value) {
    case OPENED:
      icon = faFolderOpen
      color = 'color-primary'
      break
    case SAVED:
      icon = faCheckDouble
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
export default StatusRender

export const FlagRender = ({value} : { value : number }) => {
  const { IN, OUT } = CONSTANT_FINANCE_TRANSFER_DOCUMENT.FLAG
  let icon : any
  let color : string = ''
  switch (value) {
    case IN:
      icon = faLongArrowAltLeft
      color = 'color-success'
      break
    case OUT:
      icon = faLongArrowAltRight
      color = 'color-danger'
      break

  }
  return (
    <div className={'text-center'}>
      <FontAwesomeIcon icon={icon} className={color}/>
    </div>
  )
}