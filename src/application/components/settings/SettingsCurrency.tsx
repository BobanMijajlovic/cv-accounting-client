import React              from 'react'
import { CONSTANT_MODEL } from '../../constants'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                         from '../../../components/hooks/useOptimizeEventClick'
import { Select }         from '../../../components/Select'
import CurrencyList       from '../currency/CurrencyList'
import { useCurrency }    from '../currency/useCurrency'

const SettingsCurrency = () => {

  const {activeCurrencies, selectNotActiveCurrencies, updateCurrencyStatus} = useCurrency()

  const onChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
    updateCurrencyStatus(e.target.value, CONSTANT_MODEL.STATUS.ACTIVE)
  }

  const {onClickHandler} = useOptimizeEventClick({
    eventHandler (data : IUseOptimizeEventData) {

      if (data.action === 'follow-currency' && data.id) {
        updateCurrencyStatus(data.id, CONSTANT_MODEL.STATUS.NOT_ACTIVE)
      }
    }
  })

  return (
    <div className={'d-flex flex-column hw-active-currency-list-dropdown-root'}>
      <div>
        <Select
                    label={'Currency'}
                    options={selectNotActiveCurrencies}
                    onChange={onChange}
        />
      </div>
      <div
                onClick={onClickHandler}
                data-action-root
      >
        <CurrencyList currencies={activeCurrencies}/>
      </div>
    </div>
  )
}

export default SettingsCurrency