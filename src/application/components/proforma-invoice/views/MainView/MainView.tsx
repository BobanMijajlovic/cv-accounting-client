import React, {
  useEffect,
  useState
}                                              from 'react'
import {
  faFileInvoice,
  faInfoCircle
}                                              from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon }                     from '@fortawesome/react-fontawesome'
import ProformaInvoiceFilter                   from './Filter'
import _                                       from 'lodash'
import {
  CONSTANT_PROFORMA_INVOICE,
  PROFORMA_INVOICE_TABLE_NAME
}                                              from '../../../../constants'
import {
  useInsertProformaInvoiceMutation,
  useProformaInvoicesQuery,
  useUpdateProformaInvoiceMutation
}                                              from '../../../../../graphql/graphql'
import {
  useProformaInvoice,
  useProformaInvoiceTabs
}                                              from '../../../../../store/proforma-invoice/useProformaInvoice'
import { usePagination }                       from '../../../../../components/Pagination/usePagination'
import { useAppBar }                           from '../../../../hooks/useAppBar'
import { queryVariablesForProformaInvoices }   from '../../../../../graphql/variablesQ'
import { KeyboardEventCodes }                  from '../../../../../components/hooks/useExternalKeybaord'
import {
  formatDateLong,
  formatPrice
}                                              from '../../../../utils/Utils'
import { TableHeaderRenderManageColumns }      from '../../../../../components/Table/render/HeaderRender'
import { SpinnerLoadingCenter }                from '../../../../../components/Spinner/SpinnerLoading'
import DivExternalKeyboardRoot                 from '../../../../../components/hooks/DivParentExternalKeybardRoot'
import Table                                   from '../../../../../components/Table/Table'
import { openDialogProformaInvoiceHeaderForm } from '../InstanceView/header/Form'
import { openDialogPreviewProformaInvoice }    from '../../preview/Preview'
import ProformaInvoiceTableActionCell          from '../../_comman/InvoiceTableActionCell'
import StatusRender                            from '../../_comman/StatusRender'
import { processErrorGraphQL }                 from '../../../../../apollo'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                              from '../../../../../components/EasyModel/EasyModal'
import {
  CenteredDialog,
  DialogComponentQuestions
}                                              from '../../../../../components/Dialog/DialogBasic'
import { openDialogProformaInvoicePrint }      from '../../pdf/Pdf'

