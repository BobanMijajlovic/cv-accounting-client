import React                     from 'react'
import ItemStatisticToday        from './sale/ItemStatisticToday'
import ItemStatisticBetweenDates from './sale/ItemStatisticBetweenDates'
import ItemStatisticMonth        from './sale/ItemStatisticMonth'
import ItemStatisticByYear       from './sale/ItemStatisticByYear'
import ItemView                  from '../view/ItemView'

const ItemStatistic = () => {

  return (
    <div className={'d-flex flex-column w-100'}>
      <ItemView />
      <div className={'d-flex flex-row justify-content-between w-100 p-3'}>
        <ItemStatisticToday/>
        <ItemStatisticBetweenDates />
        <ItemStatisticMonth />
      </div>
      <div className={'pt-2'}>
        <ItemStatisticByYear/>
      </div>
    </div>
  )
}

export default ItemStatistic
