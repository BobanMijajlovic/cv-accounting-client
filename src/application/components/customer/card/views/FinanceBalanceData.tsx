import React                   from 'react'
import {formatPrice}           from '../../../../utils/Utils'
import {IComponentRenderProps} from '../../../../../components/Util/ComponentRender'
import EmptyTag                from '../../../../../components/Util/EmptyTag'
import {FontAwesomeIcon}       from '@fortawesome/react-fontawesome'

interface IFinanceBalanceDataProps {
  owes : number
  claims : number
  delayClaims : number
  delayOwes : number
  claimsToday : number
  owesToday : number
  title : string
}

const FinanceBalanceData = ({owes,claims,delayClaims,delayOwes,claimsToday,owesToday,title} : IFinanceBalanceDataProps) => {
    
  return (
    <div className={'d-flex flex-column flex-fill hw-customer-finance-balance-root'}>
      <div className={'font-smaller-1 color-primary text-upper pb-2'}>{title}</div>
      <div className={'d-flex justify-content-between align-items-center  flex-2'}>
        <CustomerFinanceBalanceComponent label={'Owes'} value={`${owes}`} format={formatPrice} />
        <CustomerFinanceBalanceComponent label={'Claims'} value={`${claims}`} format={formatPrice}/>
        <CustomerFinanceBalanceComponent label={'Delay Owes'} value={`${delayOwes}`} format={formatPrice} classNames={'color-danger'}/>
        <CustomerFinanceBalanceComponent label={'Owes Today'} value={`${owesToday}`} format={formatPrice}/>
        <CustomerFinanceBalanceComponent label={'Delay Claims'} value={`${delayClaims}`} format={formatPrice} classNames={'color-danger'}/>
        <CustomerFinanceBalanceComponent label={'Claims Today'} value={`${claimsToday}`} format={formatPrice} />
      </div>
    </div> 
  )
}

export default FinanceBalanceData

const CustomerFinanceBalanceComponent = ({label, value, model, field, placeholder, action, labelClass, 'justify-content': justifyContent, format,classNames, ...rest} : IComponentRenderProps) => {
  if (format) {
    if (value) {
      value = format(value)
    }
  }
  return (
    <div className={`d-flex flex-column text-upper font-weight-normal justify-content-center pr-4 font-weight-bold flex-1 ${classNames ? ` ${classNames}` : ''}`}>
      <div className={'font-weight-bold'}>
        <label className={`hw-label text-upper opacity-6 font-weight-normal font-smaller-3 justify-content-center ${labelClass ? ` ${labelClass}` : ''}`}>
          {label}
        </label>
      </div>
      <div className={`d-flex  align-items-center font-smaller-1 ${justifyContent ? ` justify-content-${justifyContent}` : ' justify-content-center'}`}>
        {model && field ? <EmptyTag model={model} field={field} placeholder={placeholder}/> : value}
        {action && (
          <div className={'font-smaller-3 cursor-pointer ml-3'} {...rest}>
            {action.icon ? <FontAwesomeIcon icon={action.icon} className={'mr-1'}/> : ''}
            {action.label}
          </div>
        )
        }
      </div>
    </div>
  )
}