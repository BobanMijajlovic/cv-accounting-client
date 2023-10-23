import React, {
  ChangeEvent,
  useEffect,
  useState
}                          from 'react'
import {
  formatPrice,
  toNumberFixed
}                          from '../../utils/Utils'
import { Select }          from '../../../components/Select'
import { get as _get }     from 'lodash'
import { InputText }       from '../../../components/InputText'
import ButtonShortcut      from '../../../components/Button/ButtonShortcut'
import { faExchangeAlt }   from '@fortawesome/free-solid-svg-icons'
import { CURRENCY_RSD_ID } from '../../constants'

interface ICurrencyConverterState {
  from ?: string
  to ?: string
  amount : string
}

const ConvertCurrencyForm = ({currencies} : {currencies : any}) => {

  const [state,setState] : [ICurrencyConverterState,(r : ICurrencyConverterState) => void] = useState({
    amount: '100.00'
  } as ICurrencyConverterState)

  const setFromState = (e : ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      from: e.target.value
    })
  }

  const setToState = (e : ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      to: e.target.value
    })
  }

  const options = React.useMemo(() => {
    let currData = []
    if (currencies) {
      currData =  currencies.map((x : any) => {
        const currency = x.currencyDefinition
        return {
          label: currency.mark,
          value: `${currency.id}`
        }
      })
    }
    return [
      {
        label: 'RSD',
        value: `${CURRENCY_RSD_ID}`
      },
      ...currData
    ]
  },[currencies])
  
  useEffect(() => {
    if (options.length === 0) {
      return 
    }
    setState({
      ...state,
      from: `${options[0].value}`,
      to:`${options[0].value}`,
    })
  },[options])

  const setAmountValue = (e : ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    value = value.replace(/^\d+\.\d{0,2}$/,'')
    e.target.value = value

    setState({
      ...state,
      amount: value
    })
  }

  const onBlurHandler = (e : React.FocusEvent<HTMLInputElement>) =>  {
    const value = toNumberFixed(e.target.value)
    e.target.value = formatPrice(value)
  }

  const convertCurrency = () => {

  }
    
  return (
    <div className={'d-flex justify-content-between align-items-center w-100'}>
      <div className={'d-flex justify-content-between align-items-center w-100'}>
        <div className={'d-flex justify-content-between align-items-center flex-fill'}>
          <Select
                    label={'From'}
                    options={options}
                    value={_get(state,'from','')}
                    onChange={setFromState}
          />
          <Select
                    label={'To'}
                    options={options}
                    value={_get(state,'to','')}
                    onChange={setToState}
          />
        </div>
        <div className={'px-2'}>
          <InputText
                    label={'Amount'}
                    value={_get(state,'amount','100')}
                    onBlur={onBlurHandler}
                    onChange={setAmountValue}
          />
        </div>
        <div>
          <ButtonShortcut
                    icon={faExchangeAlt}
                    label={'Convert'}
                    onClick={convertCurrency}
                    classNames={'hw-shortcut-button primary sm hw-button-border-color'}
          />
        </div>  
      </div>
      <div className={'flex-1 px-2'}>

      </div>
    </div>
  )

}

export default ConvertCurrencyForm