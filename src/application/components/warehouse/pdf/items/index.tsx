import React         from 'react'
import Pdf, {
  IPdfTableProps,
  Table
}                    from '../../../../../components/Pdf/Pdf'
import {TWarehouse}  from '../../../../../graphql/type_logic/types'
import WarehouseSpec from '../../../calculation/pdf/_common/WarehouseSpec'

interface IWarehousePdfItemsProps {
  tableData : IPdfTableProps,
  warehouse : TWarehouse
}

const ItemsPdf = ({warehouse, tableData} : IWarehousePdfItemsProps) => {
    
  return (
    <Pdf
        title={'Warehouse Items'}
        pageSize={'Letter'}
        orientation={tableData.orientation}
        showFooter
        header={{
          title: 'Warehouse Items',
          leftPart: {
            Component: WarehouseSpec,
            props: {
              warehouse
            }
          }
        }}
    >
      <Table tableData={tableData}/>
    </Pdf>
  )
}

export default ItemsPdf

