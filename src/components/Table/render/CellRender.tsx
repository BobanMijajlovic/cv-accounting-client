import React             from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faTimes
}                        from '@fortawesome/free-solid-svg-icons'
import {faEdit}          from '@fortawesome/free-regular-svg-icons'

const _NumberCellColumnSmall = ({index} : any) => {

  return (
    <div>
      <small>{+index + 1}</small>
    </div>
  )
}

export const NumberCellColumnSmall = React.memo(_NumberCellColumnSmall, (prevProps, nextProps) => {
  return prevProps.index === nextProps.index
})

interface ITableCommandsFieldProps {
  preventEdit : boolean
  preventDelete : boolean
  preventPreview : boolean
}

export const TableActionCell : React.FC<Partial<ITableCommandsFieldProps>> = ({preventDelete, preventEdit, preventPreview}) => {

  return (
    <div className={'hw-table-cell-action'}>
      {preventPreview ? <></> : <FontAwesomeIcon className={'color-primary-hover'} icon={faSearch} data-sub-action={'preview'}/>}
      {preventEdit ? <></> : <FontAwesomeIcon className={'color-primary-hover'} icon={faEdit} data-sub-action={'edit'}/>}
      {preventDelete ? <></> : <FontAwesomeIcon className={'color-danger-hover'} icon={faTimes} data-sub-action={'delete'}/>}
    </div>
  )
}
