import React                    from 'react'
import Tabs                     from '../../../components/Tabs/Tabs'
import {useProformaInvoiceTabs} from '../../../store/proforma-invoice/useProformaInvoice'

const ProformaInvoiceTabs = () => {
  const {data, activeTab} = useProformaInvoiceTabs()
  const tabs = React.useMemo(() => !data || data.length === 0 ? [] : data, [data])
  const { activeTab: activeTabNumber, triggerChange} = activeTab
  return (
    <div className={'px-3 w-100 h-100'}>
      <Tabs
                tabs={tabs}
                stateTab={{active: activeTabNumber}}
                triggerChange={triggerChange}
      />
    </div>
  )
}

export default ProformaInvoiceTabs