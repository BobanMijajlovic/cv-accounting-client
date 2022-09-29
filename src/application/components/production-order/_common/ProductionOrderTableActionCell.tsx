import { CONSTANT_MODEL }  from '../../../constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPrint,
  faSearch,
  faTimes
}                          from '@fortawesome/free-solid-svg-icons'
import { faEdit }          from '@fortawesome/free-regular-svg-icons'
import React               from 'react'

const ProductionOrderTableActionCell = ( { value, model, index } : { value : any, model : any, index : number } ) => {
  const { OPENED, IN_PROGRESS, FINISHED, DELETED } = CONSTANT_MODEL.PRODUCTION_ORDER
  const _val = Number( model['status'] )
  return (
    <div className={ 'hw-table-cell-action' }>
      <FontAwesomeIcon className={ 'color-primary-hover' } icon={ faSearch } data-sub-action={ 'preview' }/>
      { _val !== DELETED ? <FontAwesomeIcon className={ 'color-primary-hover' } icon={ faPrint } data-sub-action={ 'print' }/> : null }
      {
        ( _val === OPENED || _val === IN_PROGRESS ) ? <>
          <FontAwesomeIcon className={ 'color-primary-hover' } icon={ faEdit } data-sub-action={ 'edit' }/>
        </> : <></>
      }
      { ( _val !== FINISHED && _val !== DELETED ) ? <FontAwesomeIcon className={ 'color-primary-hover' } icon={faTimes} data-sub-action={ 'delete' }/> : <></> }
    </div>
  )
}
export default ProductionOrderTableActionCell