import React        from 'react'
import {TWarehouse} from '../../../../graphql/type_logic/types'
import EmptyTag     from '../../../../components/Util/EmptyTag'

export interface IWarehouseViewBasicProps {
  warehouse : TWarehouse
  error ?: boolean
}

const WarehouseViewShort = ({warehouse, error} : IWarehouseViewBasicProps) => {

  return (
    <div className={'text-align-left color-primary relative'}>
      <div className={'d-flex  flex-column justify-content-center text-align-left'}>
        <div className={'px-1 font-bold text-upper'}><EmptyTag model={warehouse} field={'name'} placeholder={'WAREHOUSE NAME'}/></div>
        <small className={'px-1'}><EmptyTag model={warehouse} field={'description'} placeholder={'Warehouse description'}/> </small>
      </div>
      {error && <div style={{top: -20}} className={'color-danger position-absolute font-smaller-4'}> Warehouse is required field.</div>}
    </div>
  )
}

export default WarehouseViewShort
