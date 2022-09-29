import React                    from 'react'
import CustomerViewShort        from '../../customer/views/CustomerViewShort'
import {
  TCustomer,
  TWarehouse
}                               from '../../../../graphql/type_logic/types'
import WarehouseViewShort       from '../../warehouse/views/WarehouseViewShort'
import { CONSTANT_CALCULATION } from '../../../constants'

const CustomerPart = ( { supplier, warehouse } : { supplier? : TCustomer, warehouse? : TWarehouse } ) => {

  return (
    <div className={ 'd-flex flex-column justify-content-between pb-1 pl-1 pr-2  cursor-pointer relative' }>
      <div
                className={ 'hw-calculation-client-preview' }
                data-action={ CONSTANT_CALCULATION.EVENTS.HEADER.CHANGE_CLICK_EVENT_HEADER_PARTS }
                data-action-id={ 'customer' }
      >
        <CustomerViewShort customer={ supplier as TCustomer }/>
      </div>
      <div
                className={ 'pt-2 font-smaller-1' }
                data-action={ CONSTANT_CALCULATION.EVENTS.HEADER.CHANGE_CLICK_EVENT_HEADER_PARTS }
                data-action-id={ 'warehouseId' }
      >
        <WarehouseViewShort warehouse={ warehouse as TWarehouse }/>
      </div>
    </div>
  )
}

export default CustomerPart

