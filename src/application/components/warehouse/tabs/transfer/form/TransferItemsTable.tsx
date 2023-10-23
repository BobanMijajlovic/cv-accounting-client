import React                                   from 'react'
import { TWorkOrderItem }                      from '../../../../../../graphql/type_logic/types'
import { formatQuantity }                      from '../../../../../utils/Utils'
import {
  NumberCellColumnSmall,
  TableActionCell
}                                              from '../../../../../../components/Table/render/CellRender'
import { TableHeaderRenderManageColumns }      from '../../../../../../components/Table/render/HeaderRender'
import Table                                   from '../../../../../../components/Table/Table'
import { WAREHOUSE_TRANSFER_ITEMS_TABLE_NAME } from '../../../../../constants'
import _                                       from 'lodash'
import {
  EVENT_TYPE_CHANGE_MODEL_FIELD,
  InputTextEditorQuantity
}                                              from '../../../../../../components/Table/editors/InputTextEditor'
import { ITableModelCellChanged }              from '../../../../../../components/Table'

interface ITransferItemsTableProps {
  items: TWorkOrderItem[]
  deleteFunc: (id: string) => void
  updateItem: (value: number | string, field: string, model: any) => void
}

const RenderItemData = ({value}: any) => {
  return (
    <div className={'d-flex justify-content-between align-items-center flex-fill'}>
      <div className={'font-smaller-1'}>{value.shortName}</div>
      <div className={'d-flex flex-column justify-content-between align-items-center font-smaller-4'}>
        <div>{value.code}</div>
        <div>{value.barCode}</div>
      </div>
    </div>
  )
}

export const transferItemsHeader = [
  {
    label: '#',
    notHide: true,
    field: 'position',
    cell: {
      classes: ['text-center'],
      render: NumberCellColumnSmall
    }
  },
  {
    label: 'Item',
    field: 'warehouseItemInfo.item',
    width: '60%',
    cell: {
      classes: ['text-left'],
      render: RenderItemData
    }
  },
  {
    label: 'QTY',
    field: 'quantity',
    width: 100,
    cell: {
      editor: {
        render: InputTextEditorQuantity
      },
      classes: ['text-right'],
      format: (value: any) => formatQuantity(value as number)
    }
  },
  {
    field: 'act',
    notHide: true,
    notVisible: false,
    notResize: false,
    cell: {
      classes: ['hw-table-cell-center'],
      style: {
        width: '30px'
      },
      render: TableActionCell,
      renderProps: {
        preventPreview: true,
        preventEdit: true
      }
    },
    width: '30px',
    render: TableHeaderRenderManageColumns
  }
]

const TransferItemsTable = ({items, deleteFunc, updateItem}: ITransferItemsTableProps) => {

  const tableData = React.useMemo(() => {
    if (!items) {
      return []
    }
    return items.map((item: TWorkOrderItem, index: number) => {
      const price = item.price ? item.price : _.get(item, 'warehouseItemInfo.warehouseItem.priceStack')
      return {
        ...item,
        finance: _.round(_.multiply(Number(item.quantity), Number(price)), 2),
        position: index + 1
      }
    })

  }, [items])

  const handlerDataEventClick = (event: any, id: any, action: any, param: any) => {
    if (action === 'delete') {
      id && deleteFunc(id)
      return
    }
  }

  const handlerModelFieldChanged = (data: ITableModelCellChanged) => {
    if (data.type === EVENT_TYPE_CHANGE_MODEL_FIELD) {
      updateItem(data.value, data.field, data.model)
      return
    }
  }

  return (
    <div className={'w-100 calculation-items-table-root mb-1 flex-2'}>
      <Table
                handlerEventDataClick={handlerDataEventClick}
                header={transferItemsHeader}
                separator={'cell'}
                data={tableData}
                handlerEventModelFieldChanged={handlerModelFieldChanged}
                tableName={WAREHOUSE_TRANSFER_ITEMS_TABLE_NAME}
                additionalData={items}
      />
    </div>
        /*  <div className={'border-top-double font-smaller-2'}>
            <ConditionalRendering condition={!items || items.length === 0}>
              <div className={'m-8 p-1 text-upper font-smaller-2 font-weight-300 color-primary opacity-8 letter-spacing-5 row-even'} style={{minWidth: '300px'}}>No items</div>
            </ConditionalRendering>
            <ConditionalRendering condition={items && items.length !== 0}>
              <table data-action-root className={'w-100'}>
                <thead className={'font-smaller-2 color-primary font-normal text-center'}>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>QTY</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items && items.map((item : TWorkOrderItem, index : number) => {
                    const id = item.id ? item.id : index
                    const _item = (item as any).item ? (item as any).item : _.get(item,'warehouseItemInfo.item')
                    return (
                      <tr key={id} className={`font-weight-300 border-bottom ${index % 2 === 1 ? ' row-odd' : ' row-even'}`}>
                        <td>
                          <div className={'px-3 py-2'}>
                            <RenderItemData item={_item as TItem}/>
                          </div>
                        </td>
                        <td>
                          <div className={'text-right px-2'}>{formatPrice(Number(item.price))}</div>
                        </td>
                        <td>
                          <div className={'text-right px-2'}>{formatQuantity(Number(item.quantity))}</div>
                        </td>
                        <td style={{width: 50}}>
                          <div className={'d-flex justify-content-between align-items-center px-2'}>
                            <div
                                className={'px-1 button-effect'}
                                data-action={CONSTANT_WAREHOUSE.EVENTS.TRANSFER_FORM_DELETE}
                                data-action-id={id}
                            >
                              <FontAwesomeIcon className={'color-danger'} icon={faTimes}/>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </ConditionalRendering>
          </div>*/
  )
}

export default TransferItemsTable
