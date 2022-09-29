import React               from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes }         from '@fortawesome/free-solid-svg-icons'

export const ProductionItemsTableActionCell = ({ value, model, index, additionalData }: { value: any, model: any, index: number, additionalData?: any }) => {
  return (
    <div className={'hw-table-cell-action'}>
      <FontAwesomeIcon className={'color-danger-hover'} icon={faTimes} data-sub-action={'delete'}/>
    </div>
  )
}