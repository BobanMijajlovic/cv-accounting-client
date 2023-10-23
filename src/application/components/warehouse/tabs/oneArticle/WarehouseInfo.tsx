import React          from 'react'
import GeneralDetails from './GeneralDetails'
import FinancePart    from './FinancePart'
import ItemStateTable from './ItemStateTable'
import TableSearch    from './TableSearch'
import ItemLastRecord from './ItemLastRecord'

const WarehouseInfo = ( { warehouseId } : any ) => {

  return (
    <>
      <div className={ 'd-flex flex-column w-100 mr-2' }>
        <div className={ 'd-flex flex-row' }>
          <div className={ 'general-details mr-5' }>
            <GeneralDetails warehouseId={ warehouseId } notShowEditButton/>
          </div>
          <div className={ 'd-flex warehouse-item-finance-part ml-5' }>
            <FinancePart warehouseId={ warehouseId }/>
          </div>
        </div>
        <div className={ 'd-flex mt-1 background-grey px-2 pb-1 mt-3  mb-3 mx-4' }>
          <ItemLastRecord warehouseId={ warehouseId }/>
        </div>
        <div className={ 'd-flex flex-column' }>
          <div>
            <TableSearch warehouseId={ warehouseId }/>
            <ItemStateTable warehouseId={ warehouseId }/>
          </div>
        </div>
      </div>
    </>
  )
}

export default WarehouseInfo
