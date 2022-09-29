import { CONSTANT_INVOICE } from '../../../constants'
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import {
  faBan,
  faPrint,
  faSearch
}                           from '@fortawesome/free-solid-svg-icons'
import React                from 'react'

const FinanceTransferDocumentTableActionCell = ( { value, model, index } : { value : any, model : any, index : number } ) => {
  const { SAVED } = CONSTANT_INVOICE.STATUS
  const _val = Number( model['status'] )
  return (
    <div className={ 'hw-table-cell-action' }>
      <FontAwesomeIcon className={ 'color-primary-hover' } icon={ faSearch } data-sub-action={ 'preview' }/>
      <FontAwesomeIcon className={ 'color-primary-hover' } icon={ faPrint } data-sub-action={ 'print' }/>
      { _val === SAVED ? <>
        <FontAwesomeIcon className={ 'color-primary-hover' } icon={ faBan } data-sub-action={ 'cancel' }/>
      </> : <></>
      }
    </div>
  )
}
export default FinanceTransferDocumentTableActionCell
