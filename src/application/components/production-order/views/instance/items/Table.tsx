import React, { useMemo }                    from 'react'
import {
  NOT_FOUND_TRANSLATION,
  useTranslationFunction
}                                            from '../../../../../../components/Translation/useTranslation'
import { useProductionOrderForm }            from '../../../../../../store/production-order/useProductionOrder'
import { NumberCellColumnSmall }             from '../../../../../../components/Table/render/CellRender'
import { ITableModelCellChanged }            from '../../../../../../components/Table'
import Table                                 from '../../../../../../components/Table/Table'
import { PRODUCTION_ORDER_ITEMS_TABLE_NAME } from '../../../../../constants'
import { RenderItemData }                    from '../../../_common/ItemRender'
import {
  EVENT_TYPE_CHANGE_MODEL_FIELD,
  InputTextEditorQuantity
}                                         from '../../../../../../components/Table/editors/InputTextEditor'
import {
  formatPrice,
  formatQuantity
} from '../../../../../utils/Utils'
import { TableHeaderRenderManageColumns } from '../../../../../../components/Table/render/HeaderRender'
import { ProductionItemsTableActionCell } from '../../../_common/ItemsTableActionCell'
import { 
  round as _round, 
  multiply as _multiply
}                                         from 'lodash'
import { TItem }                          from '../../../../../../graphql/type_logic/types'

export const productionOrderItemsTable = [
  {
    label: '#',
    notHide: true,
    field: 'posNumber',
    cell: {
      classes: ['text-center'],
      render: NumberCellColumnSmall
    }
  },
  {
    label: 'Item',
    field: 'item',
    cell: {
      render: RenderItemData
    }
  },
  {
    label: 'LABEL_QTY',
    field: 'quantity',
    width: 200,
    cell: {
      editor: {
        render: InputTextEditorQuantity
      },
      classes: ['text-right'],
      format: (value: string) => {
        return formatQuantity(value)
      }
    }
  },
  {
    label: 'LABEL_PRICE',
    field: 'price',
    width: 200,
    cell: {
      classes: ['text-right'],
      format: (value: string) => {
        return formatPrice(value)
      }
    }
  },
  {
    label: 'LABEL_FINANCE',
    field: 'finance',
    width: 200,
    cell: {
      classes: ['text-right'],
      format: (value: string) => {
        return formatPrice(value)
      }
    }
  },
  {
    field: 'act',
    notHide: true,
    notVisible: false,
    notResize: true,
    cell: {
      classes: ['hw-table-cell-center'],
      render: ProductionItemsTableActionCell,
      style: {
        width: '50px',
      }
    },
    width: '50px',
    render: TableHeaderRenderManageColumns
  }
]

const summarize = {
  fields: ['finance']
}

const ProductionOrderItemsTable = ({productionOrderId}: {productionOrderId: string}) => {
  const { translate } = useTranslationFunction()
  const { productionOrder, updateProductionItem, deleteProductionItem } = useProductionOrderForm(productionOrderId)

  const tableData = useMemo(() => {
    if (!productionOrder.items) {
      return [] 
    }
      
    return productionOrder.items.map(x => {
      const item = x.item as TItem
      return {
        ...x,
        price : item.vp,
        finance : _round( _multiply( Number( x.quantity ), Number( item.vp ) ), 2 )
      }
    })
  },[productionOrder])

  const handlerDataEventClick = (event: any, id: any, action: any, param: any) => {
    if (!event.detail || event.detail !== 1) {
      return
    }
    
    if (action === 'delete') {
      id && deleteProductionItem(Number(id))
      return    
    }
    
  }

  const handlerModelFieldChanged = (data: ITableModelCellChanged) => {
    if (data.type === EVENT_TYPE_CHANGE_MODEL_FIELD) {
      updateProductionItem && updateProductionItem(data.value, data.field, data.model)
      return
    }
  }

  const tableHeader = React.useMemo(() => {
    if (!productionOrderItemsTable) {
      return []
    }
    return productionOrderItemsTable.map((x: any) => {
      const translated =  x.label && x.label !== '#' ? translate(x.label) : NOT_FOUND_TRANSLATION
      return {
        ...x,
        label: translated !== NOT_FOUND_TRANSLATION ? translated : x.label
      }
    })
  }, [productionOrderItemsTable])
    
  return (
    <Table
          handlerEventDataClick={handlerDataEventClick}
          header={tableHeader}
          separator={'cell'}
          data={tableData}
          handlerEventModelFieldChanged={handlerModelFieldChanged}
          tableName={PRODUCTION_ORDER_ITEMS_TABLE_NAME}
          summarize={summarize}
          additionalData={productionOrder}
    />
  )
}

export default ProductionOrderItemsTable