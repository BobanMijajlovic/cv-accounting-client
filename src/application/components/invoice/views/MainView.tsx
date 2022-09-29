import React, {
  useEffect,
  useRef,
  useState
} from 'react'
import {
  useInvoice,
  useInvoiceTabs
}                                         from '../../../../store/invoice/useInvoice'
import { usePagination }                  from '../../../../components/Pagination/usePagination'
import {
  useInsertInvoiceMutation,
  useInvoicesQuery,
  useUpdateInvoiceMutation
}                                         from '../../../../graphql/graphql'
import { useAppBar }                      from '../../../hooks/useAppBar'
import { queryVariablesForInvoices }      from '../../../../graphql/variablesQ'
import {
  formatDateLong,
  formatPrice
}                                         from '../../../utils/Utils'
import {
  faFileInvoice,
  faInfoCircle
}                                         from '@fortawesome/free-solid-svg-icons'
import { KeyboardEventCodes }             from '../../../../components/hooks/useExternalKeybaord'
import { openDialogInvoiceHeaderForm }    from '../form/header/Form'
import { TableHeaderRenderManageColumns } from '../../../../components/Table/render/HeaderRender'
import StatusRender                       from '../_common/StatusRender'
import InvoiceTableActionCell             from '../_common/InvoiceTableActionCell'
import { SpinnerLoadingCenter }           from '../../../../components/Spinner/SpinnerLoading'
import { FontAwesomeIcon }                from '@fortawesome/react-fontawesome'
import Table                              from '../../../../components/Table/Table'
import InvoiceTableSearch                 from './Filter'
import { openDialogPreviewInvoice }       from '../preview/Preview'
import { openDialogInvoicePrint }         from '../pdf/Pdf'
import _                                  from 'lodash'
import DivExternalKeyboardRoot            from '../../../../components/hooks/DivParentExternalKeybardRoot'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                         from '../../../../components/EasyModel/EasyModal'
import {
  CenteredDialog,
  DialogComponentQuestions
}                                         from '../../../../components/Dialog/DialogBasic'
import { CONSTANT_INVOICE }               from '../../../constants'
import { processErrorGraphQL }            from '../../../../apollo'
import { useTranslationFunction }         from '../../../../components/Translation/useTranslation'
import { faEdit }                         from '@fortawesome/free-regular-svg-icons'

