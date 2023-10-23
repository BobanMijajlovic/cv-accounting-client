import React               from 'react'
import _                   from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faTimes
}                          from '@fortawesome/free-solid-svg-icons'
import {faEdit}               from '@fortawesome/free-regular-svg-icons'
import { CONSTANT_MODEL }  from '../../../constants'

export const RendersBankHeaderTransactionDocument = ( { value, index, model, additionalData } : any ) => {
  const _model = additionalData[index]
  const documentId = _model.documentId ? _.get( _model, 'documentId' ) : ''
  const description = _model.description ? _.get( _model, 'description' ) : ''
  return (
    <div className={ 'd-flex justify-content-between align-items-center font-smaller-2 flex-fill' }>
      <div>Bank transaction { documentId }</div>
      <div>{ description }</div>
    </div>
  )
}

export const BankHeaderTransactionTableActionCell = ( { value, model, index, additionalData } : { value : any, model : any, index : number, additionalData : any } ) => {
  const _model = additionalData[index]
  const status = _model.status
  const { DELETED, OPENED } = CONSTANT_MODEL.BANK_TRANSACTION_STATUS
  return (
    <div className={ 'hw-table-cell-action d-flex justify-content-around ' }>
      <FontAwesomeIcon className={ 'color-primary-hover' } icon={ faSearch } data-sub-action={ 'preview' }/>
      { Number( status ) === OPENED && <FontAwesomeIcon className={ 'color-primary-hover' } icon={ faEdit } data-sub-action={ 'edit' }/> }
      { Number( status ) !== DELETED && <FontAwesomeIcon className={ 'color-primary-hover' } icon={ faTimes } data-sub-action={ 'delete' }/> }
    </div>
  )
}