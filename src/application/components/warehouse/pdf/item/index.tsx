import React         from 'react'
import Pdf, {
  IPdfTableProps,
  Table
}                    from '../../../../../components/Pdf/Pdf'
import {TWarehouse}  from '../../../../../graphql/type_logic/types'
import WarehouseSpec from '../../../calculation/pdf/_common/WarehouseSpec'

interface IWarehousePdfItemProps {
  tableData : IPdfTableProps,
  warehouse : TWarehouse
}

const ItemPdf = ({warehouse, tableData} : IWarehousePdfItemProps) => {

  return (
    <Pdf
            title={'Warehouse Item'}
            pageSize={'Letter'}
            orientation={tableData.orientation}
            showFooter
            header={{
              title: 'Warehouse Item',
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

export default ItemPdf

