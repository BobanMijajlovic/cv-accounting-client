import React                 from 'react'
import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome'
// @ts-ignore
import getSymbolFromCurrency from 'currency-symbol-map'
import { faTimes }           from '@fortawesome/free-solid-svg-icons'
import { formatCurrency }    from '../../utils/Utils'
import ConditionalRendering  from '../../../components/Util/ConditionalRender'

const CurrencyList = ({currencies,noDeleteButton, className} : {currencies : any,noDeleteButton ?: boolean,className?:string}) => {

  return (
    <div>
      <div className={`hw-settings-currency-list text-center color-primary border-bottom p-1${className ? ` ${className}` : ''}`}>
        <div>Name</div>
        <div>Symbol</div>
        <div>Mark</div>
        <div className={'values'}>
          <div>Buy rate</div>
          <div>Mid. Rate</div>
          <div>Sell Rate</div>
        </div>
        <ConditionalRendering condition={!noDeleteButton}> 
          <div></div>
        </ConditionalRendering>
      </div>
      {
        currencies.map((currency : any, key : number) => {
          return <CurrencyListRow key={key} data={currency} index={key} noDeleteButton={noDeleteButton}/>
        })
      }
    </div>
  )
}

export default CurrencyList

const CurrencyListRow = ({data, index,noDeleteButton} : { data : any, index : number,noDeleteButton ?: boolean }) => {
  const currency = data.currencyDefinition
  return (
    <div className={`hw-settings-currency-list text-center color-primary p-1${index % 2 === 0 ? ' row-even' : ' row-odd'}`}>
      <div>{currency.name}</div>
      <div>{getSymbolFromCurrency(currency.mark)}</div>
      <div>{currency.mark}</div>
      <CurrencyValuePart values={data}/>
      <ConditionalRendering condition={!noDeleteButton}>
        <div
             data-action={'follow-currency'}
             data-action-id={currency.id}
        >
          <FontAwesomeIcon icon={faTimes} className={'cursor-pointer'}/>
        </div>
      </ConditionalRendering>
    </div>
  )
}

const CurrencyValuePart = ({values} : { values : any }) => {
  const data = values || {
    buyingRate: 0,
    middleRate: 0,
    sellingRate: 0
  }
  return (
    <div className={'values text-right'}>
      <div>{formatCurrency(data.buyingRate)}</div>
      <div>{formatCurrency(data.middleRate)}</div>
      <div>{formatCurrency(data.sellingRate)}</div>
    </div>
  )
}