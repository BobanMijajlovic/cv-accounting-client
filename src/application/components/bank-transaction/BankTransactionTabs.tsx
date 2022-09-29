import React                      from 'react'
import Tabs                       from '../../../components/Tabs/Tabs'
import { useBankTransactionTabs } from '../../../store/bank-transaction/useBankTransaction'

const BankTransactionTabs = () => {
  const { data, activeTab } = useBankTransactionTabs()
  const tabs = React.useMemo(() => !data || data.length === 0 ? [] : data, [data])
  const { activeTab: activeTabNumber, triggerChange} = activeTab
  return (
    <div className={'px-3 w-100 h-100'}>
      <Tabs
                tabs={tabs}
                stateTab={{ active: activeTabNumber }}
                triggerChange={triggerChange}
      />
    </div>
  )
}

export default BankTransactionTabs
