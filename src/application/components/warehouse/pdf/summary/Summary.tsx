import React                   from 'react'
import Pdf, { IPdfTableProps } from '../../../../../components/Pdf/Pdf'
import SummaryTable            from './SummaryTable'
import { TWarehouse }          from '../../../../../graphql/type_logic/types'
import WarehouseSpec           from '../../../calculation/pdf/_common/WarehouseSpec'
import SummaryMultiPage        from './SummaryMultiPage'

interface ISummaryProps {
  tableData?: IPdfTableProps
  data: any
  warehouse: TWarehouse
}

const Summary = ({tableData, data, warehouse}: ISummaryProps) => {

  return (
    <SummaryMultiPage title={'Warehouse Summary'} data={data} />
   /* <Pdf
            title={'Warehouse Summary'}
            pageSize={'Letter'}
            showFooter
            header={{
              title:'Warehouse Summary',
              leftPart:{
                Component:WarehouseSpec,
                props:{
                  warehouse
                }
              }
            }}
    >
      <SummaryTable tableData={tableData}/>
    </Pdf>*/
  )
}

export default Summary
