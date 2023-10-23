import React                              from 'react'
import {
  DueDates,
  useDueDatesSummarizeByFilterQuery
}                                         from '../../../../graphql/graphql'
import _                                  from 'lodash'
import {
  addDays,
  differenceInCalendarDays,
  format
}                                         from 'date-fns'
import FinanceFutureData                  from './views/FinanceFutureData'
import { TDueDates }                      from '../../../../graphql/type_logic/types'
import { queryDueDatesSummarizeByFilter } from '../../../../graphql/variablesQ'
import { CONSTANT_MODEL }                 from '../../../constants'

export type TDueDatesSummarizeNextWeekState = {
  date:  string
  inFinance: number,
  outFinance: number
  sum: number
}

export const getClientCustomerSummarizeNextWeekData = (data: TDueDates[]): TDueDatesSummarizeNextWeekState[] => {
  const arr = [] as TDueDatesSummarizeNextWeekState[]
  const defState = { finance: 0 } as any
  const date = addDays(new Date(), 1)
  const count = differenceInCalendarDays(addDays(date, 7), date)
  let currDate = date
  for (let i = 0; i < count; i++) {
    let _in = defState
    let out = defState
    const currDateFormat = format(currDate, 'yyyy-MM-dd')
    _in = data?.find(d => d.date === currDateFormat && d.flag === CONSTANT_MODEL.TAX_FINANCE_FLAG.IN)
    out = data?.find(d => d.date === currDateFormat && d.flag === CONSTANT_MODEL.TAX_FINANCE_FLAG.OUT)
    if (!_in) {
      _in = defState
    }
    if (!out) {
      out = defState
    }
    arr.push({
      date: currDateFormat as string,
      inFinance: _in.finance,
      outFinance: out.finance,
      sum: _.round(_.subtract(_in.finance, out.finance), 2)
    })
    currDate = addDays(currDate, 1)
  }
  return arr as TDueDatesSummarizeNextWeekState[]
}

const CustomerFinanceFuture = ({ customerId }: { customerId?: string }) => {

  const variables = React.useMemo(() => {
    const dateStart = new Date()
    dateStart.setDate(dateStart.getDate() + 1)
    const dateEnd = new Date()
    dateEnd.setDate(dateStart.getDate() + 7)
    const group = ['date', 'flag','customerId']
    const attributes = ['flag','status', 'date','customerId']
    return  queryDueDatesSummarizeByFilter( Object.assign(customerId ? {customerId: Number(customerId)} : {},{
      dateFrom: dateStart.toISOString(),
      dateTo: dateEnd.toISOString(),
      status: CONSTANT_MODEL.DUE_DATES_STATUS.ACTIVE,
      attributes,
      group,
    }))
  }, [customerId])

  const {data} = useDueDatesSummarizeByFilterQuery({
    fetchPolicy: 'no-cache',
    variables
  })

  const dueDates = React.useMemo(() => data?.data as DueDates[], [data])

  const _data = React.useMemo(() => getClientCustomerSummarizeNextWeekData(dueDates), [dueDates])

  return <FinanceFutureData data={_data} title={`${customerId ? 'customer' : 'client'} finance next 7 days`}/>
}

export default CustomerFinanceFuture
