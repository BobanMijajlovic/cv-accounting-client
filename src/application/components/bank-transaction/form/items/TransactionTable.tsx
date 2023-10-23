import React, {
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import Table                              from '../../../../../components/Table/Table'
import {
  BANK_TRANSACTION_INSERT_FORM_TABLE_NAME,
  CONSTANT_MODEL
}                                         from '../../../../constants'
import { NumberCellColumnSmall }          from '../../../../../components/Table/render/CellRender'
import { TableHeaderRenderManageColumns } from '../../../../../components/Table/render/HeaderRender'
import BankTransactionTableActionCell, {
  RenderBankTransactionDates,
  RendersBankTransactionCustomerData
}                                         from './_common/RendersBankTransaction'
import { useBankTransactionForm }         from '../../../../../store/bank-transaction/useBankTransaction'
import { formatPrice }                    from '../../../../utils/Utils'
import AutoCompleteFindBankAccount        from '../../../autocomplete/AutoCompleteFindBankAccount'
import BankAccountViewShort               from '../../../banks/view/BankAccountView'
import { openDialogSetBankAccount }       from './form/SetBankAccount'
import { BankTransactionItemType }        from '../../../../../graphql/graphql'

interface ITransactionTableProps {
  bankHeaderTransactionId: string
}

export const bankTransactionTableInsertHeader = [
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
    label: 'Name',
    field: 'bankAccount',
    cell: {
      classes: ['text-left'],
      render: RendersBankTransactionCustomerData
    }
  },
  {
    label: 'Dates',
    field: 'datePaid',
    width: '70px',
    cell: {
      classes: ['text-center'],
      width: '70px',
      render: RenderBankTransactionDates
    }
  },
  {
    label: 'Out fin.',
    field: 'outFinance',
    cell: {
      classes: ['text-right','py-0'],
      format: (value: any) => formatPrice(value)
    }
  },
  {
    label: 'In fin.',
    field: 'inFinance',
    cell: {
      classes: ['text-right','py-0'],
      format: (value: any) => formatPrice(value)
    }
  },
  {
    label: 'Expense',
    field: 'expenses',
    cell: {
      classes: ['text-right','py-0'],
      format: (value: any) => formatPrice(value)
    }
  },
  {
    label: 'Code',
    field: 'transactionAdditionalData.code',
    cell: {
      width: '50px',
      classes: ['text-center']
    }
  },
  {
    label: 'Description',
    field: 'transactionAdditionalData.description',
    cell: {
      classes: ['text-left font-smaller-2']
    }
  },
  {
    label: 'Model',
    field: 'transactionAdditionalData.modelString',
    cell: {
      classes: ['text-left font-smaller-2']
    }
  },
  {
    label: 'Transaction',
    field: 'transactionAdditionalData.transactionKey',
    cell: {
      classes: ['text-left font-smaller-2']
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
        width: '60px'
      },
      render: BankTransactionTableActionCell
    },
    width: '30px',
    render: TableHeaderRenderManageColumns
  }
]

const summarize = {
  fields: ['datePaid','inFinance', 'outFinance']
}

const TransactionTable = ({bankHeaderTransactionId} : ITransactionTableProps) => {
  
  const { bankTransaction, updateBankTransactionItem, deleteBankTransactionItem, selectedBankTransactionItemId, setSelectBankTransactionItem} = useBankTransactionForm(bankHeaderTransactionId)
  const items = useMemo(() => bankTransaction && bankTransaction.bankTransactions && bankTransaction.bankTransactions.length !== 0 ? bankTransaction.bankTransactions : [] ,[bankTransaction])
  const tableRoot = useRef(null)
  const [tableSettings, setTableSettings] = useState({})
  const { IN, OUT } =  CONSTANT_MODEL.TAX_FINANCE_FLAG
    
  const tableData = React.useMemo(() => {
    if (!items) {
      return []
    }
    return items.map((item : any, index : number) => {
      return {
        ...item,
        inFinance: item.flag === IN ? item.finance : 0,
        outFinance: item.flag === OUT ? item.finance : 0,
        position: index + 1
      }
    })
  },[items, setSelectBankTransactionItem])

  const selectedRowIndex = useMemo(() => tableData.findIndex(x => x.id === selectedBankTransactionItemId),[selectedBankTransactionItemId])
  
  const handlerSetBankAccount = async (data: BankTransactionItemType, id: number) => {
    await updateBankTransactionItem(data,id)
  }
  
  const handlerDataEventClick = (event : any, id : any, action : any, param : any) => {

    if (!event.detail || event.detail !== 1) {
      return
    }

    if (action === 'table-cell-edit' && param === 'bankAccount' && id) {
      const transaction = bankTransaction && bankTransaction.bankTransactions && bankTransaction.bankTransactions.find(x => x.id === id)
      if (transaction && !transaction.bankAccount && !transaction.bankAccountId) {
        openDialogSetBankAccount(id,handlerSetBankAccount)
      }
      return
    }
    
    if (action === 'delete') {
      id && deleteBankTransactionItem(id)
      return
      // id && deleteFunc(id)
    }
    
    if (action === 'edit') {
      
      if (id) {
        setSelectBankTransactionItem(id)
        return
      }
      // const bankTransaction = tableData.find((x : any) => x.id === id)
     /* openDialogBankTransactionForm({
        bankTransactions: items,
        bankTransaction,
        submitFunc: editFunc
      })*/
    }
  }

  const handlerTableSettingsChanged = React.useCallback((settings : any) => {
    setTableSettings({...settings})
  }, [setTableSettings])

  return (
    <div  ref={tableRoot} className={'d-flex flex-1 calculation-items-table-root mb-1'}>
      <Table
            handlerEventDataClick={handlerDataEventClick}
            header={bankTransactionTableInsertHeader}
            separator={'cell'}
            data={tableData}
            handlerEventSettingsChanged={handlerTableSettingsChanged}
            tableName={BANK_TRANSACTION_INSERT_FORM_TABLE_NAME}
            additionalData={tableData}
            scrollable
            summarize={summarize}
            selectedRowIndex={selectedRowIndex}
      />
    </div>
  )
}

export default TransactionTable