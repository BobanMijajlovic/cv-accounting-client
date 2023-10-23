import React, {
  ChangeEvent,
  useCallback
}                                    from 'react'
import {TWarehouse}                  from '../../../../../graphql/type_logic/types'
import ButtonShortcut                from '../../../../../components/Button/ButtonShortcut'
import {
  faBackspace,
  faWarehouse
}                                    from '@fortawesome/free-solid-svg-icons'
import {
  InputTextDatePicker,
  Select
}                                    from '../../../../../components/basic/withState'
import {CONSTANT_WAREHOUSE_TRANSFER} from '../../../../constants'
import * as _                        from 'lodash'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                    from '../../../../../components/hooks/useExternalKeybaord'
import WarehouseViewShort            from '../../views/WarehouseViewShort'
import {useWarehouseTransfer}        from '../../../../../store/warehouse-transfer/useWarehouseTransfer'
import {openDialogAddWarehouse}      from '../../modal/WarehouseSearch'

const WarehouseTransferFilter = () => {

  const {transfer, setToWarehouse, setStatus, setFromDate, setToDate } = useWarehouseTransfer()

  const changeDateFrom = useCallback((event : ChangeEvent<HTMLInputElement>) => {
    if (!_.get(event, 'target.closed')) {
      return
    }
    setFromDate(_.get(event, 'target.date'))
  }, [setFromDate])

  const changeDateTo = useCallback((event : ChangeEvent<HTMLInputElement>) => {
    if (!_.get(event, 'target.closed')) {
      return
    }
    setToDate(_.get(event, 'target.date'))
  }, [setToDate])

  const changeStatus = useCallback((event : ChangeEvent<HTMLSelectElement>) => {
    setStatus(_.get(event, 'target.value'))
  }, [setStatus])

  const handlerSetToWarehouse = useCallback((warehouse : TWarehouse) => setToWarehouse(warehouse), [setToWarehouse])

  const handlerChangeToWarehouse = () => {
    transfer.toWarehouse && transfer.toWarehouse.id ?  handlerSetToWarehouse({} as TWarehouse) :  openDialogAddWarehouse(handlerSetToWarehouse)
  }

  const startSearchingDay = React.useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() - 15)
    return date
  }, [])

  const {setRef} = useExternalKeyboard((e : KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.F2:
        handlerChangeToWarehouse()
        return
    }
  }, true, [KeyboardEventCodes.F2], 'warehouse-transfer-dashboard-table-filter')

  return (
    <div className={'d-flex align-content-stretch justify-content-between relative warehouse-item-table-search-part border'} ref={setRef}>
     
      <div className={'d-flex justify-content-end align-items-center'}>
        {transfer.toWarehouse && transfer.toWarehouse.id ?
          <ButtonShortcut
                icon={faBackspace}
                label={'CLEAR'}
                color={'danger'}
                classNames={'hw-shortcut-button-white-version mr-3 sm '}
                onClick={() => handlerSetToWarehouse({} as TWarehouse)}
                shortcut={KeyboardEventCodes.F2}
          /> :
          <ButtonShortcut
                icon={faWarehouse}
                label={'To Whouse'}
                classNames={'hw-shortcut-button primary sm hw-button-border-color mr-3'}
                onClick={handlerChangeToWarehouse}
                shortcut={KeyboardEventCodes.F2}
          />
        }
        <div className={'warehouse-item-customer-part'}>
          <WarehouseViewShort warehouse={transfer.toWarehouse as TWarehouse}/>
        </div>
      </div>
      <div className={'d-flex justify-content-between  align-items-end relative'}>
        <div className={'d-flex justify-content-between warehouse-item-table-dates-part'}>
          <div className={'mx-4'}>
            <InputTextDatePicker
                format={'dd/MM/yyyy'}
                align={'align-center'}
                helperText={'date from'}
                classNames={'lined-version '}
                value={_.get(transfer, 'dateFrom', '')}
                onChange={changeDateTo}
                useLabel={false}
                label={''}
                position={'right'}
            />
          </div>
          <div>
            <InputTextDatePicker
                date={startSearchingDay}
                align={'align-center'}
                format={'dd/MM/yyyy'}
                helperText={'date to'}
                classNames={'lined-version'}
                value={_.get(transfer, 'dateTo', '')}
                onChange={changeDateFrom}
                useLabel={false}
                label={''}
            />
          </div>
        </div>
      </div>
      <div className={'hw-calculation-table-status-part'}>
        <Select
                    label={'Status'}
                    helperText={''}
                    fullWidth
                    lined
                    options={CONSTANT_WAREHOUSE_TRANSFER.TYPES_SELECT.WORK_ORDER_STATUS}
                    value={_.get(transfer, 'status', '0')}
                    onChange={changeStatus}
        />
      </div>
    </div>
  )
}

export default WarehouseTransferFilter
