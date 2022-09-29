import React                                      from 'react'
import {
  TBankHeaderTransactions,
  TBankHeaderTransactionType
}                                                 from '../../../../../graphql/type_logic/types'
import _                                          from 'lodash'
import { formatPrice }                            from '../../../../utils/Utils'
import {
  BANK_TRANSACTION_BANK_ACCOUNT_BALANCE_TABLE_NAME,
  CONSTANT_MODEL
}                                                 from '../../../../constants'
import { useBankTransactionForm }                 from '../../../../../store/bank-transaction/useBankTransaction'
import { useTotalTransactionByAccountQuery }      from '../../../../../graphql/graphql'
import Table                                      from '../../../../../components/Table/Table'
import { RenderBankTransactionOwesClaimsExpense } from '../items/_common/RendersBankTransaction'
import { RenderBankTransactionOrderCountsColumn } from '../items/_common/RenderColumns'

interface IAccountBalanceProps {
  state : TBankHeaderTransactionType
  data ?: TBankHeaderTransactions
}

export const AccountBalanceTableHeader = [
  {
    label: 'Previous Balance',
    notHide: true,
    field: 'prevBalance',
    cell: {
      classes: ['text-center'],
      format: (value: any) => formatPrice(value)
    }
  },
  {
    label: 'IN FIN.',
    field: 'inFinance',
    cell: {
      classes: ['text-right'],
      format: (value: any) => formatPrice(value)
    }
  },
  {
    label: 'OUT FIN.',
    field: 'outFinance',
    cell: {
      classes: ['text-right'],
      format: (value: any) => formatPrice(value)
    }
  },
  {
    label: 'New Balance',
    field: 'newBalance',
    cell: {
      classes: ['text-center'],
      format: (value: any) => formatPrice(value)
    }
  },
  {
    label: 'IN Count',
    field: 'inCount',
    cell: {
      classes: ['text-center','py-0']
    }
  },
  {
    label: 'OUT Count',
    field: 'outCount',
    cell: {
      classes: ['text-center','py-0']
    }
  },
]

const AccountBalance = ({ bankHeaderTransactionId } : { bankHeaderTransactionId: string }) => {
  
  const { bankTransaction } =  useBankTransactionForm(bankHeaderTransactionId)
  
  const { bankAccountId, bankTransactions, financeOwes, financeClaims } = bankTransaction || {}

  const {data} = useTotalTransactionByAccountQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: {
      bankAccountId: Number(bankAccountId)
    },
    skip: !Number(bankAccountId)
  })
  const accountBalanceData = React.useMemo(() => data && data.bankAccountBalance ? data.bankAccountBalance : void(0), [data])

  const {IN,OUT} = CONSTANT_MODEL.TAX_FINANCE_FLAG

  const prevBalance = React.useMemo(() => accountBalanceData  ? _.round(_.subtract(Number(accountBalanceData.financeOwes),Number(accountBalanceData.financeClaims)),2) : 0,[accountBalanceData])
  const newBalance = React.useMemo(() =>  {
    if (!bankTransactions) {
      return prevBalance
    }
    const newState = prevBalance
    const transFinance = _.round(_.subtract(financeOwes || 0,financeClaims || 0),2)
    return  _.round(_.add(newState,transFinance),2)
  },[prevBalance, bankTransactions])

  const _bankTransactions = (bankTransactions as any)

  const inCount =  React.useMemo(() => _bankTransactions && _bankTransactions.length !== 0 ? _bankTransactions.reduce((acc:any,x:any) => x.flag === IN ? _.add(acc,1) : acc,0) : 0,[bankTransactions, IN])
  const outCount =  React.useMemo(() => _bankTransactions && _bankTransactions.length !== 0 ? _bankTransactions.reduce((acc:any,x:any) => x.flag === OUT ? _.add(acc,1) : acc,0) : 0,[bankTransactions, OUT])
  
  const tableData = [
    {
      prevBalance,
      inFinance: financeOwes,
      outFinance: financeClaims,
      newBalance,
      inCount,
      outCount
    }
  ]
  
  return (
    <div className={'d-flex flex-column relative pt-1 flex-1 font-smaller-4 text-upper hw-account-balance-table-root px-2'}>
      <div className={'font-smaller-5 color-primary text-upper absolute-left-top-3'}>
       Account Balance
      </div>
      <div  className={'d-flex flex-1  mb-1'}>
        <Table
            header={AccountBalanceTableHeader}
            separator={'cell'}
            data={tableData}
            tableName={BANK_TRANSACTION_BANK_ACCOUNT_BALANCE_TABLE_NAME}
            additionalData={tableData}
        />
      </div>
      {/* <div className={'d-flex flex-1 justify-content-between align-items-stretch  hw-account-balance-table-header font-smaller-5'}>
        <div className={'pt-2'}>Prev. Balance</div>
        <div className={'d-flex flex-column'}>
          <div className={'border-bottom'}>Daily</div>
          <div className={'d-flex justify-content-between align-items-center'}>
            <div>Claims</div>
            <div>Owes</div>
          </div>
        </div>
        <div className={'pt-2'}>New Balance</div>
        <div className={'d-flex flex-column'}>
          <div className={'border-bottom border-right-none'}>Order count</div>
          <div className={'d-flex justify-content-between align-items-center'}>
            <div>Claims</div>
            <div>Owes</div>
          </div>
        </div>
      </div>
      <div className={'d-flex flex-1 justify-content-between align-items-center hw-account-balance-table-body'}>
        <div>{formatPrice(prevBalance)}</div>
        <div className={'d-flex justify-content-between align-items-center'}>
          <div>{formatPrice(financeClaims || 0)}</div>
          <div>{formatPrice(financeOwes || 0)}</div>
        </div>
        <div>{formatPrice(newBalance)}</div>
        <div className={'d-flex justify-content-between align-items-center'}>
          <div className={'text-center'}>{outCount}</div>
          <div className={'text-center'}>{inCount}</div>
        </div>
      </div>*/}
      
    </div>
  )
}

export default AccountBalance