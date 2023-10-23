import React, {
  ChangeEvent,
  useCallback,
  useState
}                                             from 'react'
import * as _                                 from 'lodash'
import { get as _get }                        from 'lodash'
import { useTotalSaleTransactionByItemQuery } from '../../../../../graphql/graphql'
import { InputTextDatePicker }                from '../../../../../components/basic/withState'
import {
  formatPrice,
  formatQuantity
}                                             from '../../../../utils/Utils'
import {
  endOfMonth,
  startOfMonth
}                                             from 'date-fns'
import EmptyTag                               from '../../../../../components/Util/EmptyTag'
import { useItemDashboard }                   from '../../../../../store/items/useItem'

interface IItemStatisticMonth {
  date ?: Date
}

const ItemStatisticMonth = () => {
  const {selected: globalItemData} = useItemDashboard()

  const [state,setState] : [IItemStatisticMonth, (r : IItemStatisticMonth) => void] = useState({} as IItemStatisticMonth)

  const querySaleItems = React.useMemo(() => {
    const itemId = _get(globalItemData, 'id', 0)
    if (!itemId) {
      return undefined
    }
    return {
      itemId: Number(itemId),
      dateStart: state.date ? startOfMonth(state.date) : startOfMonth(new Date()),
      dateEnd: state.date ? endOfMonth(state.date) : endOfMonth(new Date()),
    }
  }, [globalItemData, state])

  const {data} = useTotalSaleTransactionByItemQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    variables: querySaleItems,
    skip: !querySaleItems
  })

  const saleItem = React.useMemo(() => !data || !data.saleItem ? {} : {
    ...data.saleItem,
    financeMP: _.round(_.add(data.saleItem.financeVP,data.saleItem.taxFinance),2)
  } ,[data])

  const changeDate = useCallback((event : ChangeEvent<HTMLInputElement>) => {
    if (!_.get(event, 'target.closed')) {
      return
    }
    setState({
      ...state,
      date: _.get(event, 'target.date')
    })
  }, [state])

  return (
    <div className={'d-flex flex-column hw-item-statistic-month-root'}>
      <div className={'d-flex justify-content-between align-items-center'}>
        <div className={'color-primary font-smaller-5 pb-1'}>SALE STATISTIC MONTH</div>
        <div className={'d-flex justify-content-end width-100'}>
          <InputTextDatePicker
                            align={'align-center'}
                            format={'MM/yyyy'}
                            useHelpText={false}
                            classNames={'lined-version hw-datepicker-no-input'}
                            value={_.get(state, 'date', '')}
                            onChange={changeDate}
                            label={'month'}
                            position={'right'}
                            panel={'M'}
          />
        </div>
      </div>
      <div className={'d-flex flex-column flex-2'}>
        <div className={'d-flex flex-row justify-content-between align-items-end color-primary flex-fill pb-1'}>
          <div className={'text-left font-smaller-2 opacity-6 min-width-120'}>Quantity&nbsp;:</div>
          <div className={'px-1 font-smaller-1 font-weight-bold text-right'}>
            <EmptyTag model={saleItem} field={'quantity'} format={formatQuantity} placeholder={'0.000'}/>
          </div>
        </div>
        <div className={'d-flex flex-row justify-content-between align-items-center color-primary flex-fill'}>
          <div className={'text-left font-smaller-2 opacity-6 min-width-120'}>Finance&nbsp;:</div>
          <div className={'px-1 font-smaller-1 font-weight-bold text-right'}>
            <EmptyTag model={saleItem} field={'financeMP'} format={formatPrice} placeholder={'$ 0.00'}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemStatisticMonth
