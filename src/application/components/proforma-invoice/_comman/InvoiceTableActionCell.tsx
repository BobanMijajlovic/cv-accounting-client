import React, { useMemo }            from 'react'
import { FontAwesomeIcon }           from '@fortawesome/react-fontawesome'
import { faEdit }                    from '@fortawesome/free-regular-svg-icons'
import {
  faBan,
  faPrint,
  faSearch
}                                    from '@fortawesome/free-solid-svg-icons'
import { CONSTANT_PROFORMA_INVOICE } from '../../../constants'
import { get as _get }               from 'lodash'

const ProformaInvoiceTableActionCell = ( { value, model, index } : { value : any, model : any, index : number } ) => {
  const { OPENED, SAVED } = CONSTANT_PROFORMA_INVOICE.STATUS
  const _val = Number( model['status'] )
  const invoiceId = useMemo( () => _get( model, 'proformaInvoice.id' ), [model] )
  return (
    <div className={ 'd-flex justify-content-around align-items-center flex-fill' }>
      <FontAwesomeIcon className={ 'color-primary-hover' } icon={ faSearch } data-sub-action={ 'preview' }/>
      <FontAwesomeIcon className={ 'color-primary-hover' } icon={ faPrint } data-sub-action={ 'print' }/>
      { ( _val === OPENED || _val === SAVED ) && !invoiceId ? <>
        <FontAwesomeIcon className={ 'color-primary-hover' } icon={ faEdit } data-sub-action={ 'edit' }/>
        <FontAwesomeIcon className={ 'color-danger-hover' } icon={ faBan } data-sub-action={ 'cancel' }/>
      </> : <></> }
    </div>
  )
}
export default ProformaInvoiceTableActionCell