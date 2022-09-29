import React, {
  useCallback,
  useEffect,
  useState
} from 'react'
import { FontAwesomeIcon }                     from '@fortawesome/react-fontawesome'
import {
  faFileInvoice,
  faInfoCircle
}                                              from '@fortawesome/free-solid-svg-icons'
import { useAppBar }                           from '../../hooks/useAppBar'
import { KeyboardEventCodes }                  from '../../../components/hooks/useExternalKeybaord'
import {
  useBankTransaction,
  useBankTransactionTabs
}                                              from '../../../store/bank-transaction/useBankTransaction'
import BankTransactionFilter                   from './view/Filter'
import Table                                   from '../../../components/Table/Table'
import {
  BANK_TRANSACTION_TABLE_NAME,
  CONSTANT_MODEL
} from '../../constants'
import { usePagination }                       from '../../../components/Pagination/usePagination'
import { queryVariablesForBankTransactions }   from '../../../graphql/variablesQ'
import {
  useBankHeaderTransactionsQuery,
  useInsertBankHeaderTransactionsMutation,
  useUpdateBankHeaderTransactionsMutation
} from '../../../graphql/graphql'
import { TBankHeaderTransactionType }          from '../../../graphql/type_logic/types'
import {
  BankHeaderTransactionTableActionCell,
  RendersBankHeaderTransactionDocument
}                                              from './_common/RendersBanksHeaderTransactions'
import { TableHeaderRenderManageColumns }      from '../../../components/Table/render/HeaderRender'
import {
  formatDateShort,
  formatPrice
}                                              from '../../utils/Utils'
import { processErrorGraphQL }                 from '../../../apollo'
import { openDialogPreviewBankTransaction }    from './preview/Preview'
import { SpinnerLoadingCenter }                from '../../../components/Spinner/SpinnerLoading'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                              from '../../../components/EasyModel/EasyModal'
import {
  CenteredDialog,
  DialogComponentQuestions
}                                              from '../../../components/Dialog/DialogBasic'
import DivExternalKeyboardRoot                 from '../../../components/hooks/DivParentExternalKeybardRoot'
import { openDialogBankHeaderTransactionForm } from './form/header/Form'

export const bankTransactionTableHeader = [
  {
    label: '#',
    field: 'position',
    cell: {
      classes: ['hw-table-cell-center'],
    }
  },
  {
    label: 'Date',
    field: 'dateProcessed',
    cell: {
      classes: ['hw-table-cell-center'],
      format: (value : any) => formatDateShort(`${value}`)
    }
  },
  {
    label: 'Account',
    field: 'bankAccount.account',
    cell: {
      classes: ['hw-table-cell-center'],
    }
  },
  {
    label: 'Document',
    field: 'document',
    cell: {
      classes: ['hw-table-cell-center'],
      render: RendersBankHeaderTransactionDocument
    }
  },
  {
    label: 'Fin. IN',
    field: 'inFinance',
    cell: {
      classes: ['hw-table-cell-right'],
      format: (value : any) => formatPrice(value as string)
    }
  },
  {
    label: 'Fin. OUT',
    field: 'outFinance',
    cell: {
      classes: ['hw-table-cell-right'],
      format: (value : any) => formatPrice(value as string)
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
        width: '80px'
      },
      render: BankHeaderTransactionTableActionCell
    },
    width: '30px',
    render: TableHeaderRenderManageColumns
  }
]

