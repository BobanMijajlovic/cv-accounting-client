import React                from 'react'
import Tabs                 from '../../../components/Tabs/Tabs'
import {useCalculationTabs} from '../../hooks/useCalculation'

const Calculation = () => {

  const {data, activeTab} = useCalculationTabs()
  const tabs = React.useMemo(() => !data || data.length === 0 ? [] : data, [data])

  return (
    <div className={'d-flex align-items-start relative w-100 h-100 px-3 py-1'}>
      <Tabs
                tabs={tabs}
                stateTab={{active: activeTab}}
      />
    </div>
  )
}
export default Calculation
