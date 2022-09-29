import React, {
  ChangeEvent,
  useCallback
}                                    from 'react'
import { InputTextDatePicker }       from '../../../../../components/basic/withState'
import ButtonShortcut                from '../../../../../components/Button/ButtonShortcut'
import {
  faBackspace,
  faUserTie
}                                    from '@fortawesome/free-solid-svg-icons'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                    from '../../../../../components/hooks/useExternalKeybaord'
import CustomerViewShort             from '../../../customer/views/CustomerViewShort'
import { openDialogAddEditCustomer } from '../../../customer/modal/CustomerSearch'
import { useWarehouse }              from '../../../../../store/warehouse/useWarehouse'
import { TCustomer }                 from '../../../../../graphql/type_logic/types'
import * as _                        from 'lodash'
import { get as _get }               from 'lodash'
import EmptyTag                      from '../../../../../components/Util/EmptyTag'

const TableSearch = ({warehouseId} : any) => {
  const {data: globalWarehouseData, setDateFrom, setDateTo, setSelectedCustomer} = useWarehouse(warehouseId)
  const item = React.useMemo(() => _get(globalWarehouseData, 'item.item', {}), [globalWarehouseData])

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

  const selectedCustomer = React.useMemo(() => _get(globalWarehouseData, 'customer', {}) as TCustomer, [globalWarehouseData])

  const setCustomer = useCallback((customer : TCustomer) => {
    setSelectedCustomer(customer)
  }, [setSelectedCustomer])

  const handlerChooseCustomer = React.useCallback(() => {
    selectedCustomer && selectedCustomer.id  ?  setSelectedCustomer({} as TCustomer) : openDialogAddEditCustomer(setCustomer)
  },[setCustomer, setSelectedCustomer, selectedCustomer])

  const { setRef } = useExternalKeyboard((e : KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.F2:
        handlerChooseCustomer()
        return
    }
  }, true, [KeyboardEventCodes.F2],'warehouse-one-item-filter')

  const startSearchingDay = React.useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() - 30)
    return date
  }, [])

  return (
    <div className={'d-flex justify-content-between align-items-center  warehouse-item-table-search-part border'} ref={setRef}>
      <div className={'d-flex flex-column justify-content-center text-align-left color-primary warehouse-item-preview-part mr-4'}>
        <div className={'px-1 font-bold font-smaller-1 text-upper'}>
          <EmptyTag model={item} field={'shortName'} placeholder={'ITEM NAME'}/>
        </div>
        <small className={'px-1'}><EmptyTag model={item} field={'code'} placeholder={'Item code'}/> </small>
      </div>
      <div className={'d-flex justify-content-between warehouse-item-table-dates-part'}>
        <div>
          <InputTextDatePicker
                        format={'dd/MM/yyyy'}
                        helperText={'date from'}
                        classNames={'lined-version'}
                        value={_get(globalWarehouseData, 'dateFrom', '')}
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
                        value={_get(globalWarehouseData, 'dateTo', '')}
                        onChange={changeDateTo}
                        useLabel={false}
                        label={''}
                        align={'align-center'}
          />
        </div>
      </div>

      <div className={'d-flex align-items-center relative'}>
        <div className={'warehouse-item-customer-part'}>
          <CustomerViewShort customer={selectedCustomer}/>
        </div>
        {selectedCustomer && selectedCustomer.id ?
          <ButtonShortcut
                        icon={faBackspace}
                        label={'CLEAR'}
                        color={'danger'}
                        shortcut={KeyboardEventCodes.F2}
                        classNames={'hw-shortcut-button-white-version mr-3 sm '}
                        onClick={handlerChooseCustomer}
          />
          :
          <ButtonShortcut
                        icon={faUserTie}
                        label={'Customer'}
                        shortcut={KeyboardEventCodes.F2}
                        classNames={'hw-shortcut-button primary sm hw-button-border-color mr-3'}
                        onClick={handlerChooseCustomer}
          />
        }
      </div>
    </div>
  )

}

export default TableSearch
