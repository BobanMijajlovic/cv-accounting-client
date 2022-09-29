import React, {
  useEffect,
  useMemo,
  useState
}                                              from 'react'
import {
  useProductionOrder,
  useProductionOrderTabs
}                                              from '../../../../../store/production-order/useProductionOrder'
import { usePagination }                       from '../../../../../components/Pagination/usePagination'
import { useAppBar }                           from '../../../../hooks/useAppBar'
import { queryVariablesForProductionOrders }   from '../../../../../graphql/variablesQ'
import {
  useInsertProductionOrderMutation,
  useProductionOrdersQuery,
  useUpdateProductionOrderMutation
}                                              from '../../../../../graphql/graphql'
import {
  faFileInvoice,
  faInfoCircle
}                                              from '@fortawesome/free-solid-svg-icons'
import { KeyboardEventCodes }                  from '../../../../../components/hooks/useExternalKeybaord'
import {
  NOT_FOUND_TRANSLATION,
  useTranslationFunction
}                                              from '../../../../../components/Translation/useTranslation'
import {
  formatDateLong,
  formatQuantity
}                                              from '../../../../utils/Utils'
import { TableHeaderRenderManageColumns }      from '../../../../../components/Table/render/HeaderRender'
import { SpinnerLoadingCenter }                from '../../../../../components/Spinner/SpinnerLoading'
import DivExternalKeyboardRoot                 from '../../../../../components/hooks/DivParentExternalKeybardRoot'
import { FontAwesomeIcon }                     from '@fortawesome/react-fontawesome'
import Table                                   from '../../../../../components/Table/Table'
import {
  CONSTANT_MODEL,
  PRODUCTION_ORDER_MAIN_TABLE_NAME
}                                              from '../../../../constants'
import ProductionOrderFilter                   from './Filter'
import StatusRender                            from '../../_common/StatusRender'
import ProductionOrderTableActionCell          from '../../_common/ProductionOrderTableActionCell'
import { openDialogProductionOrderHeaderForm } from '../instance/header/Form'
import { processErrorGraphQL }                 from '../../../../../apollo'
import { openDialogPreviewProductionOrder }    from '../../preview/Preview'
import { openDialogProductionOrderPrint }      from '../../pdf/Pdf'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                              from '../../../../../components/EasyModel/EasyModal'
import {
  CenteredDialog,
  DialogComponentQuestions
}                                              from '../../../../../components/Dialog/DialogBasic'

const productionOrderMainTableHeader = [
  {
    label: '#',
    field: 'position',
    cell: {
      classes: ['hw-table-cell-center'],
    }
  },
  {
    field: 'date',
    label: 'LABEL_DATE',
    cell: {
      classes: ['hw-table-cell-center'],
      format: (value: string) => {
        return formatDateLong(value)
      },
      style: {
        maxWidth: 150
      }
    }
  },
  {
    label: 'Number',
    field: 'number',
    cell: {
      classes: ['hw-table-cell-center'],
      style: {
        maxWidth: 150
      }
    }
  },
  {
    field: 'item',
    label: 'Item',
    cell: {
      classes: ['hw-table-cell-center'],
      style: {
        minWidth: 250
      },
      format: (value: any) => value?.shortName?.length > 0 ? value?.shortName : value?.fullName
    }
  },
  {
    field: 'quantity',
    label: 'Quantity',
    cell: {
      classes: ['hw-table-cell-right'],
      format: (value: string) => {
        return formatQuantity(value)
      }
    }
  },

  {
    label: 'STATUS',
    field: 'status',
    cell: {
      classes: ['hw-table-cell-right'],
      render: StatusRender
    }
  },
  {
    field: 'act',
    notHide: true,
    notResize: true,
    cell: {
      classes: ['hw-table-cell-center'],
      style: {
        width: '90px'
      },
      render: ProductionOrderTableActionCell,
    },
    width: '50px',
    render: TableHeaderRenderManageColumns
  }
]

