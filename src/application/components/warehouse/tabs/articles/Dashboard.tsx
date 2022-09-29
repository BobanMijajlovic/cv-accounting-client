import React          from 'react'
import FinancePart    from '../oneArticle/FinancePart'
import GeneralDetails from '../oneArticle/GeneralDetails'
import ItemsTable from './ItemsTable'

const WarehouseItemsDashboard = ({warehouseId} : {warehouseId : string}) => {
    
  return (
    <div className={'d-flex flex-column w-100 mr-2 pt-2 w-100 px-4'}>
      <div className={'d-flex flex-row'}>
        <div className={'general-details mr-5'}>
          <GeneralDetails warehouseId={warehouseId} notShowEditButton/>
        </div>
        <div className={'d-flex warehouse-item-finance-part ml-5'}>
          <FinancePart warehouseId={warehouseId}/>
        </div>
      </div>
      <ItemsTable warehouseId={warehouseId}/>
    </div>
  )
}

export default WarehouseItemsDashboard