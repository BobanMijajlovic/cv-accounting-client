import { CONSTANT_INVOICE } from '../../../constants'
import {
  faBan,
  faPrint,
  faSearch
}                           from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import React                from 'react'
import { faEdit }           from '@fortawesome/free-regular-svg-icons'

const InvoiceTableActionCell = ({ value, model, index }: { value: any, model: any, index: number }) => {
  const { OPENED, SAVED } = CONSTANT_INVOICE.STATUS
  const _val = Number(model['status'])
  return (
    <div className={'hw-table-cell-action'}>
      <FontAwesomeIcon className={'color-primary-hover'} icon={faSearch} data-sub-action={'preview'}/>
      <FontAwesomeIcon className={'color-primary-hover'} icon={faPrint} data-sub-action={'print'}/>
      {_val === OPENED ? <>
        <FontAwesomeIcon className={'color-primary-hover'} icon={faEdit} data-sub-action={'edit'}/>
        <FontAwesomeIcon className={'color-primary-hover'} icon={faBan} data-sub-action={'cancel'}/>
      </> : <></>
      }
    </div>
  )
}
export default InvoiceTableActionCell
