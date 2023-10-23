import React                               from 'react'
import {
  formatDateMonthDay,
  formatPrice
}                                          from '../../../../utils/Utils'
import { TDueDatesSummarizeNextWeekState } from '../CustomerFinanceFuture'

interface IFinanceFutureDataProps {
  data? : TDueDatesSummarizeNextWeekState[]
  title : string
}

const FinanceFutureData = ( { data, title } : IFinanceFutureDataProps ) => {

  return (
    <div className={ 'd-flex flex-column flex-fill px-2 hw-customer-sum-next-week-root' }>
      <div className={ 'font-smaller-3 color-primary text-upper pb-2' }>{ title }</div>
      <div className={ 'd-flex flex-row flex-fill font-smaller-2' }>
        <div className={ 'd-flex flex-column align-items-end flex-1 hw-customer-sum-next-week-row text-left' }>
          <div className={ 'font-smaller-3' }>&nbsp;</div>
          <div className={ '' }>Owes</div>
          <div className={ '' }>Claims</div>
          <div className={ '' }>Summarize</div>
        </div>
        {
          data && data.map( ( x, key ) => {
            return <CustomerSumNextWeek data={ x } key={ key }/>
          } )
        }
      </div>
    </div>
  )
}

export default FinanceFutureData

const CustomerSumNextWeek = ( { data } : { data : TDueDatesSummarizeNextWeekState } ) => {
  return (
    <div className={ 'd-flex flex-column align-items-end flex-1 hw-customer-sum-next-week-row' }>
      <div className={ 'font-smaller-3 letter-spacing-1' }>{ formatDateMonthDay( data.date ) }</div>
      <FinanceField finance={ data.inFinance }/>
      <FinanceField finance={ data.outFinance }/>
      <FinanceField finance={ data.sum }/>
    </div>
  )
}

const FinanceField = ( { finance } : { finance : number } ) => {
  return <div className={ '' }> { formatPrice( finance ) }</div>
}

