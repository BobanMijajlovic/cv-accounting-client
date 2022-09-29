import React                              from 'react'
import TableRenderSupplier                from '../_common/TableRenderSupplier'
import {
  formatDateLong,
  formatPrice
}                                         from '../../../utils/Utils'
import { TableRenderDocument }            from '../_common/TableRenderDocument'
import { openDialogPreviewCalculation }   from '../../calculation/views/InstanceView/Form'
import Table                              from '../../../../components/Table/Table'
import { ITEM_PURCHASE_PRICE_TABLE_NAME } from '../../../constants'
import { TWarehouseItem }                 from '../../../../graphql/type_logic/types'

const PurchasePriceTable = ({data}: { data: TWarehouseItem[] }) => {

  const tableData = React.useMemo(() => {
    if (!data) {
      return []
    }
    return data.map((item: any, index: number) => {
      return {
        id:index + 1,
        supplier:item.calculation.supplier,
        price:item.priceTransaction,
        date:item.transactionDate,
        document:item.calculation
      }
    })
  }, [data])

  const tableHeader = React.useMemo(() => {
    return [
      {
        label:'#',
        notHide:true,
        field:'id',
        cell:{
          classes:['text-center']
        }
      },
      {
        label:'Supplier',
        field:'supplier',
        cell:{
          classes:['text-right'],
          render:TableRenderSupplier
        }
      },
      {
        label:'Price',
        field:'price',
        cell:{
          classes:['text-right'],
          format:(value: string) => {
            return formatPrice(value)
          }
        }
      },
      {
        field:'date',
        label:'Date',
        cell:{
          classes:['hw-table-cell-center'],
          format:(value: string) => {
            return formatDateLong(value)
          },
        }
      },
      {
        label:'Document',
        field:'document',
        cell:{
          classes:['hw-table-cell-center'],
          render:TableRenderDocument,
          style:{
            maxWidth:150
          }
        }
      },
    ]
  }, [])

  const handlerDataEventClick = (event: any, id: any, action: any, param: any) => {
    if (action === 'action-show-document' && id) {
      openDialogPreviewCalculation({calculationId:id})
    }
  }

  return (
    <div className={'w-100 calculation-items-table-root mb-1 flex-2'}>
      <Table
                header={tableHeader}
                separator={'cell'}
                data={tableData}
                scrollable
                handlerEventDataClick={handlerDataEventClick}
                tableName={ITEM_PURCHASE_PRICE_TABLE_NAME}
      />
    </div>
  )
}

export default PurchasePriceTable