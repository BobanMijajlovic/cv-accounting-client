import React, {
  useCallback,
  useEffect
}                                           from 'react'
import { queryVariablesForWorkOrders }      from '../../../../../graphql/variablesQ'
import {
  useInsertWorkOrderMutation,
  useUpdateWorkOrderMutation,
  useWorkOrdersQuery
}                                           from '../../../../../graphql/graphql'
import { faDolly }                          from '@fortawesome/free-solid-svg-icons'
import { KeyboardEventCodes }               from '../../../../../components/hooks/useExternalKeybaord'
import { useAppBar }                        from '../../../../hooks/useAppBar'
import { openDialogTransferForm }           from './form/Transfer'
import { usePagination }                    from '../../../../../components/Pagination/usePagination'
import { SpinnerLoadingCenter }             from '../../../../../components/Spinner/SpinnerLoading'
import DivExternalKeyboardRoot              from '../../../../../components/hooks/DivParentExternalKeybardRoot'
import {
  CONSTANT_WAREHOUSE_TRANSFER,
  WAREHOUSE_TRANSFER_TABLE_NAME
}                                           from '../../../../constants'
import { formatDateShort }                  from '../../../../utils/Utils'
import { TableHeaderRenderManageColumns }   from '../../../../../components/Table/render/HeaderRender'
import Table                                from '../../../../../components/Table/Table'
import _                                    from 'lodash'
import { openDialogPreviewTransfer }        from './preview/Preview'
import TransferTableActions                 from './_common/TransfersTableActions'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                           from '../../../../../components/EasyModel/EasyModal'
import {
  CenteredDialog,
  DialogComponentQuestions
}                                           from '../../../../../components/Dialog/DialogBasic'
import WarehouseTransferFilter              from './Filter'
import { useWarehouseTransfer }             from '../../../../../store/warehouse-transfer/useWarehouseTransfer'
import TransferStatusRender                 from './_common/TransferStatusRender'
import { openDialogWarehouseTransferPrint } from './pdf/Pdf'
import { processErrorGraphQL }              from '../../../../../apollo'

const header = [
  {
    label: '#',
    field: 'position',
    cell: {
      classes: ['hw-table-cell-center'],
    }
  },
  {
    label: 'Date',
    field: 'transferDate',
    cell: {
      classes: ['hw-table-cell-center'],
      format: (value : any) => formatDateShort(value as string)
    }
  },
  {
    label: 'From warehouse',
    field: 'fromWarehouse',
    cell: {
      classes: ['hw-table-cell-center'],
      format: (value : any) => `${_.get(value,'name','')}`
    }
  },
  {
    label: 'To warehouse',
    field: 'toWarehouse',
    cell: {
      classes: ['hw-table-cell-center'],
      format: (value : any) => `${_.get(value,'name','')}`
    }
  },
  {
    label: 'Status',
    field: 'status',
    cell: {
      classes: ['hw-table-cell-right'],
      render: TransferStatusRender,
    }
  },
  {
    field: 'act',
    notHide: true,
    notVisible: false,
    notResize: true,
    cell: {
      classes: ['hw-table-cell-center'],
      style: {
        width: '100px'
      },
      render: TransferTableActions
    },
    width: '100px',
    render: TableHeaderRenderManageColumns
  }
]

