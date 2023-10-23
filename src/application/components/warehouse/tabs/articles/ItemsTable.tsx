import React, {
  useCallback,
  useEffect,
  useState
}                                              from 'react'
import {
  formatDateShort,
  formatPrice,
  formatQuantity
}                                              from '../../../../utils/Utils'
import { faPrint }                             from '@fortawesome/free-solid-svg-icons'
import { VatCustomRender }                     from '../../../_common/VatRender'
import { TableHeaderRenderManageColumns }      from '../../../../../components/Table/render/HeaderRender'
import { RenderItemTableColumn }               from './_common/TableColumnRenders'
import { usePagination }                       from '../../../../../components/Pagination/usePagination'
import { queryVariablesForWarehouseItemsInfo } from '../../../../../graphql/variablesQ'
import {
  useWarehouseItemsInfoQuery,
  useWarehouseQuery
}                                              from '../../../../../graphql/graphql'
import Table                                   from '../../../../../components/Table/Table'
import { KeyboardEventCodes }                  from '../../../../../components/hooks/useExternalKeybaord'
import { useAppBar }                           from '../../../../hooks/useAppBar'
import {
  IPdfTableProps,
  resizeColumns
}                                              from '../../../../../components/Pdf/Pdf'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                              from '../../../../../components/EasyModel/EasyModal'
import { CenteredDialog }                      from '../../../../../components/Dialog/DialogBasic'
import ItemsPdf                                from './../../pdf/items'
import { SpinnerLoadingCenter }                from '../../../../../components/Spinner/SpinnerLoading'
import { RenderTableItemColumn }               from '../../pdf/_common/ItemColumnRender'

const header = [
  {
    label: '#',
    field: 'id',
    notHide: true,
    notResize: true,
    width: 100,
    cell: {
      classes: ['hw-table-cell-center'],
    },
    render: TableHeaderRenderManageColumns,
    renderProps: {position: 'left'}
  },
  {
    field: 'item',
    label: 'name',
    cell: {
      classes: ['hw-table-cell-center'],
      render: RenderItemTableColumn
    }
  },
  {
    label: 'Vat',
    field: 'item.taxId',
    cell: {
      classes: ['hw-table-cell-center'],
      render: VatCustomRender,
      renderProps: {
        classNames: 'font-smaller-3'
      }
    }
  },
  {
    label: 'Selling price',
    field: 'item.vp',
    cell: {
      classes: ['hw-table-cell-right'],
      format: (value : string) => {
        return formatPrice(value)
      }
    },

  },

  {
    label: 'stack price',
    field: 'warehouseItem.priceStack',
    cell: {
      classes: ['hw-table-cell-right'],
      format: (value : string) => {
        return formatPrice(value)
      }
    }
  },

  {
    label: 'finance',
    field: 'warehouseItem.financeOnStack',
    cell: {
      classes: ['hw-table-cell-right'],
      format: (value : string) => {
        return formatPrice(value)
      }
    }
  },
  {
    label: 'stack',
    field: 'warehouseItem.quantityOnStack',
    cell: {
      classes: ['hw-table-cell-right'],
      format: (value : string) => {
        return formatQuantity(value)
      }
    }
  },

  {
    label: 'owes f',
    field: 'warehouseItem.financeTotalOwes',
    cell: {
      classes: ['hw-table-cell-right'],
      format: (value : string) => {
        return formatPrice(value)
      }
    }
  },

  {
    label: 'claims f',
    field: 'warehouseItem.financeTotalClaims',
    cell: {
      classes: ['hw-table-cell-right'],
      format: (value : string) => {
        return formatPrice(value)
      }
    }
  },

  {
    label: 'Transaction date',
    field: 'warehouseItem.transactionDate',
    cell: {
      classes: ['hw-table-cell-center'],
      format: (value : string) => {
        return formatDateShort(value)
      },
      style: {
        maxWidth: 150
      }
    }
  },
]

