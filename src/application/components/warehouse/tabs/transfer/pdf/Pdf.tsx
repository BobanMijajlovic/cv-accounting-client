import React                    from 'react'
import Pdf, {
  IPdfTableProps,
  resizeColumns,
  Table
}                               from '../../../../../../components/Pdf/Pdf'
import { formatQuantity }       from '../../../../../utils/Utils'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                               from '../../../../../../components/EasyModel/EasyModal'
import { useWorkOrderQuery }    from '../../../../../../graphql/graphql'
import { SpinnerLoadingCenter } from '../../../../../../components/Spinner/SpinnerLoading'
import { CenteredDialog }       from '../../../../../../components/Dialog/DialogBasic'
import { TWorkOrder }           from '../../../../../../graphql/type_logic/types'
import { get as _get }          from 'lodash'
import Header                   from './header/Header'
import { PdfRenderItemData }    from '../_common/PdfRenderItemData'

interface IWarehouseTransferPdfProps {
  tableData: IPdfTableProps,
  workOrder: TWorkOrder
}

const WarehouseTransferPdf = ({workOrder, tableData}: IWarehouseTransferPdfProps) => {

  return (
    <Pdf
            title={'Warehouse transfer'}
            pageSize={'Letter'}
            showFooter
            styles={{fontSize: 7}}
            header={{
              title: 'Warehouse transfer'
            }}
    >
      <Header data={workOrder}/>
      <Table tableData={tableData}/>
    </Pdf>
  )
}

export default WarehouseTransferPdf

export const openDialogWarehouseTransferPrint = ({workOrderId}: { workOrderId: string }) => {
  const tableData: IPdfTableProps = {
    columns: [
      {
        label: '#',
        format: (value: any, index ?: number) => `${((Number(index) || 0) + 1).toString()}`,
        minSize: 2,
        size: 2
      },
      {
        field: 'item.shortName',
        label: 'Name',
        alignment: 'left',
        sizeType: 1,
        minSize: 30,
        format: (value: any) => `${value.item.barCode}`,
        render: PdfRenderItemData,
        renderProps: {
          field: 'item'
        }
      },
      {
        label: 'Qty',
        field: 'quantity',
        sizeType: 3,
        alignment: 'right',
        format: (value: any) => formatQuantity(value.quantity)
      },
    ]
  }

  EasyDialogApolloProvider((closeDialog: () => any, openDialog: (data: any) => any) => {
    const Component = () => {

      const {loading, data} = useWorkOrderQuery({
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only',
        variables: {
          id: Number(workOrderId)
        }
      })

      const items = data?.workOrder?.workOrderItems ? data?.workOrder?.workOrderItems.map(x => {
        return {
          ...x,
          item: _get(x, 'warehouseItemInfo.item')
        }
      }) : []

      if (loading) {
        return <SpinnerLoadingCenter/>
      }
      const _tableData = {
        ...tableData,
        data: items
      }

      resizeColumns(_tableData)
      return (
        <>
          <CenteredDialog
                        title={'Warehouse transfer Pdf'}
                        closeAction={closeDialog}
                        Component={WarehouseTransferPdf}
                        componentRenderProps={{
                          tableData: _tableData,
                          workOrder: data?.workOrder,
                          cancelFunction: closeDialog
                        }}
          />
        </>
      )
    }
    openDialog(<DialogModalRootComponent name={'dialog-warehouse-transfer-pdf-406612240240142'} closeFn={closeDialog}>
      <Component/>
    </DialogModalRootComponent>)
  })

}