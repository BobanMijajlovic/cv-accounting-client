import React              from 'react'
import WarehouseViewShort from '../../../views/WarehouseViewShort'
import {TWorkOrder}       from '../../../../../../graphql/type_logic/types'

interface IPreviewTransferHeaderProps {
  workOrder : TWorkOrder
}

const PreviewTransferHeader = ({workOrder} : IPreviewTransferHeaderProps) => {
    
  return (
    <div className={'d-flex  justify-content-between align-items-center pb-1 pl-1 pr-2   relative'}>
      <div className={'hw-calculation-client-preview'}>
        <WarehouseViewShort warehouse={workOrder.fromWarehouse as any}/>
      </div>
      <div className={'pt-2 font-smaller-1'}>
        <WarehouseViewShort warehouse={workOrder.toWarehouse as any}/>
      </div>
    </div>
  )
}

export default  PreviewTransferHeader