import React from 'react'

import {
  HEADER,
  IPdfTableProps,
  TABLE,
  TBODY,
  TRD
} from '../../../../components/Pdf/Pdf'

const CashReceiptTable = ({tableData} : { tableData : IPdfTableProps }) => {

  const {data = [], columns} = tableData

  return (
    <TABLE>
      <HEADER columns={columns}/>
      <TBODY>
        {
          data.map((x : any, key : number) => {
            return <TRD data={x} columns={columns} key={key} index={key}/>
          })
        }
      </TBODY>
    </TABLE>
  )
}

export default CashReceiptTable