const WarehouseTransferDashboard = ({warehouseId} : { warehouseId : string }) => {
  
  const [mutationInsertWorkOrder] = useInsertWorkOrderMutation()
  const [mutationUpdateWorkOrder] = useUpdateWorkOrderMutation()
  
  const {transfer} = useWarehouseTransfer()
  const {toWarehouse,dateFrom,dateTo,status} = transfer || {}
  const {data: pagData, setBackendPaginationData, handlerEvent: handlerEventPagination} = usePagination()
  const {perPage: pagPerPage, page: pagPage, numItems: pagNumItems} = pagData
  const {setButtonsForPage, clearButtonsForPage} = useAppBar()

  const queryWorkOrder = React.useMemo(() => {
    const options = Object.assign({
      dateFrom: dateFrom ? dateFrom : undefined,
      dateTo: dateTo ? dateTo : undefined,
      status: status ? status : undefined
    },toWarehouse ? {toWarehouseId: toWarehouse.id} : {})
    
    const offset = ((pagPage || 1) - 1) * (pagPerPage || 20)
    return queryVariablesForWorkOrders(offset, pagPerPage || 20, Number(warehouseId),options)
  }, [pagPerPage, pagPage, warehouseId, toWarehouse, status, dateFrom, dateTo])

  const {loading, data,refetch} = useWorkOrdersQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: queryWorkOrder,
    onCompleted: (data : any) => {
      if (!data || !data.data || !data.data.items) {
        return
      }
      const {page, count} = data.data
      setBackendPaginationData(page || 1, count)
    }
  })
  
  const handlerInsertUpdateWorkOrder = (data:any, id?: number) => {
    return id ? mutationUpdateWorkOrder({
      variables: {
        id,
        data
      }
    })
      : mutationInsertWorkOrder({
        variables: {
          data
        }
      })
  }

  const insertUpdateWorkOrder = async (data : any,id ?: number) => {
    handlerInsertUpdateWorkOrder(data,id)
      .then(() => {
        refetch().then()
      })
      .catch((e) => {
        processErrorGraphQL(e,{})
      })
  }

  const paginationData = React.useMemo(() => {
    return {
      perPage: pagPerPage || 20,
      page: pagPage || 1,
      totalItems: pagNumItems || 0
    }
  }, [pagPerPage, pagPage, pagNumItems])

  const workOrders = React.useMemo(() => !data || !data.data.items || data.data.items.length === 0 ? [] :
    data.data.items.map((workOrder : any, index : number) => {
      return {
        ...workOrder,
        position: index + 1
      }
    }), [data])

  const handlerTransferWarehouse = useCallback(() => {
    openDialogTransferForm({
      fromWarehouseId: warehouseId,
      submitFunction: insertUpdateWorkOrder
    })
  },[warehouseId])
  
  const handlerSaveCancelTransfer = (data : any,id : number) => {
    return mutationUpdateWorkOrder({
      variables: {
        id,
        data: data
      }
    })
  }

  useEffect(() => {
    const id = setButtonsForPage([
      {
        label: 'Add',
        icon: faDolly,
        shortcut: KeyboardEventCodes.F4,
        onClick: handlerTransferWarehouse
      },
    ])
    return () => clearButtonsForPage(id)
  }, [setButtonsForPage, clearButtonsForPage])
  
  const editHandlerOpen =  (id : string) => {
    openDialogTransferForm({
      workOrderId: id,
      fromWarehouseId: warehouseId,
      submitFunction: insertUpdateWorkOrder
    })
  }

  const handlerDataEventClick = (event : any, id : any, action : any, param : any) => {
    if (action === 'edit') {
      id && editHandlerOpen(id)
    }
    if (action === 'preview') {
      id && openDialogPreviewTransfer({
        workOrderId: id
      })
    }

    if (action === 'print') {
      id &&  openDialogWarehouseTransferPrint({
        workOrderId: id
      })
    }

    if (action === 'save') {
      id && openDialogCancelSaveTransferForm({
        actionConfirm: handlerSaveCancelTransfer,
        id,
        data: {status: CONSTANT_WAREHOUSE_TRANSFER.STATUS.SAVED},
        save: true
      })
    }
    if (action === 'delete') {
      id && openDialogCancelSaveTransferForm({
        actionConfirm: handlerSaveCancelTransfer,
        id,
        data: {status: CONSTANT_WAREHOUSE_TRANSFER.STATUS.CANCELED}
      })
    }
  }
  return (
    <>
      {loading ? <SpinnerLoadingCenter/> : null}
      <DivExternalKeyboardRoot className={'d-flex flex-column w-100 mr-2 pt-2 w-100 px-4'}>
        <WarehouseTransferFilter />
        <div className={'pt-3 m-0 overflow-hidden h-100'}>
          <Table
                        tableName={WAREHOUSE_TRANSFER_TABLE_NAME}
                        header={header}
                        handlerEventPagination={handlerEventPagination}
                        data={workOrders}
                        separator={'cell'}
                        handlerEventDataClick={handlerDataEventClick}
                        paginationData={paginationData}
                        scrollable
                        additionalData={workOrders}
          />
        </div>
      </DivExternalKeyboardRoot>
    </>
  )
}

export default WarehouseTransferDashboard

interface IDialogCancelSaveTransferFormProps {
  actionConfirm : (data : any,id : number) => void
  data : any
  id : string
  save ?: boolean
}

export const openDialogCancelSaveTransferForm = ({actionConfirm,id,data,save} : IDialogCancelSaveTransferFormProps) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      const messages : string[] = React.useMemo(() => [
        `Are you sure you want to ${save ? 'save' : 'cancel'} this transfer? `
      ], [])

      const handlerConfirm = async () => {
        await actionConfirm(data,Number(id))
        closeDialog()
      }

      return (
        <DialogComponentQuestions
              closeFun={closeDialog}
              confirmFun={handlerConfirm}
              messages={messages}
        />
      )
    }
    openDialog(<DialogModalRootComponent name={'dialog-warehouse-transfer-cancel-780410420701'} closeFn={closeDialog}>
      <CenteredDialog
          title={`${save ? 'SAVE' : 'CANCEL'} WAREHOUSE TRANSFER`}
          closeAction={closeDialog}
          Component={Component}
      />
    </DialogModalRootComponent>)
  })
}
