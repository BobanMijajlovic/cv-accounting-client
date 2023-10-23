import React                                         from 'react'
import { useTranslationFunction }                    from '../../../../components/Translation/useTranslation'
import { useItemDashboard }                          from '../../../../store/items/useItem'
import { get as _get }                               from 'lodash'
import { queryVariablesWarehouseItemStock }          from '../../../../graphql/variablesQ'
import { useWarehouseItemsInfoQuery }                from '../../../../graphql/graphql'
import Table                                         from '../../../../components/Table/Table'
import { ITEM_WAREHOUSE_BALANCE_PREVIEW_TABLE_NAME } from '../../../constants'
import { NumberCellColumnSmall }                     from '../../../../components/Table/render/CellRender'
import {
  formatPrice,
  formatQuantity
}                                                    from '../../../utils/Utils'

const summarize = {
  fields: ['quantityOnStack', 'financeOnStack', 'quantityTotalOwes', 'quantityTotalClaims', 'financeTotalOwes', 'financeTotalClaims']
}

export const itemWarehouseBalanceHeader = [
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
    label: 'ITEMS_TABLE_TH_WAREHOUSE',
    field: 'warehouse',
    cell: {
      classes: ['text-center', 'font-smaller-2'],
      format: (value: any) => `${value.name}`
    }
  },
  {
    label: 'ITEMS_TABLE_TH_QTY',
    field: 'quantityOnStack',
    width: 200,
    cell: {
      classes: ['text-right'],
      format: (value: string) => {
        return formatQuantity(value)
      }
    }
  },
  {
    label: 'ITEMS_TABLE_TH_FINANCE_STACK',
    field: 'financeOnStack',
    cell: {
      classes: ['text-right'],
      format: (value: string) => {
        return formatPrice(value)
      }
    }
  },
  {
    label: 'ITEMS_TABLE_TH_QTY_TOTAL_OWES',
    field: 'quantityTotalOwes',
    cell: {
      classes: ['text-right'],
      format: (value: string) => {
        return formatQuantity(value)
      },
    }
  },
  {
    label: 'ITEMS_TABLE_TH_QTY_TOTAL_CLAIMS',
    field: 'quantityTotalClaims',
    cell: {
      classes: ['text-right'],
      format: (value: string) => {
        return formatQuantity(value)
      },
    }
  },
  {
    label: 'ITEMS_TABLE_TH_FIN_TOTAL_OWES',
    field: 'financeTotalOwes',
    cell: {
      classes: ['text-right'],
      format: (value: string) => {
        return formatPrice(value)
      },
    }
  },
  {
    label: 'ITEMS_TABLE_TH_FIN_TOTAL_CLAIMS',
    field: 'financeTotalClaims',
    cell: {
      classes: ['text-right'],
      format: (value: string) => {
        return formatPrice(value)
      },
    }
  },
]

const ItemWarehouseTable = () => {
  const {translate} = useTranslationFunction()
  const {selected: globalItemData} = useItemDashboard()

  const queryWarehouseItems = React.useMemo(() => {
    const itemId = _get(globalItemData, 'id', 0)
    if (!itemId) {
      return undefined
    }
    return queryVariablesWarehouseItemStock(0, 50, `${itemId}`)
  }, [globalItemData])

  const {data: warehouseItemsInfo} = useWarehouseItemsInfoQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: queryWarehouseItems,
    skip: !queryWarehouseItems,
  })

  const data = React.useMemo(() => warehouseItemsInfo && warehouseItemsInfo.data && warehouseItemsInfo.data.items.length !== 0 ? warehouseItemsInfo.data.items : [], [warehouseItemsInfo])

  const tableData = React.useMemo(() => {
    if (!data) {
      return []
    }
    return data.map(item => {
      return {
        warehouse: item.warehouse,
        ...item.warehouseItem
      }
    })
  }, [data])

  const tableHeader = React.useMemo(() => {
    if (!itemWarehouseBalanceHeader) {
      return []
    }
    return itemWarehouseBalanceHeader.map(x => {
      return {
        ...x,
        label: x.label !== '#' ? translate(x.label) : x.label
      }
    })
  }, [itemWarehouseBalanceHeader])

  return (
    <div className={'pt-3 m-0 hw-calculation-table-preview h-100'}>
      <Table
                modelFields={['taxPercent', 'taxId']}
                header={tableHeader}
                separator={'cell'}
                data={tableData}
                tableName={ITEM_WAREHOUSE_BALANCE_PREVIEW_TABLE_NAME}
                summarize={summarize}
                additionalData={data}
      />
    </div>
  )
}

export default ItemWarehouseTable