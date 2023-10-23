import React, {
  ChangeEvent,
  useCallback
}                            from 'react'
import {InputTextDatePicker} from '../../../../../components/basic/withState'
import {useWarehouse}        from '../../../../../store/warehouse/useWarehouse'
import {get as _get}         from 'lodash'
import * as _                from 'lodash'

const TableSearch = ({warehouseId} : any) => {
  const {data: globalWarehouseData, setFinanceDateFrom:setDateFrom, setFinanceDateTo:setDateTo} = useWarehouse(warehouseId)

  const changeDateFrom = useCallback((event : ChangeEvent<HTMLInputElement>) => {
    if (!_.get(event, 'target.closed')) {
      return
    }
    setDateFrom(_.get(event, 'target.date'))
  }, [setDateFrom])

  const changeDateTo = useCallback((event : ChangeEvent<HTMLInputElement>) => {
    if (!_.get(event, 'target.closed')) {
      return
    }
    setDateTo(_.get(event, 'target.date'))
  }, [setDateTo])

  const startSearchingDay = React.useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() - 15)
    return date
  }, [])

  return (
    <div className={'d-flex justify-content-center align-items-center  warehouse-item-table-search-part border'}>
      <div className={'d-flex justify-content-between warehouse-item-table-dates-part'}>
        <div>
          <InputTextDatePicker
                        format={'dd/MM/yyyy'}
                        helperText={'date from'}
                        classNames={'lined-version'}
                        value={_get(globalWarehouseData, 'financeDateFrom', '')}
                        onChange={changeDateFrom}
                        useLabel={false}
                        label={''}
                        date={startSearchingDay}
                        align={'align-center'}
          />
        </div>
        <div className={'mx-4'}>
          <InputTextDatePicker
                        format={'dd/MM/yyyy'}
                        helperText={'date to'}
                        classNames={'lined-version'}
                        value={_get(globalWarehouseData, 'financeDateTo', '')}
                        onChange={changeDateTo}
                        useLabel={false}
                        date={new Date()}
                        label={''}
                        align={'align-center'}
                        position={'right'}
          />
        </div>
      </div>
    </div>
  )

}

export default TableSearch
