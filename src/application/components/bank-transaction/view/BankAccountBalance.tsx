import React                                 from 'react'
import { useTotalTransactionByAccountQuery } from '../../../../graphql/graphql'
import _                                     from 'lodash'
import ComponentRender                       from '../../../../components/Util/ComponentRender'
import { formatPrice }                       from '../../../utils/Utils'

const BankAccountBalance = ({bankAccountId}: { bankAccountId?: string }) => {

  const {data} = useTotalTransactionByAccountQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: {
      bankAccountId: Number(bankAccountId)
    },
    skip: !Number(bankAccountId)
  })
  const accountBalanceData = React.useMemo(() => data && data.bankAccountBalance ? data.bankAccountBalance : void(0), [data])

  const balance = React.useMemo(() => accountBalanceData ? `${_.round(_.subtract(Number(accountBalanceData.financeOwes), Number(accountBalanceData.financeClaims)), 2)}` : '0', [accountBalanceData])
  const owes = React.useMemo(() => accountBalanceData ? `${accountBalanceData.financeOwes}` : '0', [accountBalanceData])
  const claims = React.useMemo(() => accountBalanceData ? `${accountBalanceData.financeClaims}` : '0', [accountBalanceData])

  return (
    <div className={'d-flex flex-column flex-fill hw-bank-transaction-table-filter-bank-account-balance'}>
      <div className={'font-smaller-4 color-primary text-upper pb-2'}>Bank account balance</div>
      <div className={'d-flex justify-content-between align-items-center font-smaller-2'}>
        <ComponentRender label={'Owes'} value={owes} format={formatPrice} labelClass={'text-upper opacity-6 font-weight-normal'} classNames={'pr-4 font-weight-bold'}/>
        <ComponentRender label={'Claims'} value={claims} format={formatPrice} labelClass={'text-upper opacity-6 font-weight-normal'} classNames={'pr-4 font-weight-bold'}/>
        <ComponentRender label={'Balance'} value={balance} format={formatPrice} labelClass={'text-upper opacity-6 font-weight-normal'} classNames={'pr-4 font-weight-bold'}/>
      </div>
    </div>
  )
}

export default BankAccountBalance
