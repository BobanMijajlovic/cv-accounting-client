import React                    from 'react'
import Tabs                     from '../../../components/Tabs/Tabs'
import { useReturnInvoiceTabs } from '../../../store/return-invoice/useReturnInvoice'

const ReturnInvoice = () => {
  const { data, activeTab } = useReturnInvoiceTabs()
  const tabs = React.useMemo( () => !data || data.length === 0 ? [] : data, [data] )
  const { activeTab : activeTabNumber, triggerChange } = activeTab

  return (
    <div className={ 'd-flex align-items-start relative w-100 h-100 px-3' }>
      <Tabs
                tabs={ tabs }
                stateTab={ { active : activeTabNumber } }
                triggerChange={ triggerChange }
      />
    </div>
  )

}

export default ReturnInvoice