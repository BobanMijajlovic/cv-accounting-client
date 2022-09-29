import React, {useRef}                    from 'react'
import {TBankTransactions}                from '../../../../graphql/type_logic/types'
import {LocalStorage}                     from '../../../utils/LocalStorage'
import {
  BANK_TRANSACTION_INSERT_FORM_TABLE_NAME,
  BANK_TRANSACTION_PREVIEW_TABLE_NAME,
  CONSTANT_MODEL,
  TABLE_SETTINGS_PREFIX
} from '../../../constants'
import {bankTransactionTableInsertHeader} from '../form/items/TransactionTable'
import Table                              from '../../../../components/Table/Table'

const summarize = {
  fields: ['datePaid', 'inFinance']
}

const Body = ({bankTransactions} : { bankTransactions : TBankTransactions[] }) => {
  const tableRoot = useRef(null)

  const tableSettings = React.useMemo(() => LocalStorage.getData(`${TABLE_SETTINGS_PREFIX}${BANK_TRANSACTION_INSERT_FORM_TABLE_NAME}`), [])
  const { IN, OUT } =  CONSTANT_MODEL.TAX_FINANCE_FLAG

  const tableData = React.useMemo(() => {
    if (!bankTransactions) {
      return []
    }
    return bankTransactions.map((_item : TBankTransactions,index : number) => {
      const item = _item as any
      return {
        ...item,
        bankAccount: {
          ...item.bankAccount,
          customer: {
            id: item.customer.id,
            shortName: item.customer.shortName
          }
        },
        inFinance: item.flag === IN ? item.finance : 0,
        outFinance: item.flag === OUT ? item.finance : 0,
        position: index + 1
      }
    })
  }, [bankTransactions])

  const tableHeader = React.useMemo(() => {
    const index : any = bankTransactionTableInsertHeader.findIndex(x => x.field === 'act')
    if (index === -1) {
      return bankTransactionTableInsertHeader
    }

    const header = [...bankTransactionTableInsertHeader].map(x => {
      return {
        ...x,
        notResize: true,
        cell: {
          ...x.cell,
          editor: void(0)
        }
      }
    })
    header[index] = {
      ...header[index],
      notVisible: true
    } as any
    header.splice(index, 1)
    return header.filter(x => {
      if (!tableSettings) {
        return true 
      }
      const f : any = tableSettings.find((y : any) => y.field === x.field)

      if (!f) {
        return true
      }
      return !f.notVisible
    }) as any
  }, [tableSettings])

  return (
    <div ref={tableRoot} className={'d-flex flex-1 calculation-items-table-root mb-1'}>
      <Table
            header={tableHeader}
            separator={'cell'}
            data={tableData}
            tableName={BANK_TRANSACTION_PREVIEW_TABLE_NAME}
            additionalData={tableData}
            summarize={summarize}
      />
    </div>
  )
}

export default Body