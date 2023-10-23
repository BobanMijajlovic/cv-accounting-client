import React                            from 'react'
import { useTotalSaleItemsByYearQuery } from '../../../../../graphql/graphql'
import { get as _get }                  from 'lodash'
import BarChart                         from '../../../../../components/Chart/BarChart'
import { useItemDashboard }             from '../../../../../store/items/useItem'

const ItemStatisticByYear = () => {
  const {selected: globalItemData} = useItemDashboard()
  const itemId = React.useMemo(() => Number(_get(globalItemData, 'id', 0)), [globalItemData])

  const {data} = useTotalSaleItemsByYearQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    variables: {
      itemId: itemId
    },
    skip: !itemId
  })

  const months = React.useMemo(() => !data || !data.saleByYear ? [] :
    data.saleByYear.map((x) => {
      return `${x.date}`
    }), [data])

  const chartData = React.useMemo(() => !data || !data.saleByYear ? [] :
    data.saleByYear.map((x) => {
     /* return {
        ..._omit(x, ['date']),
        x: x.date,
        y: x.quantity
      }*/
      return x.quantity
    }), [data])

  return (
    <div style={{width: '75%', margin: 'auto'}}>
      <BarChart chartData={chartData} label={'Sale by year'} labels={months} />
    </div>
  )
}

export default ItemStatisticByYear