const InvoiceTable = () => {
  const { translate } = useTranslationFunction()
  const { invoice } = useInvoice()
  const { dateFrom, dateTo, customer, status } = invoice || {}
  const { data: pagData, setBackendPaginationData, handlerEvent: handlerEventPagination } = usePagination()
  const { perPage: pagPerPage, page: pagPage, numItems: pagNumItems } = pagData
  const [mutationInsertInvoice] = useInsertInvoiceMutation()
  const [mutationUpdateInvoice] = useUpdateInvoiceMutation()
  const [tableSettings, setTableSettings] = useState({})
  const { setButtonsForPage, clearButtonsForPage } = useAppBar()
  const { addTab } = useInvoiceTabs()

  const queryVariablesInvoices = React.useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() - 15)
    const options = Object.assign({
      dateFrom: dateFrom ? dateFrom : date,
      dateTo: dateTo ? dateTo : new Date(),
      status: status ? status : undefined
    }, customer ? { customerId: customer.id } : {})

    const offset = ((pagPage || 1) - 1) * (pagPerPage || 20)
    return queryVariablesForInvoices(offset, pagPerPage || 20, options)
  }, [pagPerPage, pagPage, customer, dateFrom, dateTo, status])

  const { data, loading, refetch: refetchInvoice } = useInvoicesQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: queryVariablesInvoices,
    onCompleted: (data) => {
      if (!data || !data.data || !data.data.items) {
        return
      }
      const { page, count } = data.data
      setBackendPaginationData(page || 1, count)
    },
  })

  const paginationData = React.useMemo(() => {
    return {
      perPage: pagPerPage || 20,
      page: pagPage || 1,
      totalItems: pagNumItems || 0
    }
  }, [pagPerPage, pagPage, pagNumItems])

  const tableData = React.useMemo(() => !data || !data.data.items || data.data.items.length === 0 ? [] :
    data.data.items.map((x: any, index: number) => {
      return {
        ...x,
        position: index + 1,
        totalFinanceMP: _.round(_.add(Number(x.totalFinanceVP), Number(x.totalFinanceTax)), 2)
      }
    })
  , [data])

  const handlerCreateInvoice = React.useCallback(async (invoice: any) => {
    await mutationInsertInvoice({
      variables: {
        data: invoice
      }
    }).then((v) => {
      if (v.data && v.data.invoice.id) {
        addTab(v.data.invoice.id)
      }
      refetchInvoice().then()
    })
  }, [addTab, mutationInsertInvoice, refetchInvoice])

  useEffect(() => {
    const id = setButtonsForPage([
      {
        label: translate('LABEL_INVOICE_ADD_BUTTON'),
        icon: faFileInvoice,
        shortcut: KeyboardEventCodes.F4,
        onClick: () => openDialogInvoiceHeaderForm({
          handlerSuccess: handlerCreateInvoice
        })
      }
    ])
    return () => clearButtonsForPage( id )
  }, [setButtonsForPage, clearButtonsForPage, handlerCreateInvoice, translate])

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
      label: 'INVOICE_MAIN_TABLE_TH_INVOICE_NUMBER',
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
      label: 'LABEL_CUSTOMER_NAME',
      cell: {
        classes: ['hw-table-cell-center'],
        style: {
          minWidth: 250
        },
        format: (value: any) => value?.shortName?.length > 0 ? value?.shortName : value?.fullName
      }
    },
    {
      field: 'totalFinanceVP',
      label: 'INVOICE_MAIN_TABLE_TH_FINANCE_VP',
      cell: {
        classes: ['hw-table-cell-right'],
        format: (value: string) => {
          return formatPrice(value)
        }
      }
    },
    {
      field: 'totalFinanceTax',
      label: 'INVOICE_MAIN_TABLE_TH_TAX_FINANCE',
      cell: {
        classes: ['hw-table-cell-right'],
        format: (value: string) => {
          return formatPrice(value)
        }
      }
    },
    {
      field: 'totalFinanceMP',
      label: 'INVOICE_MAIN_TABLE_TH_FINANCE_MP',
      cell: {
        classes: ['hw-table-cell-right'],
        format: (value: string) => {
          return formatPrice(value)
        }
      }
    },
    {
      label: 'LABEL_STATUS',
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
        render: InvoiceTableActionCell,
      },
      width: '50px',
      render: TableHeaderRenderManageColumns
    }
  ]

  const handlerCancelInvoice = (id: string) => {
    mutationUpdateInvoice({
      variables: {
        id: Number(id),
        data: {
          status: CONSTANT_INVOICE.STATUS.CANCELED
        }
      }
    })
      .then(() => {
        refetchInvoice().then()
      })
      .catch(e => {
        processErrorGraphQL(e, {})
      })
  }

  const handlerDataEventClick = (event: any, id: any, action: any, param: any) => {
    if (action === 'preview') {
      if (!id) {
        return
      }
      openDialogPreviewInvoice({
        invoiceId: id
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
      openDialogInvoicePrint({ invoiceId: id, tableSettings })
    }

    if (action === 'cancel') {
      if (!id) {
        return
      }
      const actionConfirm = () => {
        handlerCancelInvoice(id)
      }
      openDialogCancelInvoice({ actionConfirm })
      // console.log('cancel invoice action')
    }
  }

  const handlerTableSettingsChanged = React.useCallback((settings: any) => {
    setTableSettings({ ...settings })
  }, [setTableSettings])

  const tableHeader = React.useMemo(() => {
    if (!header) {
      return []
    }
    return header.map((x: any) => {
      return {
        ...x,
        label: x.label && x.label !== '#' ? translate(x.label) : x.label
      }
    })
  }, [header])
  
  const onClick = () => {
    addTab('102')
  }

  return (
    <>
      {loading ? <SpinnerLoadingCenter/> : null}
      <DivExternalKeyboardRoot className={'d-flex flex-column flex-fill  letter-spacing hw-find-item-root h-100 px-2 '}>
        <div className={'d-flex flex-row align-items-center pb-1'}>
          <div className={'color-primary pt-1'}><FontAwesomeIcon className={'pr-2 font-smaller-5 '} style={{ fontSize: 20 }} icon={faInfoCircle}/></div>
          <div className={'color-primary font-smaller-5 text-upper'}>{translate('INVOICE_MAIN_VIEW_TABLE_INFO_TEXT')}</div>
        </div>
        <InvoiceTableSearch/>
        <FontAwesomeIcon onClick={onClick} className={'color-primary-hover'} icon={faEdit} data-sub-action={'edit'}/>
        <div className={'pt-3 m-0 hw-calculation-table-preview h-100'}>
          <Table
            tableName={'invoice-table-84932jm4k32j42j4h324'}
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

export default InvoiceTable

export const openDialogCancelInvoice = ({ actionConfirm }: { actionConfirm: ()=> void }) => {
  EasyDialogApolloProvider((closeDialog: ()=> any, openDialog: (data: any)=> any) => {

    const Component = () => {

      const messages: string[] = React.useMemo(() => [
        'Are you sure you want to cancel invoice? '
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
    openDialog(<DialogModalRootComponent name={'dialog-invoice-cancel-789731532101'} closeFn={closeDialog}>
      <CenteredDialog
        title={'CANCEL INVOICE'}
        closeAction={closeDialog}
        Component={Component}
      />
    </DialogModalRootComponent>)
  })
}
