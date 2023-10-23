import React                                         from 'react'
import {
  TWorkOrder,
  TWorkOrderItem
}                                                    from '../../../../../../graphql/type_logic/types'
import {WAREHOUSE_TRANSFER_PREVIEW_ITEMS_TABLE_NAME} from '../../../../../constants'
import Table                                         from '../../../../../../components/Table/Table'
import {transferItemsHeader}                         from '../form/TransferItemsTable'
import {get as _get}                                 from 'lodash'

interface IPreviewTransferItemsProps {
  workOrder : TWorkOrder
}

const summarize = {
  fields: ['finance']
}

const PreviewTransferItems = ({workOrder} : IPreviewTransferItemsProps) => {

  const items : any = (workOrder as any).workOrderItems
  const tableData = React.useMemo(() => {
    if (!items) {
      return []
    }
    return items.map((item : TWorkOrderItem, index : number) => {
      return {
        ...item,
        item: _get(item,'warehouseItemInfo.item'),
        position: index + 1
      }
    })
  }, [items])

  const tableHeader = React.useMemo(() => {
    const index : any = transferItemsHeader.findIndex(x => x.field === 'act')
    if (index === -1) {
      return transferItemsHeader
    }
    const header = [...transferItemsHeader].map(x => {
      return {
        ...x,
        notResize: true,
        cell: {
          ...x.cell,
          editor: void(0)
        }
      }
    })
    header[index] = {
      ...header[index],
      notVisible: true
    } as any
    header.splice(index, 1)
    return header
  }, [])

  return (
    <div  className={'w-100 calculation-items-table-root mb-1 flex-2'}>
      <Table
                header={tableHeader}
                separator={'cell'}
                data={tableData}
                tableName={WAREHOUSE_TRANSFER_PREVIEW_ITEMS_TABLE_NAME}
                summarize={summarize}
                additionalData={workOrder}
      />
    </div>
  )
}

export default PreviewTransferItems