const ItemsTable = ({warehouseId} : { warehouseId : string }) => {

  const {data: pagData, setBackendPaginationData, handlerEvent: handlerEventPagination, searchValue, handlerSearchChange} = usePagination()
  const {perPage: pagPerPage, page: pagPage, numItems: pagNumItems} = pagData
  const [tableSettings, setTableSettings] = useState({})

  const queryVariablesItemsInfo = React.useMemo(() => {
    const offset = ((pagPage || 1) - 1) * (pagPerPage || 20)
    return queryVariablesForWarehouseItemsInfo(`${warehouseId}`, searchValue, pagPerPage || 20, offset)
  }, [searchValue, warehouseId, pagPage, pagPerPage])

  const {data: warehouseItemsInfo} = useWarehouseItemsInfoQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: queryVariablesItemsInfo,
    onCompleted: (data) => {
      if (!data || !data.data || !data.data.items) {
        return
      }
      const {page, count} = data.data
      setBackendPaginationData(page || 1, count)
    }
  })

  const paginationData = React.useMemo(() => {
    return {
      perPage: pagPerPage || 20,
      page: pagPage || 1,
      totalItems: pagNumItems || 0,
      inputSearch: {
        handlerOnChange: handlerSearchChange,
        label: 'search by name / barcode / code'
      }
    }
  }, [pagPerPage, pagPage, pagNumItems])

  const print = useCallback(() => {
    openDialogPrint({warehouseId, tableSettings})
  }, [warehouseId, tableSettings])

  const {setButtonsForPage, clearButtonsForPage} = useAppBar()
  useEffect(() => {
    const id = setButtonsForPage([
      {
        label: 'Print',
        icon: faPrint,
        shortcut: KeyboardEventCodes.F4,
        onClick: print
      }
    ])
    return () => clearButtonsForPage(id)
  }, [setButtonsForPage, clearButtonsForPage, print])

  const handlerTableSettingsChanged = React.useCallback((settings : any) => {
    setTableSettings({...settings})
  }, [setTableSettings])

  if (!warehouseItemsInfo || !warehouseItemsInfo.data) {
    return <></>
  }
  
  return (
    <div className={'px-2 m-0 hw-calculation-table-preview h-100 w-100'}>
      <Table
            handlerEventPagination={handlerEventPagination}
            handlerEventSettingsChanged={handlerTableSettingsChanged}
            tableName={'items-table-warehouse-item-96631651'}
            header={header}
            data={warehouseItemsInfo.data.items}
            separator={'cell'}
            paginationData={paginationData}
            scrollable
      />
    </div>
  )
}

export default ItemsTable

export const openDialogPrint = ({warehouseId, tableSettings} : { warehouseId : string, tableSettings : any }) => {
  const tSettings = Object.values(tableSettings)
  const tableData : IPdfTableProps = {
    columns: [
      {
        label: 'rb',
        format: (value : any, index ?: number) => ` ${((Number(index) || 0) + 1).toString()} `
      },
      {
        field: 'item',
        label: 'name',
        format: (value : any) => `${value.item?.shortName}`, /** just for calculating size we need for render */
        render: RenderTableItemColumn,
        renderProps: {
          field: 'item'
        }
      },
      {
        label: 'selling Price',
        field: 'item.sellingPrice',
        sizeType: 3,
        alignment: 'right',
        format: (value : any) => formatPrice(value.item?.mp as number)
      },

      {
        label: 'stack Price',
        field: 'warehouseItem.priceStack',
        sizeType: 3,
        alignment: 'right',
        format: (value : any) => formatPrice(value.warehouseItem?.priceStack as number)
      },
      {
        label: 'stack',
        field: 'warehouseItem.quantityOnStack',
        alignment: 'right',
        format: (value : any) => formatQuantity(value.warehouseItem.quantityOnStack)
      },
      {
        label: 'finance',
        field: 'warehouseItem.financeOnStack',
        alignment: 'right',
        format: (value : any) => formatPrice(value.warehouseItem.financeOnStack)
      },

      {
        label: 'owes',
        field: 'warehouseItem.financeTotalOwes',
        alignment: 'right',
        format: (value : any) => formatPrice(value.warehouseItem.financeTotalOwes)
      },
      {
        label: 'claims',
        alignment: 'right',
        field: 'warehouseItem.financeTotalClaims',
        format: (value : any) => formatPrice(value.warehouseItem.financeTotalClaims)
      },

      {
        label: 't.date',
        field: 'warehouseItem.transactionDate',
        format: (value : any) => formatDateShort(value.warehouseItem.transactionDate)
      },
    ].filter(x => {
      const f : any = tSettings.find((y : any) => y.field === x.field)

      if (!f) {
        return true
      }
      return !f.notVisible
    }) as any
  }

  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (component : any) => any) => {
    const Component = () => {

      const {loading: loadingW, data: warehouse} = useWarehouseQuery({
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only',
        variables: {
          id: Number(warehouseId)
        }
      })

      const queryVariablesItemsInfo = React.useMemo(() => {
        return queryVariablesForWarehouseItemsInfo(`${warehouseId}`, '', 100000, 0)
      }, [warehouseId])

      const {loading, data} = useWarehouseItemsInfoQuery({
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only',
        variables: queryVariablesItemsInfo
      })

      if (loadingW || loading) {
        return <SpinnerLoadingCenter/>
      }

      const items = data?.data?.items || []

      const _tableData = {
        ...tableData,
        data: items
      }

      resizeColumns(_tableData)

      return (
        <CenteredDialog
                title={'Warehouse Items state  Pdf'}
                closeAction={closeDialog}
                Component={ItemsPdf}
                componentRenderProps={{
                  tableData: _tableData,
                  warehouse: warehouse?.warehouse,
                  cancelFunction: closeDialog
                }}
        />
      )
    }
    openDialog(<DialogModalRootComponent name={'dialog-warehouse-items-pdf-415142645478545fad465654'} closeFn={closeDialog}>
      <Component />
    </DialogModalRootComponent>)
  })

}

