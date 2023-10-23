import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan }           from '@fortawesome/free-solid-svg-icons'
import { faEdit }          from '@fortawesome/free-regular-svg-icons'
import React               from 'react'

const CategoryTableActionCell = ({ value, model, index }: { value: any, model: any, index: number }) => {
  return (
    <div className={'hw-table-cell-action'}>
      <FontAwesomeIcon className={'color-primary-hover'} icon={faEdit} data-sub-action={'edit'}/>
      <FontAwesomeIcon className={'color-primary-hover'} icon={faBan} data-sub-action={'cancel'}/>
    </div>
  )
}
export default CategoryTableActionCell
