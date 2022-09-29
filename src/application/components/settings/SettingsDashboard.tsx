import React                    from 'react'
import SettingsGeneral          from './SettingsGeneral'
import SettingsCurrency         from './SettingsCurrency'
import Tabs, { ITabDefinition } from '../../../components/Tabs/Tabs'
import SettingsCategory         from './SettingsCategory'
import {toBoolean}              from 'validator'

const SettingsDashboard = () => {
  
  const settingsTabs = React.useMemo(() => {
    const arr = [{
      tabName: 'General',
      tabContent: SettingsGeneral
    }]
    
    if (!toBoolean((process.env as any).REACT_APP_SALE_MODE)) {
      arr.push({
        tabName: 'Currency',
        tabContent: SettingsCurrency
      })
    }
    return [
      ...arr,
      {
        tabName: 'Categories',
        tabContent: SettingsCategory
      }
    ] as ITabDefinition[]
  },[])
    
  return (
    <div className={'d-flex justify-content-between p-3 h-100'}>
      <Tabs
          tabs={settingsTabs}
          stateTab={{active: 0}}
      />
    </div>
  )
    
}

export default SettingsDashboard