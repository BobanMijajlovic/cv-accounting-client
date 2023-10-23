import React                            from 'react'
import {
  formatDateShort,
  formatPrice
}                                       from '../../../../../utils/Utils'
import _                                from 'lodash'
import { TABLE_INDEX_SUMMARIZE_COLUMN } from '../../../../../../components/Table'
import { FontAwesomeIcon }              from '@fortawesome/react-fontawesome'
import {
  faExclamationTriangle,
  faTimes
}                                       from '@fortawesome/free-solid-svg-icons'
import { faEdit }                       from '@fortawesome/free-regular-svg-icons'
import ConditionalRendering             from '../../../../../../components/Util/ConditionalRender'

export const RendersBankTransactionCustomerData = ({value,index,model,additionalData} : any) => {
  if (index === TABLE_INDEX_SUMMARIZE_COLUMN) {
    return  <div></div>
  }
  const _model = additionalData[index]
  const customer = (() => {
    if ( !_model.bankAccount ) {
      return ''
    }
    const customer = _model.bankAccount.customer
    if (!customer) {
      return '' 
    }
    return customer.shortName ? customer.shortName : customer.fullName
  })()
  const acc = _.get(_model.bankAccount,'account', void(0))
  const account = !acc ? _.get(_model.transactionAdditionalData,'accountNumber','') : acc

  return (
    <div className={'d-flex flex-column font-smaller-2 flex-fill transaction-item-table-customer-column relative'}>
      <div>{customer}</div>
      <div>{account}</div>
      <ConditionalRendering condition={!acc}>
        <FontAwesomeIcon icon={faExclamationTriangle} className={'opacity-4 font-bigger-2 color-danger absolute-right-down'}/>
      </ConditionalRendering>
    </div>
  )
}

export const RenderBankTransactionDates = ({value,index,model,additionalData} : any) => {
  if (index === TABLE_INDEX_SUMMARIZE_COLUMN) {
    return  <div className={'text-right'}>TOTAL:</div>
  }
  const _model = additionalData[index]
  const dateProcessed = _model.dateProcessed ? _model.dateProcessed : ''
  const datePaid = _model.datePaid ? _model.datePaid : ''
  return (
    <div className={'d-flex flex-column font-smaller-3 flex-fill'}>
      <div>{formatDateShort(dateProcessed)}</div>
      <div>{formatDateShort(datePaid)}</div>
    </div>
  )
}

export const SummarizeOwesClaims = ({additionalData} : any) => {
  const inFinance = additionalData.reduce((acc : number,x : any) => _.round(_.add(acc,x.inFinance),2),0)
  const outFinance = additionalData.reduce((acc : number,x : any) => _.round(_.add(acc,x.outFinance),2),0)
  return (
    <div className={'d-flex justify-content-between align-items-center font-smaller-2 text-right'}>
      <div className={'flex-1 '}>{formatPrice(inFinance)}</div>
      <div className={'flex-1'}>{formatPrice(outFinance)}</div>
    </div>
  )
}

export const RenderBankTransactionOwesClaimsExpense = ({value,index,model,additionalData} : any) => {
  
  if (index === TABLE_INDEX_SUMMARIZE_COLUMN) {
    return <SummarizeOwesClaims additionalData={additionalData} />
  }
    
  const _model = additionalData[index]
  const inFinance = _model.inFinance ? _model.inFinance : ''
  const outFinance = _model.outFinance ? _model.outFinance : ''
  const expense =  _model.expenses ? _model.expenses : ''
    
  return (
    <div className={'d-flex justify-content-between align-items-center font-smaller-2 flex-fill text-right'}>
      <div className={'d-flex flex-column align-items-stretch flex-1 border-right pr-1'}>
        <div>{formatPrice(inFinance)}</div>
        <div className={'font-smaller-4'}>Exp: {formatPrice(expense)}</div>
      </div>
      <div className={'flex-1'}>{formatPrice(outFinance)}</div>
    </div>
  )
}

const BankTransactionTableActionCell = ({value,model,index} : { value : any,model : any,index : number }) => {

  return (
    <div className={'hw-table-cell-action'}>
      <FontAwesomeIcon className={'color-primary-hover'} icon={faEdit} data-sub-action={'edit'}/>
      <FontAwesomeIcon className={'color-primary-hover'} icon={faTimes} data-sub-action={'delete'}/>
    </div>
  )
}
export default BankTransactionTableActionCell