const BankTransactionDashboard = () => {

  const { addTab } = useBankTransactionTabs()
  const {bankTransaction} = useBankTransaction()
  const [mutationInsertBankTransactions] = useInsertBankHeaderTransactionsMutation()
  const [mutationUpdateBankTransaction] = useUpdateBankHeaderTransactionsMutation()

  const {dateFrom, dateTo, customer, bankAccountId} = bankTransaction || {}
  const {data: pagData, setBackendPaginationData, handlerEvent: handlerEventPagination} = usePagination()
  const {perPage: pagPerPage, page: pagPage, numItems: pagNumItems} = pagData
  const [tableSettings, setTableSettings] = useState({})
  const {setButtonsForPage, clearButtonsForPage} = useAppBar()

  const queryVariablesBankTransactions = React.useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() - 15)
    const options = Object.assign({
      dateFrom: dateFrom ? dateFrom : date,
      dateTo: dateTo ? dateTo : new Date()
    }, customer ? {customerId: customer.id} : {}, bankAccountId ? {bankAccountId: bankAccountId} : {})
    const offset = ((pagPage || 1) - 1) * (pagPerPage || 20)
    return queryVariablesForBankTransactions(offset, pagPerPage || 20, options)
  }, [pagPerPage, pagPage, dateTo, dateFrom, customer, bankAccountId])

  const {data, loading, refetch: refetchBankTransactions} = useBankHeaderTransactionsQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: queryVariablesBankTransactions,
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

  const bankTransactions = React.useMemo(() => !data || !data.data.items || data.data.items.length === 0 ? [] :
    data.data.items.map((item : any, index : number) => {
      return {
        ...item,
        position: index + 1,
        inFinance: item.financeOwes,
        outFinance: item.financeClaims
      }
    })
  , [data])

  const handlerInsertBankTransactions =  useCallback((bankHeaderTransaction : TBankHeaderTransactionType) => {
    mutationInsertBankTransactions({
      variables: {
        data: bankHeaderTransaction as any
      }
    })
      .then((v) => {
        if (v.data && v.data.bankHeaderTransaction.id) {
          addTab(v.data.bankHeaderTransaction.id)
        }
        refetchBankTransactions().then()
      })
      .catch(e => {
        processErrorGraphQL(e)
      })
  },[addTab, mutationInsertBankTransactions, refetchBankTransactions])

  const handlerUndoBankTransactions = (id : string) => {

    /** delete bank transactions mutation add */
    mutationUpdateBankTransaction({
      variables: {
        id: Number(id),
        data: {
          status: CONSTANT_MODEL.BANK_TRANSACTION_STATUS.DELETED
        }
      }
    })
      .then((v) => {
        refetchBankTransactions().then()
      })
      .catch(e => {
        processErrorGraphQL(e)
      })
  }
  
  useEffect(() => {
    const id = setButtonsForPage([
      {
        label: 'New Trans',
        icon: faFileInvoice,
        shortcut: KeyboardEventCodes.F4,
        onClick: () => openDialogBankHeaderTransactionForm({
          handlerSuccess: handlerInsertBankTransactions
        })
      }
    ])
    return () => clearButtonsForPage(id)
  }, [setButtonsForPage, clearButtonsForPage])

  const handlerTableSettingsChanged = React.useCallback((settings : any) => {
    setTableSettings({...settings})
  }, [setTableSettings])

  const handlerDataEventClick = (event : any, id : any, action : any, param : any) => {
    if (action === 'preview') {
      if (!id) {
        return
      }
      openDialogPreviewBankTransaction({
        bankHeaderTransactionId: id
      })
    }
    
    if ( action === 'edit' && id) {
      addTab(id as string)
    }

    if (action === 'delete') {
      if (!id) {
        return
      }
      openDialogDeleteBankTransaction({
        actionConfirm: handlerUndoBankTransactions,
        id
      })
    }
  }

  return (
    <>
      {loading ? <SpinnerLoadingCenter /> : null}
      <DivExternalKeyboardRoot className={'d-flex flex-column flex-fill letter-spacing h-100 px-5 py-1'}>
        <div className={'d-flex flex-row align-items-center pb-1'}>
          <div className={'color-primary pt-1'}><FontAwesomeIcon className={'pr-2 font-smaller-5 '} style={{fontSize: 20}} icon={faInfoCircle}/></div>
          <div className={'color-primary font-smaller-5'}>BANK TRANSACTION</div>
        </div>
        <BankTransactionFilter/>
        <div className={'pt-3 m-0 overflow-hidden h-100'}>
          <Table
                        tableName={BANK_TRANSACTION_TABLE_NAME}
                        header={bankTransactionTableHeader}
                        handlerEventPagination={handlerEventPagination}
                        data={bankTransactions}
                        separator={'cell'}
                        handlerEventDataClick={handlerDataEventClick}
                        handlerEventSettingsChanged={handlerTableSettingsChanged}
                        paginationData={paginationData}
                        scrollable
                        additionalData={bankTransactions}
          />
        </div>
      </DivExternalKeyboardRoot>
    </>
  )
}

export default BankTransactionDashboard

export const openDialogDeleteBankTransaction = ({actionConfirm,id} : { actionConfirm : (data : any) => void , id : string}) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      const messages : string[] = React.useMemo(() => [
        'Are you sure you want to undo this bank transaction document? '
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
    openDialog(<DialogModalRootComponent name={'dialog-bank-transaction-undo-345740707440747'} closeFn={closeDialog}>
      <CenteredDialog
          title={'UNDO BANK TRANSACTION'}
          closeAction={closeDialog}
          Component={Component}
      />
    </DialogModalRootComponent>)
  })
}