import React                                  from 'react'
import { useTotalSaleTransactionByItemQuery } from '../../../../../graphql/graphql'
import _, { get as _get }                     from 'lodash'
import EmptyTag                               from '../../../../../components/Util/EmptyTag'
import {
  formatPrice,
  formatQuantity
}                                             from '../../../../utils/Utils'
import { useItemDashboard }                   from '../../../../../store/items/useItem'

const ItemStatisticToday = () => {
  const {selected: globalItemData} = useItemDashboard()

  const querySaleItems = React.useMemo(() => {
    const itemId = _get(globalItemData, 'id', 0)
    if (!itemId) {
      return undefined
    }
    return {
      itemId: Number(itemId),
      dateStart: new Date().toISOString()
    }
  }, [globalItemData])
  
  const {data} = useTotalSaleTransactionByItemQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    variables: querySaleItems,
    skip: !querySaleItems
  })

  const saleItem = React.useMemo(() => data && data.saleItem ? {
    ...data.saleItem,
    financeMP: _.round(_.add(data.saleItem.financeVP,data.saleItem.taxFinance),2)
  } : {}, [data]) as any

  return (
    <div className={'d-flex flex-column'}>
      <div className={'color-primary font-smaller-5  pb-1'}>SALE STATISTIC TODAY</div>
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

export default ItemStatisticToday