const ProformaInvoiceTable = () => {
  const {proformaInvoice} = useProformaInvoice()
  const {dateFrom, dateTo, customer} = proformaInvoice || {}
  const {data: pagData, setBackendPaginationData, handlerEvent: handlerEventPagination} = usePagination()
  const {perPage: pagPerPage, page: pagPage, numItems: pagNumItems} = pagData
  const [mutationInsertInvoice] = useInsertProformaInvoiceMutation()
  const [mutationCancelProformaInvoice] = useUpdateProformaInvoiceMutation()
  const [tableSettings, setTableSettings] = useState({})
  const {setButtonsForPage, clearButtonsForPage} = useAppBar()
  const {addTab} = useProformaInvoiceTabs()

  const queryVariablesInvoices = React.useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() - 15)
    const options = Object.assign({
      dateFrom: dateFrom ? dateFrom : date,
      dateTo: dateTo ? dateTo : new Date()
    }, customer ? {customerId: customer.id} : {})

    const offset = ((pagPage || 1) - 1) * (pagPerPage || 20)
    return queryVariablesForProformaInvoices(offset, pagPerPage || 20, options)
  }, [pagPerPage, pagPage, customer, dateFrom, dateTo])

  const {data, loading, refetch: refetchInvoice} = useProformaInvoicesQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: queryVariablesInvoices,
    onCompleted: (data : any) => {
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
      totalItems: pagNumItems || 0
    }
  }, [pagPerPage, pagPage, pagNumItems])

  const tableData = React.useMemo(() => !data || !data.data.items || data.data.items.length === 0 ? [] :
    data.data.items.map((x : any, index : number) => {
      return {
        ...x,
        position: index + 1,
        totalFinanceMP: _.round(_.add(Number(x.totalFinanceVP), Number(x.totalFinanceTax)), 2)
      }
    })
  , [data])

  const handlerCreateInvoice = React.useCallback(async (invoice : any) => {
    await mutationInsertInvoice({
      variables: {
        data: invoice
      }
    }).then((v) => {
      if (v.data && v.data.proformaInvoice.id) {
        addTab(v.data.proformaInvoice.id)
      }
      refetchInvoice().then()
    })
  }, [addTab, mutationInsertInvoice, refetchInvoice])

  useEffect(() => {
    const id = setButtonsForPage([
      {
        label: 'New Invoice',
        icon: faFileInvoice,
        shortcut: KeyboardEventCodes.F4,
        onClick: () => openDialogProformaInvoiceHeaderForm({
          handlerSuccess: handlerCreateInvoice
        })
      }
    ])
    return () => clearButtonsForPage(id)
  }, [setButtonsForPage, clearButtonsForPage, handlerCreateInvoice])

  const header = [
    {
      label: '#',
      field: 'position',
      cell: {
        classes: ['hw-table-cell-center'],
      }
    },
    {
      field: 'date',
      label: 'Date',
      cell: {
        classes: ['hw-table-cell-center'],
        format: (value : string) => {
          return formatDateLong(value)
        },
        style: {
          maxWidth: 150
        }
      }
    },
    {
      label: 'Invoice number',
      field: 'number',
      cell: {
        classes: ['hw-table-cell-center'],
        style: {
          maxWidth: 150
        }
      }
    },
    {
      field: 'customer',
      label: 'Customer',
      cell: {
        classes: ['hw-table-cell-center'],
        style: {
          minWidth: 250
        },
        format: (value : any) => {
          return value.shortName ? value.shortName : value.fullName
        }
      }
    },
    {
      field: 'invoice',
      label: 'Invoice',
      cell: {
        classes: ['hw-table-cell-center'],
        format: (value : any) => value ? value.number : ''
      }
    },
    {
      field: 'totalFinanceVP',
      label: 'Finance VP',
      cell: {
        classes: ['hw-table-cell-center'],
        format: (value : string) => {
          return formatPrice(value)
        }
      }
    },
    {
      field: 'totalFinanceTax',
      label: 'Tax finance',
      cell: {
        classes: ['hw-table-cell-center'],
        format: (value : string) => {
          return formatPrice(value)
        }
      }
    },
    {
      field: 'totalFinanceMP',
      label: 'Finance MP',
      cell: {
        classes: ['hw-table-cell-center'],
        format: (value : string) => {
          return formatPrice(value)
        }
      }
    },
    {
      label: 'Status',
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
          width: '100px'
        },
        render: ProformaInvoiceTableActionCell,
      },
      width: '100px',
      render: TableHeaderRenderManageColumns
    }
  ]
  
  const handlerCancelProformaInvoice = (id : string) => {
    mutationCancelProformaInvoice({
      variables: {
        id: Number(id),
        data: {
          status: CONSTANT_PROFORMA_INVOICE.STATUS.CANCELED
        }
      }
    })
      .then(() => {
        refetchInvoice().then()
      })
      .catch(e => {
        processErrorGraphQL(e)
      })
  }

  const handlerDataEventClick = (event : any, id : any, action : any, param : any) => {
    if (action === 'preview') {
      if (!id) {
        return
      }
      openDialogPreviewProformaInvoice({
        proformaInvoiceId: id
      })
    }
    if (action === 'edit') {
      if (!id) {
        return
      }
      addTab(id as string)
    }
    if (action === 'print') {
      if (!id) {
        return
      }
      openDialogProformaInvoicePrint({proformaInvoiceId: id, tableSettings})
    }

    if (action === 'cancel') {
      if (!id) {
        return
      }
      openDialogCancelProformaInvoice({
        actionConfirm: handlerCancelProformaInvoice,
        id
      })
    }
  }

  const handlerTableSettingsChanged = React.useCallback((settings : any) => {
    setTableSettings({...settings})
  }, [setTableSettings])

  return (
    <>
      {loading ? <SpinnerLoadingCenter/> : null}
      <DivExternalKeyboardRoot className={'d-flex flex-column flex-fill  letter-spacing hw-find-item-root h-100 px-2 '}>
        <div className={'d-flex flex-row align-items-center pb-1'}>
          <div className={'color-primary pt-1'}><FontAwesomeIcon className={'pr-2 font-smaller-5 '} style={{fontSize: 20}} icon={faInfoCircle}/></div>
          <div className={'color-primary font-smaller-5'}>PROFORMA INVOICES INFO</div>
        </div>
        <ProformaInvoiceFilter/>
        <div className={'pt-3 m-0 hw-calculation-table-preview h-100'}>
          <Table
                        tableName={PROFORMA_INVOICE_TABLE_NAME}
                        header={header}
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

export default ProformaInvoiceTable

export const openDialogCancelProformaInvoice = ({actionConfirm,id} : { actionConfirm : (id : string) => void, id : string }) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      const messages : string[] = React.useMemo(() => [
        'Are you sure you want to cancel this proforma invoice? '
      ], [])

      const handlerConfirm = async () => {
        await actionConfirm(id)
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
    openDialog(<DialogModalRootComponent name={'dialog-proforma-invoice-cancel-06501651056160'} closeFn={closeDialog}>
      <CenteredDialog
          title={'CANCEL PROFORMA INVOICE'}
          closeAction={closeDialog}
          Component={Component}
      />
    </DialogModalRootComponent>)
  })
}