const ProductionOrderTable = () => {
  const { translate } = useTranslationFunction()
  const { productionOrder } = useProductionOrder()
  const { item, dateFrom, dateTo, status } = productionOrder || {}
  const { data: pagData, setBackendPaginationData, handlerEvent: handlerEventPagination } = usePagination()
  const { perPage: pagPerPage, page: pagPage, numItems: pagNumItems } = pagData
  const [tableSettings, setTableSettings] = useState({})
  const { setButtonsForPage, clearButtonsForPage } = useAppBar()
  const { addTab } = useProductionOrderTabs()
  const [mutationInsertProductionOrder] = useInsertProductionOrderMutation()
  const [mutationUpdateProductionOrder] = useUpdateProductionOrderMutation()

  const qVariablesProductionOrders = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() - 15)
    const options = Object.assign({
      dateFrom: dateFrom ? dateFrom : date,
      dateTo: dateTo ? dateTo : new Date(),
      status: status ? status : undefined
    }, item ? { itemId: item.id } : {})

    const offset = ((pagPage || 1) - 1) * (pagPerPage || 20)
    return queryVariablesForProductionOrders(offset, pagPerPage || 20, options)
  },[pagPerPage, pagPage, dateFrom, dateTo, status])

  const { data, loading, refetch: refetchProductionOrders } = useProductionOrdersQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: qVariablesProductionOrders,
    onCompleted: (data) => {
      if (!data || !data.data || !data.data.items) {
        return
      }
      const { page, count } = data.data
      setBackendPaginationData(page || 1, count)
    }
  })

  const paginationData = React.useMemo(() => {
    return {
      perPage: pagPerPage || 20,
      page: pagPage || 1,
      totalItems: pagNumItems || 0
    }
  }, [pagPerPage, pagPage, pagNumItems])
  
  const tableData = useMemo(() => !data || !data.data.items || data.data.items.length === 0 ? [] : 
    data.data.items.map((x:any,index: number) => ({
      ...x,
      position: index + 1
    })),[data])

  const handlerCreateProductionOrder = async (productionOrder: any) => {
    mutationInsertProductionOrder({
      variables: {
        data: productionOrder
      }
    })
      .then((v) => {
        if (v && v.data && v.data.productionOrder && v.data.productionOrder.id) {
          addTab(v.data.productionOrder.id)
          refetchProductionOrders().then()
        }
      })
      .catch(e => {
        processErrorGraphQL(e,{})
      })
  }

  const handlerDeleteProductionOrder = async (id: number) => {
    await mutationUpdateProductionOrder({
      variables: {
        id,
        data: {
          status: CONSTANT_MODEL.PRODUCTION_ORDER.DELETED
        }
      }
    })
      .then((v) => {
        if (v && v.data && v.data.productionOrder && v.data.productionOrder.id) {
          refetchProductionOrders().then()
        }
      })
      .catch(e => {
        processErrorGraphQL(e,{})
      })
  }

  useEffect(() => {
    const id = setButtonsForPage([
      {
        label: 'prod. order',
        icon: faFileInvoice,
        shortcut: KeyboardEventCodes.F4,
        onClick: () => openDialogProductionOrderHeaderForm({
          handlerSuccess: handlerCreateProductionOrder
        })
      }
    ])
    return () => clearButtonsForPage(id)
  }, [setButtonsForPage, clearButtonsForPage, translate])

  const handlerDataEventClick = (event: any, id: any, action: any, param: any) => {
    if (action === 'edit') {
      if (!id) {
        return
      }
      addTab(id as string)
      return
    }
    
    if (action === 'preview') {
      id && openDialogPreviewProductionOrder( {
        productionOrderId : id
      } )
      return
    }

    if (action === 'print') {
      id && openDialogProductionOrderPrint({
        productionOrderId: id
      })
      return
    }

    if (action === 'delete') {
      if (!id) {
        return
      }
      const actionConfirm = () => {
        handlerDeleteProductionOrder(Number(id)).then()
      }
      openDialogDeleteProductionOrder({
        actionConfirm
      })
      return
    }
    
  }

  const handlerTableSettingsChanged = React.useCallback((settings: any) => {
    setTableSettings({ ...settings })
  }, [setTableSettings])

  const tableHeader = React.useMemo(() => {
    if (!productionOrderMainTableHeader) {
      return []
    }
    return productionOrderMainTableHeader.map((x: any) => {
      const translated =  x.label && x.label !== '#' ? translate(x.label) : NOT_FOUND_TRANSLATION
      return {
        ...x,
        label: translated !== NOT_FOUND_TRANSLATION ? translated : x.label
      }
    })
  }, [productionOrderMainTableHeader])

  return (
    <>
      {loading ? <SpinnerLoadingCenter/> : null}
      <DivExternalKeyboardRoot className={'d-flex flex-column flex-fill  letter-spacing hw-find-item-root h-100 px-2 '}>
        <div className={'d-flex flex-row align-items-center pb-1'}>
          <div className={'color-primary pt-1'}><FontAwesomeIcon className={'pr-2 font-smaller-5 '} style={{ fontSize: 20 }} icon={faInfoCircle}/></div>
          <div className={'color-primary font-smaller-5 text-upper'}>Production orders</div>
        </div>
        <ProductionOrderFilter />
        <div className={'pt-3 m-0 hw-calculation-table-preview h-100'}>
          <Table
              tableName={PRODUCTION_ORDER_MAIN_TABLE_NAME}
              header={tableHeader}
              handlerEventPagination={handlerEventPagination}
              data={tableData}
              separator={'cell'}
              handlerEventDataClick={handlerDataEventClick}
              handlerEventSettingsChanged={handlerTableSettingsChanged}
              paginationData={paginationData}
              scrollable
          />
        </div>
      </DivExternalKeyboardRoot>
    </>
  )
}

export default ProductionOrderTable

export const openDialogDeleteProductionOrder = ({ actionConfirm }: { actionConfirm: ()=> void }) => {
  EasyDialogApolloProvider((closeDialog: ()=> any, openDialog: (data: any)=> any) => {

    const Component = () => {

      const messages: string[] = React.useMemo(() => [
        'Are you sure you want to delete production order? '
      ], [])

      const handlerConfirm = async () => {
        await actionConfirm()
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
    openDialog(<DialogModalRootComponent name={'dialog-production-order-delete-470707047004404'} closeFn={closeDialog}>
      <CenteredDialog
          title={'DELETE PRODUCTION ORDER'}
          closeAction={closeDialog}
          Component={Component}
      />
    </DialogModalRootComponent>)
  })
}
